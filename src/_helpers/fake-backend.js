export { fakeBackend };

function fakeBackend() {
    let users = [{ id: 1, login: 'steve.jobs@example.com', password: 'password' }];
    let realFetch = window.fetch;
    window.fetch = function (url, opts) {
        return new Promise((resolve, reject) => {
            // wrap in timeout to simulate server api call
            setTimeout(handleRoute, 500);

            function handleRoute() {
                switch (true) {
                    case url.endsWith('/users/authenticate') && opts.method === 'POST':
                        return authenticate();
                    case url.endsWith('/users') && opts.method === 'GET':
                        return getUsers();
                    default:
                        // pass through any requests not handled above
                        return realFetch(url, opts)
                            .then(response => resolve(response))
                            .catch(error => reject(error));
                }
            }

            // route functions

            function authenticate() {
                const { login, password } = body();
                const user = users.find(x => x.login === login);
                const auth = users.find(x => x.password === password && user);
                console.log('жопа', user);
                if (!user) return error(`Пользователя ${login} не существует`);
                else if (user && !auth) return error(`Неверный пароль`);

                return ok({
                    id: user.id,
                    login: user.login,
                    token: 'fake-jwt-token'
                });
            }

            function getUsers() {
                if (!isAuthenticated()) return unauthorized();
                return ok(users);
            }

            // helper functions

            function ok(body) {
                resolve({ ok: true, text: () => Promise.resolve(JSON.stringify(body)) })
            }

            function unauthorized() {
                resolve({ status: 401, text: () => Promise.resolve(JSON.stringify({ message: 'Unauthorized' })) })
            }

            function error(message) {
                resolve({ status: 400, text: () => Promise.resolve(JSON.stringify({ message })) })
            }

            function isAuthenticated() {
                return opts.headers['Authorization'] === 'Bearer fake-jwt-token';
            }

            function body() {
                return opts.body && JSON.parse(opts.body);    
            }
        });
    }
}

import { useSelector, useDispatch } from 'react-redux';
import styled from 'styled-components';

import { authActions } from '_store';

export { Nav };

function Nav() {
    const authUser = useSelector(x => x.auth.user);
    const dispatch = useDispatch();
    const logout = () => dispatch(authActions.logout());

    // only show nav when logged in
    if (!authUser) return null;
    
    return (
        <StyledButton onClick={logout} >Выйти</StyledButton>
    );
}

const StyledButton = styled.button`
    @font-face {
        font-family: 'Helvetica Neue';
        font-style: normal;
        src: url('../fonts/DigitalNumbers-Regular.woff') format('otf'),
    };
    border: 0;
    background: #F5F5F5;
    border-radius: 8px;
    font-family: 'Helvetica Neue';
    font-style: normal;
    font-weight: 700;
    font-size: 18px;
    line-height: 22px;
    color: #000000;
    padding: 19px 71px;

`
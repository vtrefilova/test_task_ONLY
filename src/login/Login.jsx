import { useEffect } from 'react';
import { useForm } from "react-hook-form";
import styled from 'styled-components';
import img from '../images/ONLY..svg';
import errorIcon from '../images/Ellipse.svg';
import { useSelector, useDispatch } from 'react-redux';
import Checkbox from '../_components/Checkbox';

import { history } from '_helpers';
import { authActions } from '_store';

export { Login };

const Login = () => {
    const { register, handleSubmit, formState: {errors, isSubmitting}} = useForm();

    const dispatch = useDispatch();
    const authUser = useSelector(x => x.auth.user);
    const authError = useSelector(x => x.auth.error);

    useEffect(() => {
        // redirect to home if already logged in
        if (authUser) {
            history.navigate('/');}

    }, []);

    const onSubmit = handleSubmit(({ login, password }) => {
            return dispatch(authActions.login({ login, password }));
        })
    
    return (
        <>
            <StyledImg className='logo' src={img}/>
            <StyledForm onSubmit={onSubmit}>
            {authError && <StyledError>{authError.message}</StyledError>}
                <div className='input-block'>
                    <label htmlFor="login">Логин</label>
                    <StyledInput
                        error={errors.login}
                        type="text" { ...register("login", {
                            required: "Обязательное поле",
                            pattern: {
                                value: /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i,
                                message: "Ввведите email в формате test.user@example.com"
                            }
                        }) 
                        } >
                    </StyledInput>
                </div>
                <p>{ errors.login?.message }</p>
                <div className='input-block'>
                    <label htmlFor="Password">Пароль</label>
                    <StyledInput error={errors.password} type="password" {...register("password", { required: "Обязательное поле"})}></StyledInput>
                </div>
                <p>{ errors.password?.message }</p>
                <div className='checkbox-block'>
                    <Checkbox/>
                    <label htmlFor="">Запомнить пароль</label>
                </div>
                <button disabled={isSubmitting} type="submit">
                    Войти
                </button>
            </StyledForm>
        </>
    );
}

const StyledForm = styled.form`
    @font-face {
        font-family: 'Helvetica Neue';
        font-style: normal;
        src: url('../fonts/DigitalNumbers-Regular.woff') format('otf'),
    };
    display: flex;
    flex-direction: column;
    width 35.5%;
    & > p {
        font-family: 'Helvetica Neue';
        font-style: normal;
        font-weight: 400;
        font-size: 14px;
        line-height: 17px;
        color: #E26F6F;
    }
    & .input-block {
        display: flex;
        flex-direction: column;
        & > label {
            font-family: 'Helvetica Neue';
            font-weight: 400;
            font-size: 16px;
            line-height: 19px;
            color: #1F1F1F;
            margin-bottom: 10px;
        }
    }
    & .checkbox-block {
        display: flex;
        justify-content: flex-start;
        align-items: center;
        margin-bottom: 20px;
        & > label {
            font-family: 'Helvetica Neue';
            font-style: normal;
            font-weight: 400;
            font-size: 16px;
            line-height: 19px;
            color: #1F1F1F;
        }
    }
    & > button {
        background: #4A67FF;
        border-radius: 8px;
        border: none;
        font-family: 'Helvetica Neue';
        font-style: normal;
        font-weight: 700;
        font-size: 18px;
        line-height: 22px;
        color: #FFFFFF;
        padding: 19px 0px;
        width: 100%;
        &:disabled {
            background: #99A9FF;
        }
    }

`

const StyledInput = styled.input`
    background: #F5F5F5;
    border-radius: 8px;
    border: ${props => props.error ? '1px solid #E26F6F' : 'none'};
    padding: 20px;
    caret-color: ${props => props.error ? '#E26F6F' : '#1F1F1F'};
    &:focus {
        outline: none};
    }
`
const StyledImg = styled.img`
    top: 0;
    margin-top: 40px;
    position: fixed;
`

const StyledError = styled.div`
    font-family: 'Helvetica Neue';
    background-image: url(${errorIcon});
    background-repeat: no-repeat;
    background-position: 20px;
    font-style: normal;
    font-weight: 400;
    font-size: 14px;
    line-height: 17px;
    color: #000000;
    background-color: #F5E9E9;
    border: 1px solid #E26F6F;
    border-radius: 8px;
    padding: 22px 0px 20px 54px;
    margin-bottom: 27px;
    display: flex;
    align-items: center;
`

const CustomInput = (props) => {
    return <StyledInput {...props}/>
}


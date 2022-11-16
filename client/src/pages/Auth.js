import React, { useContext, useState } from 'react';
import { Button, Container, Form, Row } from 'react-bootstrap';
import { Card } from 'react-bootstrap';
import { NavLink, useLocation } from 'react-router-dom';
import { login, registration } from '../http/userApi';
import { LOGIN_ROUTE, REGISTRATION_ROUTE } from '../utils/consts';
import { observer } from 'mobx-react-lite';
import { Context } from '../index';

const Auth = observer(() => {
    const {user} = useContext(Context)
    const location = useLocation()
    const isLogin = location.pathname === LOGIN_ROUTE
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const click = async () => {
        let data;
        if(isLogin) {
            data = await login(email, password)
        } else {
            data = await registration(email, password)
        }

        user.setUser(user)
        user.setIsAuth(true)
    }

    return (
        <Container
            className='d-flex justify-content-center align-items-center'
            style={{height: window.innerHeight - 54}}
            >
                <Card style={{width: 600}} className="p-5" >
                    <h2 className='m-auto'>{isLogin ? "Авторизация" : "Регистрация"}</h2>
                <Form className='d-flex flex-column'>
                    <Form.Control
                        className='mt-5'
                        placeholder='Введите ваш email...'
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                    />

                    <Form.Control
                        className='mt-2'
                        placeholder='Введите ваш пароль...'
                        type='password'
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                    />

                    <Button
                        className='mt-2'
                        variant={"outline-success"}
                        onClick={click}
                    >
                        {isLogin ? "Войти" : "Зарегистрироватся" }
                    </Button>
                    {isLogin ? 
                        <div>
                            Нет аккаунта? <NavLink to={REGISTRATION_ROUTE}>Зарегистрируйся!</NavLink>                        
                        </div>
                        :
                        <div>
                            Есть аккаунт? <NavLink to={LOGIN_ROUTE}>Войди!</NavLink>                        
                        </div>
                    }
                </Form>
                </Card>

        </Container>
    );
});

export default Auth;
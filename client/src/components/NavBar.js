import React, { useContext } from 'react';
import { Context } from '../index';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { ADMIN_ROUTE, LOGIN_ROUTE, SHOP_ROUTE } from '../utils/consts';
import {Button} from "react-bootstrap"
import { observer } from 'mobx-react-lite';
import { useNavigate } from 'react-router-dom';


const NavBar = observer(() => {
    const { user } = useContext(Context)
    const naviate = useNavigate()
    return (
        <Navbar bg="dark" variant="dark">
        <Container>
          <Navbar.Brand href={SHOP_ROUTE}>DEVICE SHOP</Navbar.Brand>
          {user.isAuth 
            ?
            <Nav className="ml-auto">
                <Button 
                  variant={"outline-light"} 
                  onClick={() => naviate(ADMIN_ROUTE)}
                >
                  Админ Панель
                </Button>
                <Button 
                  variant={"outline-light"} 
                  onClick={() => naviate(LOGIN_ROUTE)} 
                  style={{marginLeft: 5}}
                >
                  Выйти</Button>
            </Nav>
            :
            <Nav className="ml-auto">
                <Button variant={"outline-light"} onClick={() => user.setIsAuth(true)}>Авторизация</Button>
            </Nav>
            }
        </Container>
      </Navbar>
    );
});

export default NavBar;
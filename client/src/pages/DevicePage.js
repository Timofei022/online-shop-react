import React from 'react';
import { Button, Card, Col, Container, Image, Row } from 'react-bootstrap';
import bigStar from '../assets/big_star.png'

const DevicePage = () => {
    const device = {id: 7, name: "Iphone 12 pro", price: 25000, rating: 5, img: "https://cdn.tmobile.com/content/dam/t-mobile/en-p/cell-phones/apple/Apple-iPhone-14-Pro/Deep-Purple/Apple-iPhone-14-Pro-Deep-Purple-thumbnail.png"}
    const desctiption = [
        {id:1, title: 'Оперативная память', desctiption: '4ГБ'},
        {id:2, title: 'Камера', desctiption: '12МП'},
        {id:3, title: 'Процессор', desctiption: 'Bionic15'},
        {id:4, title: 'Кол-во ядер', desctiption: '8'},
        {id:5, title: 'Аккумулятор', desctiption: '4000Ma/h'},
        {id:6, title: 'Диагональ дисплея', desctiption: '5.5'},
        {id:7, title: 'Компплектация', desctiption: 'Телефон, USB-кабель'},
    ]
    return (
        <Container>
            <Row>
                <Col md={4} className='mt-3'>
                    <Image height={300} src={device.img} />
                </Col>
                <Col md={4} className='mt-3'>
                    <Row className='d-flex flex-column align-items-center'>
                        <h2>{device.name}</h2>
                    </Row>
                    <div
                        className='d-flex justify-content-center align-items-center'
                        style={{background: `url(${bigStar}) no-repeat center center`, width: 240, height: 240, backgroundSize: 'cover', fontSize: 64}} 
                    >
                        {device.rating}
                    </div>
                </Col>
                <Col md={4} className='mt-3'>
                    <Card
                        className='d-flex flex-column align-items-center justify-content-around'
                        style={{width: 300, height: 300, fontSize: 32, border: '5px solid lightgray'}}
                    >
                        <h3>{device.price}</h3>
                        <Button variant='outline-dark'>Добавить в корзину</Button>
                    </Card>
                
                </Col>
            </Row>
            <Row className='d-flex flex-column m-3'>
                <h2>Характеристики</h2>
                {desctiption.map((info, index) => 
                    <Row key={info.id} style={{background: index % 2 ? 'white' : 'lightgray'}}>
                        {info.title}: {info.desctiption} 
                    </Row>
                )}
            </Row>
        </Container>
    );
};

export default DevicePage;
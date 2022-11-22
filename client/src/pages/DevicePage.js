import React, { useEffect, useState } from 'react';
import { Button, Card, Col, Container, Image, Row } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import bigStar from '../assets/big_star.png'
import { fetchOneDevice } from '../http/deviceApi';

const DevicePage = () => {
    const {device, setDevice} = useState( { info: [] } )
    const {id} = useParams()
    useEffect(() => {
        fetchOneDevice(id).then(data => setDevice(data))
    }, [])
    return (
        <Container>
            <Row>
                <Col md={4} className='mt-3'>
                    <Image height={300} src={process.env.APP_API_URL + device.img} />
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
                {device.info.map((info, index) => 
                    <Row key={info.id} style={{background: index % 2 ? 'white' : 'lightgray'}}>
                        {info.title}: {info.description} 
                    </Row>
                )}
            </Row>
        </Container>
    );
};

export default DevicePage;
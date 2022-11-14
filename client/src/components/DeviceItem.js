import React from 'react';
import { Card, Col, Image } from 'react-bootstrap';
import star from '../assets/star.png'
import {useNavigate} from 'react-router-dom'
import { DEVICE_ROUTE } from '../utils/consts';

const DeviceItem = ({device}) => {
    const navigate = useNavigate()
    console.log(navigate);
    return (
        <Col className='mt-3' md={3} onClick={() => navigate(DEVICE_ROUTE + '/' + device.id, )}>
            <Card style={{width: 150, cursor: 'pointer', padding: '5px'}} border={'ligth'}>
                <Image height={150} src={device.img}/>
                <div className='text-black-50 mt-3 d-flex justify-content-between align-items-center'>
                    <div>Samsung..</div>
                    <div className='d-flex align-items-center'>
                        <div>{device.rating}</div>
                        <Image src={star}/>
                    </div>
                </div>
                <div>{device.name}</div>
            </Card>
        </Col>
    );
};

export default DeviceItem;
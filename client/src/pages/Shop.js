import { observer } from 'mobx-react-lite';
import React, { useContext, useEffect } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import { Context } from '../index';
import BrandBar from '../components/BrandBar';
import DeviceList from '../components/DeviceList';
import TypeBar from '../components/TypeBar';
import { fetchBrands, fetchDevices, fetchTypes } from '../http/deviceApi';

const Shop = observer( () => {
    const {device} = useContext(Context)

    useEffect( () => {
        fetchTypes().then(data => device.setTypes(data))
        fetchBrands().then(data => device.setBrands(data))
        fetchDevices().then(data => device.setDevices(data))
    }, [])

    return (
        <Container>
            <Row>
                <Col className='mt-2' md={3}>
                    <TypeBar/>
                </Col>

                <Col className='mt-2' md={9}>
                    <BrandBar/>
                    <DeviceList/>
                </Col>

            </Row>
        </Container>
    );
});

export default Shop;
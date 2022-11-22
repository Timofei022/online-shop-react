import { observer } from 'mobx-react-lite';
import React, { useContext } from 'react';
import { Card, Row } from 'react-bootstrap';
import { Context } from '../index';

const BrandBar = observer( () => {
    const {device} = useContext(Context)
    return (
        <Row className="d-flex">
            { device.brands.map( brand =>
                <Card 
                    style={{cursor: 'pointer', width: 100, textAlign: 'center'}}
                    key={brand.id}
                    className='p-3'
                    border={brand.id === device.selectedBrand.id ? 'primary' : 'light'}
                    onClick={() => device.setSelectedBrand(brand)}
                >
                    {brand.name}
                </Card>    
            )}
        </Row>
    );
});

export default BrandBar;
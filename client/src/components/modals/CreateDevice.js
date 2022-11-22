import { observer } from 'mobx-react-lite';
import React, { useContext, useEffect, useState } from 'react';
import { Button, Dropdown, Form, FormControl, Modal, Row, Col } from 'react-bootstrap';
import { createDevice, fetchBrands, fetchDevices, fetchTypes } from '../../http/deviceApi';
import { Context } from '../../index';

const CreateDevice = observer(({show, onHide}) => {
    const {device} = useContext(Context)
    const [name, setName] = useState('')
    const [price, setPrice] = useState(0)
    const [file, setFile] = useState(null)
    const [info, setInfo] = useState([])

    useEffect(() => {
        fetchTypes().then(data => device.setTypes(data))
        fetchBrands().then(data => device.setBrands(data))
    }, [])

    const addInfo = () => {
        setInfo([...info, {title: '', description: '', number: Date.now()}])
    }
    const removeInfo = (number) => {
        setInfo(info.filter(i => i.number !== number))
    }

    const changeInfo = (key, value, number) => {
        setInfo(info.map( i => i.number === number ? {...i, [key]: value} : i))
    }

    const selectFile = (e) => {
        setFile(e.target.files[0])
    }

    const addDevice = () => {
        const formData = new FormData()
        formData.append('name', name)
        formData.append('price', `${price}`)
        formData.append('img', file)
        formData.append('brandId', device.selectedBrand.id)
        formData.append('typeId', device.selectedType.id)
        formData.append('info', JSON.stringify(info))
        createDevice(formData).then( data => onHide() )
    }

    return (
        <Modal
            show={show}
            onHide={onHide}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
         >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                Добавить тип
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Dropdown className='mt-3 bt-2'>
                        <Dropdown.Toggle>{device.selectedType.name || "Выберите тип"}</Dropdown.Toggle>
                        <Dropdown.Menu>
                            {device.types.map( type => 
                                <Dropdown.Item 
                                    key={type.id}
                                    onClick={() => device.setSelectedType()}
                                >
                                    {type.name}
                                </Dropdown.Item>    
                            )}
                        </Dropdown.Menu>
                    </Dropdown>
                    <Dropdown className='mt-3 bt-2'>
                        <Dropdown.Toggle>{device.selectedBrand.name || "Выберите бренд"}</Dropdown.Toggle>
                        <Dropdown.Menu>
                            {device.brands.map( brand => 
                                <Dropdown.Item 
                                    key={brand.id}
                                    onClick={() => device.setSelectedBrand()}
                                >{
                                    brand.name}
                                </Dropdown.Item>    
                            )}
                        </Dropdown.Menu>
                    </Dropdown>
                    <Form.Control
                        className='mt-3'
                        placeholder='Введите название устройства'
                        value={name}
                        onChange={ e => setName(e.target.value)}
                    />
                    <Form.Control
                        className='mt-3'
                        placeholder='Введите стоимость устройства'
                        value={price}
                        onChange={ e => setPrice(Number(e.target.value))}
                        type='number'
                    />
                    <Form.Control
                        className='mt-3'
                        type='file'
                        onChange={selectFile}
                    />
                    <hr/>
                    <Button
                        variant='outline'
                        onClick={addInfo}
                    >
                        Добавить новое свойство
                    </Button>
                    {info.map( i => 
                        <Row className='mt-4' key={i.number}>
                            <Col md={4}>
                                <FormControl
                                    value={i.title}
                                    onChange={(e) => changeInfo('title', e.target.value, i.number)}
                                    placeholder='Введите название характеристики'
                                />
                                <FormControl
                                    value={i.description}
                                    onChange={(e) => changeInfo('description', e.target.value, i.number)}
                                    placeholder='Введите описание характеристики'
                                />
                                <Button 
                                    variant={"outline-danger"}
                                    onClick={() => removeInfo(i.number)}
                                >
                                    Удалить
                                </Button>
                            </Col>
                        </Row>    
                    )}
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant='outline-danger' onClick={onHide}>Закрыть</Button>
                <Button variant='outline-success' onClick={addDevice}>Добавить</Button>
            </Modal.Footer>
        </Modal>
    );
});

export default CreateDevice;
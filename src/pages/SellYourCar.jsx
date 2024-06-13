import './SellYourCar.css'
import { Button, Form, Container, Row, Col } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import React, { useState, useEffect } from 'react';
import FormGroup from '../components/FormGroup/FormGroup';

const SellYourCar = () => {

    const [years, setYears] = useState([]);

    useEffect(() => {
        const currentYear = new Date().getFullYear();
        const newYears = [];
        for (let year = currentYear; year >= 1900; year--) {
            newYears.push(year);
        }
        setYears(newYears);
    }, []);

    return (
        <Container className='form-container'>
            <h1 className='display-5'>Sell Your Car</h1>
            <Form>
                <Row>
                    <Col>
                        <FormGroup
                            type='text'
                            id='formBrand'
                            label='Brand'
                            placeholder='Toyota, Ford...'
                            required={true}
                        />
                    </Col>
                    <Col>
                        <FormGroup
                            type='text'
                            id='formModel'
                            label='Model'
                            placeholder='Corolla, Mustang...'
                            required={true}
                        />
                    </Col>
                    <Col>
                        <FormGroup
                            type='text'
                            id='formLicense'
                            label='License PLate Number'
                            placeholder='39-1931...'
                            required={true}
                        />
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <FormGroup
                            type='select'
                            id='formYear'
                            label='Year of Manufacture'
                            required={true}
                            items={years}
                        />
                    </Col>
                    <Col>
                        <FormGroup
                            type='number'
                            id='formMileage'
                            label='Mileage (in Kilometers)'
                            placeholder='Enter Mileage in Kilometers'
                            required={true}
                        />
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <FormGroup
                            type='select'
                            id='formTransmission'
                            label='Transmission Type'
                            required={true}
                            items={['Manual', 'Automatic']}
                        />
                    </Col>
                    <Col>
                        <FormGroup
                            type='select'
                            id='formCondition'
                            label='Condition'
                            required={true}
                            items={['Used', 'New']}
                        />
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <FormGroup
                            type='radio'
                            label='Fuel Type'
                            required={true}
                            items={['Petrol', 'Diesel', 'Electric', 'Hybrid']}
                        />
                    </Col>
                </Row>
            </Form>
        </Container>
    );
}
export default SellYourCar;
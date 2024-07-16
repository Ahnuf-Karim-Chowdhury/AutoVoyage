import './SellYourCar.css'
import { Button, Form, Container, Row, Col, Image } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import React, { useState, useEffect } from 'react';
import FormGroup from '../../components/FormGroup/FormGroup'
import axios from 'axios';
import { useNavigate } from "react-router-dom";

const url = "http://localhost:6969/cars/sell";

const SellYourCar = () => {
    const navigate = useNavigate();
    const currentYear = new Date().getFullYear();
    const condition = ['Used', 'New'];
    const transmission = ['Manual', 'Automatic'];
    const fuelType = ['Petrol', 'Diesel', 'Electric', 'Hybrid'];
    const [years, setYears] = useState([]); // only used to show years in the select menu, not meant to be stored in the database!

    const [data, setData] = useState({
        carBrand: '',
        carModel: '',
        carLicense: '',
        carYear: String(currentYear),
        carMileage: '',
        carTransmission: transmission[0],
        carCondition: condition[0],
        carExteriorColour: '',
        carInteriorColour: '',
        carFuelType: fuelType[0],
        carPrice: '',
        carSellerNotes: '',
        coverImg: null,
        carImgs: [],
        docs: []
    });

    useEffect(() => {
        const newYears = [];
        for (let year = currentYear; year >= 1900; year--) {
            newYears.push(year);
        }
        setYears(newYears);
    }, []);

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(data);

        axios.post(url, data)
        .then(res => {
            console.log(res);
            navigate('/');
        })
        .catch(e => console.log(e));
    }

    return (
        <div className="container-body">
            <Container fluid className='form-container'>
                <h1 className='display-5 text-center'>Sell Your Car</h1>
                <hr></hr>
                <Form className='sell-form' onSubmit={handleSubmit}>
                    <h3 className='mb-3'>Car Images</h3>
                    <Row>
                        <Col>
                            {data.coverImg ? <Image src={URL.createObjectURL(data.coverImg)} className='mx-auto d-block' width={400} height='auto' alt='cover image for the car' fluid />
                                : <Image src="https://cdn4.iconfinder.com/data/icons/images-image-files-2/24/photo_photography_image_picture_upload-512.png" className='mx-auto d-block' width={200} height='auto' alt='cover image for the car' fluid />}
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <Form.Group controlId="formCoverImg" className="mb-3">
                                <Form.Label>Upload Cover Image</Form.Label>
                                <Form.Control type="file" size="sm" accept="image/*" onChange={(e) => setData({ ...data, coverImg: e.target.files[0] })} />
                                <Form.Text muted>
                                    Upload a cover image of your car. This will be seen by the users when they browse the website.
                                </Form.Text>
                            </Form.Group>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <Form.Group controlId="formCarImgs" className="mb-3">
                                <Form.Label>Upload Additional Car Images</Form.Label>
                                <Form.Control type="file" size="sm" accept="image/*" multiple onChange={(e) => setData({ ...data, carImgs: e.target.files })} />
                                <Form.Text muted>
                                    Upload multiple photos of your car from different angles, including the interior and exterior.
                                </Form.Text>
                            </Form.Group>
                        </Col>
                    </Row>
                    <h3 className='mb-3 mt-3'>Car Details</h3>
                    <Row>
                        <Col xs={12} sm={6} lg={4}>
                            <FormGroup
                                type='text'
                                id='carBrand'
                                label='Brand'
                                placeholder='Toyota, Ford...'
                                required={true}
                                data={data}
                                setData={setData}
                            />
                        </Col>
                        <Col xs={12} sm={6} lg={4}>
                            <FormGroup
                                type='text'
                                id='carModel'
                                label='Model'
                                placeholder='Corolla, Mustang...'
                                required={true}
                                data={data}
                                setData={setData}
                            />
                        </Col>
                        <Col xs={12} sm={12} lg={4}>
                            <FormGroup
                                type='text'
                                id='carLicense'
                                label='License Plate Number'
                                placeholder='39-1931...'
                                required={true}
                                data={data}
                                setData={setData}
                            />
                        </Col>
                    </Row>
                    <Row>
                        <Col xs={12} sm={6}>
                            <FormGroup
                                type='select'
                                id='carYear'
                                label='Year of Manufacture'
                                required={true}
                                items={years}
                                data={data}
                                setData={setData}
                            />
                        </Col>
                        <Col xs={12} sm={6}>
                            <FormGroup
                                type='number'
                                id='carMileage'
                                label='Mileage (in Kilometers)'
                                placeholder='Enter Mileage in Kilometers'
                                required={true}
                                data={data}
                                setData={setData}
                            />
                        </Col>
                    </Row>
                    <Row>
                        <Col xs={12} sm={6}>
                            <FormGroup
                                type='select'
                                id='carTransmission'
                                label='Transmission Type'
                                required={true}
                                items={transmission}
                                data={data}
                                setData={setData}
                            />
                        </Col>
                        <Col xs={12} sm={6}>
                            <FormGroup
                                type='select'
                                id='carCondition'
                                label='Condition'
                                required={true}
                                items={condition}
                                data={data}
                                setData={setData}
                            />
                        </Col>
                    </Row>
                    <Row>
                        <Col xs={12} sm={6}>
                            <FormGroup
                                type='text'
                                id='carExteriorColour'
                                label='Exterior Colour'
                                placeholder='Arctic Gray Metallic, Black Sapphire...'
                                required={true}
                                data={data}
                                setData={setData}
                            />
                        </Col>
                        <Col xs={12} sm={6}>
                            <FormGroup
                                type='text'
                                id='carInteriorColour'
                                label='Interior Colour'
                                placeholder='Black...'
                                required={true}
                                data={data}
                                setData={setData}
                            />
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <FormGroup
                                type='radio'
                                label='Fuel Type'
                                id='carFuelType'
                                required={true}
                                items={fuelType}
                                data={data}
                                setData={setData}
                            />
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <Form.Group controlId="formDocs" className="mb-3">
                                <Form.Label>Upload Car Documents</Form.Label>
                                <Form.Control type="file" size="sm" accept=".pdf" multiple required onChange={(e) => setData({ ...data, docs: e.target.files })} />
                                <Form.Text muted>
                                    Please upload your car's registration documents, service records, and any other relevant documents for verification. Note that only pdf files are accepted.
                                </Form.Text>
                            </Form.Group>
                        </Col>
                    </Row>
                    <h3 className='mb-3'>Selling Details</h3>
                    <Row>
                        <Col>
                            <FormGroup
                                type='number'
                                id='carPrice'
                                label='Selling Price (in USD)'
                                placeholder='Enter your selling price in US Dollars'
                                required={true}
                                data={data}
                                setData={setData}
                            />
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <FormGroup
                                type='textarea'
                                id='carSellerNotes'
                                label='Seller Notes'
                                placeholder='This car...'
                                rows={5}
                                max={600}
                                text='Write something about your car that buyers can see, such as why you are selling this car, additional features in the car, etc.
                            This is optional.'
                                required={false}
                                data={data}
                                setData={setData}
                            />
                        </Col>
                    </Row>
                    <div className="mt-3 d-grid gap-2">
                        <Button size='lg' type="submit">
                            Submit
                        </Button>
                    </div>

                </Form>
            </Container>
        </div>
    );
}
export default SellYourCar;
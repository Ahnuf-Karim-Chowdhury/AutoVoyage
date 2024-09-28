import React, { useState, useEffect } from 'react';
import "./styles.css";
import "../Navbar.css"
import Filter from '../01HomePage_01-Filter/Filter';
import axios from "axios";

const HomePage = () => {
    // Search Suggestions
    const [searchTerm, setSearchTerm] = useState('');
    const [cars, setCars] = useState([]);

    const filteredCars = cars.filter(car =>
        car.carBrand.toLowerCase().includes(searchTerm.toLowerCase())
    );

    // Slider
    const images = ['image1.jpg', 'image2.jpg', 'image3.jpg', 'image4.jpg'];
    const slideInterval = 3000;
    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
        axios.get("http://localhost:6969/cars/get")
            .then((response) => {
                console.log(response.data)
                setCars(response.data);
            })
            .catch((error) => {
                console.error("Error fetching cars data:", error);
            });
    }, []);

    useEffect(() => {
        const autoSlide = setInterval(() => {
            nextSlide();
        }, slideInterval);

        return () => {
            clearInterval(autoSlide);
        };
    }, [currentIndex]);

    const nextSlide = () => {
        setCurrentIndex(prevIndex => (prevIndex + 1) % images.length);
    };

    return (
        <div className="homePageBody">
            <main>
                {/* Hero Image / Slider */}
                <div className="hero-image">
                    <div className="slider">
                        <div className="slides">
                            {images.map((image, index) => (
                                <img
                                    key={index}
                                    src={image}
                                    alt={`Image ${index + 1}`}
                                    style={{
                                        transform: `translateX(-${currentIndex * 100}%)`,
                                        transition: 'transform 0.5s ease'
                                    }}
                                    onClick={() => setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length)}
                                />
                            ))}

                        </div>
                    </div>
                </div>

                <Filter />

                {/* Car Cards */}
                <section className="car-cards">
                    {cars.length > 0 ? (
                        cars.map((car) => (
                            <div className="Card" key={car._id}>
                                <img src={car.coverImg} alt={`${car.carBrand} ${car.carModel}`} />
                                <div className="card-details">
                                    <h1 style={{ fontSize: "35px" }}>{car.carBrand} {car.carModel}</h1>
                                    <p>Year: {car.carYear}</p>
                                    <p>Price: {car.carPrice} BDT</p>
                                    <p>Condition: {car.carCondition}</p>
                                    <p>Contact: {car.seller.telephone}</p>
                                    {/* {car.carSellerNotes && <p>Notes: {car.carSellerNotes}</p>} */}
                                </div>
                            </div>
                        ))
                    ) : (
                        <h1 style={{ textAlign: "center" }}>No cars available at the moment.</h1>
                    )}

                </section>
            </main>

            <footer>
                <div className="footer-content">
                    <br />
                    <p>Contact us: +880 1913704843 | info@autovoyage.com</p>
                    <br />
                    <p>About us: We are the leading car dealership with a wide range of cars to suit your needs.</p>
                    <br />
                    <p>Slogan: Drive Your Dream</p>
                    <br />
                </div>
            </footer>
        </div>
    );
};

export default HomePage;

import React, { useState, useEffect } from 'react';
import "./styles.css"; // Import your styles.css file

const HomePage = () => {
    // Search Suggestions
    const [searchTerm, setSearchTerm] = useState('');
    const cars = [
        "Car Model 1",
        "Car Model 2",
        // ... other car models
        "Car Model 9"
    ];

    const filteredCars = cars.filter(car =>
        car.toLowerCase().includes(searchTerm.toLowerCase())
    );

    // Slider
    const images = ['image1.jpg', 'image2.jpg', 'image3.jpg', 'image4.jpg'];
    const slideInterval = 3000;
    const [currentIndex, setCurrentIndex] = useState(0);

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
        <div className="body">
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


                {/* Car Cards */}
                <section className="car-cards">
                    <div className="Card">
                        <img src="car01.jpg" alt="Car 1" />
                        <div className="card-details">
                            <h3>Car Model 1</h3>
                            <p>Details about car 1</p>
                        </div>
                    </div>
                    <div className="Card">
                        <img src="car02.jpg" alt="Car 2" />
                        <div className="card-details">
                            <h3>Car Model 2</h3>
                            <p>Details about car 2</p>
                        </div>
                    </div>
                    {/* Repeat this block for each car card */}
                    <div className="Card">
                        <img src="car03.jpg" alt="Car 3" />
                        <div className="card-details">
                            <h3>Car Model 3</h3>
                            <p>Details about car 3</p>
                        </div>
                    </div>
                    <div className="Card">
                        <img src="car04.jpg" alt="Car 4" />
                        <div className="card-details">
                            <h3>Car Model 4</h3>
                            <p>Details about car 4</p>
                        </div>
                    </div>
                    <div className="Card">
                        <img src="car05.jpg" alt="Car 5" />
                        <div className="card-details">
                            <h3>Car Model 5</h3>
                            <p>Details about car 5</p>
                        </div>
                    </div>
                    <div className="Card">
                        <img src="car06.jpg" alt="Car 6" />
                        <div className="card-details">
                            <h3>Car Model 6</h3>
                            <p>Details about car 6</p>
                        </div>
                    </div>
                    <div className="Card">
                        <img src="car07.jpg" alt="Car 7" />
                        <div className="card-details">
                            <h3>Car Model 7</h3>
                            <p>Details about car 7</p>
                        </div>
                    </div>
                    <div className="Card">
                        <img src="car08.jpg" alt="Car 8" />
                        <div className="card-details">
                            <h3>Car Model 8</h3>
                            <p>Details about car 8</p>
                        </div>
                    </div>
                    <div className="Card">
                        <img src="car09.jpg" alt="Car 9" />
                        <div className="card-details">
                            <h3>Car Model 9</h3>
                            <p>Details about car 9</p>
                        </div>
                    </div>

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

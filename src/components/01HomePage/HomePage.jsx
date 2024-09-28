import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./styles.css";
import "../Navbar.css";
import Filter from "../01HomePage_01-Filter/Filter";
import axios from "axios";

const HomePage = () => {
  const [searchInput, setSearchInput] = useState(""); // Store the search input
  const [cars, setCars] = useState([]); // Store all car data
  const [searchResults, setSearchResults] = useState([]); // Store search results based on query
  const [searchTerm, setSearchTerm] = useState(""); // Filter term for cars
  const [currentIndex, setCurrentIndex] = useState(0); // Slider index

  // Slider images
  const images = ["image1.jpg", "image2.jpg", "image3.jpg", "image4.jpg"];
  const slideInterval = 3000;

  // Fetch all cars when the component mounts
  useEffect(() => {
    axios
      .get("http://localhost:6969/cars/get")
      .then((response) => {
        console.log(response.data);
        setCars(response.data);
      })
      .catch((error) => {
        console.error("Error fetching cars data:", error);
      });
  }, []);

  // Search handler to filter cars
  const handleSearch = async () => {
    if (searchInput.trim() === "") return; // Prevent search if input is empty

    try {
      const response = await axios.get(
        `http://localhost:6969/cars/search?query=${searchInput}`
      );
      console.log("Search results:", response.data);
      setSearchResults(response.data.found ? response.data.cars : []); // Set search results
    } catch (error) {
      console.error("Error searching for cars:", error);
    }
  };

  // Handle Enter key for search input
  const handleSearchKeyPress = (event) => {
    if (event.key === "Enter") {
      handleSearch();
    }
  };

  // Slider auto-play effect
  useEffect(() => {
    const autoSlide = setInterval(() => {
      nextSlide();
    }, slideInterval);

    return () => {
      clearInterval(autoSlide);
    };
  }, [currentIndex]);

  // Move to the next slide
  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
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
                    transition: "transform 0.5s ease",
                  }}
                  onClick={() =>
                    setCurrentIndex(
                      (prevIndex) => (prevIndex + 1) % images.length
                    )
                  }
                />
              ))}
            </div>
          </div>
        </div>

        <Filter />

        {/* Search bar */}
        <div className="search-box">
          <input
            type="text"
            id="search-input"
            placeholder="Search cars"
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
            onKeyPress={handleSearchKeyPress}
          />
          <i className="fas fa-search" onClick={handleSearch}></i>
        </div>

        {/* Car Listings */}
        <section className="car-cards">
          {/* Render search results if there are any, otherwise show all cars */}
          {searchResults && searchResults.length > 0 ? (
            searchResults.map((car) => (
              <Link
                to={`/car/${car._id}`}
                key={car._id}
                style={{ textDecoration: "none" }}
              >
                <div className="Card" key={car._id}>
                  <img
                    src={car.coverImg}
                    alt={`${car.carBrand} ${car.carModel}`}
                  />
                  <div className="card-details">
                    <h1 style={{ fontSize: "35px" }}>
                      {car.carBrand} {car.carModel}
                    </h1>
                    <p>Year: {car.carYear}</p>
                    <p>Price: {car.carPrice} BDT</p>
                    <p>Condition: {car.carCondition}</p>
                    <p>Contact: {car.seller.telephone}</p>
                  </div>
                </div>
              </Link>
            ))
          ) : (
            <>
              {cars && cars.length > 0 ? (
                cars.map((car) => (
                  <Link
                    to={`/car/${car._id}`}
                    key={car._id}
                    style={{ textDecoration: "none" }}
                  >
                    <div className="Card" key={car._id}>
                      <img
                        src={car.coverImg}
                        alt={`${car.carBrand} ${car.carModel}`}
                      />
                      <div className="card-details">
                        <h1 style={{ fontSize: "35px" }}>
                          {car.carBrand} {car.carModel}
                        </h1>
                        <p>Year: {car.carYear}</p>
                        <p>Price: {car.carPrice} BDT</p>
                        <p>Condition: {car.carCondition}</p>
                        <p>Contact: {car.seller.telephone}</p>
                      </div>
                    </div>
                  </Link>
                ))
              ) : (
                <>
                  <h1 className="h1" style={{ textAlign: "center" }}>
                    No cars available at the moment.
                  </h1>
                  <h2 style={{ color: "red", textAlign: "center" }}>
                    No results found for your search.
                  </h2>
                </>
              )}
            </>
          )}
        </section>
      </main>

      <footer>
        <div className="footer-content">
          <br />
          <p>Contact us: +880 1913704843 | info@autovoyage.com</p>
          <br />
          <p>
            About us: We are the leading car dealership with a wide range of
            cars to suit your needs.
          </p>
          <br />
          <p>Slogan: Drive Your Dream</p>
          <br />
        </div>
      </footer>
    </div>
  );
};

export default HomePage;

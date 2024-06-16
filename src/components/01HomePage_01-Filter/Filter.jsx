import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Filter.css';

const Filter = ({ onApplyFilters }) => {
    const [filters, setFilters] = useState({
        minPrice: 0,
        maxPrice: 1000,
        sortOption: '',
        usedCarType: '',
        newCarType: ''
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFilters(prevFilters => ({
            ...prevFilters,
            [name]: value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Handle the filter logic here using filters object
        // Example: Sorting logic based on sortOption
        let sortedCars = [...cars]; // Replace cars with your actual data source
        if (filters.sortOption === 'low-to-high') {
            sortedCars.sort((a, b) => a.price - b.price);
        } else if (filters.sortOption === 'high-to-low') {
            sortedCars.sort((a, b) => b.price - a.price);
        }

        // Pass sortedCars to parent component or function
        onApplyFilters(sortedCars);
    };

    return (
        <div className="filter-card card">
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label>Price Range</label>
                    <div className="d-flex">
                        <input
                            type="number"
                            className="form-control me-2"
                            name="minPrice"
                            value={filters.minPrice}
                            onChange={handleInputChange}
                            placeholder="Min Price"
                        />
                        <input
                            type="number"
                            className="form-control"
                            name="maxPrice"
                            value={filters.maxPrice}
                            onChange={handleInputChange}
                            placeholder="Max Price"
                        />
                    </div>
                </div>

                <div className="form-group">
                    <label>Sort By</label>
                    <select className="form-control" name="sortOption" value={filters.sortOption} onChange={handleInputChange}>
                        <option value="">Default</option>
                        <option value="low-to-high">Low to High</option>
                        <option value="high-to-low">High to Low</option>
                        <option value="new-cars">New Cars</option>
                        <option value="old-cars">Old Cars</option>
                    </select>
                </div>

                <div className="form-group">
                    <label>Used Cars</label>
                    <select className="form-control" name="usedCarType" value={filters.usedCarType} onChange={handleInputChange}>
                        <option value="">Select Type</option>
                        <option value="ev">EVs</option>
                        <option value="truck">Trucks</option>
                        <option value="suv">SUVs</option>
                        <option value="van">Vans</option>
                    </select>
                </div>

                <div className="form-group">
                    <label>New Cars</label>
                    <select className="form-control" name="newCarType" value={filters.newCarType} onChange={handleInputChange}>
                        <option value="">Select Type</option>
                        <option value="ev">EVs</option>
                        <option value="truck">Trucks</option>
                        <option value="suv">SUVs</option>
                        <option value="van">Vans</option>
                    </select>
                </div>

                <button type="submit" className="btn btn-primary">Apply Filter</button>
            </form>
        </div>
    );
};

export default Filter;

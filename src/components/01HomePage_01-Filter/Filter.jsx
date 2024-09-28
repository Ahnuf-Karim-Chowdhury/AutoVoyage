import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Filter.css';

const Filter = ({ onApplyFilters, cars }) => {
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

        // Apply filters
        let filteredCars = cars.filter(car => {
            const price = car.carPrice;
            const isInPriceRange = price >= filters.minPrice && price <= filters.maxPrice;
            const isUsedCar = filters.usedCarType ? car.carCondition === 'Used' && car.carType === filters.usedCarType : true;
            const isNewCar = filters.newCarType ? car.carCondition === 'New' && car.carType === filters.newCarType : true;
            
            return isInPriceRange && (isUsedCar || isNewCar);
        });

        // Sorting logic based on sortOption
        if (filters.sortOption === 'low-to-high') {
            filteredCars.sort((a, b) => a.carPrice - b.carPrice);
        } else if (filters.sortOption === 'high-to-low') {
            filteredCars.sort((a, b) => b.carPrice - a.carPrice);
        }

        // Pass filtered cars to parent component or function
        onApplyFilters(filteredCars);
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

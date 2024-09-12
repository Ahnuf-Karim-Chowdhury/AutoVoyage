import React from 'react';
import './CarRankings.css';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const CarRankings = () => {
  const carRankings = [
    { rank: 1, model: "Tesla Model S", score: 95, power: 1020 },
    { rank: 2, model: "Audi e-tron", score: 91, power: 600 },
    { rank: 3, model: "Nissan Leaf", score: 88, power: 214 },
    { rank: 4, model: "Chevrolet Bolt EV", score: 85, power: 200 },
    { rank: 5, model: "BMW i4", score: 84, power: 536 },
    { rank: 6, model: "Ford Mustang Mach-E", score: 83, power: 480 },
    { rank: 7, model: "Porsche Taycan", score: 82, power: 750 },
    { rank: 8, model: "Rivian R1T", score: 81, power: 750 },
    { rank: 9, model: "Hyundai Kona Electric", score: 80, power: 201 },
    { rank: 10, model: "Kia Niro EV", score: 79, power: 201 },
    { rank: 11, model: "Volkswagen ID.4", score: 78, power: 302 },
    { rank: 12, model: "Lucid Air", score: 77, power: 1111 },
    { rank: 13, model: "Mercedes EQS", score: 76, power: 516 },
    { rank: 14, model: "Jaguar I-PACE", score: 75, power: 394 },
    { rank: 15, model: "Polestar 2", score: 74, power: 408 },
    { rank: 16, model: "Ford F-150 Lightning", score: 73, power: 563 },
    { rank: 17, model: "Chevrolet Silverado EV", score: 72, power: 664 },
    { rank: 18, model: "Rivian R1S", score: 71, power: 750 },
    { rank: 19, model: "BMW iX", score: 70, power: 516 },
    { rank: 20, model: "Audi Q4 e-tron", score: 69, power: 295 },
    { rank: 21, model: "Hyundai Ioniq 5", score: 68, power: 320 },
    { rank: 22, model: "Kia EV6", score: 67, power: 577 },
    { rank: 23, model: "Nissan Ariya", score: 66, power: 389 },
    { rank: 24, model: "BMW i3", score: 65, power: 170 },
    { rank: 25, model: "Chevrolet Spark EV", score: 64, power: 140 },
    { rank: 26, model: "Fiat 500e", score: 63, power: 147 },
    { rank: 27, model: "Smart EQ ForTwo", score: 62, power: 80 },
    { rank: 28, model: "Mitsubishi i-MiEV", score: 61, power: 66 },
    { rank: 29, model: "Honda Clarity EV", score: 60, power: 161 },
    { rank: 30, model: "Toyota bZ4X", score: 59, power: 201 },
  ];

  const chartData = {
    labels: carRankings.map(car => car.model),
    datasets: [
      {
        label: 'Power (hp)',
        data: carRankings.map(car => car.power),
        backgroundColor: '#1d72b8',
        borderColor: '#155a8a',
        borderWidth: 1,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      tooltip: {
        callbacks: {
          label: (context) => `Power: ${context.raw} hp`,
        },
      },
    },
    scales: {
      x: {
        ticks: {
          autoSkip: false,
          maxRotation: 90,
          minRotation: 45,
        },
      },
    },
  };

  return (
    <div className="car-rankings">
      <div className="rankings-table">
        <h2>Top Electric Vehicles</h2>
        <table>
          <thead>
            <tr>
              <th>Rank</th>
              <th>Model</th>
              <th>Score</th>
            </tr>
          </thead>
          <tbody>
            {carRankings.map((car) => (
              <tr key={car.rank}>
                <td>{car.rank}</td>
                <td>{car.model}</td>
                <td>{car.score}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="chart-container">
        <Bar data={chartData} options={chartOptions} />
      </div>
    </div>
  );
};

export default CarRankings;

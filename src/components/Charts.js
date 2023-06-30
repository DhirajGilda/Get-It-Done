import { Bar } from "react-chartjs-2";
import { useNavigate } from "react-router-dom";
import Button from '@mui/material/Button'
import React, { useState } from "react";
import Chart from 'chart.js/auto';

const Charts = ({ goals }) => {
  const Navigate = useNavigate();
  const labels = goals.map((goal) => goal.name);

  const [barColors, setBarColors] = useState(
    goals.map(() => getRandomColor())
  );

  const data = {
    labels,
    datasets: [
      {
        label: "Time Spent",
        backgroundColor: barColors,
        data: goals.map((goal) =>
          goal.isActive
            ? goal.duration +
              (new Date().getTime() -
                new Date(goal.latestStartTimeStamp).getTime()) /
                1000
            : goal.duration
        ),
      },
    ],
  };

  const options = {
    plugins: {
      legend: { display: false },
      title: { display: true, text: "Time spent per goal" },
      scales: {
        y: {
          grid: {
            display: true,
          },
          ticks: {
            beginAtZero: true,
          },
        },
      },
    },
    animation: {
      duration: 1000, // Animation duration in milliseconds
      easing: "easeInOutQuart", // Easing function for the animation
    },
    hover: {
      animationDuration: 200, // Animation duration when hovering over a bar
    },
  };

  // Function to generate a random color
  function getRandomColor() {
    const letters = "0123456789ABCDEF";
    let color = "#";
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  }

  // Function to handle color selection for a bar
  function handleColorSelection(index, selectedColor) {
    const updatedColors = [...barColors];
    updatedColors[index] = selectedColor;
    setBarColors(updatedColors);
  }

  return (
    <div>
      <Button
        variant="contained"
        color="secondary"
        onClick={() => {
          Navigate("/");
        }}
      >
        Go Back
      </Button>

      <div>
        {barColors.map((color, index) => (
          <div key={index}>
            <input
              type="color"
              value={color}
              onChange={(e) => handleColorSelection(index, e.target.value)}
            />
          </div>
        ))}
      </div>

      <Bar data={data} options={options} />
    </div>
  );
};

export default Charts;




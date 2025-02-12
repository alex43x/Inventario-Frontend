import React from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler,
} from "chart.js";

// Registrar los componentes necesarios de Chart.js
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

const LineChart = ({ salesData }) => {
  // Preparar datos para el gráfico
  const chartData = {
    labels: salesData.map((item) => item.dia_formateado), // Fechas de los últimos 7 días
    datasets: [
      {
        label: "Recaudado",
        data: salesData.map((item) => item.total_dia),
        borderColor: "#1e3a8a", // Azul 900 de Tailwind
        backgroundColor: "rgba(30, 58, 138, 0.4)", // Azul 900 con 20% de opacidad
        fill: true, 
        tension: 0.3, // Suaviza la línea
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: { display: true },
    },
    scales: {
      x: { title: { display: true, text: "Día" } },
    },
  };

  return <Line data={chartData} options={options} />;
};

export default LineChart;

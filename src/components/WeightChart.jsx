import {
    Chart as ChartJS,
    LineElement,
    CategoryScale,
    LinearScale,
    PointElement,
    Title,
    Tooltip,
    Legend
} from 'chart.js';
import {Line} from 'react-chartjs-2';

ChartJS.register(LineElement, CategoryScale, LinearScale, PointElement, Title, Tooltip, Legend);

import Props from 'prop-types';
import {useEffect, useRef} from "react";

WeightChart.propTypes = {
    animalWeights: Props.array.isRequired
}

export default function WeightChart({animalWeights}) {
    const chartRef = useRef(null);

    const data = {
        labels: animalWeights.map((weight) => weight.dateWeight.split("T")[0]),
        datasets: [
            {
                label: 'Peso',
                data: animalWeights.map((weight) => weight.weightAnimal),
                backgroundColor: 'rgba(75, 192, 192, 0.2)',
                borderColor: 'rgba(75, 192, 192, 1)',
                borderWidth: 1
            }
        ]
    };

    const options = {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
            y: {
                beginAtZero: true
            }
        }
    };

    useEffect(() => {
        // Destruir el gráfico cuando el componente se desmonta
        return () => {
            if (chartRef.current) {
                chartRef.current.destroy();
            }
        };
    }, []);

    return <div className="w-full">
        <Line ref={chartRef} data={data} options={options}/>
    </div>;
}
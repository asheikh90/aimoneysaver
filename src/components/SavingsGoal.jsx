import { useState } from 'react';
import { FiTarget, FiDollarSign, FiCalendar, FiTrendingUp } from 'react-icons/fi';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
} from 'chart.js';

// Register Chart.js components
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

const SavingsGoal = () => {
  const [goal, setGoal] = useState(1000);
  const [timeframe, setTimeframe] = useState(6); // months
  const [currentSavings, setCurrentSavings] = useState(250);
  
  // Calculate monthly target
  const monthlyTarget = goal / timeframe;
  const progressPercentage = Math.min((currentSavings / goal) * 100, 100);
  
  // Generate projection data
  const generateProjectionData = () => {
    const labels = [];
    const actualData = [];
    const projectedData = [];
    
    // Past data (3 months)
    const pastMonths = 3;
    const monthlyGrowth = currentSavings / pastMonths;
    
    for (let i = -pastMonths; i <= timeframe; i++) {
      const date = new Date();
      date.setMonth(date.getMonth() + i);
      labels.push(date.toLocaleDateString('en-US', { month: 'short' }));
      
      if (i <= 0) {
        // Past and current savings
        actualData.push(Math.max(0, currentSavings + (i * monthlyGrowth)));
        projectedData.push(null);
      } else {
        // Projected savings
        actualData.push(null);
        projectedData.push(currentSavings + (monthlyTarget * i));
      }
    }
    
    return { labels, actualData, projectedData };
  };
  
  const { labels, actualData, projectedData } = generateProjectionData();
  
  const chartData = {
    labels,
    datasets: [
      {
        label: 'Actual Savings',
        data: actualData,
        borderColor: '#3b82f6',
        backgroundColor: '#3b82f6',
        pointBackgroundColor: '#3b82f6',
        pointBorderColor: '#fff',
        pointRadius: 4,
      },
      {
        label: 'Projected Savings',
        data: projectedData,
        borderColor: '#60a5fa',
        backgroundColor: 'rgba(96, 165, 250, 0.1)',
        borderDash: [5, 5],
        pointBackgroundColor: '#60a5fa',
        pointBorderColor: '#fff',
        pointRadius: 4,
        fill: true,
      }
    ]
  };
  
  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      tooltip: {
        callbacks: {
          label: function(context) {
            return `$${context.raw?.toFixed(2) || 0}`;
          }
        }
      }
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          callback: function(value) {
            return '$' + value;
          }
        }
      }
    },
    interaction: {
      intersect: false,
      mode: 'index',
    }
  };
  
  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-xl font-semibold mb-4 flex items-center">
        <FiTarget className="mr-2 text-primary" />
        Savings Goal Tracker
      </h2>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div className="bg-gray-50 p-4 rounded-lg">
          <div className="flex items-center mb-2">
            <FiDollarSign className="text-primary mr-2" />
            <h3 className="font-medium">Goal Amount</h3>
          </div>
          <div className="flex items-center">
            <input
              type="range"
              min="100"
              max="10000"
              step="100"
              value={goal}
              onChange={(e) => setGoal(Number(e.target.value))}
              className="w-full mr-2"
            />
            <span className="font-semibold">${goal}</span>
          </div>
        </div>
        
        <div className="bg-gray-50 p-4 rounded-lg">
          <div className="flex items-center mb-2">
            <FiCalendar className="text-primary mr-2" />
            <h3 className="font-medium">Timeframe (months)</h3>
          </div>
          <div className="flex items-center">
            <input
              type="range"
              min="1"
              max="24"
              value={timeframe}
              onChange={(e) => setTimeframe(Number(e.target.value))}
              className="w-full mr-2"
            />
            <span className="font-semibold">{timeframe}</span>
          </div>
        </div>
        
        <div className="bg-gray-50 p-4 rounded-lg">
          <div className="flex items-center mb-2">
            <FiTrendingUp className="text-primary mr-2" />
            <h3 className="font-medium">Current Savings</h3>
          </div>
          <div className="flex items-center">
            <input
              type="range"
              min="0"
              max={goal}
              step="10"
              value={currentSavings}
              onChange={(e) => setCurrentSavings(Number(e.target.value))}
              className="w-full mr-2"
            />
            <span className="font-semibold">${currentSavings}</span>
          </div>
        </div>
      </div>
      
      <div className="mb-6">
        <div className="flex justify-between mb-2">
          <span className="text-sm font-medium">Progress: {progressPercentage.toFixed(1)}%</span>
          <span className="text-sm font-medium">${currentSavings} of ${goal}</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2.5">
          <div 
            className="bg-primary h-2.5 rounded-full" 
            style={{ width: `${progressPercentage}%` }}
          ></div>
        </div>
      </div>
      
      <div className="mb-4">
        <h3 className="font-medium mb-2">Monthly Target: <span className="text-primary font-semibold">${monthlyTarget.toFixed(2)}</span></h3>
        <p className="text-sm text-gray-600">
          To reach your goal of ${goal} in {timeframe} months, you need to save ${monthlyTarget.toFixed(2)} per month.
        </p>
      </div>
      
      <div className="h-64">
        <Line data={chartData} options={chartOptions} />
      </div>
    </div>
  );
};

export default SavingsGoal;

import { useState, useEffect } from 'react';
import { FiDollarSign, FiArrowUp, FiArrowDown, FiCalendar } from 'react-icons/fi';
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const Savings = () => {
  const [savingsData, setSavingsData] = useState({
    total: 0,
    monthly: 0,
    categories: [],
    history: []
  });
  
  const [chartData, setChartData] = useState({
    labels: [],
    datasets: []
  });
  
  const [timeframe, setTimeframe] = useState('6months');
  
  useEffect(() => {
    // Mock data
    const mockSavings = {
      total: 1053.25,
      monthly: 210.50,
      categories: [
        { name: 'Electricity', amount: 325.75, color: 'green' },
        { name: 'Internet', amount: 280.00, color: 'blue' },
        { name: 'Phone', amount: 195.50, color: 'purple' },
        { name: 'Streaming', amount: 124.50, color: 'red' },
        { name: 'Insurance', amount: 127.50, color: 'yellow' }
      ],
      history: [
        { month: 'Apr', amount: 95.00 },
        { month: 'May', amount: 130.00 },
        { month: 'Jun', amount: 118.00 },
        { month: 'Jul', amount: 160.00 },
        { month: 'Aug', amount: 145.00 },
        { month: 'Sep', amount: 210.50 }
      ]
    };
    
    setSavingsData(mockSavings);
    
    // Set chart data
    setChartData({
      labels: mockSavings.history.map(item => item.month),
      datasets: [
        {
          label: 'Monthly Savings',
          data: mockSavings.history.map(item => item.amount),
          backgroundColor: '#4F46E5',
          borderRadius: 6
        }
      ]
    });
  }, []);
  
  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        display: false
      },
      tooltip: {
        callbacks: {
          label: function(context) {
            return `$${context.raw.toFixed(2)}`;
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
    }
  };
  
  const handleTimeframeChange = (newTimeframe) => {
    setTimeframe(newTimeframe);
    
    // In a real app, this would fetch new data based on the timeframe
    // For this demo, we'll just simulate different data
    
    let newHistory = [];
    
    if (newTimeframe === '3months') {
      newHistory = [
        { month: 'Jul', amount: 160.00 },
        { month: 'Aug', amount: 145.00 },
        { month: 'Sep', amount: 210.50 }
      ];
    } else if (newTimeframe === '6months') {
      newHistory = [
        { month: 'Apr', amount: 95.00 },
        { month: 'May', amount: 130.00 },
        { month: 'Jun', amount: 118.00 },
        { month: 'Jul', amount: 160.00 },
        { month: 'Aug', amount: 145.00 },
        { month: 'Sep', amount: 210.50 }
      ];
    } else if (newTimeframe === '1year') {
      newHistory = [
        { month: 'Oct', amount: 65.00 },
        { month: 'Nov', amount: 78.00 },
        { month: 'Dec', amount: 52.00 },
        { month: 'Jan', amount: 85.00 },
        { month: 'Feb', amount: 92.00 },
        { month: 'Mar', amount: 105.00 },
        { month: 'Apr', amount: 95.00 },
        { month: 'May', amount: 130.00 },
        { month: 'Jun', amount: 118.00 },
        { month: 'Jul', amount: 160.00 },
        { month: 'Aug', amount: 145.00 },
        { month: 'Sep', amount: 210.50 }
      ];
    }
    
    setSavingsData({
      ...savingsData,
      history: newHistory
    });
    
    setChartData({
      labels: newHistory.map(item => item.month),
      datasets: [
        {
          label: 'Monthly Savings',
          data: newHistory.map(item => item.amount),
          backgroundColor: '#4F46E5',
          borderRadius: 6
        }
      ]
    });
  };
  
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Your Savings</h1>
        <p className="text-gray-500 mt-1">Track and manage all your savings in one place</p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="card bg-gradient-to-r from-primary to-purple-600 text-white">
          <h3 className="text-lg font-medium opacity-90">Total Savings</h3>
          <div className="flex items-end justify-between mt-2">
            <div>
              <p className="text-3xl font-bold">${savingsData.total.toFixed(2)}</p>
              <p className="text-sm opacity-80">Since you joined</p>
            </div>
            <div className="p-3 bg-white/20 rounded-full">
              <FiDollarSign size={24} />
            </div>
          </div>
        </div>
        
        <div className="card">
          <h3 className="text-lg font-medium text-gray-700">Monthly Savings</h3>
          <div className="flex items-end justify-between mt-2">
            <div>
              <p className="text-3xl font-bold text-gray-900">${savingsData.monthly.toFixed(2)}</p>
              <div className="flex items-center mt-1">
                <FiArrowUp className="text-green-500 mr-1" />
                <span className="text-sm text-green-500">44.8% vs last month</span>
              </div>
            </div>
            <div className="p-3 bg-primary/10 rounded-full text-primary">
              <FiCalendar size={24} />
            </div>
          </div>
        </div>
        
        <div className="card lg:col-span-2">
          <h3 className="text-lg font-medium text-gray-700">Savings by Category</h3>
          <div className="mt-4 space-y-4">
            {savingsData.categories.map((category, index) => (
              <div key={index}>
                <div className="flex justify-between mb-1">
                  <span className="text-sm font-medium">{category.name}</span>
                  <span className="text-sm font-medium">${category.amount.toFixed(2)}</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className={`bg-${category.color}-500 h-2 rounded-full`}
                    style={{ 
                      width: `${(category.amount / savingsData.total) * 100}%`,
                      backgroundColor: category.color === 'green' ? '#10B981' : 
                                      category.color === 'blue' ? '#3B82F6' : 
                                      category.color === 'purple' ? '#8B5CF6' : 
                                      category.color === 'red' ? '#EF4444' : 
                                      '#F59E0B'
                    }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      
      <div className="card">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6">
          <h3 className="text-lg font-medium text-gray-700 mb-2 sm:mb-0">Savings History</h3>
          <div className="flex space-x-2">
            <button 
              onClick={() => handleTimeframeChange('3months')}
              className={`px-3 py-1 text-sm rounded-md ${
                timeframe === '3months' 
                  ? 'bg-primary text-white' 
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              3 Months
            </button>
            <button 
              onClick={() => handleTimeframeChange('6months')}
              className={`px-3 py-1 text-sm rounded-md ${
                timeframe === '6months' 
                  ? 'bg-primary text-white' 
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              6 Months
            </button>
            <button 
              onClick={() => handleTimeframeChange('1year')}
              className={`px-3 py-1 text-sm rounded-md ${
                timeframe === '1year' 
                  ? 'bg-primary text-white' 
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              1 Year
            </button>
          </div>
        </div>
        
        <div className="h-80">
          <Bar data={chartData} options={chartOptions} />
        </div>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="card">
          <h3 className="text-lg font-medium text-gray-700 mb-4">Recent Savings</h3>
          <div className="space-y-4">
            {[
              { 
                title: 'Switched to EcoEnergy Green Plan', 
                date: 'Sep 15, 2023', 
                amount: 28.50, 
                recurring: true,
                category: 'Electricity'
              },
              { 
                title: 'Joined FastNet Internet Group Discount', 
                date: 'Sep 5, 2023', 
                amount: 35.00, 
                recurring: true,
                category: 'Internet'
              },
              { 
                title: 'Optimized Streaming Subscriptions', 
                date: 'Aug 28, 2023', 
                amount: 24.99, 
                recurring: true,
                category: 'Streaming'
              },
              { 
                title: 'Insurance Bundle Discount', 
                date: 'Aug 15, 2023', 
                amount: 45.75, 
                recurring: true,
                category: 'Insurance'
              },
              { 
                title: 'Phone Plan Optimization', 
                date: 'Aug 10, 2023', 
                amount: 22.75, 
                recurring: true,
                category: 'Phone'
              }
            ].map((saving, index) => (
              <div key={index} className="flex items-start p-3 bg-gray-50 rounded-lg">
                <div className="p-2 bg-primary/10 rounded-full text-primary">
                  <FiDollarSign size={16} />
                </div>
                <div className="ml-3 flex-1">
                  <div className="flex justify-between">
                    <h4 className="font-medium">{saving.title}</h4>
                    <span className="font-bold text-green-600">+${saving.amount.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between mt-1">
                    <span className="text-xs text-gray-500">{saving.date}</span>
                    <span className="text-xs font-medium text-gray-700">
                      {saving.recurring ? 'Monthly Savings' : 'One-time Savings'}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        
        <div className="card">
          <h3 className="text-lg font-medium text-gray-700 mb-4">Savings Opportunities</h3>
          <div className="space-y-4">
            {[
              { 
                title: 'Switch to Time-of-Use Electricity Plan', 
                provider: 'EcoEnergy Solutions',
                amount: 32.50, 
                confidence: 0.92,
                category: 'Electricity'
              },
              { 
                title: 'Bundle Home & Auto Insurance', 
                provider: 'SecureHome Insurance',
                amount: 58.75, 
                confidence: 0.85,
                category: 'Insurance'
              },
              { 
                title: 'Family Mobile Plan', 
                provider: 'ConnectMobile',
                amount: 45.00, 
                confidence: 0.78,
                category: 'Phone'
              },
              { 
                title: 'Streaming Services Optimization', 
                provider: 'Multiple Providers',
                amount: 18.99, 
                confidence: 0.95,
                category: 'Streaming'
              }
            ].map((opportunity, index) => (
              <div key={index} className="p-4 border border-gray-200 rounded-lg hover:border-primary hover:shadow-sm transition-all">
                <div className="flex justify-between">
                  <h4 className="font-medium">{opportunity.title}</h4>
                  <span className="font-bold text-green-600">+${opportunity.amount.toFixed(2)}/mo</span>
                </div>
                <p className="text-sm text-gray-500 mt-1">{opportunity.provider}</p>
                
                <div className="mt-3 flex items-center">
                  <div className="w-full bg-gray-200 rounded-full h-1.5 mr-2">
                    <div 
                      className="bg-primary h-1.5 rounded-full"
                      style={{ width: `${opportunity.confidence * 100}%` }}
                    ></div>
                  </div>
                  <span className="text-xs text-gray-500 whitespace-nowrap">
                    {Math.round(opportunity.confidence * 100)}% match
                  </span>
                </div>
                
                <button className="w-full mt-3 py-2 text-sm font-medium text-primary border border-primary rounded-lg hover:bg-primary/5 transition-colors">
                  Apply Savings
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Savings;

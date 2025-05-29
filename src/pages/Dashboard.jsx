import { useState, useEffect } from 'react';
import { FiHome, FiTrendingUp, FiDollarSign, FiPieChart, FiCreditCard } from 'react-icons/fi';
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
import SavingsGoal from '../components/SavingsGoal';
import SmartBudgetPlanner from '../components/SmartBudgetPlanner';
import BankAccountLink from '../components/BankAccountLink';

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

const Dashboard = () => {
  const [savingsData, setSavingsData] = useState({
    totalSaved: 1250.75,
    monthlyAverage: 312.68,
    savingsRate: 18.5,
    trend: 'up'
  });
  
  const [recentBills, setRecentBills] = useState([
    {
      id: 1,
      provider: 'Energy Company XYZ',
      type: 'Electricity',
      amount: 142.75,
      dueDate: '2023-10-05',
      status: 'upcoming',
      savingsFound: true
    },
    {
      id: 2,
      provider: 'City Water Services',
      type: 'Water',
      amount: 78.50,
      dueDate: '2023-09-28',
      status: 'upcoming',
      savingsFound: false
    },
    {
      id: 3,
      provider: 'Telco Communications',
      type: 'Internet',
      amount: 89.99,
      dueDate: '2023-09-15',
      status: 'paid',
      savingsFound: true
    },
    {
      id: 4,
      provider: 'Natural Gas Co.',
      type: 'Gas',
      amount: 65.30,
      dueDate: '2023-09-10',
      status: 'paid',
      savingsFound: false
    }
  ]);
  
  const [activeTab, setActiveTab] = useState('overview');
  
  // Generate chart data
  const generateChartData = () => {
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep'];
    
    // Simulated data
    const electricityData = [95, 102, 98, 110, 105, 115, 142, 135, 142];
    const waterData = [65, 68, 70, 72, 75, 73, 78, 80, 78];
    const internetData = [89, 89, 89, 89, 89, 89, 89, 89, 89];
    const gasData = [120, 110, 90, 70, 50, 40, 45, 55, 65];
    
    return {
      labels: months,
      datasets: [
        {
          label: 'Electricity',
          data: electricityData,
          borderColor: '#4f46e5',
          backgroundColor: '#4f46e5',
          tension: 0.3
        },
        {
          label: 'Water',
          data: waterData,
          borderColor: '#0ea5e9',
          backgroundColor: '#0ea5e9',
          tension: 0.3
        },
        {
          label: 'Internet',
          data: internetData,
          borderColor: '#f97316',
          backgroundColor: '#f97316',
          tension: 0.3
        },
        {
          label: 'Gas',
          data: gasData,
          borderColor: '#10b981',
          backgroundColor: '#10b981',
          tension: 0.3
        }
      ]
    };
  };
  
  const chartData = generateChartData();
  
  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      tooltip: {
        callbacks: {
          label: function(context) {
            return `$${context.raw}`;
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
    <div className="container mx-auto px-4 py-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
          <p className="text-gray-600">Welcome back! Here's an overview of your savings and bills.</p>
        </div>
        <div className="mt-4 md:mt-0">
          <div className="inline-flex rounded-md shadow-sm" role="group">
            <button
              type="button"
              className={`px-4 py-2 text-sm font-medium rounded-l-lg ${
                activeTab === 'overview' 
                  ? 'bg-primary text-white' 
                  : 'bg-white text-gray-700 hover:bg-gray-50'
              }`}
              onClick={() => setActiveTab('overview')}
            >
              Overview
            </button>
            <button
              type="button"
              className={`px-4 py-2 text-sm font-medium ${
                activeTab === 'budget' 
                  ? 'bg-primary text-white' 
                  : 'bg-white text-gray-700 hover:bg-gray-50'
              }`}
              onClick={() => setActiveTab('budget')}
            >
              Budget
            </button>
            <button
              type="button"
              className={`px-4 py-2 text-sm font-medium rounded-r-lg ${
                activeTab === 'accounts' 
                  ? 'bg-primary text-white' 
                  : 'bg-white text-gray-700 hover:bg-gray-50'
              }`}
              onClick={() => setActiveTab('accounts')}
            >
              Accounts
            </button>
          </div>
        </div>
      </div>
      
      {activeTab === 'overview' && (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
            <div className="bg-white rounded-lg shadow-md p-6">
              <div className="flex items-center">
                <div className="bg-primary/10 p-2 rounded-full">
                  <FiDollarSign className="h-6 w-6 text-primary" />
                </div>
                <h2 className="text-lg font-semibold ml-3">Total Saved</h2>
              </div>
              <div className="mt-4">
                <span className="text-3xl font-bold">${savingsData.totalSaved.toFixed(2)}</span>
                <div className="flex items-center mt-2">
                  <FiTrendingUp className={`mr-1 ${savingsData.trend === 'up' ? 'text-green-500' : 'text-red-500'}`} />
                  <span className={`text-sm ${savingsData.trend === 'up' ? 'text-green-500' : 'text-red-500'}`}>
                    {savingsData.trend === 'up' ? '+' : '-'}12.3% from last month
                  </span>
                </div>
              </div>
            </div>
            
            <div className="bg-white rounded-lg shadow-md p-6">
              <div className="flex items-center">
                <div className="bg-primary/10 p-2 rounded-full">
                  <FiPieChart className="h-6 w-6 text-primary" />
                </div>
                <h2 className="text-lg font-semibold ml-3">Savings Rate</h2>
              </div>
              <div className="mt-4">
                <span className="text-3xl font-bold">{savingsData.savingsRate}%</span>
                <div className="w-full bg-gray-200 rounded-full h-2.5 mt-2">
                  <div 
                    className="bg-primary h-2.5 rounded-full" 
                    style={{ width: `${savingsData.savingsRate}%` }}
                  ></div>
                </div>
                <p className="text-sm text-gray-500 mt-2">
                  of your income
                </p>
              </div>
            </div>
            
            <div className="bg-white rounded-lg shadow-md p-6">
              <div className="flex items-center">
                <div className="bg-primary/10 p-2 rounded-full">
                  <FiHome className="h-6 w-6 text-primary" />
                </div>
                <h2 className="text-lg font-semibold ml-3">Bills Due</h2>
              </div>
              <div className="mt-4">
                <span className="text-3xl font-bold">
                  {recentBills.filter(bill => bill.status === 'upcoming').length}
                </span>
                <p className="text-sm text-gray-500 mt-2">
                  upcoming bills this month
                </p>
                <div className="mt-2">
                  <span className="text-lg font-semibold">
                    ${recentBills
                      .filter(bill => bill.status === 'upcoming')
                      .reduce((sum, bill) => sum + bill.amount, 0)
                      .toFixed(2)}
                  </span>
                  <span className="text-sm text-gray-500 ml-1">total</span>
                </div>
              </div>
            </div>
            
            <div className="bg-white rounded-lg shadow-md p-6">
              <div className="flex items-center">
                <div className="bg-primary/10 p-2 rounded-full">
                  <FiCreditCard className="h-6 w-6 text-primary" />
                </div>
                <h2 className="text-lg font-semibold ml-3">Monthly Average</h2>
              </div>
              <div className="mt-4">
                <span className="text-3xl font-bold">${savingsData.monthlyAverage.toFixed(2)}</span>
                <p className="text-sm text-gray-500 mt-2">
                  average monthly savings
                </p>
                <div className="mt-2">
                  <span className="text-sm font-medium text-green-500">
                    On track to meet your annual goal
                  </span>
                </div>
              </div>
            </div>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
            <div className="lg:col-span-2 bg-white rounded-lg shadow-md p-6">
              <h2 className="text-xl font-semibold mb-4">Bill History</h2>
              <div className="h-80">
                <Line data={chartData} options={chartOptions} />
              </div>
            </div>
            
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-xl font-semibold mb-4">Recent Bills</h2>
              <div className="space-y-4">
                {recentBills.map(bill => (
                  <div key={bill.id} className="flex items-center justify-between p-3 border rounded-lg">
                    <div>
                      <h3 className="font-medium">{bill.provider}</h3>
                      <div className="flex items-center mt-1">
                        <span className="text-sm text-gray-500 mr-2">{bill.type}</span>
                        {bill.savingsFound && (
                          <span className="bg-green-100 text-green-800 text-xs px-2 py-0.5 rounded-full">
                            Savings Found
                          </span>
                        )}
                      </div>
                    </div>
                    <div className="text-right">
                      <span className="font-semibold">${bill.amount.toFixed(2)}</span>
                      <div className="text-xs mt-1">
                        {bill.status === 'upcoming' ? (
                          <span className="text-orange-500">
                            Due {new Date(bill.dueDate).toLocaleDateString()}
                          </span>
                        ) : (
                          <span className="text-green-500">Paid</span>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <button className="w-full mt-4 py-2 text-sm text-center text-primary hover:text-primary-dark">
                View All Bills
              </button>
            </div>
          </div>
          
          <div className="mb-6">
            <SavingsGoal />
          </div>
        </>
      )}
      
      {activeTab === 'budget' && (
        <div className="mb-6">
          <SmartBudgetPlanner />
        </div>
      )}
      
      {activeTab === 'accounts' && (
        <div className="mb-6">
          <BankAccountLink />
        </div>
      )}
    </div>
  );
};

export default Dashboard;

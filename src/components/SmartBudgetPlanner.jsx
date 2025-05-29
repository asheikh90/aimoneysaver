import { useState, useEffect } from 'react';
import { FiPieChart, FiDollarSign, FiTrendingUp, FiAlertCircle } from 'react-icons/fi';
import { Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';

// Register Chart.js components
ChartJS.register(ArcElement, Tooltip, Legend);

const SmartBudgetPlanner = () => {
  const [income, setIncome] = useState(4000);
  const [expenses, setExpenses] = useState([
    { id: 1, category: 'Housing', amount: 1200, color: '#4f46e5' },
    { id: 2, category: 'Utilities', amount: 300, color: '#8b5cf6' },
    { id: 3, category: 'Food', amount: 500, color: '#ec4899' },
    { id: 4, category: 'Transportation', amount: 200, color: '#f97316' },
    { id: 5, category: 'Insurance', amount: 150, color: '#14b8a6' },
    { id: 6, category: 'Entertainment', amount: 200, color: '#f59e0b' },
    { id: 7, category: 'Other', amount: 300, color: '#6b7280' }
  ]);
  const [newCategory, setNewCategory] = useState('');
  const [newAmount, setNewAmount] = useState('');
  const [aiSuggestions, setAiSuggestions] = useState([]);
  
  // Calculate totals
  const totalExpenses = expenses.reduce((sum, expense) => sum + expense.amount, 0);
  const savings = income - totalExpenses;
  const savingsRate = (savings / income) * 100;
  
  // Prepare chart data
  const chartData = {
    labels: expenses.map(expense => expense.category),
    datasets: [
      {
        data: expenses.map(expense => expense.amount),
        backgroundColor: expenses.map(expense => expense.color),
        borderColor: expenses.map(expense => expense.color),
        borderWidth: 1,
      },
    ],
  };
  
  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'right',
        labels: {
          boxWidth: 15,
          padding: 15,
          font: {
            size: 12
          }
        }
      },
      tooltip: {
        callbacks: {
          label: function(context) {
            const label = context.label || '';
            const value = context.raw || 0;
            const percentage = ((value / totalExpenses) * 100).toFixed(1);
            return `${label}: $${value} (${percentage}%)`;
          }
        }
      }
    },
    cutout: '70%'
  };
  
  // Generate AI suggestions based on current budget
  useEffect(() => {
    // This would normally be an API call to your AI service
    // Here we're simulating AI-generated suggestions
    const generateSuggestions = () => {
      const suggestions = [];
      
      // Housing suggestion
      const housingExpense = expenses.find(e => e.category === 'Housing');
      if (housingExpense && housingExpense.amount > income * 0.3) {
        suggestions.push({
          category: 'Housing',
          message: 'Your housing costs exceed 30% of your income. Consider roommates or a more affordable option to save up to $300/month.',
          potentialSavings: 300,
          priority: 'High'
        });
      }
      
      // Food suggestion
      const foodExpense = expenses.find(e => e.category === 'Food');
      if (foodExpense && foodExpense.amount > 500) {
        suggestions.push({
          category: 'Food',
          message: 'You could save approximately $100/month on food by meal prepping and reducing takeout to once a week.',
          potentialSavings: 100,
          priority: 'Medium'
        });
      }
      
      // Entertainment suggestion
      const entertainmentExpense = expenses.find(e => e.category === 'Entertainment');
      if (entertainmentExpense) {
        suggestions.push({
          category: 'Entertainment',
          message: 'Consider using free community events and sharing streaming subscriptions to save around $50/month.',
          potentialSavings: 50,
          priority: 'Low'
        });
      }
      
      // Savings rate suggestion
      if (savingsRate < 20) {
        suggestions.push({
          category: 'Overall Budget',
          message: 'Your current savings rate is below the recommended 20%. Try the 50/30/20 rule: 50% for needs, 30% for wants, and 20% for savings.',
          potentialSavings: (income * 0.2) - savings,
          priority: 'High'
        });
      }
      
      return suggestions;
    };
    
    setAiSuggestions(generateSuggestions());
  }, [expenses, income, savingsRate]);
  
  const handleAddExpense = (e) => {
    e.preventDefault();
    if (!newCategory || !newAmount) return;
    
    // Generate a random color
    const randomColor = `#${Math.floor(Math.random()*16777215).toString(16)}`;
    
    setExpenses([
      ...expenses,
      {
        id: Date.now(),
        category: newCategory,
        amount: parseFloat(newAmount),
        color: randomColor
      }
    ]);
    
    setNewCategory('');
    setNewAmount('');
  };
  
  const handleRemoveExpense = (id) => {
    setExpenses(expenses.filter(expense => expense.id !== id));
  };
  
  const handleUpdateExpense = (id, amount) => {
    setExpenses(expenses.map(expense => 
      expense.id === id ? { ...expense, amount: parseFloat(amount) } : expense
    ));
  };
  
  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-xl font-semibold mb-6 flex items-center">
        <FiPieChart className="mr-2 text-primary" />
        Smart Budget Planner
      </h2>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            <div className="bg-gray-50 p-4 rounded-lg">
              <div className="flex items-center mb-2">
                <FiDollarSign className="text-primary mr-2" />
                <h3 className="font-medium">Monthly Income</h3>
              </div>
              <div className="flex items-center">
                <span className="text-gray-500 mr-2">$</span>
                <input
                  type="number"
                  value={income}
                  onChange={(e) => setIncome(Math.max(0, parseFloat(e.target.value) || 0))}
                  className="w-full p-2 border border-gray-300 rounded"
                />
              </div>
            </div>
            
            <div className="bg-gray-50 p-4 rounded-lg">
              <div className="flex items-center mb-2">
                <FiTrendingUp className="text-primary mr-2" />
                <h3 className="font-medium">Monthly Savings</h3>
              </div>
              <div className="flex flex-col">
                <div className="flex items-center justify-between">
                  <span className="text-lg font-semibold">${savings.toFixed(2)}</span>
                  <span className={`text-sm font-medium px-2 py-1 rounded ${
                    savingsRate >= 20 ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                  }`}>
                    {savingsRate.toFixed(1)}% of income
                  </span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
                  <div 
                    className={`h-2 rounded-full ${savingsRate >= 20 ? 'bg-green-500' : 'bg-yellow-500'}`}
                    style={{ width: `${Math.min(savingsRate, 100)}%` }}
                  ></div>
                </div>
              </div>
            </div>
          </div>
          
          <div className="mb-6">
            <h3 className="font-medium mb-3">Expense Categories</h3>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Category
                    </th>
                    <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Amount
                    </th>
                    <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      % of Total
                    </th>
                    <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {expenses.map(expense => (
                    <tr key={expense.id}>
                      <td className="px-4 py-2 whitespace-nowrap">
                        <div className="flex items-center">
                          <div 
                            className="w-3 h-3 rounded-full mr-2" 
                            style={{ backgroundColor: expense.color }}
                          ></div>
                          <span className="text-sm font-medium text-gray-900">{expense.category}</span>
                        </div>
                      </td>
                      <td className="px-4 py-2 whitespace-nowrap">
                        <div className="flex items-center">
                          <span className="text-gray-500 mr-1">$</span>
                          <input
                            type="number"
                            value={expense.amount}
                            onChange={(e) => handleUpdateExpense(expense.id, e.target.value)}
                            className="w-24 p-1 text-sm border border-gray-300 rounded"
                          />
                        </div>
                      </td>
                      <td className="px-4 py-2 whitespace-nowrap">
                        <span className="text-sm text-gray-500">
                          {((expense.amount / totalExpenses) * 100).toFixed(1)}%
                        </span>
                      </td>
                      <td className="px-4 py-2 whitespace-nowrap text-right text-sm font-medium">
                        <button
                          onClick={() => handleRemoveExpense(expense.id)}
                          className="text-red-600 hover:text-red-900"
                        >
                          Remove
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
                <tfoot className="bg-gray-50">
                  <tr>
                    <td className="px-4 py-2 whitespace-nowrap text-sm font-medium text-gray-900">
                      Total
                    </td>
                    <td className="px-4 py-2 whitespace-nowrap text-sm font-medium text-gray-900">
                      ${totalExpenses.toFixed(2)}
                    </td>
                    <td colSpan={2}></td>
                  </tr>
                </tfoot>
              </table>
            </div>
          </div>
          
          <form onSubmit={handleAddExpense} className="mb-6">
            <h3 className="font-medium mb-3">Add New Expense</h3>
            <div className="flex space-x-2">
              <input
                type="text"
                placeholder="Category"
                value={newCategory}
                onChange={(e) => setNewCategory(e.target.value)}
                className="flex-1 p-2 border border-gray-300 rounded"
                required
              />
              <div className="flex items-center">
                <span className="text-gray-500 mr-1">$</span>
                <input
                  type="number"
                  placeholder="Amount"
                  value={newAmount}
                  onChange={(e) => setNewAmount(e.target.value)}
                  className="w-24 p-2 border border-gray-300 rounded"
                  required
                />
              </div>
              <button
                type="submit"
                className="px-4 py-2 bg-primary text-white rounded hover:bg-primary-dark"
              >
                Add
              </button>
            </div>
          </form>
        </div>
        
        <div>
          <div className="mb-6">
            <h3 className="font-medium mb-3">Expense Breakdown</h3>
            <div className="relative h-64">
              <Doughnut data={chartData} options={chartOptions} />
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="text-2xl font-bold">${totalExpenses}</span>
                <span className="text-sm text-gray-500">Total</span>
              </div>
            </div>
          </div>
          
          <div>
            <h3 className="font-medium mb-3 flex items-center">
              <FiAlertCircle className="text-primary mr-2" />
              AI Savings Suggestions
            </h3>
            <div className="space-y-3">
              {aiSuggestions.map((suggestion, index) => (
                <div key={index} className="bg-blue-50 p-3 rounded-lg border-l-4 border-primary">
                  <div className="flex justify-between items-start">
                    <h4 className="text-sm font-medium text-gray-900">{suggestion.category}</h4>
                    <span className={`text-xs px-2 py-1 rounded ${
                      suggestion.priority === 'High' ? 'bg-red-100 text-red-800' :
                      suggestion.priority === 'Medium' ? 'bg-yellow-100 text-yellow-800' :
                      'bg-green-100 text-green-800'
                    }`}>
                      {suggestion.priority}
                    </span>
                  </div>
                  <p className="text-sm text-gray-600 mt-1">{suggestion.message}</p>
                  <div className="mt-2 text-sm font-medium text-primary">
                    Potential savings: ${suggestion.potentialSavings.toFixed(2)}/month
                  </div>
                </div>
              ))}
              
              {aiSuggestions.length === 0 && (
                <p className="text-sm text-gray-500 italic">
                  No suggestions available. Update your budget to get personalized recommendations.
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SmartBudgetPlanner;

import { useState } from 'react';
import BillUploader from '../components/BillUploader';
import BillAnalysisResult from '../components/BillAnalysisResult';

const BillAnalysis = () => {
  const [analysisResult, setAnalysisResult] = useState(null);
  const [recentBills, setRecentBills] = useState([
    {
      id: 1,
      provider: 'Energy Company XYZ',
      type: 'Electricity',
      date: '2023-08-15',
      amount: 138.50,
      savings: 22.75
    },
    {
      id: 2,
      provider: 'City Water Services',
      type: 'Water',
      date: '2023-08-10',
      amount: 78.25,
      savings: 12.50
    },
    {
      id: 3,
      provider: 'FastNet Communications',
      type: 'Internet',
      date: '2023-08-05',
      amount: 89.99,
      savings: 35.00
    }
  ]);
  
  const handleAnalysisComplete = (result) => {
    setAnalysisResult(result);
    
    // Add to recent bills
    const newBill = {
      id: Date.now(),
      provider: result.provider,
      type: 'Electricity', // Assuming type based on provider
      date: result.billDate,
      amount: result.totalAmount,
      savings: result.potentialSavings.reduce((sum, item) => sum + item.amount, 0)
    };
    
    setRecentBills([newBill, ...recentBills]);
  };
  
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Bill Analysis</h1>
        <p className="text-gray-500 mt-1">Upload your bills to find hidden savings opportunities</p>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-1 space-y-6">
          <div className="card">
            <h3 className="text-lg font-semibold mb-4">Upload Bill</h3>
            <BillUploader onAnalysisComplete={handleAnalysisComplete} />
          </div>
          
          <div className="card">
            <h3 className="text-lg font-semibold mb-4">Recent Bills</h3>
            {recentBills.length > 0 ? (
              <div className="space-y-4">
                {recentBills.map(bill => (
                  <div key={bill.id} className="flex items-center p-3 bg-gray-50 rounded-lg hover:bg-gray-100 cursor-pointer">
                    <div className="flex-1">
                      <h4 className="font-medium">{bill.provider}</h4>
                      <div className="flex justify-between mt-1">
                        <span className="text-xs text-gray-500">{bill.type} • {bill.date}</span>
                        <span className="text-xs font-medium">${bill.amount.toFixed(2)}</span>
                      </div>
                    </div>
                    <div className="ml-4 text-right">
                      <span className="text-xs font-medium text-green-600">Saved ${bill.savings.toFixed(2)}</span>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-gray-500 text-sm">No recent bills</p>
            )}
          </div>
          
          <div className="card bg-blue-50 border border-blue-100">
            <h3 className="text-lg font-semibold text-blue-800 mb-2">Connect Your Accounts</h3>
            <p className="text-sm text-blue-700 mb-4">
              Link your utility accounts for automatic bill analysis and savings
            </p>
            <button className="w-full btn-primary">Connect Accounts</button>
          </div>
        </div>
        
        <div className="lg:col-span-2">
          {analysisResult ? (
            <BillAnalysisResult analysis={analysisResult} />
          ) : (
            <div className="card h-full flex flex-col items-center justify-center text-center p-8">
              <img 
                src="https://images.pexels.com/photos/6694543/pexels-photo-6694543.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" 
                alt="Upload bill" 
                className="w-64 h-64 object-cover rounded-full mb-6"
              />
              <h3 className="text-xl font-bold text-gray-800 mb-2">Upload a bill to get started</h3>
              <p className="text-gray-500 max-w-md">
                Our AI will analyze your bill, identify savings opportunities, and suggest ways to reduce your expenses.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default BillAnalysis;

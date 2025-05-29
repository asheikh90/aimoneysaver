import { FiCheckCircle, FiAlertTriangle } from 'react-icons/fi';

const BillAnalysisResult = ({ analysis }) => {
  if (!analysis) return null;
  
  const { provider, billDate, dueDate, totalAmount, lineItems, potentialSavings } = analysis;
  
  const totalSavings = potentialSavings.reduce((sum, item) => sum + item.amount, 0);
  const savingsPercentage = (totalSavings / totalAmount * 100).toFixed(1);
  
  return (
    <div className="space-y-6">
      <div className="card">
        <h3 className="text-lg font-semibold mb-4">Bill Summary</h3>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <p className="text-sm text-gray-500">Provider</p>
            <p className="font-medium">{provider}</p>
          </div>
          <div>
            <p className="text-sm text-gray-500">Bill Date</p>
            <p className="font-medium">{billDate}</p>
          </div>
          <div>
            <p className="text-sm text-gray-500">Due Date</p>
            <p className="font-medium">{dueDate}</p>
          </div>
          <div>
            <p className="text-sm text-gray-500">Total Amount</p>
            <p className="font-medium">${totalAmount.toFixed(2)}</p>
          </div>
        </div>
      </div>
      
      <div className="card">
        <h3 className="text-lg font-semibold mb-4">Bill Breakdown</h3>
        <div className="space-y-3">
          {lineItems.map((item, index) => (
            <div key={index} className="flex justify-between py-2 border-b last:border-0">
              <span>{item.description}</span>
              <span className="font-medium">${item.amount.toFixed(2)}</span>
            </div>
          ))}
        </div>
      </div>
      
      <div className="card bg-green-50 border border-green-100">
        <div className="flex items-start">
          <div className="p-2 bg-green-100 rounded-full text-green-600 mr-4">
            <FiCheckCircle size={24} />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-green-800">AI-Powered Savings Opportunities</h3>
            <p className="text-sm text-green-700 mt-1">
              We found potential savings of ${totalSavings.toFixed(2)} ({savingsPercentage}% of your bill)
            </p>
          </div>
        </div>
        
        <div className="mt-6 space-y-4">
          {potentialSavings.map((saving, index) => (
            <div key={index} className="flex items-start p-3 bg-white rounded-lg shadow-sm">
              <div className={`p-2 rounded-full ${
                saving.confidence > 0.8 ? 'bg-green-100 text-green-600' : 'bg-yellow-100 text-yellow-600'
              }`}>
                {saving.confidence > 0.8 ? <FiCheckCircle size={20} /> : <FiAlertTriangle size={20} />}
              </div>
              <div className="ml-3 flex-1">
                <div className="flex justify-between">
                  <h4 className="font-medium">{saving.description}</h4>
                  <span className="font-bold text-green-600">Save ${saving.amount.toFixed(2)}</span>
                </div>
                <div className="mt-1 flex items-center">
                  <div className="w-full bg-gray-200 rounded-full h-1.5">
                    <div 
                      className={`h-1.5 rounded-full ${
                        saving.confidence > 0.8 ? 'bg-green-500' : 'bg-yellow-500'
                      }`}
                      style={{ width: `${saving.confidence * 100}%` }}
                    ></div>
                  </div>
                  <span className="ml-2 text-xs text-gray-500">
                    {Math.round(saving.confidence * 100)}% confidence
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        <button className="w-full btn-primary mt-6">Apply All Savings</button>
      </div>
    </div>
  );
};

export default BillAnalysisResult;

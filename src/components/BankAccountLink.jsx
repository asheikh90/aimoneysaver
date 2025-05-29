import { useState } from 'react';
import { FiLock, FiCreditCard, FiDollarSign, FiCheck, FiX } from 'react-icons/fi';

const BankAccountLink = () => {
  const [step, setStep] = useState(1);
  const [selectedBank, setSelectedBank] = useState(null);
  const [isConnecting, setIsConnecting] = useState(false);
  const [isConnected, setIsConnected] = useState(false);
  const [credentials, setCredentials] = useState({
    username: '',
    password: ''
  });
  
  const popularBanks = [
    { id: 1, name: 'Chase', logo: 'https://logo.clearbit.com/chase.com' },
    { id: 2, name: 'Bank of America', logo: 'https://logo.clearbit.com/bankofamerica.com' },
    { id: 3, name: 'Wells Fargo', logo: 'https://logo.clearbit.com/wellsfargo.com' },
    { id: 4, name: 'Citibank', logo: 'https://logo.clearbit.com/citi.com' },
    { id: 5, name: 'Capital One', logo: 'https://logo.clearbit.com/capitalone.com' },
    { id: 6, name: 'TD Bank', logo: 'https://logo.clearbit.com/td.com' }
  ];
  
  const handleBankSelection = (bank) => {
    setSelectedBank(bank);
    setStep(2);
  };
  
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCredentials(prev => ({
      ...prev,
      [name]: value
    }));
  };
  
  const handleConnect = (e) => {
    e.preventDefault();
    setIsConnecting(true);
    
    // Simulate API connection
    setTimeout(() => {
      setIsConnecting(false);
      setIsConnected(true);
      setStep(3);
    }, 2000);
  };
  
  const handleReset = () => {
    setStep(1);
    setSelectedBank(null);
    setIsConnected(false);
    setCredentials({
      username: '',
      password: ''
    });
  };
  
  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="flex items-center mb-6">
        <div className="bg-primary/10 p-2 rounded-full">
          <FiCreditCard className="h-6 w-6 text-primary" />
        </div>
        <h2 className="text-xl font-semibold ml-3">Connect Your Bank Account</h2>
      </div>
      
      <div className="mb-6">
        <div className="flex items-center space-x-2 mb-4">
          <div className={`flex items-center justify-center w-8 h-8 rounded-full ${step >= 1 ? 'bg-primary text-white' : 'bg-gray-200 text-gray-500'}`}>
            1
          </div>
          <div className={`h-1 w-16 ${step >= 2 ? 'bg-primary' : 'bg-gray-200'}`}></div>
          <div className={`flex items-center justify-center w-8 h-8 rounded-full ${step >= 2 ? 'bg-primary text-white' : 'bg-gray-200 text-gray-500'}`}>
            2
          </div>
          <div className={`h-1 w-16 ${step >= 3 ? 'bg-primary' : 'bg-gray-200'}`}></div>
          <div className={`flex items-center justify-center w-8 h-8 rounded-full ${step >= 3 ? 'bg-primary text-white' : 'bg-gray-200 text-gray-500'}`}>
            3
          </div>
        </div>
      </div>
      
      {step === 1 && (
        <div>
          <h3 className="font-medium text-lg mb-4">Select your bank</h3>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-6">
            {popularBanks.map(bank => (
              <button
                key={bank.id}
                className="flex flex-col items-center justify-center p-4 border rounded-lg hover:border-primary hover:bg-primary/5 transition-colors"
                onClick={() => handleBankSelection(bank)}
              >
                <img 
                  src={bank.logo} 
                  alt={bank.name} 
                  className="w-12 h-12 object-contain mb-2"
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = 'https://via.placeholder.com/48?text=' + bank.name.charAt(0);
                  }}
                />
                <span className="text-sm text-center">{bank.name}</span>
              </button>
            ))}
          </div>
          
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-200"></div>
            </div>
            <div className="relative flex justify-center">
              <span className="bg-white px-4 text-sm text-gray-500">or search for your bank</span>
            </div>
          </div>
          
          <div className="mt-6">
            <input
              type="text"
              placeholder="Search for your bank..."
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary"
            />
          </div>
        </div>
      )}
      
      {step === 2 && selectedBank && (
        <div>
          <div className="flex items-center mb-6">
            <img 
              src={selectedBank.logo} 
              alt={selectedBank.name} 
              className="w-10 h-10 object-contain mr-3"
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = 'https://via.placeholder.com/40?text=' + selectedBank.name.charAt(0);
              }}
            />
            <h3 className="font-medium text-lg">{selectedBank.name}</h3>
          </div>
          
          <form onSubmit={handleConnect}>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Username
              </label>
              <input
                type="text"
                name="username"
                value={credentials.username}
                onChange={handleInputChange}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary"
                required
              />
            </div>
            
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Password
              </label>
              <input
                type="password"
                name="password"
                value={credentials.password}
                onChange={handleInputChange}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary"
                required
              />
            </div>
            
            <div className="flex items-center mb-6">
              <FiLock className="text-gray-500 mr-2" />
              <p className="text-sm text-gray-500">
                Your credentials are encrypted and never stored on our servers.
              </p>
            </div>
            
            <div className="flex space-x-4">
              <button
                type="button"
                onClick={handleReset}
                className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
              >
                Back
              </button>
              <button
                type="submit"
                className="flex-1 px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
                disabled={isConnecting}
              >
                {isConnecting ? (
                  <span className="flex items-center justify-center">
                    <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Connecting...
                  </span>
                ) : (
                  'Connect Account'
                )}
              </button>
            </div>
          </form>
        </div>
      )}
      
      {step === 3 && isConnected && (
        <div className="text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-green-100 mb-4">
            <FiCheck className="h-8 w-8 text-green-500" />
          </div>
          
          <h3 className="text-xl font-medium text-gray-900 mb-2">Account Connected Successfully!</h3>
          <p className="text-gray-600 mb-6">
            Your {selectedBank.name} account has been successfully connected. We'll now analyze your transactions to find savings opportunities.
          </p>
          
          <div className="bg-gray-50 p-4 rounded-lg mb-6">
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm text-gray-600">Checking Account</span>
              <span className="text-sm font-medium">••••4567</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">Savings Account</span>
              <span className="text-sm font-medium">••••8901</span>
            </div>
          </div>
          
          <div className="flex flex-col space-y-3">
            <button
              className="w-full px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
            >
              View Savings Insights
            </button>
            <button
              onClick={handleReset}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
            >
              Connect Another Account
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default BankAccountLink;

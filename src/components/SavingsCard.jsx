import { FiArrowUp, FiArrowDown } from 'react-icons/fi';

const SavingsCard = ({ title, amount, percentChange, icon, color }) => {
  const isPositive = percentChange >= 0;
  
  return (
    <div className="card">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm text-gray-500">{title}</p>
          <h3 className="text-2xl font-bold mt-1">${amount.toLocaleString()}</h3>
        </div>
        <div className={`p-3 rounded-full bg-${color}-100`}>
          {icon}
        </div>
      </div>
      <div className="mt-4 flex items-center">
        <span className={`flex items-center text-sm ${isPositive ? 'text-green-500' : 'text-red-500'}`}>
          {isPositive ? <FiArrowUp className="mr-1" /> : <FiArrowDown className="mr-1" />}
          {Math.abs(percentChange)}%
        </span>
        <span className="text-sm text-gray-500 ml-2">vs last month</span>
      </div>
    </div>
  );
};

export default SavingsCard;

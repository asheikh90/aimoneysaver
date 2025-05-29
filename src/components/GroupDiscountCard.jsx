import { FiUsers, FiChevronRight } from 'react-icons/fi';

const GroupDiscountCard = ({ discount }) => {
  const { title, provider, savings, participants, maxParticipants, category, endDate } = discount;
  
  const progress = (participants / maxParticipants) * 100;
  
  return (
    <div className="card hover:shadow-lg transition-shadow cursor-pointer">
      <div className="flex items-start justify-between">
        <div className="flex items-center">
          <div className={`p-3 rounded-full bg-${category.color}-100 text-${category.color}-600`}>
            <FiUsers size={20} />
          </div>
          <div className="ml-4">
            <h3 className="font-semibold text-lg">{title}</h3>
            <p className="text-sm text-gray-500">{provider}</p>
          </div>
        </div>
        <div className="text-right">
          <p className="text-lg font-bold text-green-600">Save ${savings}</p>
          <p className="text-sm text-gray-500">per month</p>
        </div>
      </div>
      
      <div className="mt-4">
        <div className="flex justify-between text-sm mb-1">
          <span>{participants} joined</span>
          <span>{maxParticipants} needed</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div 
            className="bg-primary h-2 rounded-full" 
            style={{ width: `${progress}%` }}
          ></div>
        </div>
      </div>
      
      <div className="mt-4 flex items-center justify-between text-sm">
        <span className="text-gray-500">Ends on {new Date(endDate).toLocaleDateString()}</span>
        <button className="flex items-center text-primary font-medium">
          Join group <FiChevronRight className="ml-1" />
        </button>
      </div>
    </div>
  );
};

export default GroupDiscountCard;

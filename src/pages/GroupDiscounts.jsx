import { useState, useEffect } from 'react';
import { FiSearch, FiFilter, FiMapPin } from 'react-icons/fi';
import GroupDiscountCard from '../components/GroupDiscountCard';

const GroupDiscounts = () => {
  const [discounts, setDiscounts] = useState([]);
  const [filteredDiscounts, setFilteredDiscounts] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [location, setLocation] = useState('San Francisco, CA');
  
  const categories = [
    { id: 'all', name: 'All Categories' },
    { id: 'electricity', name: 'Electricity', color: 'green' },
    { id: 'internet', name: 'Internet', color: 'blue' },
    { id: 'phone', name: 'Phone', color: 'purple' },
    { id: 'streaming', name: 'Streaming', color: 'red' },
    { id: 'insurance', name: 'Insurance', color: 'yellow' }
  ];
  
  useEffect(() => {
    // Mock data
    const mockDiscounts = [
      {
        id: 1,
        title: 'Internet Service Bundle',
        provider: 'FastNet Communications',
        savings: 35,
        participants: 18,
        maxParticipants: 25,
        category: { id: 'internet', name: 'Internet', color: 'blue' },
        endDate: '2023-10-30',
        description: 'Join our group to get 500Mbps fiber internet with unlimited data for just $45/month instead of $80/month. Includes free installation and Wi-Fi router.'
      },
      {
        id: 2,
        title: 'Green Energy Plan',
        provider: 'EcoEnergy Solutions',
        savings: 28,
        participants: 42,
        maxParticipants: 50,
        category: { id: 'electricity', name: 'Electricity', color: 'green' },
        endDate: '2023-11-15',
        description: '100% renewable energy plan with time-of-use pricing. Save on your monthly electricity bill while reducing your carbon footprint.'
      },
      {
        id: 3,
        title: 'Premium Streaming Bundle',
        provider: 'StreamFlix+',
        savings: 15,
        participants: 12,
        maxParticipants: 30,
        category: { id: 'streaming', name: 'Streaming', color: 'red' },
        endDate: '2023-10-25',
        description: 'Get access to StreamFlix, MusicStream, and SportsNet for one low monthly price. Save 30% compared to individual subscriptions.'
      },
      {
        id: 4,
        title: 'Family Mobile Plan',
        provider: 'ConnectMobile',
        savings: 25,
        participants: 8,
        maxParticipants: 20,
        category: { id: 'phone', name: 'Phone', color: 'purple' },
        endDate: '2023-11-05',
        description: 'Unlimited talk, text, and data for up to 5 lines. Each line gets 15GB of high-speed data and unlimited streaming on select services.'
      },
      {
        id: 5,
        title: 'Home Insurance Group',
        provider: 'SecureHome Insurance',
        savings: 45,
        participants: 15,
        maxParticipants: 40,
        category: { id: 'insurance', name: 'Insurance', color: 'yellow' },
        endDate: '2023-12-01',
        description: 'Comprehensive home insurance with additional coverage for natural disasters. Group members receive a 20% discount on annual premiums.'
      },
      {
        id: 6,
        title: 'Business Internet Package',
        provider: 'Enterprise Connect',
        savings: 75,
        participants: 5,
        maxParticipants: 15,
        category: { id: 'internet', name: 'Internet', color: 'blue' },
        endDate: '2023-11-20',
        description: 'Gigabit fiber internet with static IP addresses and 24/7 priority support. Perfect for small businesses and remote workers.'
      }
    ];
    
    setDiscounts(mockDiscounts);
    setFilteredDiscounts(mockDiscounts);
  }, []);
  
  useEffect(() => {
    let results = discounts;
    
    // Filter by search term
    if (searchTerm) {
      results = results.filter(discount => 
        discount.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        discount.provider.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    // Filter by category
    if (selectedCategory !== 'all') {
      results = results.filter(discount => discount.category.id === selectedCategory);
    }
    
    setFilteredDiscounts(results);
  }, [searchTerm, selectedCategory, discounts]);
  
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Group Discounts</h1>
        <p className="text-gray-500 mt-1">Join others in your area to unlock exclusive savings</p>
      </div>
      
      <div className="card">
        <div className="flex items-center mb-4">
          <div className="p-2 bg-primary/10 rounded-full text-primary mr-3">
            <FiMapPin size={20} />
          </div>
          <div>
            <p className="text-sm text-gray-500">Your Location</p>
            <p className="font-medium">{location}</p>
          </div>
          <button className="ml-auto text-sm text-primary font-medium">Change</button>
        </div>
        
        <div className="flex flex-col md:flex-row gap-4">
          <div className="relative flex-1">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <FiSearch className="text-gray-400" />
            </div>
            <input
              type="text"
              className="input-field pl-10"
              placeholder="Search discounts..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <FiFilter className="text-gray-400" />
            </div>
            <select
              className="input-field pl-10 pr-8 appearance-none"
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
            >
              {categories.map(category => (
                <option key={category.id} value={category.id}>
                  {category.name}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredDiscounts.length > 0 ? (
          filteredDiscounts.map(discount => (
            <GroupDiscountCard key={discount.id} discount={discount} />
          ))
        ) : (
          <div className="col-span-full text-center py-12">
            <h3 className="text-lg font-medium text-gray-900">No discounts found</h3>
            <p className="text-gray-500 mt-1">Try adjusting your search or filters</p>
          </div>
        )}
      </div>
      
      <div className="card bg-gradient-to-r from-purple-600 to-primary text-white">
        <div className="flex flex-col md:flex-row items-center justify-between">
          <div className="mb-4 md:mb-0">
            <h3 className="text-xl font-bold">Start Your Own Group</h3>
            <p className="mt-1 opacity-90">Create a discount group for your neighborhood and invite others to join</p>
          </div>
          <button className="px-6 py-3 bg-white text-primary font-medium rounded-lg hover:bg-gray-100 transition-colors">
            Create Group
          </button>
        </div>
      </div>
    </div>
  );
};

export default GroupDiscounts;

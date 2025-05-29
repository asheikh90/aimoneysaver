import { useState } from 'react';
import { FiUser, FiMail, FiMapPin, FiCreditCard, FiLock, FiBell, FiHome } from 'react-icons/fi';

const Profile = () => {
  const [activeTab, setActiveTab] = useState('personal');
  
  const tabs = [
    { id: 'personal', label: 'Personal Info', icon: <FiUser /> },
    { id: 'payment', label: 'Payment Methods', icon: <FiCreditCard /> },
    { id: 'security', label: 'Security', icon: <FiLock /> },
    { id: 'notifications', label: 'Notifications', icon: <FiBell /> },
    { id: 'connected', label: 'Connected Accounts', icon: <FiHome /> }
  ];
  
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Your Profile</h1>
        <p className="text-gray-500 mt-1">Manage your account settings and preferences</p>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        <div className="lg:col-span-1">
          <div className="card">
            <div className="flex flex-col items-center">
              <img
                src="https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
                alt="Profile"
                className="w-24 h-24 rounded-full object-cover"
              />
              <h3 className="mt-4 text-lg font-semibold">Sarah Johnson</h3>
              <p className="text-gray-500">sarah@example.com</p>
              <p className="mt-1 text-sm text-primary font-medium">Premium Member</p>
              
              <div className="w-full mt-6 space-y-1">
                {tabs.map(tab => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`w-full flex items-center p-3 rounded-lg text-left ${
                      activeTab === tab.id
                        ? 'bg-primary text-white'
                        : 'text-gray-700 hover:bg-gray-100'
                    }`}
                  >
                    <span className="mr-3">{tab.icon}</span>
                    <span>{tab.label}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
        
        <div className="lg:col-span-3">
          {activeTab === 'personal' && (
            <div className="card">
              <h3 className="text-lg font-semibold mb-6">Personal Information</h3>
              
              <form className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">First Name</label>
                    <input
                      type="text"
                      className="input-field"
                      defaultValue="Sarah"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Last Name</label>
                    <input
                      type="text"
                      className="input-field"
                      defaultValue="Johnson"
                    />
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
                  <div className="flex">
                    <span className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-gray-300 bg-gray-50 text-gray-500">
                      <FiMail />
                    </span>
                    <input
                      type="email"
                      className="input-field rounded-l-none"
                      defaultValue="sarah@example.com"
                    />
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
                  <input
                    type="tel"
                    className="input-field"
                    defaultValue="(555) 123-4567"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Address</label>
                  <div className="flex">
                    <span className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-gray-300 bg-gray-50 text-gray-500">
                      <FiMapPin />
                    </span>
                    <input
                      type="text"
                      className="input-field rounded-l-none"
                      defaultValue="123 Main St, San Francisco, CA 94105"
                    />
                  </div>
                </div>
                
                <div className="pt-4 border-t border-gray-200">
                  <button type="submit" className="btn-primary">
                    Save Changes
                  </button>
                </div>
              </form>
            </div>
          )}
          
          {activeTab === 'payment' && (
            <div className="card">
              <h3 className="text-lg font-semibold mb-6">Payment Methods</h3>
              
              <div className="space-y-4 mb-6">
                {[
                  { 
                    type: 'Visa', 
                    last4: '4242', 
                    expiry: '09/25',
                    isDefault: true
                  },
                  { 
                    type: 'Mastercard', 
                    last4: '5678', 
                    expiry: '12/24',
                    isDefault: false
                  }
                ].map((card, index) => (
                  <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center">
                      <div className="p-2 bg-blue-50 rounded-md mr-4">
                        <FiCreditCard className="text-blue-600" size={24} />
                      </div>
                      <div>
                        <p className="font-medium">{card.type} •••• {card.last4}</p>
                        <p className="text-sm text-gray-500">Expires {card.expiry}</p>
                      </div>
                    </div>
                    <div className="flex items-center">
                      {card.isDefault && (
                        <span className="mr-4 px-2 py-1 bg-green-100 text-green-800 text-xs font-medium rounded">
                          Default
                        </span>
                      )}
                      <button className="text-gray-500 hover:text-gray-700">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                          <path d="M10 6a2 2 0 110-4 2 2 0 010 4zM10 12a2 2 0 110-4 2 2 0 010 4zM10 18a2 2 0 110-4 2 2 0 010 4z" />
                        </svg>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
              
              <button className="btn-primary">
                Add Payment Method
              </button>
            </div>
          )}
          
          {activeTab === 'security' && (
            <div className="card">
              <h3 className="text-lg font-semibold mb-6">Security Settings</h3>
              
              <form className="space-y-6">
                <div>
                  <h4 className="text-md font-medium mb-4">Change Password</h4>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Current Password</label>
                      <input
                        type="password"
                        className="input-field"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">New Password</label>
                      <input
                        type="password"
                        className="input-field"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Confirm New Password</label>
                      <input
                        type="password"
                        className="input-field"
                      />
                    </div>
                  </div>
                  <button type="submit" className="btn-primary mt-4">
                    Update Password
                  </button>
                </div>
                
                <div className="pt-6 border-t border-gray-200">
                  <h4 className="text-md font-medium mb-4">Two-Factor Authentication</h4>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-gray-700">Protect your account with 2FA</p>
                      <p className="text-sm text-gray-500 mt-1">
                        Add an extra layer of security to your account
                      </p>
                    </div>
                    <div className="form-control">
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input type="checkbox" value="" className="sr-only peer" />
                        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary/20 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
                      </label>
                    </div>
                  </div>
                </div>
                
                <div className="pt-6 border-t border-gray-200">
                  <h4 className="text-md font-medium mb-4">Login Sessions</h4>
                  <div className="space-y-3">
                    {[
                      { 
                        device: 'MacBook Pro', 
                        location: 'San Francisco, CA', 
                        ip: '192.168.1.1',
                        time: '2 hours ago',
                        current: true
                      },
                      { 
                        device: 'iPhone 13', 
                        location: 'San Francisco, CA', 
                        ip: '192.168.1.2',
                        time: '1 day ago',
                        current: false
                      }
                    ].map((session, index) => (
                      <div key={index} className="flex justify-between p-3 bg-gray-50 rounded-lg">
                        <div>
                          <div className="flex items-center">
                            <h5 className="font-medium">{session.device}</h5>
                            {session.current && (
                              <span className="ml-2 px-2 py-0.5 bg-green-100 text-green-800 text-xs font-medium rounded">
                                Current
                              </span>
                            )}
                          </div>
                          <p className="text-sm text-gray-500 mt-1">
                            {session.location} • {session.ip} • {session.time}
                          </p>
                        </div>
                        {!session.current && (
                          <button className="text-red-600 text-sm font-medium">
                            Logout
                          </button>
                        )}
                      </div>
                    ))}
                  </div>
                  <button className="text-red-600 font-medium mt-4">
                    Logout of All Devices
                  </button>
                </div>
              </form>
            </div>
          )}
          
          {activeTab === 'notifications' && (
            <div className="card">
              <h3 className="text-lg font-semibold mb-6">Notification Preferences</h3>
              
              <div className="space-y-6">
                <div>
                  <h4 className="text-md font-medium mb-4">Email Notifications</h4>
                  <div className="space-y-4">
                    {[
                      { 
                        title: 'Savings Opportunities', 
                        description: 'Get notified when we find new ways to save',
                        enabled: true
                      },
                      { 
                        title: 'Bill Reminders', 
                        description: 'Receive reminders before bills are due',
                        enabled: true
                      },
                      { 
                        title: 'Group Discount Updates', 
                        description: 'Updates on group discounts you\'ve joined',
                        enabled: true
                      },
                      { 
                        title: 'Monthly Savings Report', 
                        description: 'Monthly summary of your savings',
                        enabled: false
                      },
                      { 
                        title: 'Product Updates', 
                        description: 'Learn about new features and improvements',
                        enabled: false
                      }
                    ].map((notification, index) => (
                      <div key={index} className="flex items-center justify-between">
                        <div>
                          <p className="font-medium">{notification.title}</p>
                          <p className="text-sm text-gray-500">{notification.description}</p>
                        </div>
                        <div className="form-control">
                          <label className="relative inline-flex items-center cursor-pointer">
                            <input type="checkbox" defaultChecked={notification.enabled} className="sr-only peer" />
                            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary/20 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
                          </label>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                
                <div className="pt-6 border-t border-gray-200">
                  <h4 className="text-md font-medium mb-4">Push Notifications</h4>
                  <div className="space-y-4">
                    {[
                      { 
                        title: 'Savings Alerts', 
                        description: 'Immediate alerts for significant savings opportunities',
                        enabled: true
                      },
                      { 
                        title: 'Bill Analysis Complete', 
                        description: 'When your bill analysis is ready to view',
                        enabled: true
                      },
                      { 
                        title: 'Group Discount Milestones', 
                        description: 'Updates when group discounts reach key milestones',
                        enabled: false
                      }
                    ].map((notification, index) => (
                      <div key={index} className="flex items-center justify-between">
                        <div>
                          <p className="font-medium">{notification.title}</p>
                          <p className="text-sm text-gray-500">{notification.description}</p>
                        </div>
                        <div className="form-control">
                          <label className="relative inline-flex items-center cursor-pointer">
                            <input type="checkbox" defaultChecked={notification.enabled} className="sr-only peer" />
                            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary/20 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
                          </label>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                
                <div className="pt-4 border-t border-gray-200">
                  <button type="submit" className="btn-primary">
                    Save Preferences
                  </button>
                </div>
              </div>
            </div>
          )}
          
          {activeTab === 'connected' && (
            <div className="card">
              <h3 className="text-lg font-semibold mb-6">Connected Accounts</h3>
              
              <div className="space-y-6">
                <div>
                  <h4 className="text-md font-medium mb-4">Banking & Financial</h4>
                  <div className="space-y-4">
                    {[
                      { 
                        name: 'Chase Bank', 
                        type: 'Banking',
                        status: 'Connected',
                        lastSync: '2 hours ago',
                        icon: '🏦'
                      },
                      { 
                        name: 'Capital One', 
                        type: 'Credit Card',
                        status: 'Connected',
                        lastSync: '1 day ago',
                        icon: '💳'
                      },
                      { 
                        name: 'Venmo', 
                        type: 'Payment',
                        status: 'Not connected',
                        lastSync: null,
                        icon: '💸'
                      }
                    ].map((account, index) => (
                      <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                        <div className="flex items-center">
                          <div className="p-3 bg-gray-100 rounded-full mr-4 text-2xl">
                            {account.icon}
                          </div>
                          <div>
                            <p className="font-medium">{account.name}</p>
                            <p className="text-sm text-gray-500">{account.type}</p>
                          </div>
                        </div>
                        <div className="text-right">
                          {account.status === 'Connected' ? (
                            <>
                              <p className="text-sm font-medium text-green-600">Connected</p>
                              <p className="text-xs text-gray-500">Last synced {account.lastSync}</p>
                              <button className="text-sm text-primary font-medium mt-1">Disconnect</button>
                            </>
                          ) : (
                            <button className="btn-primary text-sm py-1.5">Connect</button>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                
                <div className="pt-6 border-t border-gray-200">
                  <h4 className="text-md font-medium mb-4">Utility Providers</h4>
                  <div className="space-y-4">
                    {[
                      { 
                        name: 'EcoEnergy Solutions', 
                        type: 'Electricity',
                        status: 'Connected',
                        lastSync: '3 days ago',
                        icon: '⚡'
                      },
                      { 
                        name: 'FastNet Communications', 
                        type: 'Internet',
                        status: 'Connected',
                        lastSync: '1 week ago',
                        icon: '🌐'
                      },
                      { 
                        name: 'City Water Services', 
                        type: 'Water',
                        status: 'Not connected',
                        lastSync: null,
                        icon: '💧'
                      },
                      { 
                        name: 'ConnectMobile', 
                        type: 'Mobile',
                        status: 'Not connected',
                        lastSync: null,
                        icon: '📱'
                      }
                    ].map((account, index) => (
                      <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                        <div className="flex items-center">
                          <div className="p-3 bg-gray-100 rounded-full mr-4 text-2xl">
                            {account.icon}
                          </div>
                          <div>
                            <p className="font-medium">{account.name}</p>
                            <p className="text-sm text-gray-500">{account.type}</p>
                          </div>
                        </div>
                        <div className="text-right">
                          {account.status === 'Connected' ? (
                            <>
                              <p className="text-sm font-medium text-green-600">Connected</p>
                              <p className="text-xs text-gray-500">Last synced {account.lastSync}</p>
                              <button className="text-sm text-primary font-medium mt-1">Disconnect</button>
                            </>
                          ) : (
                            <button className="btn-primary text-sm py-1.5">Connect</button>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                
                <div className="pt-6 border-t border-gray-200">
                  <button className="btn-primary">
                    Connect New Account
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Profile;

import { Link, useLocation } from 'react-router-dom';
import { FiHome, FiFileText, FiUsers, FiDollarSign, FiUser } from 'react-icons/fi';

const Sidebar = () => {
  const location = useLocation();
  
  const isActive = (path) => {
    return location.pathname === path;
  };
  
  const navItems = [
    { path: '/', icon: <FiHome size={20} />, label: 'Dashboard' },
    { path: '/bill-analysis', icon: <FiFileText size={20} />, label: 'Bill Analysis' },
    { path: '/group-discounts', icon: <FiUsers size={20} />, label: 'Group Discounts' },
    { path: '/savings', icon: <FiDollarSign size={20} />, label: 'Savings' },
    { path: '/profile', icon: <FiUser size={20} />, label: 'Profile' },
  ];

  return (
    <aside className="hidden sm:block w-64 bg-white shadow-md">
      <div className="h-full px-3 py-4">
        <ul className="space-y-2">
          {navItems.map((item) => (
            <li key={item.path}>
              <Link
                to={item.path}
                className={`flex items-center p-3 text-base font-normal rounded-lg ${
                  isActive(item.path)
                    ? 'bg-primary text-white'
                    : 'text-gray-700 hover:bg-gray-100'
                }`}
              >
                {item.icon}
                <span className="ml-3">{item.label}</span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </aside>
  );
};

export default Sidebar;

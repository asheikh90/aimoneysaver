import { Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Dashboard from './pages/Dashboard';
import BillAnalysis from './pages/BillAnalysis';
import GroupDiscounts from './pages/GroupDiscounts';
import Savings from './pages/Savings';
import Profile from './pages/Profile';
import Login from './pages/Login';
import Register from './pages/Register';

function App() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/" element={<Layout />}>
        <Route index element={<Dashboard />} />
        <Route path="bill-analysis" element={<BillAnalysis />} />
        <Route path="group-discounts" element={<GroupDiscounts />} />
        <Route path="savings" element={<Savings />} />
        <Route path="profile" element={<Profile />} />
      </Route>
    </Routes>
  );
}

export default App;

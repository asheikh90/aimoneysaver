import React, { createContext, useState, useEffect } from 'react';

export interface Bill {
  id: string;
  provider: string;
  type: string;
  date: string;
  amount: number;
  savings: number;
  status: 'analyzed' | 'pending' | 'saved';
  imageUri?: string;
}

export interface GroupDiscount {
  id: string;
  title: string;
  provider: string;
  savings: number;
  participants: number;
  maxParticipants: number;
  category: {
    id: string;
    name: string;
    color: string;
  };
  endDate: string;
  description: string;
  isJoined?: boolean;
}

export interface SavingsData {
  total: number;
  monthly: number;
  categories: {
    name: string;
    amount: number;
    color: string;
  }[];
  history: {
    month: string;
    amount: number;
  }[];
}

interface SavingsContextType {
  bills: Bill[];
  groupDiscounts: GroupDiscount[];
  savingsData: SavingsData;
  addBill: (bill: Omit<Bill, 'id'>) => void;
  joinGroupDiscount: (groupId: string) => void;
  leaveGroupDiscount: (groupId: string) => void;
}

export const SavingsContext = createContext<SavingsContextType>({
  bills: [],
  groupDiscounts: [],
  savingsData: {
    total: 0,
    monthly: 0,
    categories: [],
    history: []
  },
  addBill: () => {},
  joinGroupDiscount: () => {},
  leaveGroupDiscount: () => {},
});

export const SavingsProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [bills, setBills] = useState<Bill[]>([
    {
      id: '1',
      provider: 'Energy Company XYZ',
      type: 'Electricity',
      date: '2023-08-15',
      amount: 138.50,
      savings: 22.75,
      status: 'analyzed'
    },
    {
      id: '2',
      provider: 'City Water Services',
      type: 'Water',
      date: '2023-08-10',
      amount: 78.25,
      savings: 12.50,
      status: 'analyzed'
    },
    {
      id: '3',
      provider: 'FastNet Communications',
      type: 'Internet',
      date: '2023-08-05',
      amount: 89.99,
      savings: 35.00,
      status: 'saved'
    }
  ]);

  const [groupDiscounts, setGroupDiscounts] = useState<GroupDiscount[]>([
    {
      id: '1',
      title: 'Internet Service Bundle',
      provider: 'FastNet Communications',
      savings: 35,
      participants: 18,
      maxParticipants: 25,
      category: { id: 'internet', name: 'Internet', color: 'blue' },
      endDate: '2023-10-30',
      description: 'Join our group to get 500Mbps fiber internet with unlimited data for just $45/month instead of $80/month. Includes free installation and Wi-Fi router.',
      isJoined: true
    },
    {
      id: '2',
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
      id: '3',
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
      id: '4',
      title: 'Family Mobile Plan',
      provider: 'ConnectMobile',
      savings: 25,
      participants: 8,
      maxParticipants: 20,
      category: { id: 'phone', name: 'Phone', color: 'purple' },
      endDate: '2023-11-05',
      description: 'Unlimited talk, text, and data for up to 5 lines. Each line gets 15GB of high-speed data and unlimited streaming on select services.'
    }
  ]);

  const [savingsData, setSavingsData] = useState<SavingsData>({
    total: 1053.25,
    monthly: 210.50,
    categories: [
      { name: 'Electricity', amount: 325.75, color: 'green' },
      { name: 'Internet', amount: 280.00, color: 'blue' },
      { name: 'Phone', amount: 195.50, color: 'purple' },
      { name: 'Streaming', amount: 124.50, color: 'red' },
      { name: 'Insurance', amount: 127.50, color: 'yellow' }
    ],
    history: [
      { month: 'Apr', amount: 95.00 },
      { month: 'May', amount: 130.00 },
      { month: 'Jun', amount: 118.00 },
      { month: 'Jul', amount: 160.00 },
      { month: 'Aug', amount: 145.00 },
      { month: 'Sep', amount: 210.50 }
    ]
  });

  const addBill = (bill: Omit<Bill, 'id'>) => {
    const newBill: Bill = {
      ...bill,
      id: Date.now().toString(),
    };
    
    setBills(prevBills => [newBill, ...prevBills]);
  };

  const joinGroupDiscount = (groupId: string) => {
    setGroupDiscounts(prevDiscounts =>
      prevDiscounts.map(discount =>
        discount.id === groupId
          ? { ...discount, isJoined: true, participants: discount.participants + 1 }
          : discount
      )
    );
  };

  const leaveGroupDiscount = (groupId: string) => {
    setGroupDiscounts(prevDiscounts =>
      prevDiscounts.map(discount =>
        discount.id === groupId && discount.isJoined
          ? { ...discount, isJoined: false, participants: discount.participants - 1 }
          : discount
      )
    );
  };

  return (
    <SavingsContext.Provider
      value={{
        bills,
        groupDiscounts,
        savingsData,
        addBill,
        joinGroupDiscount,
        leaveGroupDiscount,
      }}
    >
      {children}
    </SavingsContext.Provider>
  );
};

import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, RefreshControl } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Home, TrendingUp, DollarSign, PieChart, CreditCard, Bell } from 'lucide-react-native';
import { useTheme } from '../hooks/useTheme';
import SavingsGoalTracker from '../components/SavingsGoalTracker';
import SmartBudgetWidget from '../components/SmartBudgetWidget';
import BillReminderCard from '../components/BillReminderCard';

interface Bill {
  id: string;
  provider: string;
  type: string;
  amount: number;
  dueDate: string;
  status: 'upcoming' | 'overdue' | 'paid';
  savingsFound: boolean;
}

const DashboardScreen: React.FC = () => {
  const { colors, borderRadius } = useTheme();
  const navigation = useNavigation();
  const [refreshing, setRefreshing] = useState(false);
  const [activeTab, setActiveTab] = useState('overview');
  
  const [savingsData, setSavingsData] = useState({
    totalSaved: 1250.75,
    monthlyAverage: 312.68,
    savingsRate: 18.5,
    trend: 'up'
  });
  
  const [recentBills, setRecentBills] = useState<Bill[]>([
    {
      id: '1',
      provider: 'Energy Company XYZ',
      type: 'Electricity',
      amount: 142.75,
      dueDate: '2023-10-05',
      status: 'upcoming',
      savingsFound: true
    },
    {
      id: '2',
      provider: 'City Water Services',
      type: 'Water',
      amount: 78.50,
      dueDate: '2023-09-28',
      status: 'upcoming',
      savingsFound: false
    },
    {
      id: '3',
      provider: 'Telco Communications',
      type: 'Internet',
      amount: 89.99,
      dueDate: '2023-09-15',
      status: 'paid',
      savingsFound: true
    },
    {
      id: '4',
      provider: 'Natural Gas Co.',
      type: 'Gas',
      amount: 65.30,
      dueDate: '2023-09-10',
      status: 'paid',
      savingsFound: false
    }
  ]);
  
  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    // Simulate data refresh
    setTimeout(() => {
      setRefreshing(false);
    }, 1500);
  }, []);
  
  const handleBillPress = (bill: Bill) => {
    // Navigate to bill details
    console.log('Bill pressed:', bill);
  };
  
  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <View style={[styles.header, { backgroundColor: colors.card }]}>
        <View>
          <Text style={[styles.greeting, { color: colors.text }]}>Hello, Alex!</Text>
          <Text style={[styles.subGreeting, { color: colors.gray[500] }]}>
            Here's your savings overview
          </Text>
        </View>
        <TouchableOpacity style={styles.notificationButton}>
          <Bell size={24} color={colors.text} />
          <View style={[styles.notificationBadge, { backgroundColor: colors.notification }]}>
            <Text style={styles.notificationCount}>3</Text>
          </View>
        </TouchableOpacity>
      </View>
      
      <View style={styles.tabContainer}>
        <ScrollView 
          horizontal 
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.tabScrollContent}
        >
          <TouchableOpacity
            style={[
              styles.tabButton,
              activeTab === 'overview' && { backgroundColor: colors.primary }
            ]}
            onPress={() => setActiveTab('overview')}
          >
            <Home size={16} color={activeTab === 'overview' ? colors.white : colors.text} />
            <Text 
              style={[
                styles.tabText, 
                { color: activeTab === 'overview' ? colors.white : colors.text }
              ]}
            >
              Overview
            </Text>
          </TouchableOpacity>
          
          <TouchableOpacity
            style={[
              styles.tabButton,
              activeTab === 'budget' && { backgroundColor: colors.primary }
            ]}
            onPress={() => setActiveTab('budget')}
          >
            <PieChart size={16} color={activeTab === 'budget' ? colors.white : colors.text} />
            <Text 
              style={[
                styles.tabText, 
                { color: activeTab === 'budget' ? colors.white : colors.text }
              ]}
            >
              Budget
            </Text>
          </TouchableOpacity>
          
          <TouchableOpacity
            style={[
              styles.tabButton,
              activeTab === 'accounts' && { backgroundColor: colors.primary }
            ]}
            onPress={() => setActiveTab('accounts')}
          >
            <CreditCard size={16} color={activeTab === 'accounts' ? colors.white : colors.text} />
            <Text 
              style={[
                styles.tabText, 
                { color: activeTab === 'accounts' ? colors.white : colors.text }
              ]}
            >
              Accounts
            </Text>
          </TouchableOpacity>
        </ScrollView>
      </View>
      
      <ScrollView
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        {activeTab === 'overview' && (
          <>
            <View style={styles.statsContainer}>
              <View style={[styles.statCard, { backgroundColor: colors.card, borderRadius: borderRadius.lg }]}>
                <View style={[styles.statIconContainer, { backgroundColor: colors.primary + '20' }]}>
                  <DollarSign size={20} color={colors.primary} />
                </View>
                <Text style={[styles.statLabel, { color: colors.gray[500] }]}>Total Saved</Text>
                <Text style={[styles.statValue, { color: colors.text }]}>${savingsData.totalSaved.toFixed(2)}</Text>
                <View style={styles.statTrend}>
                  <TrendingUp size={14} color={colors.green[500]} />
                  <Text style={{ color: colors.green[500], marginLeft: 4, fontSize: 12 }}>
                    +12.3%
                  </Text>
                </View>
              </View>
              
              <View style={[styles.statCard, { backgroundColor: colors.card, borderRadius: borderRadius.lg }]}>
                <View style={[styles.statIconContainer, { backgroundColor: colors.primary + '20' }]}>
                  <PieChart size={20} color={colors.primary} />
                </View>
                <Text style={[styles.statLabel, { color: colors.gray[500] }]}>Savings Rate</Text>
                <Text style={[styles.statValue, { color: colors.text }]}>{savingsData.savingsRate}%</Text>
                <View style={[styles.progressBar, { backgroundColor: colors.gray[200] }]}>
                  <View 
                    style={[
                      styles.progressFill, 
                      { 
                        width: `${savingsData.savingsRate}%`,
                        backgroundColor: colors.primary
                      }
                    ]} 
                  />
                </View>
              </View>
            </View>
            
            <View style={styles.billsSection}>
              <View style={styles.sectionHeader}>
                <Text style={[styles.sectionTitle, { color: colors.text }]}>Upcoming Bills</Text>
                <TouchableOpacity>
                  <Text style={{ color: colors.primary }}>View All</Text>
                </TouchableOpacity>
              </View>
              
              {recentBills
                .filter(bill => bill.status === 'upcoming')
                .map(bill => (
                  <BillReminderCard 
                    key={bill.id} 
                    bill={bill} 
                    onPress={handleBillPress} 
                  />
                ))
              }
            </View>
            
            <View style={styles.savingsGoalSection}>
              <SavingsGoalTracker />
            </View>
          </>
        )}
        
        {activeTab === 'budget' && (
          <View style={styles.budgetSection}>
            <SmartBudgetWidget />
          </View>
        )}
        
        {activeTab === 'accounts' && (
          <View style={styles.accountsSection}>
            <Text style={[styles.comingSoonText, { color: colors.text }]}>
              Account linking coming soon!
            </Text>
          </View>
        )}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 16,
  },
  greeting: {
    fontSize: 24,
    fontWeight: '700',
  },
  subGreeting: {
    fontSize: 14,
    marginTop: 4,
  },
  notificationButton: {
    position: 'relative',
    padding: 8,
  },
  notificationBadge: {
    position: 'absolute',
    top: 4,
    right: 4,
    width: 18,
    height: 18,
    borderRadius: 9,
    alignItems: 'center',
    justifyContent: 'center',
  },
  notificationCount: {
    color: 'white',
    fontSize: 10,
    fontWeight: '700',
  },
  tabContainer: {
    paddingVertical: 8,
  },
  tabScrollContent: {
    paddingHorizontal: 16,
  },
  tabButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    marginRight: 12,
  },
  tabText: {
    marginLeft: 8,
    fontWeight: '500',
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    marginTop: 8,
  },
  statCard: {
    width: '48%',
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  statIconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
  },
  statLabel: {
    fontSize: 14,
    marginBottom: 4,
  },
  statValue: {
    fontSize: 20,
    fontWeight: '700',
    marginBottom: 8,
  },
  statTrend: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  progressBar: {
    height: 4,
    borderRadius: 2,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
  },
  billsSection: {
    marginTop: 24,
    marginBottom: 16,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    marginBottom: 8,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
  },
  savingsGoalSection: {
    marginBottom: 24,
  },
  budgetSection: {
    marginTop: 16,
    marginBottom: 24,
  },
  accountsSection: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 32,
  },
  comingSoonText: {
    fontSize: 18,
    fontWeight: '600',
    textAlign: 'center',
  },
});

export default DashboardScreen;

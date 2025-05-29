import React, { useContext } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  ScrollView, 
  TouchableOpacity, 
  Image,
  useWindowDimensions
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { 
  DollarSign, 
  FileText, 
  Users, 
  TrendingUp,
  ChevronRight,
  CreditCard
} from 'lucide-react-native';
import { LineChart } from 'react-native-chart-kit';
import { useTheme } from '../../hooks/useTheme';
import { AuthContext } from '../../contexts/AuthContext';
import { SavingsContext } from '../../contexts/SavingsContext';
import { RootStackParamList } from '../../navigation/RootNavigator';
import Card from '../../components/Card';
import SavingsCard from '../../components/SavingsCard';
import GroupDiscountCard from '../../components/GroupDiscountCard';

type DashboardScreenNavigationProp = NativeStackNavigationProp<RootStackParamList>;

const DashboardScreen = () => {
  const { colors } = useTheme();
  const { width } = useWindowDimensions();
  const navigation = useNavigation<DashboardScreenNavigationProp>();
  const { user } = useContext(AuthContext);
  const { savingsData, groupDiscounts } = useContext(SavingsContext);
  
  const chartConfig = {
    backgroundGradientFrom: colors.white,
    backgroundGradientTo: colors.white,
    color: (opacity = 1) => `rgba(79, 70, 229, ${opacity})`,
    strokeWidth: 2,
    barPercentage: 0.5,
    useShadowColorFromDataset: false,
    propsForDots: {
      r: '5',
      strokeWidth: '2',
      stroke: colors.primary,
    },
    propsForLabels: {
      fontSize: 10,
    },
  };
  
  const chartData = {
    labels: savingsData.history.map(item => item.month),
    datasets: [
      {
        data: savingsData.history.map(item => item.amount),
        color: (opacity = 1) => `rgba(79, 70, 229, ${opacity})`,
        strokeWidth: 2,
      },
    ],
    legend: ['Monthly Savings'],
  };
  
  const recentActivity = [
    { action: 'Analyzed electric bill', date: '2 hours ago', savings: 45.50 },
    { action: 'Joined internet group discount', date: 'Yesterday', savings: 35.00 },
    { action: 'Switched phone plan', date: '3 days ago', savings: 22.75 },
  ];
  
  return (
    <ScrollView 
      style={[styles.container, { backgroundColor: colors.background }]}
      showsVerticalScrollIndicator={false}
    >
      <View style={styles.header}>
        <View>
          <Text style={[styles.greeting, { color: colors.gray[500] }]}>
            Good morning,
          </Text>
          <Text style={[styles.userName, { color: colors.text }]}>
            {user?.name || 'User'}
          </Text>
        </View>
        <TouchableOpacity>
          <Image
            source={{ uri: user?.avatar || 'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2' }}
            style={styles.avatar}
          />
        </TouchableOpacity>
      </View>
      
      <View style={styles.savingsCards}>
        <SavingsCard
          title="Total Savings"
          amount={savingsData.total}
          percentChange={24.8}
          icon={<DollarSign size={20} color={colors.success} />}
          iconBackgroundColor={colors.success + '20'}
        />
        
        <SavingsCard
          title="Monthly Savings"
          amount={savingsData.monthly}
          percentChange={44.8}
          icon={<TrendingUp size={20} color={colors.primary} />}
          iconBackgroundColor={colors.primary + '20'}
        />
      </View>
      
      <Card style={styles.chartCard}>
        <View style={styles.chartHeader}>
          <Text style={[styles.chartTitle, { color: colors.text }]}>Savings History</Text>
          <TouchableOpacity>
            <Text style={[styles.viewAllText, { color: colors.primary }]}>View All</Text>
          </TouchableOpacity>
        </View>
        
        <LineChart
          data={chartData}
          width={width - 64}
          height={180}
          chartConfig={chartConfig}
          bezier
          style={styles.chart}
          withInnerLines={false}
          withOuterLines={false}
          withHorizontalLabels={true}
          withVerticalLabels={true}
          withDots={true}
        />
      </Card>
      
      <View style={styles.sectionHeader}>
        <Text style={[styles.sectionTitle, { color: colors.text }]}>Recent Activity</Text>
        <TouchableOpacity>
          <Text style={[styles.viewAllText, { color: colors.primary }]}>View All</Text>
        </TouchableOpacity>
      </View>
      
      <Card style={styles.activityCard}>
        {recentActivity.map((activity, index) => (
          <View key={index} style={[
            styles.activityItem,
            index < recentActivity.length - 1 && { 
              borderBottomWidth: 1, 
              borderBottomColor: colors.gray[200] 
            }
          ]}>
            <View style={[styles.activityIconContainer, { backgroundColor: colors.primary + '10' }]}>
              <DollarSign size={16} color={colors.primary} />
            </View>
            <View style={styles.activityContent}>
              <Text style={[styles.activityText, { color: colors.text }]}>{activity.action}</Text>
              <View style={styles.activityMeta}>
                <Text style={[styles.activityDate, { color: colors.gray[500] }]}>{activity.date}</Text>
                <Text style={[styles.activitySavings, { color: colors.success }]}>
                  Saved ${activity.savings.toFixed(2)}
                </Text>
              </View>
            </View>
          </View>
        ))}
      </Card>
      
      <View style={styles.sectionHeader}>
        <Text style={[styles.sectionTitle, { color: colors.text }]}>Popular Group Discounts</Text>
        <TouchableOpacity>
          <Text style={[styles.viewAllText, { color: colors.primary }]}>View All</Text>
        </TouchableOpacity>
      </View>
      
      {groupDiscounts.slice(0, 2).map(discount => (
        <GroupDiscountCard
          key={discount.id}
          discount={discount}
          onPress={() => navigation.navigate('GroupDiscountDetails', { groupId: discount.id })}
        />
      ))}
      
      <Card style={[styles.connectCard, { backgroundColor: colors.primary }]}>
        <View style={styles.connectContent}>
          <CreditCard size={24} color={colors.white} />
          <View style={styles.connectTextContainer}>
            <Text style={[styles.connectTitle, { color: colors.white }]}>
              Connect Your Bank Account
            </Text>
            <Text style={[styles.connectDescription, { color: colors.white + 'CC' }]}>
              Automatically analyze your recurring bills and find more savings
            </Text>
          </View>
          <ChevronRight size={24} color={colors.white} />
        </View>
      </Card>
      
      <View style={styles.footer} />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 24,
  },
  greeting: {
    fontSize: 14,
  },
  userName: {
    fontSize: 20,
    fontWeight: '700',
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  savingsCards: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  chartCard: {
    marginBottom: 24,
  },
  chartHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  chartTitle: {
    fontSize: 16,
    fontWeight: '600',
  },
  viewAllText: {
    fontSize: 14,
    fontWeight: '500',
  },
  chart: {
    marginLeft: -16,
    borderRadius: 16,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
  },
  activityCard: {
    marginBottom: 24,
    padding: 0,
    overflow: 'hidden',
  },
  activityItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
  },
  activityIconContainer: {
    width: 32,
    height: 32,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  activityContent: {
    flex: 1,
  },
  activityText: {
    fontSize: 14,
    fontWeight: '500',
    marginBottom: 4,
  },
  activityMeta: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  activityDate: {
    fontSize: 12,
  },
  activitySavings: {
    fontSize: 12,
    fontWeight: '500',
  },
  connectCard: {
    marginTop: 8,
    marginBottom: 24,
  },
  connectContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  connectTextContainer: {
    flex: 1,
    marginLeft: 16,
  },
  connectTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 4,
  },
  connectDescription: {
    fontSize: 14,
  },
  footer: {
    height: 20,
  },
});

export default DashboardScreen;

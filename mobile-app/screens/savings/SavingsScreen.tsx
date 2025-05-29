import React, { useState, useContext } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  ScrollView, 
  TouchableOpacity,
  useWindowDimensions
} from 'react-native';
import { 
  DollarSign, 
  TrendingUp, 
  TrendingDown,
  Calendar,
  CheckCircle
} from 'lucide-react-native';
import { BarChart } from 'react-native-chart-kit';
import { useTheme } from '../../hooks/useTheme';
import { SavingsContext } from '../../contexts/SavingsContext';
import Card from '../../components/Card';
import SavingsCard from '../../components/SavingsCard';

const SavingsScreen = () => {
  const { colors, borderRadius } = useTheme();
  const { width } = useWindowDimensions();
  const { savingsData } = useContext(SavingsContext);
  
  const [timeframe, setTimeframe] = useState('6months');
  
  const chartConfig = {
    backgroundGradientFrom: colors.white,
    backgroundGradientTo: colors.white,
    color: (opacity = 1) => `rgba(79, 70, 229, ${opacity})`,
    strokeWidth: 2,
    barPercentage: 0.5,
    useShadowColorFromDataset: false,
    decimalPlaces: 0,
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
      },
    ],
  };
  
  const recentSavings = [
    { 
      title: 'Switched to EcoEnergy Green Plan', 
      date: 'Sep 15, 2023', 
      amount: 28.50, 
      recurring: true,
      category: 'Electricity'
    },
    { 
      title: 'Joined FastNet Internet Group Discount', 
      date: 'Sep 5, 2023', 
      amount: 35.00, 
      recurring: true,
      category: 'Internet'
    },
    { 
      title: 'Optimized Streaming Subscriptions', 
      date: 'Aug 28, 2023', 
      amount: 24.99, 
      recurring: true,
      category: 'Streaming'
    }
  ];
  
  const savingsOpportunities = [
    { 
      title: 'Switch to Time-of-Use Electricity Plan', 
      provider: 'EcoEnergy Solutions',
      amount: 32.50, 
      confidence: 0.92,
      category: 'Electricity'
    },
    { 
      title: 'Bundle Home & Auto Insurance', 
      provider: 'SecureHome Insurance',
      amount: 58.75, 
      confidence: 0.85,
      category: 'Insurance'
    },
    { 
      title: 'Family Mobile Plan', 
      provider: 'ConnectMobile',
      amount: 45.00, 
      confidence: 0.78,
      category: 'Phone'
    }
  ];
  
  const handleTimeframeChange = (newTimeframe: string) => {
    setTimeframe(newTimeframe);
    // In a real app, this would fetch new data based on the timeframe
  };
  
  return (
    <ScrollView 
      style={[styles.container, { backgroundColor: colors.background }]}
      showsVerticalScrollIndicator={false}
    >
      <View style={styles.header}>
        <Text style={[styles.title, { color: colors.text }]}>Your Savings</Text>
        <Text style={[styles.subtitle, { color: colors.gray[500] }]}>
          Track and manage all your savings
        </Text>
      </View>
      
      <View style={styles.savingsCards}>
        <Card style={[styles.totalSavingsCard, { backgroundColor: colors.primary }]}>
          <Text style={[styles.totalSavingsLabel, { color: colors.white + 'CC' }]}>
            Total Savings
          </Text>
          <Text style={[styles.totalSavingsAmount, { color: colors.white }]}>
            ${savingsData.total.toFixed(2)}
          </Text>
          <Text style={[styles.totalSavingsPeriod, { color: colors.white + 'CC' }]}>
            Since you joined
          </Text>
        </Card>
        
        <SavingsCard
          title="Monthly Savings"
          amount={savingsData.monthly}
          percentChange={44.8}
          icon={<Calendar size={20} color={colors.primary} />}
          iconBackgroundColor={colors.primary + '10'}
        />
      </View>
      
      <Card style={styles.chartCard}>
        <View style={styles.chartHeader}>
          <Text style={[styles.chartTitle, { color: colors.text }]}>Savings History</Text>
          <View style={styles.timeframeButtons}>
            <TouchableOpacity
              style={[
                styles.timeframeButton,
                timeframe === '3months' && { backgroundColor: colors.primary },
                { borderRadius: borderRadius.md }
              ]}
              onPress={() => handleTimeframeChange('3months')}
            >
              <Text 
                style={[
                  styles.timeframeButtonText, 
                  { color: timeframe === '3months' ? colors.white : colors.gray[700] }
                ]}
              >
                3M
              </Text>
            </TouchableOpacity>
            
            <TouchableOpacity
              style={[
                styles.timeframeButton,
                timeframe === '6months' && { backgroundColor: colors.primary },
                { borderRadius: borderRadius.md }
              ]}
              onPress={() => handleTimeframeChange('6months')}
            >
              <Text 
                style={[
                  styles.timeframeButtonText, 
                  { color: timeframe === '6months' ? colors.white : colors.gray[700] }
                ]}
              >
                6M
              </Text>
            </TouchableOpacity>
            
            <TouchableOpacity
              style={[
                styles.timeframeButton,
                timeframe === '1year' && { backgroundColor: colors.primary },
                { borderRadius: borderRadius.md }
              ]}
              onPress={() => handleTimeframeChange('1year')}
            >
              <Text 
                style={[
                  styles.timeframeButtonText, 
                  { color: timeframe === '1year' ? colors.white : colors.gray[700] }
                ]}
              >
                1Y
              </Text>
            </TouchableOpacity>
          </View>
        </View>
        
        <BarChart
          data={chartData}
          width={width - 64}
          height={220}
          chartConfig={chartConfig}
          style={styles.chart}
          showBarTops={false}
          fromZero={true}
          withInnerLines={false}
          yAxisLabel="$"
        />
      </Card>
      
      <Card>
        <Text style={[styles.sectionTitle, { color: colors.text }]}>Savings by Category</Text>
        <View style={styles.categoriesContainer}>
          {savingsData.categories.map((category, index) => (
            <View key={index} style={styles.categoryItem}>
              <View style={styles.categoryHeader}>
                <Text style={[styles.categoryName, { color: colors.text }]}>{category.name}</Text>
                <Text style={[styles.categoryAmount, { color: colors.text }]}>
                  ${category.amount.toFixed(2)}
                </Text>
              </View>
              <View style={[styles.categoryBar, { backgroundColor: colors.gray[200] }]}>
                <View 
                  style={[
                    styles.categoryFill, 
                    { 
                      width: `${(category.amount / savingsData.total) * 100}%`,
                      backgroundColor: getCategoryColor(category.color)
                    }
                  ]} 
                />
              </View>
            </View>
          ))}
        </View>
      </Card>
      
      <View style={styles.twoColumnContainer}>
        <View style={styles.column}>
          <Card>
            <Text style={[styles.sectionTitle, { color: colors.text }]}>Recent Savings</Text>
            <View style={styles.recentSavingsContainer}>
              {recentSavings.map((saving, index) => (
                <View 
                  key={index} 
                  style={[
                    styles.savingItem,
                    { backgroundColor: colors.gray[50], borderRadius: borderRadius.md }
                  ]}
                >
                  <View style={styles.savingHeader}>
                    <View style={[
                      styles.savingIconContainer, 
                      { backgroundColor: colors.primary + '10' }
                    ]}>
                      <DollarSign size={16} color={colors.primary} />
                    </View>
                    <View style={styles.savingHeaderContent}>
                      <Text 
                        style={[styles.savingTitle, { color: colors.text }]}
                        numberOfLines={2}
                      >
                        {saving.title}
                      </Text>
                      <Text style={[styles.savingAmount, { color: colors.success }]}>
                        +${saving.amount.toFixed(2)}
                      </Text>
                    </View>
                  </View>
                  
                  <View style={styles.savingFooter}>
                    <Text style={[styles.savingDate, { color: colors.gray[500] }]}>
                      {saving.date}
                    </Text>
                    <Text style={[styles.savingType, { color: colors.gray[700] }]}>
                      {saving.recurring ? 'Monthly' : 'One-time'}
                    </Text>
                  </View>
                </View>
              ))}
            </View>
          </Card>
        </View>
        
        <View style={styles.column}>
          <Card>
            <Text style={[styles.sectionTitle, { color: colors.text }]}>Opportunities</Text>
            <View style={styles.opportunitiesContainer}>
              {savingsOpportunities.map((opportunity, index) => (
                <View 
                  key={index} 
                  style={[
                    styles.opportunityItem,
                    { 
                      borderColor: colors.gray[200],
                      borderRadius: borderRadius.md
                    }
                  ]}
                >
                  <Text 
                    style={[styles.opportunityTitle, { color: colors.text }]}
                    numberOfLines={2}
                  >
                    {opportunity.title}
                  </Text>
                  <Text style={[styles.opportunityProvider, { color: colors.gray[500] }]}>
                    {opportunity.provider}
                  </Text>
                  
                  <View style={styles.opportunityAmount}>
                    <Text style={[styles.opportunityAmountText, { color: colors.success }]}>
                      +${opportunity.amount.toFixed(2)}/mo
                    </Text>
                  </View>
                  
                  <View style={styles.confidenceContainer}>
                    <View style={[styles.confidenceBar, { backgroundColor: colors.gray[200] }]}>
                      <View 
                        style={[
                          styles.confidenceFill, 
                          { 
                            width: `${opportunity.confidence * 100}%`,
                            backgroundColor: colors.primary
                          }
                        ]} 
                      />
                    </View>
                    <Text style={[styles.confidenceText, { color: colors.gray[500] }]}>
                      {Math.round(opportunity.confidence * 100)}% match
                    </Text>
                  </View>
                  
                  <TouchableOpacity 
                    style={[
                      styles.applyButton, 
                      { 
                        borderColor: colors.primary,
                        borderRadius: borderRadius.md
                      }
                    ]}
                  >
                    <Text style={[styles.applyButtonText, { color: colors.primary }]}>
                      Apply Savings
                    </Text>
                  </TouchableOpacity>
                </View>
              ))}
            </View>
          </Card>
        </View>
      </View>
      
      <View style={styles.footer} />
    </ScrollView>
  );
};

// Helper function to get category color
const getCategoryColor = (colorName: string) => {
  switch (colorName) {
    case 'green':
      return '#10B981';
    case 'blue':
      return '#3B82F6';
    case 'purple':
      return '#8B5CF6';
    case 'red':
      return '#EF4444';
    case 'yellow':
      return '#F59E0B';
    default:
      return '#4F46E5';
  }
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  header: {
    marginBottom: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 14,
  },
  savingsCards: {
    marginBottom: 16,
  },
  totalSavingsCard: {
    marginBottom: 12,
  },
  totalSavingsLabel: {
    fontSize: 14,
    marginBottom: 4,
  },
  totalSavingsAmount: {
    fontSize: 32,
    fontWeight: '700',
    marginBottom: 4,
  },
  totalSavingsPeriod: {
    fontSize: 12,
  },
  chartCard: {
    marginBottom: 16,
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
  timeframeButtons: {
    flexDirection: 'row',
  },
  timeframeButton: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    backgroundColor: '#F3F4F6',
    marginLeft: 8,
  },
  timeframeButtonText: {
    fontSize: 12,
    fontWeight: '500',
  },
  chart: {
    marginLeft: -16,
    borderRadius: 16,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 12,
  },
  categoriesContainer: {
    marginTop: 8,
  },
  categoryItem: {
    marginBottom: 12,
  },
  categoryHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 4,
  },
  categoryName: {
    fontSize: 14,
    fontWeight: '500',
  },
  categoryAmount: {
    fontSize: 14,
    fontWeight: '500',
  },
  categoryBar: {
    height: 8,
    borderRadius: 4,
    overflow: 'hidden',
  },
  categoryFill: {
    height: '100%',
    borderRadius: 4,
  },
  twoColumnContainer: {
    flexDirection: 'row',
    marginTop: 16,
    marginHorizontal: -8,
  },
  column: {
    flex: 1,
    paddingHorizontal: 8,
  },
  recentSavingsContainer: {
    marginTop: 8,
  },
  savingItem: {
    padding: 12,
    marginBottom: 12,
  },
  savingHeader: {
    flexDirection: 'row',
    marginBottom: 8,
  },
  savingIconContainer: {
    width: 32,
    height: 32,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  savingHeaderContent: {
    flex: 1,
  },
  savingTitle: {
    fontSize: 14,
    fontWeight: '500',
    marginBottom: 4,
  },
  savingAmount: {
    fontSize: 14,
    fontWeight: '600',
  },
  savingFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  savingDate: {
    fontSize: 12,
  },
  savingType: {
    fontSize: 12,
    fontWeight: '500',
  },
  opportunitiesContainer: {
    marginTop: 8,
  },
  opportunityItem: {
    padding: 12,
    marginBottom: 12,
    borderWidth: 1,
  },
  opportunityTitle: {
    fontSize: 14,
    fontWeight: '500',
    marginBottom: 4,
  },
  opportunityProvider: {
    fontSize: 12,
    marginBottom: 8,
  },
  opportunityAmount: {
    marginBottom: 8,
  },
  opportunityAmountText: {
    fontSize: 16,
    fontWeight: '600',
  },
  confidenceContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  confidenceBar: {
    flex: 1,
    height: 4,
    borderRadius: 2,
    marginRight: 8,
  },
  confidenceFill: {
    height: '100%',
    borderRadius: 2,
  },
  confidenceText: {
    fontSize: 12,
    width: 60,
  },
  applyButton: {
    paddingVertical: 8,
    borderWidth: 1,
    alignItems: 'center',
  },
  applyButtonText: {
    fontSize: 14,
    fontWeight: '500',
  },
  footer: {
    height: 20,
  },
});

export default SavingsScreen;

import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput } from 'react-native';
import { LineChart } from 'react-native-chart-kit';
import { Dimensions } from 'react-native';
import { Target, DollarSign, Calendar, TrendingUp } from 'lucide-react-native';
import { useTheme } from '../hooks/useTheme';

const screenWidth = Dimensions.get('window').width;

interface SavingsGoalTrackerProps {
  initialGoal?: number;
  initialTimeframe?: number;
  initialCurrentSavings?: number;
}

const SavingsGoalTracker: React.FC<SavingsGoalTrackerProps> = ({
  initialGoal = 1000,
  initialTimeframe = 6,
  initialCurrentSavings = 250
}) => {
  const { colors, borderRadius } = useTheme();
  const [goal, setGoal] = useState(initialGoal);
  const [timeframe, setTimeframe] = useState(initialTimeframe);
  const [currentSavings, setCurrentSavings] = useState(initialCurrentSavings);
  const [isEditingGoal, setIsEditingGoal] = useState(false);
  const [isEditingTimeframe, setIsEditingTimeframe] = useState(false);
  const [isEditingCurrentSavings, setIsEditingCurrentSavings] = useState(false);
  
  // Calculate monthly target and progress
  const monthlyTarget = goal / timeframe;
  const progressPercentage = Math.min((currentSavings / goal) * 100, 100);
  
  // Generate projection data
  const generateProjectionData = () => {
    const labels = [];
    const actualData = [];
    const projectedData = [];
    
    // Past data (3 months)
    const pastMonths = 3;
    const monthlyGrowth = currentSavings / pastMonths;
    
    for (let i = -pastMonths; i <= timeframe; i++) {
      const date = new Date();
      date.setMonth(date.getMonth() + i);
      labels.push(date.toLocaleDateString('en-US', { month: 'short' }));
      
      if (i <= 0) {
        // Past and current savings
        actualData.push(Math.max(0, currentSavings + (i * monthlyGrowth)));
      } else {
        // Projected savings
        actualData.push(currentSavings + (monthlyTarget * i));
      }
    }
    
    return { labels, actualData };
  };
  
  const { labels, actualData } = generateProjectionData();
  
  const chartData = {
    labels,
    datasets: [
      {
        data: actualData,
        color: () => colors.primary,
        strokeWidth: 2
      }
    ],
    legend: ['Savings Projection']
  };
  
  const chartConfig = {
    backgroundGradientFrom: colors.white,
    backgroundGradientTo: colors.white,
    decimalPlaces: 0,
    color: () => colors.primary,
    labelColor: () => colors.text,
    style: {
      borderRadius: 16
    },
    propsForDots: {
      r: '6',
      strokeWidth: '2',
      stroke: colors.primary
    }
  };
  
  return (
    <View style={[styles.container, { backgroundColor: colors.white, borderRadius: borderRadius.lg }]}>
      <View style={styles.header}>
        <Target color={colors.primary} size={24} />
        <Text style={[styles.title, { color: colors.text }]}>Savings Goal Tracker</Text>
      </View>
      
      <View style={styles.goalContainer}>
        <View style={[styles.goalItem, { backgroundColor: colors.gray[50], borderRadius: borderRadius.md }]}>
          <View style={styles.goalItemHeader}>
            <DollarSign color={colors.primary} size={18} />
            <Text style={[styles.goalItemTitle, { color: colors.text }]}>Goal Amount</Text>
          </View>
          
          {isEditingGoal ? (
            <View style={styles.inputContainer}>
              <TextInput
                style={[styles.input, { borderColor: colors.gray[300], color: colors.text }]}
                value={goal.toString()}
                onChangeText={(text) => setGoal(Number(text) || 0)}
                keyboardType="numeric"
                onBlur={() => setIsEditingGoal(false)}
                autoFocus
              />
            </View>
          ) : (
            <TouchableOpacity 
              style={styles.valueContainer} 
              onPress={() => setIsEditingGoal(true)}
            >
              <Text style={[styles.goalValue, { color: colors.text }]}>${goal}</Text>
            </TouchableOpacity>
          )}
        </View>
        
        <View style={[styles.goalItem, { backgroundColor: colors.gray[50], borderRadius: borderRadius.md }]}>
          <View style={styles.goalItemHeader}>
            <Calendar color={colors.primary} size={18} />
            <Text style={[styles.goalItemTitle, { color: colors.text }]}>Timeframe</Text>
          </View>
          
          {isEditingTimeframe ? (
            <View style={styles.inputContainer}>
              <TextInput
                style={[styles.input, { borderColor: colors.gray[300], color: colors.text }]}
                value={timeframe.toString()}
                onChangeText={(text) => setTimeframe(Number(text) || 1)}
                keyboardType="numeric"
                onBlur={() => setIsEditingTimeframe(false)}
                autoFocus
              />
            </View>
          ) : (
            <TouchableOpacity 
              style={styles.valueContainer} 
              onPress={() => setIsEditingTimeframe(true)}
            >
              <Text style={[styles.goalValue, { color: colors.text }]}>{timeframe} months</Text>
            </TouchableOpacity>
          )}
        </View>
        
        <View style={[styles.goalItem, { backgroundColor: colors.gray[50], borderRadius: borderRadius.md }]}>
          <View style={styles.goalItemHeader}>
            <TrendingUp color={colors.primary} size={18} />
            <Text style={[styles.goalItemTitle, { color: colors.text }]}>Current Savings</Text>
          </View>
          
          {isEditingCurrentSavings ? (
            <View style={styles.inputContainer}>
              <TextInput
                style={[styles.input, { borderColor: colors.gray[300], color: colors.text }]}
                value={currentSavings.toString()}
                onChangeText={(text) => setCurrentSavings(Number(text) || 0)}
                keyboardType="numeric"
                onBlur={() => setIsEditingCurrentSavings(false)}
                autoFocus
              />
            </View>
          ) : (
            <TouchableOpacity 
              style={styles.valueContainer} 
              onPress={() => setIsEditingCurrentSavings(true)}
            >
              <Text style={[styles.goalValue, { color: colors.text }]}>${currentSavings}</Text>
            </TouchableOpacity>
          )}
        </View>
      </View>
      
      <View style={styles.progressSection}>
        <View style={styles.progressHeader}>
          <Text style={[styles.progressText, { color: colors.text }]}>
            Progress: {progressPercentage.toFixed(1)}%
          </Text>
          <Text style={[styles.progressText, { color: colors.text }]}>
            ${currentSavings} of ${goal}
          </Text>
        </View>
        
        <View style={[styles.progressBar, { backgroundColor: colors.gray[200] }]}>
          <View 
            style={[
              styles.progressFill, 
              { 
                width: `${progressPercentage}%`,
                backgroundColor: colors.primary
              }
            ]} 
          />
        </View>
      </View>
      
      <View style={styles.targetSection}>
        <Text style={[styles.targetText, { color: colors.text }]}>
          Monthly Target: <Text style={{ color: colors.primary }}>${monthlyTarget.toFixed(2)}</Text>
        </Text>
        <Text style={[styles.targetDescription, { color: colors.gray[600] }]}>
          To reach your goal of ${goal} in {timeframe} months, you need to save ${monthlyTarget.toFixed(2)} per month.
        </Text>
      </View>
      
      <View style={styles.chartContainer}>
        <Text style={[styles.chartTitle, { color: colors.text }]}>Savings Projection</Text>
        <LineChart
          data={chartData}
          width={screenWidth - 64}
          height={180}
          chartConfig={chartConfig}
          bezier
          style={{ borderRadius: borderRadius.md }}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
    marginLeft: 8,
  },
  goalContainer: {
    marginBottom: 16,
  },
  goalItem: {
    padding: 12,
    marginBottom: 8,
  },
  goalItemHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  goalItemTitle: {
    fontSize: 14,
    fontWeight: '500',
    marginLeft: 8,
  },
  valueContainer: {
    paddingVertical: 4,
  },
  goalValue: {
    fontSize: 16,
    fontWeight: '600',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  input: {
    flex: 1,
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderWidth: 1,
    borderRadius: 4,
  },
  progressSection: {
    marginBottom: 16,
  },
  progressHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  progressText: {
    fontSize: 14,
    fontWeight: '500',
  },
  progressBar: {
    height: 8,
    borderRadius: 4,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
  },
  targetSection: {
    marginBottom: 16,
  },
  targetText: {
    fontSize: 16,
    fontWeight: '500',
    marginBottom: 4,
  },
  targetDescription: {
    fontSize: 14,
  },
  chartContainer: {
    marginTop: 8,
  },
  chartTitle: {
    fontSize: 16,
    fontWeight: '500',
    marginBottom: 8,
  },
});

export default SavingsGoalTracker;

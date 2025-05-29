import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { PieChart } from 'react-native-chart-kit';
import { Dimensions } from 'react-native';
import { PieChart as PieChartIcon, DollarSign, TrendingUp, AlertTriangle } from 'lucide-react-native';
import { useTheme } from '../hooks/useTheme';

const screenWidth = Dimensions.get('window').width;

interface ExpenseCategory {
  id: number;
  category: string;
  amount: number;
  color: string;
}

interface BudgetSuggestion {
  category: string;
  message: string;
  potentialSavings: number;
  priority: 'High' | 'Medium' | 'Low';
}

const SmartBudgetWidget: React.FC = () => {
  const { colors, borderRadius } = useTheme();
  const [income, setIncome] = useState(4000);
  const [expenses, setExpenses] = useState<ExpenseCategory[]>([
    { id: 1, category: 'Housing', amount: 1200, color: '#4f46e5' },
    { id: 2, category: 'Utilities', amount: 300, color: '#8b5cf6' },
    { id: 3, category: 'Food', amount: 500, color: '#ec4899' },
    { id: 4, category: 'Transportation', amount: 200, color: '#f97316' },
    { id: 5, category: 'Insurance', amount: 150, color: '#14b8a6' }
  ]);
  
  // Calculate totals
  const totalExpenses = expenses.reduce((sum, expense) => sum + expense.amount, 0);
  const savings = income - totalExpenses;
  const savingsRate = (savings / income) * 100;
  
  // Generate AI suggestions
  const aiSuggestions: BudgetSuggestion[] = [
    {
      category: 'Housing',
      message: 'Your housing costs are 30% of your income. Consider roommates or a more affordable option to save up to $300/month.',
      potentialSavings: 300,
      priority: 'High'
    },
    {
      category: 'Food',
      message: 'You could save approximately $100/month on food by meal prepping and reducing takeout to once a week.',
      potentialSavings: 100,
      priority: 'Medium'
    }
  ];
  
  // Prepare chart data
  const chartData = expenses.map(expense => ({
    name: expense.category,
    amount: expense.amount,
    color: expense.color,
    legendFontColor: colors.text,
    legendFontSize: 12
  }));
  
  const chartConfig = {
    backgroundGradientFrom: colors.white,
    backgroundGradientTo: colors.white,
    color: () => colors.text,
    strokeWidth: 2,
    barPercentage: 0.5,
    useShadowColorFromDataset: false
  };
  
  return (
    <View style={[styles.container, { backgroundColor: colors.white, borderRadius: borderRadius.lg }]}>
      <View style={styles.header}>
        <PieChartIcon color={colors.primary} size={24} />
        <Text style={[styles.title, { color: colors.text }]}>Smart Budget Overview</Text>
      </View>
      
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.summaryContainer}>
          <View style={[styles.summaryItem, { backgroundColor: colors.gray[50], borderRadius: borderRadius.md }]}>
            <View style={styles.summaryItemHeader}>
              <DollarSign color={colors.primary} size={18} />
              <Text style={[styles.summaryItemTitle, { color: colors.text }]}>Monthly Income</Text>
            </View>
            <Text style={[styles.summaryItemValue, { color: colors.text }]}>${income}</Text>
          </View>
          
          <View style={[styles.summaryItem, { backgroundColor: colors.gray[50], borderRadius: borderRadius.md }]}>
            <View style={styles.summaryItemHeader}>
              <TrendingUp color={colors.primary} size={18} />
              <Text style={[styles.summaryItemTitle, { color: colors.text }]}>Monthly Savings</Text>
            </View>
            <Text style={[styles.summaryItemValue, { color: colors.text }]}>${savings.toFixed(2)}</Text>
            <View style={[styles.savingsRateBadge, { 
              backgroundColor: savingsRate >= 20 ? colors.green[100] : colors.yellow[100],
              borderRadius: borderRadius.full
            }]}>
              <Text style={{ 
                color: savingsRate >= 20 ? colors.green[800] : colors.yellow[800],
                fontSize: 12,
                fontWeight: '500'
              }}>
                {savingsRate.toFixed(1)}% of income
              </Text>
            </View>
          </View>
        </View>
        
        <View style={styles.chartSection}>
          <Text style={[styles.sectionTitle, { color: colors.text }]}>Expense Breakdown</Text>
          <View style={styles.chartContainer}>
            <PieChart
              data={chartData}
              width={screenWidth - 64}
              height={180}
              chartConfig={chartConfig}
              accessor="amount"
              backgroundColor="transparent"
              paddingLeft="15"
              absolute
            />
          </View>
        </View>
        
        <View style={styles.expensesSection}>
          <Text style={[styles.sectionTitle, { color: colors.text }]}>Top Expenses</Text>
          {expenses.slice(0, 3).map((expense) => (
            <View key={expense.id} style={[styles.expenseItem, { borderBottomColor: colors.gray[200] }]}>
              <View style={styles.expenseItemLeft}>
                <View style={[styles.expenseColorDot, { backgroundColor: expense.color }]} />
                <Text style={[styles.expenseCategory, { color: colors.text }]}>{expense.category}</Text>
              </View>
              <View style={styles.expenseItemRight}>
                <Text style={[styles.expenseAmount, { color: colors.text }]}>${expense.amount}</Text>
                <Text style={[styles.expensePercentage, { color: colors.gray[500] }]}>
                  {((expense.amount / totalExpenses) * 100).toFixed(1)}%
                </Text>
              </View>
            </View>
          ))}
          <TouchableOpacity style={styles.viewAllButton}>
            <Text style={{ color: colors.primary }}>View All Expenses</Text>
          </TouchableOpacity>
        </View>
        
        <View style={styles.suggestionsSection}>
          <View style={styles.suggestionHeader}>
            <AlertTriangle color={colors.primary} size={18} />
            <Text style={[styles.sectionTitle, { color: colors.text, marginLeft: 8 }]}>AI Savings Suggestions</Text>
          </View>
          
          {aiSuggestions.map((suggestion, index) => (
            <View 
              key={index} 
              style={[
                styles.suggestionItem, 
                { 
                  backgroundColor: colors.blue[50], 
                  borderRadius: borderRadius.md,
                  borderLeftColor: colors.primary,
                }
              ]}
            >
              <View style={styles.suggestionItemHeader}>
                <Text style={[styles.suggestionCategory, { color: colors.text }]}>{suggestion.category}</Text>
                <View style={[
                  styles.priorityBadge,
                  { 
                    backgroundColor: 
                      suggestion.priority === 'High' ? colors.red[100] :
                      suggestion.priority === 'Medium' ? colors.yellow[100] :
                      colors.green[100],
                    borderRadius: borderRadius.full
                  }
                ]}>
                  <Text style={{ 
                    color: 
                      suggestion.priority === 'High' ? colors.red[800] :
                      suggestion.priority === 'Medium' ? colors.yellow[800] :
                      colors.green[800],
                    fontSize: 10,
                    fontWeight: '500'
                  }}>
                    {suggestion.priority}
                  </Text>
                </View>
              </View>
              <Text style={[styles.suggestionMessage, { color: colors.gray[600] }]}>{suggestion.message}</Text>
              <Text style={[styles.potentialSavings, { color: colors.primary }]}>
                Potential savings: ${suggestion.potentialSavings.toFixed(2)}/month
              </Text>
            </View>
          ))}
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    marginHorizontal: 16,
    marginVertical: 8,
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
  summaryContainer: {
    marginBottom: 16,
  },
  summaryItem: {
    padding: 12,
    marginBottom: 8,
  },
  summaryItemHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  summaryItemTitle: {
    fontSize: 14,
    fontWeight: '500',
    marginLeft: 8,
  },
  summaryItemValue: {
    fontSize: 20,
    fontWeight: '700',
  },
  savingsRateBadge: {
    alignSelf: 'flex-start',
    paddingHorizontal: 8,
    paddingVertical: 4,
    marginTop: 4,
  },
  chartSection: {
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 12,
  },
  chartContainer: {
    alignItems: 'center',
  },
  expensesSection: {
    marginBottom: 16,
  },
  expenseItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 12,
    borderBottomWidth: 1,
  },
  expenseItemLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  expenseColorDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    marginRight: 8,
  },
  expenseCategory: {
    fontSize: 14,
    fontWeight: '500',
  },
  expenseItemRight: {
    alignItems: 'flex-end',
  },
  expenseAmount: {
    fontSize: 14,
    fontWeight: '600',
  },
  expensePercentage: {
    fontSize: 12,
  },
  viewAllButton: {
    paddingVertical: 8,
    alignItems: 'center',
    marginTop: 4,
  },
  suggestionsSection: {
    marginBottom: 16,
  },
  suggestionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  suggestionItem: {
    padding: 12,
    marginBottom: 8,
    borderLeftWidth: 4,
  },
  suggestionItemHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  suggestionCategory: {
    fontSize: 14,
    fontWeight: '600',
  },
  priorityBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
  },
  suggestionMessage: {
    fontSize: 14,
    marginBottom: 8,
  },
  potentialSavings: {
    fontSize: 14,
    fontWeight: '600',
  },
});

export default SmartBudgetWidget;

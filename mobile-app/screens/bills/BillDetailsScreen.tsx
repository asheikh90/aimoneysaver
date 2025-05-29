import React, { useState, useContext, useEffect } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  ScrollView, 
  Image,
  TouchableOpacity
} from 'react-native';
import { RouteProp, useRoute } from '@react-navigation/native';
import { 
  CheckCircle, 
  AlertTriangle,
  ChevronDown,
  ChevronUp
} from 'lucide-react-native';
import { useTheme } from '../../hooks/useTheme';
import { SavingsContext } from '../../contexts/SavingsContext';
import { RootStackParamList } from '../../navigation/RootNavigator';
import Card from '../../components/Card';
import Button from '../../components/Button';

type BillDetailsRouteProp = RouteProp<RootStackParamList, 'BillDetails'>;

interface SavingOpportunity {
  description: string;
  amount: number;
  confidence: number;
}

const BillDetailsScreen = () => {
  const { colors, borderRadius } = useTheme();
  const route = useRoute<BillDetailsRouteProp>();
  const { bills } = useContext(SavingsContext);
  
  const [bill, setBill] = useState<any>(null);
  const [expandedSections, setExpandedSections] = useState<Record<string, boolean>>({
    summary: true,
    breakdown: false,
    savings: true,
  });
  
  // Mock bill analysis data
  const [analysis, setAnalysis] = useState<any>({
    provider: 'Energy Company XYZ',
    billDate: '2023-09-15',
    dueDate: '2023-10-05',
    totalAmount: 142.75,
    lineItems: [
      { description: 'Electricity usage', amount: 98.50 },
      { description: 'Service fee', amount: 25.00 },
      { description: 'Environmental charge', amount: 12.25 },
      { description: 'Tax', amount: 7.00 }
    ],
    potentialSavings: [
      { description: 'Switch to time-of-use plan', amount: 22.50, confidence: 0.85 },
      { description: 'Energy efficiency rebate', amount: 15.00, confidence: 0.75 },
      { description: 'Group discount opportunity', amount: 18.75, confidence: 0.92 }
    ]
  });
  
  useEffect(() => {
    // Find the bill by ID
    const foundBill = bills.find(b => b.id === route.params.billId);
    if (foundBill) {
      setBill(foundBill);
    }
  }, [route.params.billId, bills]);
  
  const toggleSection = (section: string) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };
  
  const totalSavings = analysis.potentialSavings.reduce(
    (sum: number, item: SavingOpportunity) => sum + item.amount, 
    0
  );
  
  const savingsPercentage = (totalSavings / analysis.totalAmount * 100).toFixed(1);
  
  const renderSectionHeader = (title: string, section: string) => (
    <TouchableOpacity 
      style={styles.sectionHeader}
      onPress={() => toggleSection(section)}
    >
      <Text style={[styles.sectionTitle, { color: colors.text }]}>{title}</Text>
      {expandedSections[section] ? (
        <ChevronUp size={20} color={colors.gray[500]} />
      ) : (
        <ChevronDown size={20} color={colors.gray[500]} />
      )}
    </TouchableOpacity>
  );
  
  if (!bill) {
    return (
      <View style={[styles.container, { backgroundColor: colors.background }]}>
        <Text style={{ color: colors.text }}>Loading...</Text>
      </View>
    );
  }
  
  return (
    <ScrollView 
      style={[styles.container, { backgroundColor: colors.background }]}
      contentContainerStyle={styles.contentContainer}
    >
      {bill.imageUri && (
        <Image
          source={{ uri: bill.imageUri }}
          style={[styles.billImage, { borderRadius: borderRadius.md }]}
        />
      )}
      
      <Card>
        {renderSectionHeader('Bill Summary', 'summary')}
        
        {expandedSections.summary && (
          <View style={styles.summaryContent}>
            <View style={styles.summaryRow}>
              <Text style={[styles.summaryLabel, { color: colors.gray[500] }]}>Provider</Text>
              <Text style={[styles.summaryValue, { color: colors.text }]}>{analysis.provider}</Text>
            </View>
            
            <View style={styles.summaryRow}>
              <Text style={[styles.summaryLabel, { color: colors.gray[500] }]}>Bill Date</Text>
              <Text style={[styles.summaryValue, { color: colors.text }]}>{analysis.billDate}</Text>
            </View>
            
            <View style={styles.summaryRow}>
              <Text style={[styles.summaryLabel, { color: colors.gray[500] }]}>Due Date</Text>
              <Text style={[styles.summaryValue, { color: colors.text }]}>{analysis.dueDate}</Text>
            </View>
            
            <View style={styles.summaryRow}>
              <Text style={[styles.summaryLabel, { color: colors.gray[500] }]}>Total Amount</Text>
              <Text style={[styles.summaryValue, { color: colors.text }]}>
                ${analysis.totalAmount.toFixed(2)}
              </Text>
            </View>
          </View>
        )}
      </Card>
      
      <Card>
        {renderSectionHeader('Bill Breakdown', 'breakdown')}
        
        {expandedSections.breakdown && (
          <View style={styles.breakdownContent}>
            {analysis.lineItems.map((item: any, index: number) => (
              <View 
                key={index} 
                style={[
                  styles.breakdownRow,
                  index < analysis.lineItems.length - 1 && {
                    borderBottomWidth: 1,
                    borderBottomColor: colors.gray[200]
                  }
                ]}
              >
                <Text style={[styles.breakdownLabel, { color: colors.text }]}>
                  {item.description}
                </Text>
                <Text style={[styles.breakdownValue, { color: colors.text }]}>
                  ${item.amount.toFixed(2)}
                </Text>
              </View>
            ))}
          </View>
        )}
      </Card>
      
      <Card style={[styles.savingsCard, { backgroundColor: colors.success + '10' }]}>
        {renderSectionHeader('AI-Powered Savings Opportunities', 'savings')}
        
        {expandedSections.savings && (
          <View style={styles.savingsContent}>
            <View style={styles.savingsSummary}>
              <View style={[styles.savingsIconContainer, { backgroundColor: colors.success + '20' }]}>
                <CheckCircle size={24} color={colors.success} />
              </View>
              <View style={styles.savingsSummaryText}>
                <Text style={[styles.savingsSummaryTitle, { color: colors.success }]}>
                  Potential Savings Found
                </Text>
                <Text style={[styles.savingsSummarySubtitle, { color: colors.success }]}>
                  ${totalSavings.toFixed(2)} ({savingsPercentage}% of your bill)
                </Text>
              </View>
            </View>
            
            <View style={styles.savingsOpportunities}>
              {analysis.potentialSavings.map((saving: SavingOpportunity, index: number) => (
                <View 
                  key={index} 
                  style={[
                    styles.savingItem, 
                    { 
                      backgroundColor: colors.white,
                      borderRadius: borderRadius.md
                    }
                  ]}
                >
                  <View style={styles.savingHeader}>
                    <View style={[
                      styles.savingIconContainer, 
                      { 
                        backgroundColor: saving.confidence > 0.8 
                          ? colors.success + '20' 
                          : colors.warning + '20' 
                      }
                    ]}>
                      {saving.confidence > 0.8 ? (
                        <CheckCircle size={16} color={colors.success} />
                      ) : (
                        <AlertTriangle size={16} color={colors.warning} />
                      )}
                    </View>
                    <View style={styles.savingHeaderContent}>
                      <Text style={[styles.savingTitle, { color: colors.text }]}>
                        {saving.description}
                      </Text>
                      <Text style={[styles.savingAmount, { color: colors.success }]}>
                        Save ${saving.amount.toFixed(2)}
                      </Text>
                    </View>
                  </View>
                  
                  <View style={styles.confidenceContainer}>
                    <View style={[styles.confidenceBar, { backgroundColor: colors.gray[200] }]}>
                      <View 
                        style={[
                          styles.confidenceFill, 
                          { 
                            width: `${saving.confidence * 100}%`,
                            backgroundColor: saving.confidence > 0.8 
                              ? colors.success 
                              : colors.warning
                          }
                        ]} 
                      />
                    </View>
                    <Text style={[styles.confidenceText, { color: colors.gray[500] }]}>
                      {Math.round(saving.confidence * 100)}% confidence
                    </Text>
                  </View>
                </View>
              ))}
            </View>
            
            <Button
              title="Apply All Savings"
              style={styles.applyButton}
            />
          </View>
        )}
      </Card>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  contentContainer: {
    padding: 16,
    paddingBottom: 32,
  },
  billImage: {
    width: '100%',
    height: 200,
    marginBottom: 16,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 8,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
  },
  summaryContent: {
    marginTop: 8,
  },
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 8,
  },
  summaryLabel: {
    fontSize: 14,
  },
  summaryValue: {
    fontSize: 14,
    fontWeight: '500',
  },
  breakdownContent: {
    marginTop: 8,
  },
  breakdownRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 12,
  },
  breakdownLabel: {
    fontSize: 14,
  },
  breakdownValue: {
    fontSize: 14,
    fontWeight: '500',
  },
  savingsCard: {
    borderWidth: 1,
    borderColor: '#D1FAE5',
  },
  savingsContent: {
    marginTop: 8,
  },
  savingsSummary: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  savingsIconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  savingsSummaryText: {
    flex: 1,
  },
  savingsSummaryTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 2,
  },
  savingsSummarySubtitle: {
    fontSize: 14,
  },
  savingsOpportunities: {
    marginBottom: 16,
  },
  savingItem: {
    padding: 12,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  savingHeader: {
    flexDirection: 'row',
    alignItems: 'center',
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
    marginBottom: 2,
  },
  savingAmount: {
    fontSize: 14,
    fontWeight: '600',
  },
  confidenceContainer: {
    flexDirection: 'row',
    alignItems: 'center',
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
  },
  applyButton: {
    marginTop: 8,
  },
});

export default BillDetailsScreen;

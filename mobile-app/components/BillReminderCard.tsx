import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Calendar, DollarSign, AlertCircle, ChevronRight } from 'lucide-react-native';
import { useTheme } from '../hooks/useTheme';

interface Bill {
  id: string;
  provider: string;
  type: string;
  amount: number;
  dueDate: string;
  status: 'upcoming' | 'overdue' | 'paid';
  savingsFound: boolean;
}

interface BillReminderCardProps {
  bill: Bill;
  onPress: (bill: Bill) => void;
}

const BillReminderCard: React.FC<BillReminderCardProps> = ({ bill, onPress }) => {
  const { colors, borderRadius } = useTheme();
  
  const daysUntilDue = () => {
    const today = new Date();
    const dueDate = new Date(bill.dueDate);
    const diffTime = dueDate.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };
  
  const days = daysUntilDue();
  
  const getStatusColor = () => {
    if (bill.status === 'paid') return colors.green[500];
    if (bill.status === 'overdue') return colors.red[500];
    if (days <= 3) return colors.orange[500];
    return colors.blue[500];
  };
  
  const getStatusText = () => {
    if (bill.status === 'paid') return 'Paid';
    if (bill.status === 'overdue') return 'Overdue';
    if (days <= 0) return 'Due today';
    if (days === 1) return 'Due tomorrow';
    return `Due in ${days} days`;
  };
  
  return (
    <TouchableOpacity
      style={[
        styles.container, 
        { 
          backgroundColor: colors.white,
          borderRadius: borderRadius.lg,
          borderLeftColor: getStatusColor(),
        }
      ]}
      onPress={() => onPress(bill)}
    >
      <View style={styles.content}>
        <View style={styles.header}>
          <Text style={[styles.provider, { color: colors.text }]}>{bill.provider}</Text>
          <Text style={[styles.amount, { color: colors.text }]}>${bill.amount.toFixed(2)}</Text>
        </View>
        
        <View style={styles.details}>
          <View style={styles.typeContainer}>
            <Text style={[styles.type, { color: colors.gray[600] }]}>{bill.type}</Text>
            {bill.savingsFound && (
              <View style={[
                styles.savingsBadge, 
                { 
                  backgroundColor: colors.green[100],
                  borderRadius: borderRadius.full
                }
              ]}>
                <Text style={{ color: colors.green[800], fontSize: 10 }}>Savings Found</Text>
              </View>
            )}
          </View>
          
          <View style={styles.dueDateContainer}>
            <Calendar size={14} color={getStatusColor()} style={styles.icon} />
            <Text style={[styles.dueDate, { color: getStatusColor() }]}>
              {getStatusText()}
            </Text>
          </View>
        </View>
      </View>
      
      <View style={styles.actionContainer}>
        <ChevronRight size={20} color={colors.gray[400]} />
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    marginVertical: 6,
    marginHorizontal: 16,
    borderLeftWidth: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  content: {
    flex: 1,
    padding: 12,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  provider: {
    fontSize: 16,
    fontWeight: '600',
  },
  amount: {
    fontSize: 16,
    fontWeight: '700',
  },
  details: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  typeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  type: {
    fontSize: 14,
    marginRight: 8,
  },
  savingsBadge: {
    paddingHorizontal: 6,
    paddingVertical: 2,
  },
  dueDateContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  icon: {
    marginRight: 4,
  },
  dueDate: {
    fontSize: 12,
    fontWeight: '500',
  },
  actionContainer: {
    justifyContent: 'center',
    paddingRight: 12,
  },
});

export default BillReminderCard;

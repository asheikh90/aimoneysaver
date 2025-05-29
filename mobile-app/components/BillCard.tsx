import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { FileText, DollarSign, ChevronRight } from 'lucide-react-native';
import { useTheme } from '../hooks/useTheme';
import { Bill } from '../contexts/SavingsContext';
import Card from './Card';

interface BillCardProps {
  bill: Bill;
  onPress: () => void;
}

const BillCard: React.FC<BillCardProps> = ({ bill, onPress }) => {
  const { colors, fontSizes } = useTheme();

  const getStatusColor = () => {
    switch (bill.status) {
      case 'analyzed':
        return colors.primary;
      case 'saved':
        return colors.success;
      case 'pending':
        return colors.warning;
      default:
        return colors.gray[500];
    }
  };

  const getStatusText = () => {
    switch (bill.status) {
      case 'analyzed':
        return 'Analyzed';
      case 'saved':
        return 'Savings Applied';
      case 'pending':
        return 'Pending Analysis';
      default:
        return 'Unknown';
    }
  };

  return (
    <TouchableOpacity onPress={onPress} activeOpacity={0.7}>
      <Card style={styles.card}>
        <View style={styles.header}>
          <View style={styles.iconContainer}>
            <FileText size={24} color={colors.primary} />
          </View>
          <View style={styles.titleContainer}>
            <Text style={[styles.provider, { color: colors.text }]}>{bill.provider}</Text>
            <Text style={[styles.type, { color: colors.gray[500] }]}>{bill.type} • {bill.date}</Text>
          </View>
        </View>
        
        <View style={styles.footer}>
          <View>
            <Text style={[styles.amount, { color: colors.text }]}>${bill.amount.toFixed(2)}</Text>
            <View style={styles.savingsContainer}>
              <DollarSign size={12} color={colors.success} />
              <Text style={[styles.savings, { color: colors.success }]}>
                Saved ${bill.savings.toFixed(2)}
              </Text>
            </View>
          </View>
          
          <View style={styles.rightContainer}>
            <View style={[styles.statusBadge, { backgroundColor: getStatusColor() + '20' }]}>
              <Text style={[styles.statusText, { color: getStatusColor() }]}>
                {getStatusText()}
              </Text>
            </View>
            <ChevronRight size={20} color={colors.gray[400]} />
          </View>
        </View>
      </Card>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    marginBottom: 12,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: 8,
    backgroundColor: '#EEF2FF',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  titleContainer: {
    flex: 1,
  },
  provider: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 2,
  },
  type: {
    fontSize: 14,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  amount: {
    fontSize: 18,
    fontWeight: '700',
  },
  savingsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 4,
  },
  savings: {
    fontSize: 14,
    fontWeight: '500',
    marginLeft: 4,
  },
  rightContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  statusBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    marginRight: 8,
  },
  statusText: {
    fontSize: 12,
    fontWeight: '500',
  },
});

export default BillCard;

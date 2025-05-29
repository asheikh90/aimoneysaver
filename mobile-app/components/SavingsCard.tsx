import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { TrendingUp, TrendingDown } from 'lucide-react-native';
import { useTheme } from '../hooks/useTheme';
import Card from './Card';

interface SavingsCardProps {
  title: string;
  amount: number;
  percentChange?: number;
  icon: React.ReactNode;
  iconBackgroundColor?: string;
}

const SavingsCard: React.FC<SavingsCardProps> = ({
  title,
  amount,
  percentChange,
  icon,
  iconBackgroundColor,
}) => {
  const { colors, fontSizes } = useTheme();
  
  const isPositive = percentChange && percentChange >= 0;
  
  return (
    <Card style={styles.card}>
      <View style={styles.header}>
        <Text style={[styles.title, { color: colors.gray[500] }]}>{title}</Text>
        <View style={[
          styles.iconContainer, 
          { backgroundColor: iconBackgroundColor || colors.primary + '20' }
        ]}>
          {icon}
        </View>
      </View>
      
      <Text style={[styles.amount, { color: colors.text }]}>
        ${amount.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
      </Text>
      
      {percentChange !== undefined && (
        <View style={styles.percentContainer}>
          {isPositive ? (
            <TrendingUp size={16} color={colors.success} />
          ) : (
            <TrendingDown size={16} color={colors.error} />
          )}
          <Text style={[
            styles.percentText, 
            { color: isPositive ? colors.success : colors.error }
          ]}>
            {Math.abs(percentChange).toFixed(1)}%
          </Text>
          <Text style={[styles.vsText, { color: colors.gray[500] }]}>
            vs last month
          </Text>
        </View>
      )}
    </Card>
  );
};

const styles = StyleSheet.create({
  card: {
    marginBottom: 12,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  title: {
    fontSize: 14,
  },
  iconContainer: {
    width: 36,
    height: 36,
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
  },
  amount: {
    fontSize: 24,
    fontWeight: '700',
    marginBottom: 4,
  },
  percentContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  percentText: {
    fontSize: 14,
    fontWeight: '600',
    marginLeft: 4,
    marginRight: 4,
  },
  vsText: {
    fontSize: 12,
  },
});

export default SavingsCard;

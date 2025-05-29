import React from 'react';
import { View, StyleSheet, ViewProps, ViewStyle } from 'react-native';
import { useTheme } from '../hooks/useTheme';

interface CardProps extends ViewProps {
  style?: ViewStyle;
  variant?: 'elevated' | 'outlined' | 'filled';
  children: React.ReactNode;
}

const Card: React.FC<CardProps> = ({
  style,
  variant = 'elevated',
  children,
  ...rest
}) => {
  const { colors, borderRadius, shadows } = useTheme();

  const getCardStyle = () => {
    switch (variant) {
      case 'elevated':
        return {
          backgroundColor: colors.card,
          ...shadows.md,
        };
      case 'outlined':
        return {
          backgroundColor: colors.card,
          borderWidth: 1,
          borderColor: colors.border,
        };
      case 'filled':
        return {
          backgroundColor: colors.gray[100],
        };
      default:
        return {
          backgroundColor: colors.card,
          ...shadows.md,
        };
    }
  };

  return (
    <View
      style={[
        styles.card,
        { borderRadius: borderRadius.md },
        getCardStyle(),
        style,
      ]}
      {...rest}
    >
      {children}
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    padding: 16,
    marginVertical: 8,
  },
});

export default Card;

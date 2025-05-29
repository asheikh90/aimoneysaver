import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { Users, Tag, Clock, ChevronRight } from 'lucide-react-native';
import { useTheme } from '../hooks/useTheme';

interface GroupDiscount {
  id: string;
  title: string;
  provider: string;
  category: string;
  discount: number;
  requiredParticipants: number;
  currentParticipants: number;
  expiresIn: string;
  imageUrl: string;
}

interface GroupDiscountCardProps {
  discount: GroupDiscount;
  onPress: (discount: GroupDiscount) => void;
}

const GroupDiscountCard: React.FC<GroupDiscountCardProps> = ({ discount, onPress }) => {
  const { colors, borderRadius } = useTheme();
  
  const progressPercentage = (discount.currentParticipants / discount.requiredParticipants) * 100;
  const isActive = discount.currentParticipants >= discount.requiredParticipants;
  
  return (
    <TouchableOpacity
      style={[
        styles.container, 
        { 
          backgroundColor: colors.white,
          borderRadius: borderRadius.lg
        }
      ]}
      onPress={() => onPress(discount)}
    >
      <View style={styles.imageContainer}>
        <Image 
          source={{ uri: discount.imageUrl }} 
          style={[styles.image, { borderTopLeftRadius: borderRadius.lg, borderTopRightRadius: borderRadius.lg }]}
          resizeMode="cover"
        />
        <View style={[styles.discountBadge, { backgroundColor: colors.primary, borderRadius: borderRadius.full }]}>
          <Text style={styles.discountText}>{discount.discount}% OFF</Text>
        </View>
      </View>
      
      <View style={styles.content}>
        <Text style={[styles.title, { color: colors.text }]}>{discount.title}</Text>
        <Text style={[styles.provider, { color: colors.gray[600] }]}>{discount.provider}</Text>
        
        <View style={styles.detailsRow}>
          <View style={styles.categoryContainer}>
            <Tag size={14} color={colors.primary} style={styles.icon} />
            <Text style={[styles.category, { color: colors.gray[600] }]}>{discount.category}</Text>
          </View>
          
          <View style={styles.expiryContainer}>
            <Clock size={14} color={colors.gray[500]} style={styles.icon} />
            <Text style={[styles.expiry, { color: colors.gray[500] }]}>Expires in {discount.expiresIn}</Text>
          </View>
        </View>
        
        <View style={styles.participantsSection}>
          <View style={styles.participantsHeader}>
            <View style={styles.participantsInfo}>
              <Users size={14} color={colors.primary} style={styles.icon} />
              <Text style={[styles.participantsText, { color: colors.text }]}>
                {discount.currentParticipants} of {discount.requiredParticipants} participants
              </Text>
            </View>
            <Text style={[
              styles.statusText, 
              { 
                color: isActive ? colors.green[600] : colors.orange[600]
              }
            ]}>
              {isActive ? 'Active' : 'Pending'}
            </Text>
          </View>
          
          <View style={[styles.progressBar, { backgroundColor: colors.gray[200] }]}>
            <View 
              style={[
                styles.progressFill, 
                { 
                  width: `${progressPercentage}%`,
                  backgroundColor: isActive ? colors.green[500] : colors.primary
                }
              ]} 
            />
          </View>
        </View>
        
        <View style={styles.footer}>
          <TouchableOpacity 
            style={[
              styles.joinButton, 
              { 
                backgroundColor: isActive ? colors.green[500] : colors.primary,
                borderRadius: borderRadius.md
              }
            ]}
          >
            <Text style={styles.joinButtonText}>
              {isActive ? 'Claim Discount' : 'Join Group'}
            </Text>
            <ChevronRight size={16} color={colors.white} />
          </TouchableOpacity>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 8,
    marginHorizontal: 16,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  imageContainer: {
    position: 'relative',
  },
  image: {
    width: '100%',
    height: 120,
  },
  discountBadge: {
    position: 'absolute',
    top: 12,
    right: 12,
    paddingHorizontal: 8,
    paddingVertical: 4,
  },
  discountText: {
    color: 'white',
    fontWeight: '700',
    fontSize: 12,
  },
  content: {
    padding: 16,
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 4,
  },
  provider: {
    fontSize: 14,
    marginBottom: 12,
  },
  detailsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  categoryContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  category: {
    fontSize: 14,
  },
  expiryContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  expiry: {
    fontSize: 12,
  },
  icon: {
    marginRight: 4,
  },
  participantsSection: {
    marginBottom: 16,
  },
  participantsHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  participantsInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  participantsText: {
    fontSize: 14,
    fontWeight: '500',
  },
  statusText: {
    fontSize: 12,
    fontWeight: '600',
  },
  progressBar: {
    height: 6,
    borderRadius: 3,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  joinButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  joinButtonText: {
    color: 'white',
    fontWeight: '600',
    marginRight: 4,
  },
});

export default GroupDiscountCard;

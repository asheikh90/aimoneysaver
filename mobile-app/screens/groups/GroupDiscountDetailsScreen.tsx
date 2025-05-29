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
  Users, 
  Calendar, 
  CheckCircle,
  MapPin,
  Share2
} from 'lucide-react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useTheme } from '../../hooks/useTheme';
import { SavingsContext } from '../../contexts/SavingsContext';
import { RootStackParamList } from '../../navigation/RootNavigator';
import Card from '../../components/Card';
import Button from '../../components/Button';

type GroupDiscountRouteProp = RouteProp<RootStackParamList, 'GroupDiscountDetails'>;

const GroupDiscountDetailsScreen = () => {
  const { colors, borderRadius } = useTheme();
  const route = useRoute<GroupDiscountRouteProp>();
  const { groupDiscounts, joinGroupDiscount, leaveGroupDiscount } = useContext(SavingsContext);
  
  const [discount, setDiscount] = useState<any>(null);
  
  useEffect(() => {
    // Find the discount by ID
    const foundDiscount = groupDiscounts.find(d => d.id === route.params.groupId);
    if (foundDiscount) {
      setDiscount(foundDiscount);
    }
  }, [route.params.groupId, groupDiscounts]);
  
  const handleJoinLeaveGroup = () => {
    if (!discount) return;
    
    if (discount.isJoined) {
      leaveGroupDiscount(discount.id);
    } else {
      joinGroupDiscount(discount.id);
    }
  };
  
  const getCategoryColor = () => {
    if (!discount) return colors.primary;
    
    switch (discount.category.color) {
      case 'blue':
        return colors.primary;
      case 'green':
        return colors.success;
      case 'red':
        return colors.error;
      case 'purple':
        return '#8B5CF6';
      default:
        return colors.primary;
    }
  };
  
  if (!discount) {
    return (
      <View style={[styles.container, { backgroundColor: colors.background }]}>
        <Text style={{ color: colors.text }}>Loading...</Text>
      </View>
    );
  }
  
  const progress = (discount.participants / discount.maxParticipants) * 100;
  const categoryColor = getCategoryColor();
  
  return (
    <ScrollView 
      style={[styles.container, { backgroundColor: colors.background }]}
      contentContainerStyle={styles.contentContainer}
    >
      <LinearGradient
        colors={[categoryColor, categoryColor + '80']}
        style={styles.header}
      >
        <View style={styles.headerContent}>
          <View style={[styles.iconContainer, { backgroundColor: colors.white + '20' }]}>
            <Users size={32} color={colors.white} />
          </View>
          <Text style={[styles.title, { color: colors.white }]}>{discount.title}</Text>
          <Text style={[styles.provider, { color: colors.white + 'CC' }]}>{discount.provider}</Text>
          
          <View style={styles.savingsContainer}>
            <Text style={[styles.savingsLabel, { color: colors.white + 'CC' }]}>Monthly Savings</Text>
            <Text style={[styles.savingsAmount, { color: colors.white }]}>
              ${discount.savings.toFixed(2)}
            </Text>
          </View>
        </View>
      </LinearGradient>
      
      <Card style={styles.progressCard}>
        <View style={styles.progressHeader}>
          <Text style={[styles.progressTitle, { color: colors.text }]}>Group Progress</Text>
          <View style={styles.progressStats}>
            <Text style={[styles.progressStat, { color: colors.text }]}>
              <Text style={{ fontWeight: '700' }}>{discount.participants}</Text> joined
            </Text>
            <Text style={[styles.progressDivider, { color: colors.gray[400] }]}>•</Text>
            <Text style={[styles.progressStat, { color: colors.text }]}>
              <Text style={{ fontWeight: '700' }}>{discount.maxParticipants}</Text> needed
            </Text>
          </View>
        </View>
        
        <View style={[styles.progressBarContainer, { backgroundColor: colors.gray[200] }]}>
          <View 
            style={[
              styles.progressBarFill, 
              { 
                width: `${progress}%`,
                backgroundColor: categoryColor
              }
            ]} 
          />
        </View>
        
        <View style={styles.deadlineContainer}>
          <View style={styles.deadlineIconContainer}>
            <Calendar size={16} color={colors.gray[500]} />
          </View>
          <Text style={[styles.deadlineText, { color: colors.gray[500] }]}>
            Offer ends on {new Date(discount.endDate).toLocaleDateString()}
          </Text>
        </View>
      </Card>
      
      <Card>
        <Text style={[styles.sectionTitle, { color: colors.text }]}>About This Discount</Text>
        <Text style={[styles.description, { color: colors.gray[700] }]}>
          {discount.description}
        </Text>
        
        <View style={styles.locationContainer}>
          <View style={[styles.locationIconContainer, { backgroundColor: categoryColor + '10' }]}>
            <MapPin size={20} color={categoryColor} />
          </View>
          <View>
            <Text style={[styles.locationLabel, { color: colors.gray[500] }]}>Available in</Text>
            <Text style={[styles.locationText, { color: colors.text }]}>San Francisco, CA</Text>
          </View>
        </View>
      </Card>
      
      <Card>
        <Text style={[styles.sectionTitle, { color: colors.text }]}>How It Works</Text>
        <View style={styles.stepsContainer}>
          {[
            { 
              step: 1, 
              title: 'Join the group', 
              description: 'Click the join button to add yourself to this group discount.' 
            },
            { 
              step: 2, 
              title: 'Wait for group to fill', 
              description: 'Once enough people join, the discount will be activated automatically.' 
            },
            { 
              step: 3, 
              title: 'Enjoy your savings', 
              description: 'The discount will be applied to your next bill automatically.' 
            },
          ].map((item, index) => (
            <View key={index} style={styles.stepItem}>
              <View style={[styles.stepNumber, { backgroundColor: categoryColor + '10' }]}>
                <Text style={[styles.stepNumberText, { color: categoryColor }]}>{item.step}</Text>
              </View>
              <View style={styles.stepContent}>
                <Text style={[styles.stepTitle, { color: colors.text }]}>{item.title}</Text>
                <Text style={[styles.stepDescription, { color: colors.gray[500] }]}>
                  {item.description}
                </Text>
              </View>
            </View>
          ))}
        </View>
      </Card>
      
      <Card>
        <Text style={[styles.sectionTitle, { color: colors.text }]}>Members</Text>
        <View style={styles.membersContainer}>
          {[...Array(Math.min(5, discount.participants))].map((_, index) => (
            <View key={index} style={styles.memberItem}>
              <Image
                source={{ uri: `https://i.pravatar.cc/150?img=${index + 10}` }}
                style={styles.memberAvatar}
              />
              <View style={styles.memberInfo}>
                <Text style={[styles.memberName, { color: colors.text }]}>
                  {['John D.', 'Sarah M.', 'Robert K.', 'Emily L.', 'Michael P.'][index]}
                </Text>
                <Text style={[styles.memberJoinDate, { color: colors.gray[500] }]}>
                  Joined {['2 days ago', '1 week ago', '3 days ago', '5 days ago', 'Today'][index]}
                </Text>
              </View>
              {index === 0 && (
                <View style={[styles.adminBadge, { backgroundColor: categoryColor + '20' }]}>
                  <Text style={[styles.adminText, { color: categoryColor }]}>Admin</Text>
                </View>
              )}
            </View>
          ))}
          
          {discount.participants > 5 && (
            <TouchableOpacity style={styles.viewAllMembers}>
              <Text style={[styles.viewAllText, { color: colors.primary }]}>
                View all {discount.participants} members
              </Text>
            </TouchableOpacity>
          )}
        </View>
      </Card>
      
      <View style={styles.actionButtons}>
        <TouchableOpacity 
          style={[
            styles.shareButton, 
            { 
              borderColor: colors.gray[300],
              borderRadius: borderRadius.md
            }
          ]}
        >
          <Share2 size={20} color={colors.gray[700]} />
        </TouchableOpacity>
        
        <Button
          title={discount.isJoined ? "Leave Group" : "Join Group"}
          variant={discount.isJoined ? "outline" : "primary"}
          style={styles.joinButton}
          onPress={handleJoinLeaveGroup}
        />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  contentContainer: {
    paddingBottom: 32,
  },
  header: {
    paddingTop: 20,
    paddingBottom: 30,
  },
  headerContent: {
    alignItems: 'center',
    paddingHorizontal: 16,
  },
  iconContainer: {
    width: 64,
    height: 64,
    borderRadius: 32,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    textAlign: 'center',
    marginBottom: 4,
  },
  provider: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 16,
  },
  savingsContainer: {
    alignItems: 'center',
  },
  savingsLabel: {
    fontSize: 14,
    marginBottom: 4,
  },
  savingsAmount: {
    fontSize: 32,
    fontWeight: '700',
  },
  progressCard: {
    marginTop: -20,
    marginHorizontal: 16,
    marginBottom: 16,
  },
  progressHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  progressTitle: {
    fontSize: 16,
    fontWeight: '600',
  },
  progressStats: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  progressStat: {
    fontSize: 14,
  },
  progressDivider: {
    marginHorizontal: 6,
  },
  progressBarContainer: {
    height: 8,
    borderRadius: 4,
    marginBottom: 12,
    overflow: 'hidden',
  },
  progressBarFill: {
    height: '100%',
    borderRadius: 4,
  },
  deadlineContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  deadlineIconContainer: {
    marginRight: 8,
  },
  deadlineText: {
    fontSize: 14,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 12,
  },
  description: {
    fontSize: 14,
    lineHeight: 22,
    marginBottom: 16,
  },
  locationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  locationIconContainer: {
    width: 36,
    height: 36,
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  locationLabel: {
    fontSize: 12,
  },
  locationText: {
    fontSize: 14,
    fontWeight: '500',
  },
  stepsContainer: {
    marginTop: 8,
  },
  stepItem: {
    flexDirection: 'row',
    marginBottom: 16,
  },
  stepNumber: {
    width: 28,
    height: 28,
    borderRadius: 14,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  stepNumberText: {
    fontSize: 14,
    fontWeight: '600',
  },
  stepContent: {
    flex: 1,
  },
  stepTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 4,
  },
  stepDescription: {
    fontSize: 14,
    lineHeight: 20,
  },
  membersContainer: {
    marginTop: 8,
  },
  memberItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  memberAvatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 12,
  },
  memberInfo: {
    flex: 1,
  },
  memberName: {
    fontSize: 14,
    fontWeight: '500',
    marginBottom: 2,
  },
  memberJoinDate: {
    fontSize: 12,
  },
  adminBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  adminText: {
    fontSize: 12,
    fontWeight: '500',
  },
  viewAllMembers: {
    alignItems: 'center',
    paddingVertical: 8,
  },
  viewAllText: {
    fontSize: 14,
    fontWeight: '500',
  },
  actionButtons: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    marginTop: 8,
  },
  shareButton: {
    width: 50,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    marginRight: 12,
  },
  joinButton: {
    flex: 1,
    height: 50,
  },
});

export default GroupDiscountDetailsScreen;

import React, { useState, useContext, useEffect } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  FlatList, 
  TextInput,
  TouchableOpacity
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { Search, Filter, MapPin } from 'lucide-react-native';
import * as Location from 'expo-location';
import { useTheme } from '../../hooks/useTheme';
import { SavingsContext } from '../../contexts/SavingsContext';
import { RootStackParamList } from '../../navigation/RootNavigator';
import GroupDiscountCard from '../../components/GroupDiscountCard';
import Card from '../../components/Card';

type GroupsScreenNavigationProp = NativeStackNavigationProp<RootStackParamList>;

const GroupsScreen = () => {
  const { colors, borderRadius } = useTheme();
  const navigation = useNavigation<GroupsScreenNavigationProp>();
  const { groupDiscounts } = useContext(SavingsContext);
  
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [location, setLocation] = useState('San Francisco, CA');
  const [filteredDiscounts, setFilteredDiscounts] = useState(groupDiscounts);
  
  const categories = [
    { id: 'all', name: 'All' },
    { id: 'electricity', name: 'Electricity', color: 'green' },
    { id: 'internet', name: 'Internet', color: 'blue' },
    { id: 'phone', name: 'Phone', color: 'purple' },
    { id: 'streaming', name: 'Streaming', color: 'red' },
  ];
  
  useEffect(() => {
    // Request location permission
    (async () => {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status === 'granted') {
        // In a real app, we would get the actual location
        // For demo purposes, we'll use a fixed location
      }
    })();
  }, []);
  
  useEffect(() => {
    let results = groupDiscounts;
    
    // Filter by search term
    if (searchTerm) {
      results = results.filter(discount => 
        discount.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        discount.provider.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    // Filter by category
    if (selectedCategory !== 'all') {
      results = results.filter(discount => discount.category.id === selectedCategory);
    }
    
    setFilteredDiscounts(results);
  }, [searchTerm, selectedCategory, groupDiscounts]);
  
  const handleDiscountPress = (groupId: string) => {
    navigation.navigate('GroupDiscountDetails', { groupId });
  };
  
  const renderEmptyState = () => (
    <View style={styles.emptyContainer}>
      <Text style={[styles.emptyTitle, { color: colors.text }]}>
        No group discounts found
      </Text>
      <Text style={[styles.emptyDescription, { color: colors.gray[500] }]}>
        Try adjusting your search or filters
      </Text>
    </View>
  );
  
  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <Card style={styles.locationCard}>
        <View style={styles.locationContainer}>
          <View style={[styles.locationIconContainer, { backgroundColor: colors.primary + '10' }]}>
            <MapPin size={20} color={colors.primary} />
          </View>
          <View>
            <Text style={[styles.locationLabel, { color: colors.gray[500] }]}>Your Location</Text>
            <Text style={[styles.locationText, { color: colors.text }]}>{location}</Text>
          </View>
          <TouchableOpacity>
            <Text style={[styles.changeText, { color: colors.primary }]}>Change</Text>
          </TouchableOpacity>
        </View>
        
        <View style={styles.searchContainer}>
          <View style={[
            styles.searchInputContainer, 
            { 
              backgroundColor: colors.card,
              borderColor: colors.gray[300],
              borderRadius: borderRadius.md
            }
          ]}>
            <Search size={20} color={colors.gray[500]} style={styles.searchIcon} />
            <TextInput
              style={[styles.searchInput, { color: colors.text }]}
              placeholder="Search discounts..."
              placeholderTextColor={colors.gray[400]}
              value={searchTerm}
              onChangeText={setSearchTerm}
            />
          </View>
        </View>
        
        <ScrollView 
          horizontal 
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.categoriesContainer}
        >
          {categories.map(category => (
            <TouchableOpacity
              key={category.id}
              style={[
                styles.categoryButton,
                { 
                  backgroundColor: selectedCategory === category.id 
                    ? colors.primary 
                    : colors.gray[200],
                  borderRadius: borderRadius.full
                }
              ]}
              onPress={() => setSelectedCategory(category.id)}
            >
              <Text 
                style={[
                  styles.categoryText, 
                  { 
                    color: selectedCategory === category.id 
                      ? colors.white 
                      : colors.gray[700] 
                  }
                ]}
              >
                {category.name}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </Card>
      
      <FlatList
        data={filteredDiscounts}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <GroupDiscountCard 
            discount={item} 
            onPress={() => handleDiscountPress(item.id)} 
          />
        )}
        contentContainerStyle={styles.listContent}
        ListEmptyComponent={renderEmptyState}
      />
      
      <Card style={[styles.createGroupCard, { backgroundColor: colors.primary }]}>
        <View style={styles.createGroupContent}>
          <View>
            <Text style={[styles.createGroupTitle, { color: colors.white }]}>
              Start Your Own Group
            </Text>
            <Text style={[styles.createGroupDescription, { color: colors.white + 'CC' }]}>
              Create a discount group for your neighborhood
            </Text>
          </View>
          <TouchableOpacity 
            style={[styles.createGroupButton, { backgroundColor: colors.white }]}
          >
            <Text style={[styles.createGroupButtonText, { color: colors.primary }]}>
              Create Group
            </Text>
          </TouchableOpacity>
        </View>
      </Card>
    </View>
  );
};

import { ScrollView } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  locationCard: {
    marginBottom: 16,
  },
  locationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
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
  changeText: {
    fontSize: 14,
    fontWeight: '500',
    marginLeft: 'auto',
  },
  searchContainer: {
    marginBottom: 16,
  },
  searchInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    height: 44,
  },
  searchIcon: {
    marginLeft: 12,
  },
  searchInput: {
    flex: 1,
    height: '100%',
    paddingHorizontal: 12,
  },
  categoriesContainer: {
    paddingVertical: 4,
  },
  categoryButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    marginRight: 8,
  },
  categoryText: {
    fontSize: 14,
    fontWeight: '500',
  },
  listContent: {
    paddingBottom: 100,
  },
  emptyContainer: {
    padding: 24,
    alignItems: 'center',
  },
  emptyTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 8,
    textAlign: 'center',
  },
  emptyDescription: {
    fontSize: 14,
    textAlign: 'center',
  },
  createGroupCard: {
    position: 'absolute',
    bottom: 16,
    left: 16,
    right: 16,
  },
  createGroupContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  createGroupTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 4,
  },
  createGroupDescription: {
    fontSize: 14,
  },
  createGroupButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
  },
  createGroupButtonText: {
    fontSize: 14,
    fontWeight: '600',
  },
});

export default GroupsScreen;

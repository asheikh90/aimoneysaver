import React, { useState, useContext } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  FlatList, 
  TouchableOpacity,
  Modal
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { Plus, X } from 'lucide-react-native';
import { useTheme } from '../../hooks/useTheme';
import { SavingsContext, Bill } from '../../contexts/SavingsContext';
import { RootStackParamList } from '../../navigation/RootNavigator';
import BillCard from '../../components/BillCard';
import BillScanner from '../../components/BillScanner';
import Button from '../../components/Button';

type BillsScreenNavigationProp = NativeStackNavigationProp<RootStackParamList>;

const BillsScreen = () => {
  const { colors, borderRadius } = useTheme();
  const navigation = useNavigation<BillsScreenNavigationProp>();
  const { bills, addBill } = useContext(SavingsContext);
  
  const [scannerVisible, setScannerVisible] = useState(false);
  
  const handleBillPress = (billId: string) => {
    navigation.navigate('BillDetails', { billId });
  };
  
  const handleScanComplete = (imageUri: string, analysis: any) => {
    // Create a new bill from the analysis
    const newBill: Omit<Bill, 'id'> = {
      provider: analysis.provider,
      type: 'Electricity', // Assuming based on provider
      date: analysis.billDate,
      amount: analysis.totalAmount,
      savings: analysis.potentialSavings.reduce((sum: number, item: any) => sum + item.amount, 0),
      status: 'analyzed',
      imageUri
    };
    
    // Add the bill to the context
    addBill(newBill);
    
    // Close the scanner
    setScannerVisible(false);
    
    // Navigate to the bill details
    // Note: In a real app, we would wait for the bill to be added and get its ID
    setTimeout(() => {
      navigation.navigate('BillDetails', { billId: '1' });
    }, 500);
  };
  
  const renderEmptyState = () => (
    <View style={styles.emptyContainer}>
      <Text style={[styles.emptyTitle, { color: colors.text }]}>
        No bills analyzed yet
      </Text>
      <Text style={[styles.emptyDescription, { color: colors.gray[500] }]}>
        Scan your first bill to start finding savings
      </Text>
      <Button
        title="Scan a Bill"
        leftIcon={<Plus size={20} color={colors.white} />}
        onPress={() => setScannerVisible(true)}
        style={styles.scanButton}
      />
    </View>
  );
  
  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <FlatList
        data={bills}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <BillCard bill={item} onPress={() => handleBillPress(item.id)} />
        )}
        contentContainerStyle={styles.listContent}
        ListEmptyComponent={renderEmptyState}
      />
      
      {bills.length > 0 && (
        <TouchableOpacity
          style={[styles.fab, { backgroundColor: colors.primary }]}
          onPress={() => setScannerVisible(true)}
        >
          <Plus size={24} color={colors.white} />
        </TouchableOpacity>
      )}
      
      <Modal
        visible={scannerVisible}
        animationType="slide"
        onRequestClose={() => setScannerVisible(false)}
      >
        <View style={[styles.modalContainer, { backgroundColor: colors.background }]}>
          <View style={styles.modalHeader}>
            <Text style={[styles.modalTitle, { color: colors.text }]}>Scan Bill</Text>
            <TouchableOpacity
              style={[styles.closeButton, { backgroundColor: colors.gray[200] }]}
              onPress={() => setScannerVisible(false)}
            >
              <X size={20} color={colors.gray[700]} />
            </TouchableOpacity>
          </View>
          
          <BillScanner onScanComplete={handleScanComplete} />
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  listContent: {
    padding: 16,
    paddingBottom: 80,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
    marginTop: 100,
  },
  emptyTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 8,
    textAlign: 'center',
  },
  emptyDescription: {
    fontSize: 14,
    textAlign: 'center',
    marginBottom: 24,
  },
  scanButton: {
    width: '100%',
  },
  fab: {
    position: 'absolute',
    bottom: 24,
    right: 24,
    width: 56,
    height: 56,
    borderRadius: 28,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  modalContainer: {
    flex: 1,
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: '600',
  },
  closeButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default BillsScreen;

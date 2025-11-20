import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, TextInput, Alert, Image } from 'react-native';
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../navigation/types';
import { Ionicons } from '@expo/vector-icons';

type PaymentScreenRouteProp = RouteProp<RootStackParamList, 'Payment'>;
type PaymentNavigationProp = StackNavigationProp<RootStackParamList, 'Payment'>;

const PaymentScreen = () => {
  const navigation = useNavigation<PaymentNavigationProp>();
  const route = useRoute<PaymentScreenRouteProp>();
  const { propertyId, bookingDetails } = route.params;
  
  const [cardNumber, setCardNumber] = useState('');
  const [cardName, setCardName] = useState('');
  const [expiryDate, setExpiryDate] = useState('');
  const [cvv, setCvv] = useState('');
  const [saveCard, setSaveCard] = useState(false);
  
  // Mock property data - in a real app, this would come from an API
  const property = {
    id: propertyId,
    title: 'Modern Apartment in Downtown',
    price: 1200,
    address: '123 Main St, New York, NY',
    image: 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
  };
  
  const totalAmount = property.price;
  
  const handlePayment = () => {
    // In a real app, you would process the payment here
    // and then navigate to the success screen
    navigation.navigate('PaymentSuccess', { 
      bookingId: `BK-${Math.floor(100000 + Math.random() * 900000)}`
    });
  };
  
  const formatCardNumber = (input: string) => {
    // Remove all non-digit characters
    const numbers = input.replace(/\D/g, '');
    
    // Add a space after every 4 digits
    return numbers.replace(/(\d{4})(?=\d)/g, '$1 ');
  };
  
  const formatExpiryDate = (input: string) => {
    // Remove all non-digit characters
    const numbers = input.replace(/\D/g, '');
    
    // Add a slash after 2 digits if the length is greater than 2
    if (numbers.length > 2) {
      return `${numbers.slice(0, 2)}/${numbers.slice(2, 4)}`;
    }
    return numbers;
  };

  return (
    <View style={styles.container}>
      <ScrollView style={styles.scrollView}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity 
            style={styles.backButton}
            onPress={() => navigation.goBack()}
          >
            <Ionicons name="arrow-back" size={24} color="#000" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Payment</Text>
          <View style={{ width: 24 }} />
        </View>
        
        {/* Property Summary */}
        <View style={styles.propertyCard}>
          <Image 
            source={{ uri: property.image }} 
            style={styles.propertyImage}
            resizeMode="cover"
          />
          <View style={styles.propertyInfo}>
            <Text style={styles.propertyTitle} numberOfLines={1}>{property.title}</Text>
            <Text style={styles.propertyAddress} numberOfLines={1}>
              <Ionicons name="location-outline" size={12} color="#666" /> {property.address}
            </Text>
            <Text style={styles.propertyPrice}>${property.price}<Text style={styles.perMonth}>/month</Text></Text>
          </View>
        </View>
        
        {/* Payment Method */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Payment Method</Text>
          
          <View style={styles.paymentMethod}>
            <View style={styles.radioButton}>
              <View style={[styles.radioOuter, styles.radioSelected]}>
                <View style={styles.radioInner} />
              </View>
              <Ionicons name="card" size={24} color="#4A90E2" style={styles.paymentIcon} />
              <Text style={styles.paymentMethodText}>Credit / Debit Card</Text>
            </View>
            
            <View style={styles.paymentMethod}>
              <View style={styles.radioButton}>
                <View style={styles.radioOuter} />
                <Ionicons name="wallet" size={24} color="#4A90E2" style={styles.paymentIcon} />
                <Text style={styles.paymentMethodText}>Wallet</Text>
              </View>
            </View>
            
            <View style={styles.paymentMethod}>
              <View style={styles.radioButton}>
                <View style={styles.radioOuter} />
                <Ionicons name="logo-paypal" size={24} color="#4A90E2" style={styles.paymentIcon} />
                <Text style={styles.paymentMethodText}>PayPal</Text>
              </View>
            </View>
          </View>
        </View>
        
        {/* Card Details */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Card Details</Text>
          
          <View style={styles.inputContainer}>
            <Text style={styles.inputLabel}>Card Number</Text>
            <View style={styles.inputField}>
              <Ionicons name="card" size={20} color="#999" style={styles.inputIcon} />
              <TextInput
                style={styles.input}
                placeholder="1234 5678 9012 3456"
                placeholderTextColor="#999"
                keyboardType="numeric"
                maxLength={19}
                value={formatCardNumber(cardNumber)}
                onChangeText={(text) => setCardNumber(text.replace(/\D/g, ''))}
              />
            </View>
          </View>
          
          <View style={styles.inputContainer}>
            <Text style={styles.inputLabel}>Name on Card</Text>
            <View style={styles.inputField}>
              <Ionicons name="person-outline" size={20} color="#999" style={styles.inputIcon} />
              <TextInput
                style={styles.input}
                placeholder="John Doe"
                placeholderTextColor="#999"
                value={cardName}
                onChangeText={setCardName}
              />
            </View>
          </View>
          
          <View style={styles.row}>
            <View style={[styles.inputContainer, { flex: 1, marginRight: 10 }]}>
              <Text style={styles.inputLabel}>Expiry Date</Text>
              <View style={styles.inputField}>
                <Ionicons name="calendar-outline" size={20} color="#999" style={styles.inputIcon} />
                <TextInput
                  style={styles.input}
                  placeholder="MM/YY"
                  placeholderTextColor="#999"
                  keyboardType="numeric"
                  maxLength={5}
                  value={expiryDate}
                  onChangeText={(text) => setExpiryDate(formatExpiryDate(text))}
                />
              </View>
            </View>
            
            <View style={[styles.inputContainer, { flex: 1, marginLeft: 10 }]}>
              <Text style={styles.inputLabel}>CVV</Text>
              <View style={styles.inputField}>
                <Ionicons name="lock-closed-outline" size={20} color="#999" style={styles.inputIcon} />
                <TextInput
                  style={styles.input}
                  placeholder="123"
                  placeholderTextColor="#999"
                  keyboardType="numeric"
                  maxLength={4}
                  secureTextEntry
                  value={cvv}
                  onChangeText={setCvv}
                />
              </View>
            </View>
          </View>
          
          <TouchableOpacity 
            style={styles.saveCardOption}
            onPress={() => setSaveCard(!saveCard)}
          >
            <View style={[styles.checkbox, saveCard && styles.checkboxChecked]}>
              {saveCard && <Ionicons name="checkmark" size={16} color="#fff" />}
            </View>
            <Text style={styles.saveCardText}>Save card for future payments</Text>
          </TouchableOpacity>
        </View>
        
        {/* Price Breakdown */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Price Details</Text>
          
          <View style={styles.priceRow}>
            <Text style={styles.priceLabel}>Monthly Rent</Text>
            <Text style={styles.priceValue}>${property.price}</Text>
          </View>
          
          <View style={styles.priceRow}>
            <Text style={styles.priceLabel}>Service Fee</Text>
            <Text style={styles.priceValue}>$0</Text>
          </View>
          
          <View style={styles.divider} />
          
          <View style={[styles.priceRow, { marginTop: 8 }]}>
            <Text style={styles.totalLabel}>Total Amount</Text>
            <Text style={styles.totalValue}>${totalAmount}</Text>
          </View>
        </View>
        
        {/* Terms and Conditions */}
        <View style={styles.termsContainer}>
          <Text style={styles.termsText}>
            By proceeding, you agree to our{' '}
            <Text style={styles.linkText}>Terms of Service</Text> and {' '}
            <Text style={styles.linkText}>Privacy Policy</Text>.
          </Text>
        </View>
      </ScrollView>
      
      {/* Pay Now Button */}
      <View style={styles.footer}>
        <View style={styles.totalContainer}>
          <Text style={styles.totalText}>Total Payable</Text>
          <Text style={styles.totalAmount}>${totalAmount}</Text>
        </View>
        
        <TouchableOpacity 
          style={[styles.payButton, (!cardNumber || !cardName || !expiryDate || !cvv) && styles.payButtonDisabled]}
          onPress={handlePayment}
          disabled={!cardNumber || !cardName || !expiryDate || !cvv}
        >
          <Text style={styles.payButtonText}>Pay Now</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  scrollView: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
  },
  backButton: {
    padding: 4,
  },
  propertyCard: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderRadius: 12,
    margin: 16,
    overflow: 'hidden',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  propertyImage: {
    width: 100,
    height: 100,
  },
  propertyInfo: {
    flex: 1,
    padding: 12,
    justifyContent: 'center',
  },
  propertyTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 4,
  },
  propertyAddress: {
    fontSize: 12,
    color: '#666',
    marginBottom: 8,
    flexDirection: 'row',
    alignItems: 'center',
  },
  propertyPrice: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#4A90E2',
  },
  perMonth: {
    fontSize: 14,
    color: '#666',
    fontWeight: 'normal',
  },
  section: {
    backgroundColor: '#fff',
    borderRadius: 12,
    marginHorizontal: 16,
    marginBottom: 16,
    padding: 16,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 16,
  },
  paymentMethod: {
    marginBottom: 12,
  },
  radioButton: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  radioOuter: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  radioSelected: {
    borderColor: '#4A90E2',
    backgroundColor: '#4A90E2',
  },
  radioInner: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: '#fff',
  },
  paymentIcon: {
    marginRight: 12,
  },
  paymentMethodText: {
    fontSize: 14,
    color: '#333',
  },
  inputContainer: {
    marginBottom: 16,
  },
  inputLabel: {
    fontSize: 14,
    color: '#666',
    marginBottom: 8,
  },
  inputField: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    paddingHorizontal: 12,
    height: 48,
  },
  input: {
    flex: 1,
    height: '100%',
    fontSize: 14,
    color: '#333',
    marginLeft: 8,
  },
  inputIcon: {
    marginRight: 8,
  },
  row: {
    flexDirection: 'row',
  },
  saveCardOption: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 8,
  },
  checkbox: {
    width: 20,
    height: 20,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: '#ccc',
    marginRight: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  checkboxChecked: {
    backgroundColor: '#4A90E2',
    borderColor: '#4A90E2',
  },
  saveCardText: {
    fontSize: 14,
    color: '#666',
  },
  priceRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  priceLabel: {
    fontSize: 14,
    color: '#666',
  },
  priceValue: {
    fontSize: 14,
    color: '#333',
    fontWeight: '500',
  },
  divider: {
    height: 1,
    backgroundColor: '#eee',
    marginVertical: 8,
  },
  totalLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
  },
  totalValue: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#4A90E2',
  },
  termsContainer: {
    paddingHorizontal: 24,
    paddingBottom: 100,
    alignItems: 'center',
  },
  termsText: {
    fontSize: 12,
    color: '#999',
    textAlign: 'center',
    lineHeight: 16,
  },
  linkText: {
    color: '#4A90E2',
    textDecorationLine: 'underline',
  },
  footer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: '#fff',
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderTopWidth: 1,
    borderTopColor: '#eee',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 4,
  },
  totalContainer: {
    flex: 1,
  },
  totalText: {
    fontSize: 12,
    color: '#999',
    marginBottom: 2,
  },
  totalAmount: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#4A90E2',
  },
  payButton: {
    backgroundColor: '#4A90E2',
    borderRadius: 8,
    paddingVertical: 14,
    paddingHorizontal: 24,
    alignItems: 'center',
    justifyContent: 'center',
  },
  payButtonDisabled: {
    backgroundColor: '#ccc',
  },
  payButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});

export default PaymentScreen;

import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image } from 'react-native';
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../navigation/types';
import { Ionicons } from '@expo/vector-icons';

type BookingDetailsScreenRouteProp = RouteProp<RootStackParamList, 'BookingDetails'>;
type BookingDetailsNavigationProp = StackNavigationProp<RootStackParamList, 'BookingDetails'>;

const BookingDetailsScreen = () => {
  const navigation = useNavigation<BookingDetailsNavigationProp>();
  const route = useRoute<BookingDetailsScreenRouteProp>();
  const { propertyId } = route.params;
  
  const [members, setMembers] = useState(1);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);

  // Mock property data - in a real app, this would come from an API
  const property = {
    id: propertyId,
    title: 'Modern Apartment in Downtown',
    price: 1200,
    address: '123 Main St, New York, NY',
    images: [
      'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
    ],
    amenities: ['Wifi', 'AC', 'Kitchen', 'Parking', 'Washer'],
    description: 'Beautiful modern apartment in the heart of the city. Perfect for professionals and small families.',
  };

  const handleContinue = () => {
    navigation.navigate('SelectMembers', { propertyId });
  };

  const totalPrice = property.price * members * (selectedDate ? 30 : 1); // Monthly price if date is selected

  return (
    <View style={styles.container}>
      <ScrollView>
        {/* Property Image */}
        <Image 
          source={{ uri: property.images[0] }} 
          style={styles.propertyImage}
          resizeMode="cover"
        />
        
        {/* Back Button */}
        <TouchableOpacity 
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Ionicons name="arrow-back" size={24} color="#000" />
        </TouchableOpacity>
        
        {/* Property Info */}
        <View style={styles.content}>
          <Text style={styles.title}>{property.title}</Text>
          <View style={styles.priceContainer}>
            <Text style={styles.price}>${property.price}</Text>
            <Text style={styles.perMonth}>/month</Text>
          </View>
          
          <Text style={styles.address}>
            <Ionicons name="location-outline" size={16} color="#666" /> {property.address}
          </Text>
          
          {/* Booking Details */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Booking Details</Text>
            
            <View style={styles.detailRow}>
              <Text style={styles.detailLabel}>Check-in Date</Text>
              <TouchableOpacity 
                style={styles.dateInput}
                onPress={() => setDatePickerVisibility(true)}
              >
                <Text style={selectedDate ? styles.dateText : styles.placeholderText}>
                  {selectedDate ? selectedDate.toDateString() : 'Select Date'}
                </Text>
                <Ionicons name="calendar-outline" size={20} color="#666" />
              </TouchableOpacity>
            </View>
            
            <View style={styles.detailRow}>
              <Text style={styles.detailLabel}>Number of Members</Text>
              <View style={styles.memberSelector}>
                <TouchableOpacity 
                  style={styles.memberButton}
                  onPress={() => setMembers(Math.max(1, members - 1))}
                  disabled={members <= 1}
                >
                  <Ionicons name="remove" size={20} color={members <= 1 ? "#ccc" : "#4A90E2"} />
                </TouchableOpacity>
                <Text style={styles.memberCount}>{members}</Text>
                <TouchableOpacity 
                  style={styles.memberButton}
                  onPress={() => setMembers(members + 1)}
                >
                  <Ionicons name="add" size={20} color="#4A90E2" />
                </TouchableOpacity>
              </View>
            </View>
            
            <View style={styles.detailRow}>
              <Text style={styles.detailLabel}>Duration</Text>
              <Text style={styles.detailValue}>1 Month</Text>
            </View>
            
            <View style={styles.divider} />
            
            <View style={styles.detailRow}>
              <Text style={styles.detailLabel}>Total</Text>
              <Text style={styles.totalPrice}>${totalPrice}</Text>
            </View>
          </View>
          
          {/* Property Description */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Description</Text>
            <Text style={styles.description}>{property.description}</Text>
          </View>
          
          {/* Amenities */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Amenities</Text>
            <View style={styles.amenitiesContainer}>
              {property.amenities.map((amenity, index) => (
                <View key={index} style={styles.amenityBadge}>
                  <Text style={styles.amenityText}>{amenity}</Text>
                </View>
              ))}
            </View>
          </View>
        </View>
      </ScrollView>
      
      {/* Bottom Action Bar */}
      <View style={styles.actionBar}>
        <View style={styles.priceContainer}>
          <Text style={styles.totalLabel}>Total</Text>
          <Text style={styles.totalPrice}>${totalPrice}</Text>
        </View>
        <TouchableOpacity 
          style={styles.bookButton}
          onPress={handleContinue}
          disabled={!selectedDate}
        >
          <Text style={styles.bookButtonText}>Continue to Payment</Text>
        </TouchableOpacity>
      </View>
      
      {/* Date Picker Modal would go here */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  propertyImage: {
    width: '100%',
    height: 250,
  },
  backButton: {
    position: 'absolute',
    top: 40,
    left: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    borderRadius: 20,
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    padding: 20,
    paddingBottom: 100, // Space for the action bar
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 8,
    color: '#333',
  },
  priceContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  price: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#4A90E2',
  },
  perMonth: {
    fontSize: 16,
    color: '#666',
    marginLeft: 4,
  },
  address: {
    fontSize: 14,
    color: '#666',
    marginBottom: 20,
    flexDirection: 'row',
    alignItems: 'center',
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 12,
    color: '#333',
  },
  detailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  detailLabel: {
    fontSize: 16,
    color: '#666',
  },
  detailValue: {
    fontSize: 16,
    fontWeight: '500',
    color: '#333',
  },
  dateInput: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    paddingVertical: 10,
    paddingHorizontal: 12,
    minWidth: 150,
    justifyContent: 'space-between',
  },
  dateText: {
    fontSize: 16,
    color: '#333',
  },
  placeholderText: {
    fontSize: 16,
    color: '#999',
  },
  memberSelector: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    overflow: 'hidden',
  },
  memberButton: {
    padding: 8,
    backgroundColor: '#f5f5f5',
  },
  memberCount: {
    paddingHorizontal: 12,
    fontSize: 16,
    color: '#333',
  },
  divider: {
    height: 1,
    backgroundColor: '#eee',
    marginVertical: 12,
  },
  totalPrice: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#4A90E2',
  },
  description: {
    fontSize: 14,
    color: '#666',
    lineHeight: 22,
  },
  amenitiesContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 8,
  },
  amenityBadge: {
    backgroundColor: '#f0f7ff',
    borderRadius: 16,
    paddingVertical: 6,
    paddingHorizontal: 12,
    marginRight: 8,
    marginBottom: 8,
  },
  amenityText: {
    color: '#4A90E2',
    fontSize: 12,
    fontWeight: '500',
  },
  actionBar: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: '#fff',
    flexDirection: 'row',
    justifyContent: 'space-between',
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
  totalLabel: {
    fontSize: 14,
    color: '#666',
    marginBottom: 2,
  },
  bookButton: {
    backgroundColor: '#4A90E2',
    borderRadius: 8,
    paddingVertical: 14,
    paddingHorizontal: 24,
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
    marginLeft: 16,
  },
  bookButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});

export default BookingDetailsScreen;

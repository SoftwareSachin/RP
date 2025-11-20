// src/screens/PropertyDetailScreen.tsx
import React from 'react';
import { View, Text, ScrollView, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../types/navigation';

type PropertyDetailScreenRouteProp = RouteProp<RootStackParamList, 'PropertyDetail'>;
type PropertyDetailScreenNavigationProp = StackNavigationProp<RootStackParamList, 'PropertyDetail'>;

type Props = {
  route: PropertyDetailScreenRouteProp;
  navigation: PropertyDetailScreenNavigationProp;
};

export function PropertyDetailScreen({ route, navigation }: Props) {
  // In a real app, fetch property details using the propertyId from route.params
  const property = {
    id: route.params?.propertyId,
    title: 'Modern Apartment in Downtown',
    price: 1200,
    location: '123 Main St, New York, NY',
    images: [
      'https://picsum.photos/400/300?random=1',
      'https://picsum.photos/400/300?random=2',
      'https://picsum.photos/400/300?random=3',
    ],
    rating: 4.8,
    type: 'Apartment',
    bedrooms: 2,
    bathrooms: 1,
    area: 850,
    description: 'Beautiful modern apartment in the heart of downtown. Recently renovated with high-end finishes and appliances. Walking distance to restaurants, shops, and public transportation.',
    amenities: ['WiFi', 'Kitchen', 'Washer', 'Air Conditioning', 'Heating', 'TV', 'Hair Dryer'],
    isFavorite: false,
  };

  return (
    <View style={styles.container}>
      <ScrollView>
        {/* Image Gallery */}
        <View style={styles.imageContainer}>
          <Image 
            source={{ uri: property.images[0] }} 
            style={styles.mainImage} 
            resizeMode="cover"
          />
          <TouchableOpacity 
            style={styles.backButton}
            onPress={() => navigation.goBack()}
          >
            <Ionicons name="arrow-back" size={24} color="#333" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.favoriteButton}>
            <Ionicons 
              name={property.isFavorite ? 'heart' : 'heart-outline'} 
              size={24} 
              color={property.isFavorite ? '#FF5A5F' : '#fff'} 
            />
          </TouchableOpacity>
        </View>

        {/* Property Info */}
        <View style={styles.content}>
          <View style={styles.header}>
            <View>
              <Text style={styles.price}>${property.price}/mo</Text>
              <Text style={styles.title}>{property.title}</Text>
              <View style={styles.locationContainer}>
                <Ionicons name="location-outline" size={16} color="#666" />
                <Text style={styles.location}>{property.location}</Text>
              </View>
            </View>
            <View style={styles.ratingContainer}>
              <Ionicons name="star" size={16} color="#FFD700" />
              <Text style={styles.ratingText}>{property.rating}</Text>
            </View>
          </View>

          {/* Property Details */}
          <View style={styles.detailsContainer}>
            <View style={styles.detailItem}>
              <Ionicons name="bed-outline" size={20} color="#4A90E2" />
              <Text style={styles.detailText}>{property.bedrooms} Beds</Text>
            </View>
            <View style={styles.detailItem}>
              <Ionicons name="water-outline" size={20} color="#4A90E2" />
              <Text style={styles.detailText}>{property.bathrooms} Baths</Text>
            </View>
            <View style={styles.detailItem}>
              <Ionicons name="resize-outline" size={20} color="#4A90E2" />
              <Text style={styles.detailText}>{property.area} sqft</Text>
            </View>
          </View>

          {/* Description */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Description</Text>
            <Text style={styles.description}>{property.description}</Text>
          </View>

          {/* Amenities */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Amenities</Text>
            <View style={styles.amenitiesContainer}>
              {property.amenities.map((amenity, index) => (
                <View key={index} style={styles.amenityItem}>
                  <Text style={styles.amenityText}>{amenity}</Text>
                </View>
              ))}
            </View>
          </View>
        </View>
      </ScrollView>

      {/* Bottom Action Bar */}
      <View style={styles.actionBar}>
        <TouchableOpacity style={styles.contactButton}>
          <Ionicons name="chatbubble-ellipses-outline" size={20} color="#4A90E2" />
          <Text style={styles.contactButtonText}>Contact Agent</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.bookButton}>
          <Text style={styles.bookButtonText}>Book Now</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  imageContainer: {
    height: 300,
    position: 'relative',
  },
  mainImage: {
    width: '100%',
    height: '100%',
  },
  backButton: {
    position: 'absolute',
    top: 50,
    left: 16,
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    borderRadius: 20,
    padding: 8,
  },
  favoriteButton: {
    position: 'absolute',
    top: 50,
    right: 16,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    borderRadius: 20,
    padding: 8,
  },
  content: {
    padding: 16,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  price: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
    marginTop: 4,
  },
  locationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 4,
  },
  location: {
    color: '#666',
    marginLeft: 4,
    fontSize: 14,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  ratingText: {
    marginLeft: 4,
    fontWeight: '600',
  },
  detailsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginVertical: 16,
    padding: 12,
    backgroundColor: '#f9f9f9',
    borderRadius: 12,
  },
  detailItem: {
    alignItems: 'center',
  },
  detailText: {
    marginTop: 4,
    fontSize: 12,
    color: '#666',
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
    marginBottom: 12,
  },
  description: {
    color: '#666',
    lineHeight: 22,
  },
  amenitiesContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 8,
  },
  amenityItem: {
    backgroundColor: '#f0f7ff',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    marginRight: 8,
    marginBottom: 8,
  },
  amenityText: {
    color: '#4A90E2',
    fontSize: 12,
  },
  actionBar: {
    flexDirection: 'row',
    padding: 16,
    borderTopWidth: 1,
    borderTopColor: '#eee',
    backgroundColor: '#fff',
  },
  contactButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#f5f9ff',
    padding: 16,
    borderRadius: 8,
    marginRight: 8,
  },
  contactButtonText: {
    color: '#4A90E2',
    fontWeight: '600',
    marginLeft: 8,
  },
  bookButton: {
    flex: 2,
    backgroundColor: '#4A90E2',
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
  },
  bookButtonText: {
    color: '#fff',
    fontWeight: '600',
  },
});
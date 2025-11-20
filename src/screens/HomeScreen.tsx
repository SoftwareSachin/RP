import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, ScrollView, Image, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Property } from '../types/property';

// Mock data - in a real app, this would come from an API
const mockProperties: Property[] = [
  {
    id: '1',
    title: 'Modern Apartment',
    price: 1200,
    location: 'Downtown',
    images: ['https://picsum.photos/400/300?random=1'],
    rating: 4.8,
    type: 'Apartment',
    bedrooms: 2,
    bathrooms: 1,
    area: 850,
    isFavorite: false,
    isFeatured: true,
    description: 'Beautiful modern apartment in the heart of the city',
    amenities: ['WiFi', 'Kitchen', 'Washer']
  },
  {
    id: '2',
    title: 'Cozy Studio',
    price: 850,
    location: 'City Center',
    images: ['https://picsum.photos/400/300?random=2'],
    rating: 4.5,
    type: 'Studio',
    bedrooms: 1,
    bathrooms: 1,
    area: 500,
    isFavorite: true,
    description: 'Cozy studio perfect for singles or couples',
    amenities: ['WiFi', 'Kitchen', 'TV']
  },
  // Add more properties as needed
];

export function HomeScreen() {
  const [searchQuery, setSearchQuery] = useState('');
  const [properties, setProperties] = useState<Property[]>(mockProperties);

  const toggleFavorite = (id: string) => {
    setProperties(properties.map(prop => 
      prop.id === id ? { ...prop, isFavorite: !prop.isFavorite } : prop
    ));
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Find Your Perfect Home</Text>
        <TouchableOpacity>
          <Ionicons name="notifications-outline" size={24} color="#333" />
        </TouchableOpacity>
      </View>

      {/* Search Bar */}
      <View style={styles.searchContainer}>
        <Ionicons name="search" size={20} color="#666" style={styles.searchIcon} />
        <TextInput
          style={styles.searchInput}
          placeholder="Search properties..."
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
        <TouchableOpacity style={styles.filterButton}>
          <Ionicons name="options" size={20} color="#fff" />
        </TouchableOpacity>
      </View>

      {/* Categories */}
      <ScrollView 
        horizontal 
        showsHorizontalScrollIndicator={false}
        style={styles.categoriesContainer}
        contentContainerStyle={styles.categoriesContent}
      >
        {['All', 'Apartment', 'House', 'Villa', 'Condo'].map((category) => (
          <TouchableOpacity key={category} style={styles.categoryItem}>
            <Text style={styles.categoryText}>{category}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* Property List */}
      <ScrollView style={styles.propertyList}>
        {properties.map((property) => (
          <View key={property.id} style={styles.propertyCard}>
            <Image 
              source={{ uri: property.images[0] }} 
              style={styles.propertyImage} 
              resizeMode="cover"
            />
            <TouchableOpacity 
              style={styles.favoriteButton}
              onPress={() => toggleFavorite(property.id)}
            >
              <Ionicons 
                name={property.isFavorite ? 'heart' : 'heart-outline'} 
                size={24} 
                color={property.isFavorite ? '#FF5A5F' : '#fff'} 
              />
            </TouchableOpacity>
            <View style={styles.propertyInfo}>
              <Text style={styles.propertyPrice}>${property.price}/mo</Text>
              <Text style={styles.propertyTitle}>{property.title}</Text>
              <View style={styles.propertyMeta}>
                <Text style={styles.propertyMetaText}>{property.bedrooms} Beds</Text>
                <Text style={styles.propertyMetaText}>•</Text>
                <Text style={styles.propertyMetaText}>{property.bathrooms} Baths</Text>
                <Text style={styles.propertyMetaText}>•</Text>
                <Text style={styles.propertyMetaText}>{property.area} sqft</Text>
              </View>
              <View style={styles.propertyFooter}>
                <Text style={styles.propertyLocation}>
                  <Ionicons name="location-outline" size={14} color="#666" /> {property.location}
                </Text>
                <View style={styles.ratingContainer}>
                  <Ionicons name="star" size={14} color="#FFD700" />
                  <Text style={styles.ratingText}>{property.rating}</Text>
                </View>
              </View>
            </View>
          </View>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    paddingTop: 50,
    backgroundColor: '#fff',
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
    borderRadius: 10,
    marginHorizontal: 16,
    paddingHorizontal: 12,
    height: 50,
  },
  searchIcon: {
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    height: '100%',
    fontSize: 16,
  },
  filterButton: {
    backgroundColor: '#4A90E2',
    padding: 8,
    borderRadius: 8,
    marginLeft: 8,
  },
  categoriesContainer: {
    marginTop: 16,
    paddingLeft: 16,
  },
  categoriesContent: {
    paddingRight: 16,
  },
  categoryItem: {
    backgroundColor: '#f0f7ff',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    marginRight: 8,
  },
  categoryText: {
    color: '#4A90E2',
    fontWeight: '500',
  },
  propertyList: {
    flex: 1,
    padding: 16,
  },
  propertyCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  propertyImage: {
    width: '100%',
    height: 200,
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
  },
  favoriteButton: {
    position: 'absolute',
    top: 16,
    right: 16,
    backgroundColor: 'rgba(255, 255, 255, 0.7)',
    borderRadius: 20,
    padding: 8,
  },
  propertyInfo: {
    padding: 16,
  },
  propertyPrice: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
  },
  propertyTitle: {
    fontSize: 16,
    color: '#333',
    marginTop: 4,
  },
  propertyMeta: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 8,
  },
  propertyMetaText: {
    color: '#666',
    marginRight: 8,
    fontSize: 14,
  },
  propertyFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 12,
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: '#eee',
  },
  propertyLocation: {
    color: '#666',
    fontSize: 14,
    flexDirection: 'row',
    alignItems: 'center',
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  ratingText: {
    marginLeft: 4,
    color: '#666',
    fontWeight: '500',
  },
});

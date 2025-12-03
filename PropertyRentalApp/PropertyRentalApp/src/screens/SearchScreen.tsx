// src/screens/SearchScreen.tsx
import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, FlatList, TouchableOpacity, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { theme } from '../constants/theme';
import { Property } from '../types/property';

// Mock data
const mockProperties: Property[] = [
  {
    id: '1',
    title: 'Modern Apartment',
    price: 1200,
    location: '123 Main St, City',
    images: ['https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=500&auto=format&fit=crop&q=60'],
    rating: 4.8,
    type: 'Apartment',
    bedrooms: 2,
    bathrooms: 1,
    area: 850,
    isFavorite: false,
    isFeatured: true
  },
  {
    id: '2',
    title: 'Luxury Villa',
    price: 2500,
    location: '456 Beach Rd, Coastal City',
    images: ['https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=500&auto=format&fit=crop&q=60'],
    rating: 4.9,
    type: 'Villa',
    bedrooms: 4,
    bathrooms: 3,
    area: 2000,
    isFavorite: true,
    isFeatured: true
  },
];

export function SearchScreen() {
  const [searchQuery, setSearchQuery] = useState('');

  const filteredProperties = mockProperties.filter(property => 
    property.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    property.location.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const renderPropertyItem = ({ item }: { item: Property }) => (
    <View style={styles.propertyCard}>
      <Image 
        source={{ uri: item.images[0] }} 
        style={styles.propertyImage} 
      />
      <View style={styles.propertyInfo}>
        <Text style={styles.price}>${item.price}/mo</Text>
        <Text style={styles.title}>{item.title}</Text>
        <Text style={styles.location}>{item.location}</Text>
        <View style={styles.details}>
          <Text style={styles.detailText}>{item.bedrooms} bd</Text>
          <Text style={styles.detailText}>•</Text>
          <Text style={styles.detailText}>{item.bathrooms} ba</Text>
          <Text style={styles.detailText}>•</Text>
          <Text style={styles.detailText}>{item.area} sqft</Text>
        </View>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.searchContainer}>
        <Ionicons name="search" size={20} color={theme.colors.textSecondary} style={styles.searchIcon} />
        <TextInput
          style={styles.searchInput}
          placeholder="Search properties..."
          value={searchQuery}
          onChangeText={setSearchQuery}
          placeholderTextColor={theme.colors.textSecondary}
        />
      </View>
      <FlatList
        data={filteredProperties}
        renderItem={renderPropertyItem}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.listContent}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: theme.colors.background,
    borderRadius: theme.borderRadius.md,
    paddingHorizontal: theme.spacing.md,
    margin: theme.spacing.md,
    borderWidth: 1,
    borderColor: theme.colors.border,
  },
  searchIcon: {
    marginRight: theme.spacing.sm,
  },
  searchInput: {
    flex: 1,
    height: 50,
    color: theme.colors.text,
  },
  listContent: {
    padding: theme.spacing.md,
  },
  propertyCard: {
    backgroundColor: '#fff',
    borderRadius: theme.borderRadius.md,
    marginBottom: theme.spacing.md,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  propertyImage: {
    width: '100%',
    height: 200,
  },
  propertyInfo: {
    padding: theme.spacing.md,
  },
  price: {
    fontSize: 20,
    fontWeight: 'bold',
    color: theme.colors.text,
    marginBottom: 4,
  },
  title: {
    fontSize: 16,
    color: theme.colors.text,
    marginBottom: 4,
  },
  location: {
    fontSize: 14,
    color: theme.colors.textSecondary,
    marginBottom: 8,
  },
  details: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  detailText: {
    marginRight: 8,
    fontSize: 14,
    color: theme.colors.textSecondary,
  },
});
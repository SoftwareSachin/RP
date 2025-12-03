// src/screens/SearchScreen.tsx
import React, { useState } from 'react';
import { 
  View, 
  Text, 
  TextInput, 
  StyleSheet, 
  ScrollView, 
  TouchableOpacity, 
  FlatList, 
  Image 
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const mockProperties = [
  {
    id: '1',
    title: 'Modern Apartment',
    price: 1200,
    location: 'Downtown',
    image: 'https://picsum.photos/400/300?random=1',
    rating: 4.8,
    type: 'Apartment',
  },
  {
    id: '2',
    title: 'Luxury Villa',
    price: 2500,
    location: 'Uptown',
    image: 'https://picsum.photos/400/300?random=2',
    rating: 4.9,
    type: 'Villa',
  },
  {
    id: '3',
    title: 'Cozy Studio',
    price: 850,
    location: 'Midtown',
    image: 'https://picsum.photos/400/300?random=3',
    rating: 4.6,
    type: 'Studio',
  }
];

export function SearchScreen({ navigation }: any) {
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <View style={styles.container}>
      {/* Search Bar */}
      <View style={styles.searchContainer}>
        <Ionicons name="search" size={20} color="#666" style={styles.searchIcon} />
        <TextInput
          style={styles.searchInput}
          placeholder="Search properties, locations..."
          value={searchQuery}
          onChangeText={setSearchQuery}
          autoFocus
        />
        {searchQuery ? (
          <TouchableOpacity onPress={() => setSearchQuery('')}>
            <Ionicons name="close-circle" size={20} color="#999" />
          </TouchableOpacity>
        ) : null}
      </View>

      {/* Search Suggestions */}
      {!searchQuery ? (
        <View style={styles.suggestionsContainer}>
          <Text style={styles.sectionTitle}>Recent Searches</Text>
          {['Downtown', 'Beachfront', 'Luxury', 'Pet Friendly'].map((item, index) => (
            <TouchableOpacity 
              key={index} 
              style={styles.suggestionItem}
              onPress={() => setSearchQuery(item)}
            >
              <Ionicons name="time-outline" size={20} color="#666" />
              <Text style={styles.suggestionText}>{item}</Text>
            </TouchableOpacity>
          ))}

          <Text style={[styles.sectionTitle, { marginTop: 24 }]}>Popular Searches</Text>
          {['New York', 'Los Angeles', 'Miami', 'Chicago'].map((item, index) => (
            <TouchableOpacity 
              key={`popular-${index}`} 
              style={styles.suggestionItem}
              onPress={() => setSearchQuery(item)}
            >
              <Ionicons name="location-outline" size={20} color="#666" />
              <Text style={styles.suggestionText}>{item}</Text>
            </TouchableOpacity>
          ))}
        </View>
      ) : (
        // Search Results
        <FlatList
          data={mockProperties.filter(property => 
            property.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            property.location.toLowerCase().includes(searchQuery.toLowerCase())
          )}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <TouchableOpacity 
              style={styles.resultItem}
              onPress={() => navigation.navigate('PropertyDetail', { propertyId: item.id })}
            >
              <Image 
                source={{ uri: item.image }} 
                style={styles.resultImage} 
                resizeMode="cover"
              />
              <View style={styles.resultInfo}>
                <Text style={styles.resultPrice}>${item.price}/mo</Text>
                <Text style={styles.resultTitle}>{item.title}</Text>
                <View style={styles.resultMeta}>
                  <Text style={styles.resultLocation}>{item.location}</Text>
                  <View style={styles.ratingContainer}>
                    <Ionicons name="star" size={14} color="#FFD700" />
                    <Text style={styles.ratingText}>{item.rating}</Text>
                  </View>
                </View>
              </View>
            </TouchableOpacity>
          )}
          contentContainerStyle={styles.resultsContainer}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingTop: 16,
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
  suggestionsContainer: {
    padding: 16,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#666',
    marginBottom: 12,
  },
  suggestionItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  suggestionText: {
    marginLeft: 12,
    fontSize: 16,
    color: '#333',
  },
  resultsContainer: {
    padding: 16,
  },
  resultItem: {
    flexDirection: 'row',
    marginBottom: 16,
    backgroundColor: '#fff',
    borderRadius: 12,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  resultImage: {
    width: 100,
    height: 100,
  },
  resultInfo: {
    flex: 1,
    padding: 12,
  },
  resultPrice: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  resultTitle: {
    fontSize: 16,
    color: '#333',
    marginTop: 4,
  },
  resultMeta: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 8,
  },
  resultLocation: {
    color: '#666',
    fontSize: 14,
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
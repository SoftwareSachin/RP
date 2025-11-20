// src/components/PropertyCard.tsx
import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Property } from '../types/property';
import { theme } from '../constants/theme';
import { formatPrice } from '../utils/helper';

interface PropertyCardProps {
  property: Property;
  onPress: () => void;
  onFavoritePress: (id: string) => void;
}

export const PropertyCard: React.FC<PropertyCardProps> = ({ 
  property, 
  onPress, 
  onFavoritePress 
}) => {
  return (
    <TouchableOpacity 
      style={styles.container}
      onPress={onPress}
      activeOpacity={0.9}
    >
      <View style={styles.imageContainer}>
        <Image 
          source={{ uri: property.images[0] }} 
          style={styles.image}
          resizeMode="cover"
        />
        <TouchableOpacity 
          style={styles.favoriteButton}
          onPress={() => onFavoritePress(property.id)}
        >
          <Ionicons 
            name={property.isFavorite ? 'heart' : 'heart-outline'} 
            size={24} 
            color={property.isFavorite ? theme.colors.secondary : '#fff'} 
          />
        </TouchableOpacity>
        {property.isFeatured && (
          <View style={styles.featuredBadge}>
            <Text style={styles.featuredText}>Featured</Text>
          </View>
        )}
      </View>

      <View style={styles.details}>
        <View style={styles.priceContainer}>
          <Text style={styles.price}>{formatPrice(property.price)}</Text>
          <Text style={styles.pricePeriod}>/mo</Text>
        </View>
        <Text style={styles.title} numberOfLines={1}>{property.title}</Text>
        <View style={styles.locationContainer}>
          <Ionicons name="location-outline" size={14} color={theme.colors.textSecondary} />
          <Text style={styles.location} numberOfLines={1}>{property.location}</Text>
        </View>
        
        <View style={styles.divider} />

        <View style={styles.features}>
          <View style={styles.feature}>
            <Ionicons name="bed-outline" size={16} color={theme.colors.textSecondary} />
            <Text style={styles.featureText}>{property.bedrooms} beds</Text>
          </View>
          <View style={styles.feature}>
            <Ionicons name="water-outline" size={16} color={theme.colors.textSecondary} />
            <Text style={styles.featureText}>{property.bathrooms} baths</Text>
          </View>
          <View style={styles.feature}>
            <Ionicons name="resize-outline" size={16} color={theme.colors.textSecondary} />
            <Text style={styles.featureText}>{property.area} sqft</Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    borderRadius: theme.borderRadius.lg,
    overflow: 'hidden',
    marginBottom: theme.spacing.lg,
    ...theme.shadow.md,
  },
  imageContainer: {
    height: 180,
    position: 'relative',
  },
  image: {
    width: '100%',
    height: '100%',
  },
  favoriteButton: {
    position: 'absolute',
    top: 12,
    right: 12,
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
    width: 36,
    height: 36,
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
  },
  featuredBadge: {
    position: 'absolute',
    top: 12,
    left: 12,
    backgroundColor: theme.colors.secondary,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
  },
  featuredText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: '600',
  },
  details: {
    padding: theme.spacing.md,
  },
  priceContainer: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    marginBottom: 4,
  },
  price: {
    fontSize: 20,
    fontWeight: 'bold',
    color: theme.colors.primary,
  },
  pricePeriod: {
    fontSize: 14,
    color: theme.colors.textSecondary,
    marginLeft: 4,
    marginBottom: 2,
  },
  title: {
    fontSize: 16,
    fontWeight: '600',
    color: theme.colors.text,
    marginBottom: 4,
  },
  locationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  location: {
    fontSize: 12,
    color: theme.colors.textSecondary,
    marginLeft: 4,
  },
  divider: {
    height: 1,
    backgroundColor: theme.colors.border,
    marginVertical: 12,
  },
  features: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  feature: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  featureText: {
    fontSize: 12,
    color: theme.colors.textSecondary,
    marginLeft: 4,
  },
});
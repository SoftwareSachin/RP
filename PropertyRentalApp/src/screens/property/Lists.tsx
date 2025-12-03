import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { MaterialIcons } from 'react-native-vector-icons';
import { propertyService } from '../../services/propertyService';
import { useAuth } from '../../hooks/useAuth';

type RootStackParamList = {
  AddProperty: undefined;
  PropertyDetail: { propertyId: string };
  // Add other screen names and their params as needed
};

type PropertyListScreenNavigationProp = StackNavigationProp<RootStackParamList, 'PropertyDetail'>;

const PropertyListScreen = () => {
  const navigation = useNavigation<PropertyListScreenNavigationProp>();
  const { authState } = useAuth();
  const [properties, setProperties] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProperties();
  }, []);

  const fetchProperties = async () => {
    try {
      setLoading(true);
      if (!authState.user?.id) {
        throw new Error('User not authenticated');
      }
      const userProperties = await propertyService.getUserProperties(authState.user.id);
      setProperties(userProperties);
    } catch (error) {
      console.error('Error fetching properties:', error);
      Alert.alert('Error', 'Failed to load properties');
    } finally {
      setLoading(false);
    }
  };

  const handleAddProperty = () => {
    navigation.navigate('AddProperty');
  };

  const handlePropertyPress = (propertyId: string) => {
    navigation.navigate('PropertyDetail', { propertyId });
  };

  const renderPropertyItem = ({ item }: { item: any }) => (
    <TouchableOpacity 
      style={styles.propertyItem}
      onPress={() => handlePropertyPress(item.id)}
    >
      <Text style={styles.propertyTitle}>{item.title}</Text>
      <Text>{item.address}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={properties}
        renderItem={renderPropertyItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContent}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Text>No properties found</Text>
          </View>
        }
      />
      
      <TouchableOpacity 
        style={styles.addButton}
        onPress={handleAddProperty}
      >
        <MaterialIcons name="add" size={24} color="white" />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  listContent: {
    padding: 16,
  },
  propertyItem: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  propertyTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  addButton: {
    position: 'absolute',
    right: 20,
    bottom: 20,
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: '#FFDD32',
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 4,
  },
});

export default PropertyListScreen;

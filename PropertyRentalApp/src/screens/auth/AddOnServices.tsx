import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  StyleSheet,
  Dimensions,
  Modal,
  ScrollView
} from "react-native";

const { width, height } = Dimensions.get('window');

// --- ASSETS ---
const ICONS = {
    cleaning: "https://cdn-icons-png.flaticon.com/512/995/995016.png",
    wifi: "https://cdn-icons-png.flaticon.com/512/93/93158.png",
    meal: "https://cdn-icons-png.flaticon.com/512/1046/1046747.png",
    laundry: "https://cdn-icons-png.flaticon.com/512/2954/2954888.png",
    family: "https://cdn-icons-png.flaticon.com/512/3322/3322066.png",
    close: "https://cdn-icons-png.flaticon.com/512/1828/1828778.png",
};

interface Service {
    id: string;
    name: string;
    sub: string;
    price: number;
    icon: string;
}

const SERVICES_DATA: Service[] = [
    { id: '1', name: 'Room Cleaning', sub: 'Weekly', price: 400, icon: ICONS.cleaning },
    { id: '2', name: 'High Speed Wifi', sub: 'Speed: 100 Mbps', price: 600, icon: ICONS.wifi },
    { id: '3', name: 'Meal Plan', sub: 'Breakfast + Dinner', price: 1800, icon: ICONS.meal },
    { id: '4', name: 'Laundry Service', sub: 'Weekly Pickup', price: 500, icon: ICONS.laundry },
];

interface Props {
    visible: boolean;
    onClose: () => void;
}

export default function AddOnServices({ visible, onClose }: Props) {
  const [selectedServices, setSelectedServices] = useState<string[]>([]);
  const [members, setMembers] = useState(1);

  // Handlers
  const toggleService = (id: string) => {
      setSelectedServices(prev => 
          prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]
      );
  };

  const handleMemberChange = (change: number) => {
      const newCount = members + change;
      if (newCount >= 1 && newCount <= 5) setMembers(newCount);
  };

  const calculateTotal = () => {
      let total = 0;
      SERVICES_DATA.forEach(service => {
          if (selectedServices.includes(service.id)) {
              total += service.price;
          }
      });
      return total;
  };

  return (
    <Modal
        animationType="slide"
        transparent={true}
        visible={visible}
        onRequestClose={onClose}
    >
        <View style={styles.overlay}>
            <View style={styles.container}>
                
                {/* Header */}
                <View style={styles.header}>
                    <Text style={styles.title}>Add-on Services</Text>
                    <TouchableOpacity onPress={onClose}>
                        <Image source={{ uri: ICONS.close }} style={styles.closeIcon} />
                    </TouchableOpacity>
                </View>
                <Text style={styles.subtitle}>Select services you’d like to include in your stay</Text>

                <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.listContent}>
                    {SERVICES_DATA.map((item) => {
                        const isAdded = selectedServices.includes(item.id);
                        return (
                            <View key={item.id} style={styles.serviceCard}>
                                <View style={styles.iconContainer}>
                                    <Image source={{ uri: item.icon }} style={styles.serviceIcon} resizeMode="contain" />
                                </View>
                                <View style={styles.infoContainer}>
                                    <Text style={styles.serviceName}>{item.name}</Text>
                                    <Text style={styles.serviceSub}>{item.sub}</Text>
                                    <Text style={styles.servicePrice}>₹{item.price}/month</Text>
                                </View>
                                <TouchableOpacity 
                                    style={[styles.addButton, isAdded && styles.addedButton]} 
                                    onPress={() => toggleService(item.id)}
                                >
                                    <Text style={[styles.addText, isAdded && styles.addedText]}>
                                        {isAdded ? "ADDED" : "ADD"}
                                    </Text>
                                </TouchableOpacity>
                            </View>
                        );
                    })}

                    {/* Member Count Section */}
                    <View style={styles.memberSection}>
                        <View style={styles.memberHeader}>
                             <Image source={{ uri: ICONS.family }} style={styles.memberIcon} />
                             <Text style={styles.memberTitle}>Members Count</Text>
                        </View>
                        <View style={styles.counterContainer}>
                            <TouchableOpacity style={styles.counterBtn} onPress={() => handleMemberChange(-1)}>
                                <Text style={styles.counterText}>-</Text>
                            </TouchableOpacity>
                            <Text style={styles.countValue}>{members}</Text>
                            <TouchableOpacity style={styles.counterBtn} onPress={() => handleMemberChange(1)}>
                                <Text style={styles.counterText}>+</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                    <Text style={styles.note}>Family, Couple or individuals allowed</Text>

                </ScrollView>

                {/* Footer */}
                <View style={styles.footer}>
                    <View>
                        <Text style={styles.totalLabel}>Total Add-ons</Text>
                        <Text style={styles.totalPrice}>₹{calculateTotal()}<Text style={styles.perMonth}>/mo</Text></Text>
                    </View>
                    <TouchableOpacity style={styles.updateButton} onPress={onClose}>
                        <Text style={styles.updateButtonText}>Update Services</Text>
                    </TouchableOpacity>
                </View>

            </View>
        </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
      flex: 1,
      backgroundColor: 'rgba(0,0,0,0.5)',
      justifyContent: 'flex-end',
  },
  container: {
      backgroundColor: '#FFF',
      borderTopLeftRadius: 30,
      borderTopRightRadius: 30,
      height: height * 0.75, // Takes up 75% of screen
      padding: 20,
      shadowColor: "#000",
      shadowOffset: { width: 0, height: -5 },
      shadowOpacity: 0.2,
      shadowRadius: 10,
      elevation: 20,
  },
  
  // Header
  header: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: 5,
  },
  title: { fontSize: 22, fontWeight: 'bold', color: '#000' },
  subtitle: { fontSize: 14, color: '#666', marginBottom: 20 },
  closeIcon: { width: 24, height: 24, tintColor: '#999' },

  listContent: { paddingBottom: 20 },

  // Service Card
  serviceCard: {
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: '#F9F9F9',
      borderRadius: 16,
      padding: 12,
      marginBottom: 12,
      borderWidth: 1,
      borderColor: '#EEE',
  },
  iconContainer: {
      width: 50, height: 50,
      backgroundColor: '#FFF',
      borderRadius: 12,
      justifyContent: 'center',
      alignItems: 'center',
      marginRight: 15,
      shadowColor: "#000", shadowOpacity: 0.05, shadowRadius: 5, elevation: 2
  },
  serviceIcon: { width: 28, height: 28 },
  infoContainer: { flex: 1 },
  serviceName: { fontSize: 16, fontWeight: 'bold', color: '#333' },
  serviceSub: { fontSize: 12, color: '#888', marginBottom: 4 },
  servicePrice: { fontSize: 14, fontWeight: 'bold', color: '#000' },

  // Buttons
  addButton: {
      paddingVertical: 8, paddingHorizontal: 16,
      borderRadius: 20,
      backgroundColor: '#FFF',
      borderWidth: 1, borderColor: '#FFDD32',
  },
  addedButton: {
      backgroundColor: '#FFDD32',
      borderWidth: 0,
  },
  addText: { fontSize: 12, fontWeight: 'bold', color: '#000' },
  addedText: { color: '#000' },

  // Members
  memberSection: {
      flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center',
      marginTop: 20, padding: 15, backgroundColor: '#FFFBE6', borderRadius: 16
  },
  memberHeader: { flexDirection: 'row', alignItems: 'center' },
  memberIcon: { width: 24, height: 24, marginRight: 10 },
  memberTitle: { fontSize: 16, fontWeight: 'bold', color: '#333' },
  counterContainer: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#FFF', borderRadius: 20, paddingHorizontal: 5 },
  counterBtn: { width: 30, height: 30, justifyContent: 'center', alignItems: 'center', backgroundColor: '#F0F0F0', borderRadius: 15 },
  counterText: { fontSize: 18, fontWeight: 'bold', color: '#000' },
  countValue: { marginHorizontal: 15, fontSize: 16, fontWeight: 'bold' },

  note: { fontSize: 12, color: '#999', marginTop: 10, textAlign: 'center', fontStyle: 'italic' },

  // Footer
  footer: {
      borderTopWidth: 1, borderTopColor: '#EEE',
      paddingTop: 15,
      flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'
  },
  totalLabel: { fontSize: 12, color: '#888' },
  totalPrice: { fontSize: 24, fontWeight: 'bold', color: '#000' },
  perMonth: { fontSize: 14, fontWeight: 'normal', color: '#666' },
  updateButton: {
      backgroundColor: '#FFDD32',
      paddingVertical: 14, paddingHorizontal: 30,
      borderRadius: 25,
      shadowColor: "#FFDD32", shadowOpacity: 0.3, shadowRadius: 5, elevation: 5
  },
  updateButtonText: { fontSize: 16, fontWeight: 'bold', color: '#000' },
});
import React, { useState } from "react";
import {
  SafeAreaView,
  View,
  ScrollView,
  Image,
  Text,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  StatusBar,
  Platform,
  Alert
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import AddOnServices from "./AddOnServices";

const { width } = Dimensions.get('window');

// --- ASSETS ---
const ASSETS = {
    back: "https://cdn-icons-png.flaticon.com/512/271/271220.png",
    propertyImage: "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?q=80&w=800&auto=format&fit=crop",
    
    // Icons
    home: "https://cdn-icons-png.flaticon.com/512/609/609803.png",
    location: "https://cdn-icons-png.flaticon.com/512/684/684908.png",
    idCard: "https://cdn-icons-png.flaticon.com/512/1077/1077114.png",
    money: "https://cdn-icons-png.flaticon.com/512/2489/2489756.png",
    
    // Actions
    history: "https://cdn-icons-png.flaticon.com/512/2961/2961948.png",
    service: "https://cdn-icons-png.flaticon.com/512/2620/2620559.png",
    pdf: "https://cdn-icons-png.flaticon.com/512/337/337946.png",
    starEmpty: "https://cdn-icons-png.flaticon.com/512/1828/1828970.png",
    starFilled: "https://cdn-icons-png.flaticon.com/512/1828/1828884.png",
};

export default function OccupiedProperty() {
  const navigation = useNavigation();
  const [rating, setRating] = useState(4);
  const [servicesVisible, setServicesVisible] = useState(false);

  const handleStarPress = (index: number) => {
      setRating(index + 1);
  };

  return (
    <View style={styles.mainContainer}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFDD32" translucent />
      
      {/* Header Background */}
      <View style={styles.yellowBackground} />

      <SafeAreaView style={styles.safeArea}>
        
        {/* Header */}
        <View style={styles.header}>
            <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
                <Image source={{ uri: ASSETS.back }} style={styles.backIcon} />
            </TouchableOpacity>
            <Text style={styles.headerTitle}>My Property</Text>
            <View style={{width: 24}} /> 
        </View>

        <ScrollView 
            contentContainerStyle={styles.scrollContent} 
            showsVerticalScrollIndicator={false}
        >
            {/* --- PROPERTY HERO CARD --- */}
            <View style={styles.heroCard}>
                <Image source={{ uri: ASSETS.propertyImage }} style={styles.heroImage} />
                <View style={styles.heroOverlay}>
                    <View style={styles.statusTag}>
                        <Text style={styles.statusText}>Occupied</Text>
                    </View>
                    <Text style={styles.propertyName}>Green View Residency</Text>
                    <Text style={styles.propertySub}>Malviya Nagar, Jaipur</Text>
                </View>
            </View>

            {/* --- DETAILS CARD --- */}
            <View style={styles.detailsCard}>
                <View style={styles.detailRow}>
                    <View style={styles.detailItem}>
                        <Text style={styles.label}>Type</Text>
                        <View style={styles.valueBox}>
                            <Image source={{uri: ASSETS.home}} style={styles.iconSmall} />
                            <Text style={styles.value}>House</Text>
                        </View>
                    </View>
                    <View style={styles.detailItem}>
                        <Text style={styles.label}>Property ID</Text>
                        <View style={styles.valueBox}>
                            <Image source={{uri: ASSETS.idCard}} style={styles.iconSmall} />
                            <Text style={styles.value}>#TG24356</Text>
                        </View>
                    </View>
                </View>
                
                <View style={styles.divider} />

                <View style={styles.detailRow}>
                    <View style={styles.detailItem}>
                        <Text style={styles.label}>Rent Amount</Text>
                        <Text style={styles.rentValue}>₹25,000</Text>
                    </View>
                    <TouchableOpacity style={styles.payBtn} onPress={() => Alert.alert("Pay Rent", "Initiating payment...")}>
                        <Text style={styles.payText}>Pay Now</Text>
                    </TouchableOpacity>
                </View>
            </View>

            {/* --- QUICK ACTIONS --- */}
            <Text style={styles.sectionTitle}>Quick Actions</Text>
            
            {/* Rent Agreement */}
            <TouchableOpacity style={styles.actionCard} onPress={() => Alert.alert("PDF", "Opening Rent Agreement...")}>
                <View style={styles.actionIconBox}>
                    <Image source={{ uri: ASSETS.pdf }} style={styles.actionIcon} />
                </View>
                <View style={styles.actionContent}>
                    <Text style={styles.actionTitle}>Rent Agreement</Text>
                    <Text style={styles.actionSub}>View or download your contract</Text>
                </View>
                <Image source={{ uri: "https://cdn-icons-png.flaticon.com/512/271/271228.png" }} style={styles.chevron} />
            </TouchableOpacity>

            {/* History */}
            <TouchableOpacity style={styles.actionCard} onPress={() => Alert.alert("History", "View Past Details")}>
                <View style={[styles.actionIconBox, {backgroundColor: '#E3F2FD'}]}>
                    <Image source={{ uri: ASSETS.history }} style={[styles.actionIcon, {tintColor: '#1976D2'}]} />
                </View>
                <View style={styles.actionContent}>
                    <Text style={styles.actionTitle}>Property History</Text>
                    <Text style={styles.actionSub}>View past payments and details</Text>
                </View>
                <Image source={{ uri: "https://cdn-icons-png.flaticon.com/512/271/271228.png" }} style={styles.chevron} />
            </TouchableOpacity>

            {/* Services */}
            <TouchableOpacity
                style={styles.actionCard}
                onPress={() => setServicesVisible(true)}
            >
                <View style={[styles.actionIconBox, {backgroundColor: '#FFF3E0'}]}>
                    <Image source={{ uri: ASSETS.service }} style={[styles.actionIcon, {tintColor: '#F57C00'}]} />
                </View>
                <View style={styles.actionContent}>
                    <Text style={styles.actionTitle}>Add-on Services</Text>
                    <Text style={styles.actionSub}>Cleaning, Repairs & more</Text>
                </View>
                <TouchableOpacity style={styles.updateBtn}>
                    <Text style={styles.updateText}>Update</Text>
                </TouchableOpacity>
            </TouchableOpacity>

            {/* --- REVIEW SECTION --- */}
            <View style={styles.reviewContainer}>
                <Text style={styles.reviewTitle}>Rate your stay</Text>
                <View style={styles.starsRow}>
                    {[0, 1, 2, 3, 4].map((index) => (
                        <TouchableOpacity key={index} onPress={() => handleStarPress(index)}>
                            <Image 
                                source={{ uri: index < rating ? ASSETS.starFilled : ASSETS.starEmpty }} 
                                style={styles.starIcon} 
                            />
                        </TouchableOpacity>
                    ))}
                </View>
                <TouchableOpacity style={styles.writeReviewBtn} onPress={() => Alert.alert("Review", "Open Review Modal")}>
                    <Text style={styles.writeReviewText}>Write a Review</Text>
                </TouchableOpacity>
            </View>

        </ScrollView>
      </SafeAreaView>

      <AddOnServices
        visible={servicesVisible}
        onClose={() => setServicesVisible(false)}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  mainContainer: { flex: 1, backgroundColor: "#F8F9FA" },
  yellowBackground: { position: 'absolute', top: 0, left: 0, right: 0, height: 250, backgroundColor: '#FFDD32', borderBottomLeftRadius: 30, borderBottomRightRadius: 30 },
  safeArea: { flex: 1, paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0 },
  
  // Header
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 20, paddingTop: 20, paddingBottom: 15 },
  backBtn: { padding: 5 },
  backIcon: { width: 24, height: 24, tintColor: '#000' },
  headerTitle: { fontSize: 20, fontWeight: 'bold', color: '#000' },

  scrollContent: { paddingHorizontal: 20, paddingBottom: 40 },

  // Hero Card
  heroCard: {
      height: 220, borderRadius: 20, overflow: 'hidden', marginBottom: 20,
      shadowColor: "#000", shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.2, shadowRadius: 8, elevation: 5,
      backgroundColor: '#000'
  },
  heroImage: { width: '100%', height: '100%', opacity: 0.8 },
  heroOverlay: { position: 'absolute', bottom: 0, left: 0, right: 0, padding: 20, paddingTop: 40 }, // Gradient effect simulated by padding
  statusTag: { position: 'absolute', top: 15, right: 15, backgroundColor: '#4CAF50', paddingHorizontal: 12, paddingVertical: 6, borderRadius: 20 },
  statusText: { color: '#FFF', fontWeight: 'bold', fontSize: 12 },
  propertyName: { color: '#FFF', fontSize: 24, fontWeight: 'bold', marginBottom: 4 },
  propertySub: { color: '#DDD', fontSize: 14 },

  // Details Card
  detailsCard: {
      backgroundColor: '#FFF', borderRadius: 16, padding: 20, marginBottom: 25,
      shadowColor: "#000", shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.05, shadowRadius: 5, elevation: 3
  },
  detailRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  detailItem: { flex: 1 },
  label: { fontSize: 12, color: '#888', marginBottom: 5, fontWeight: '600' },
  valueBox: { flexDirection: 'row', alignItems: 'center' },
  iconSmall: { width: 16, height: 16, marginRight: 6, tintColor: '#555' },
  value: { fontSize: 15, fontWeight: 'bold', color: '#333' },
  rentValue: { fontSize: 22, fontWeight: 'bold', color: '#000' },
  divider: { height: 1, backgroundColor: '#F0F0F0', marginVertical: 15 },
  payBtn: { backgroundColor: '#FFDD32', paddingHorizontal: 25, paddingVertical: 10, borderRadius: 25 },
  payText: { fontWeight: 'bold', color: '#000' },

  // Sections
  sectionTitle: { fontSize: 18, fontWeight: 'bold', color: '#000', marginBottom: 15 },

  // Action Cards
  actionCard: {
      flexDirection: 'row', alignItems: 'center', backgroundColor: '#FFF', 
      padding: 15, borderRadius: 16, marginBottom: 15,
      shadowColor: "#000", shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.05, shadowRadius: 5, elevation: 2
  },
  actionIconBox: { width: 45, height: 45, backgroundColor: '#FEE8E8', borderRadius: 12, justifyContent: 'center', alignItems: 'center', marginRight: 15 },
  actionIcon: { width: 24, height: 24, resizeMode: 'contain' },
  actionContent: { flex: 1 },
  actionTitle: { fontSize: 16, fontWeight: 'bold', color: '#333' },
  actionSub: { fontSize: 12, color: '#888', marginTop: 2 },
  chevron: { width: 16, height: 16, tintColor: '#CCC' },
  updateBtn: { backgroundColor: '#F0F0F0', paddingHorizontal: 12, paddingVertical: 6, borderRadius: 8 },
  updateText: { fontSize: 12, fontWeight: 'bold', color: '#333' },

  // Reviews
  reviewContainer: { alignItems: 'center', marginTop: 10, backgroundColor: '#FFF', padding: 20, borderRadius: 16 },
  reviewTitle: { fontSize: 16, fontWeight: 'bold', color: '#333', marginBottom: 15 },
  starsRow: { flexDirection: 'row', gap: 10, marginBottom: 20 },
  starIcon: { width: 32, height: 32 },
  writeReviewBtn: { width: '100%', paddingVertical: 12, borderWidth: 1, borderColor: '#FFDD32', borderRadius: 12, alignItems: 'center' },
  writeReviewText: { color: '#F5A623', fontWeight: 'bold', fontSize: 14 }
});
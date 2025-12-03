import React, { useState, useEffect, useMemo } from "react";
import {
  SafeAreaView,
  View,
  ScrollView,
  Image,
  Text,
  TouchableOpacity,
  TextInput,
  StyleSheet,
  Dimensions,
  StatusBar,
  KeyboardAvoidingView,
  Platform,
  Alert,
  ActivityIndicator,
  LayoutAnimation,
  UIManager
} from "react-native";
import { useNavigation } from '@react-navigation/native';

// Enable LayoutAnimation
if (Platform.OS === 'android') {
  if (UIManager.setLayoutAnimationEnabledExperimental) {
    UIManager.setLayoutAnimationEnabledExperimental(true);
  }
}

const { width } = Dimensions.get('window');

// --- ASSETS ---
const ASSETS = {
    back: "https://cdn-icons-png.flaticon.com/512/271/271220.png",
    search: "https://cdn-icons-png.flaticon.com/512/54/54481.png",
    
    // UPDATED: Consistent Professional Line Icons (Monochrome)
    filter: "https://cdn-icons-png.flaticon.com/512/3161/3161355.png", 
    sort: "https://cdn-icons-png.flaticon.com/512/3161/3161369.png",
    map: "https://cdn-icons-png.flaticon.com/512/3161/3161423.png",
    
    pin: "https://cdn-icons-png.flaticon.com/512/684/684908.png",
    star: "https://cdn-icons-png.flaticon.com/512/1828/1828884.png",
    heart: "https://cdn-icons-png.flaticon.com/512/833/833472.png", 
    trash: "https://cdn-icons-png.flaticon.com/512/1214/1214428.png", 
    
    // Nav Icons
    home: "https://cdn-icons-png.flaticon.com/512/1946/1946436.png",
    list: "https://cdn-icons-png.flaticon.com/512/2910/2910791.png",
    heartNav: "https://cdn-icons-png.flaticon.com/512/1077/1077035.png",
    pay: "https://cdn-icons-png.flaticon.com/512/272/272525.png",
    userNav: "https://cdn-icons-png.flaticon.com/512/1077/1077114.png",
};

// --- MOCK DATA ---
const INITIAL_SAVED_PROPERTIES = [
    { id: "1", title: "Kdms Skywalk", location: "Nirman Nagar, Jaipur", priceDisplay: "40k", priceValue: 40000, rating: 4.8, type: "Apartment", image: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?q=80&w=800&auto=format&fit=crop" },
    { id: "2", title: "Royal Villas", location: "Vaishali Nagar", priceDisplay: "85k", priceValue: 85000, rating: 4.9, type: "Villa", image: "https://images.unsplash.com/photo-1613977257363-707ba9348227?q=80&w=800&auto=format&fit=crop" },
    { id: "3", title: "Urban Heights", location: "Jagatpura", priceDisplay: "32k", priceValue: 32000, rating: 4.6, type: "Apartment", image: "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?q=80&w=800&auto=format&fit=crop" },
    { id: "4", title: "Green Cottage", location: "C-Scheme", priceDisplay: "25k", priceValue: 25000, rating: 4.7, type: "House", image: "https://images.unsplash.com/photo-1568605114967-8130f3a36994?q=80&w=800&auto=format&fit=crop" },
    { id: "5", title: "Modern Studio", location: "Malviya Nagar", priceDisplay: "15k", priceValue: 15000, rating: 4.5, type: "Studio", image: "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?q=80&w=800&auto=format&fit=crop" },
    { id: "6", title: "Luxe Penthouse", location: "Tonk Road", priceDisplay: "1.2L", priceValue: 120000, rating: 5.0, type: "Apartment", image: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?q=80&w=800&auto=format&fit=crop" },
    { id: "7", title: "City Center Office", location: "MI Road", priceDisplay: "50k", priceValue: 50000, rating: 4.4, type: "Office", image: "https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=800&auto=format&fit=crop" },
    { id: "8", title: "Cozy Duplex", location: "Mansarovar", priceDisplay: "28k", priceValue: 28000, rating: 4.6, type: "Duplex", image: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?q=80&w=800&auto=format&fit=crop" },
];

// --- COMPONENT ---
const SmartImage = ({ source, style, resizeMode = "cover" }: any) => {
    const [loading, setLoading] = useState(true);
    return (
        <View style={[style, { overflow: 'hidden', backgroundColor: '#F0F0F0', justifyContent: 'center', alignItems: 'center' }]}>
            <Image source={source} style={[StyleSheet.absoluteFill, style]} resizeMode={resizeMode} onLoadEnd={() => setLoading(false)} />
            {loading && <ActivityIndicator color="#CCC" size="small" />}
        </View>
    );
};

const ActionButton = ({ label, icon, onPress }: { label: string, icon: string, onPress: () => void }) => (
    <TouchableOpacity style={styles.actionBtn} onPress={onPress} activeOpacity={0.8}>
        <Image source={{ uri: icon }} style={styles.actionIcon} resizeMode="contain" />
        <Text style={styles.actionLabel}>{label}</Text>
    </TouchableOpacity>
);

export default function SavedProperties() {
  const navigation = useNavigation();
  
  // State
  const [searchText, setSearchText] = useState('');
  const [activeTab, setActiveTab] = useState("Saved");
  const [savedList, setSavedList] = useState(INITIAL_SAVED_PROPERTIES);
  const [sortMode, setSortMode] = useState("Recently Added");

  // Logic
  const filteredList = useMemo(() => {
      let result = savedList.filter(item => 
          item.title.toLowerCase().includes(searchText.toLowerCase()) || 
          item.location.toLowerCase().includes(searchText.toLowerCase())
      );

      if (sortMode === "Price") {
          result.sort((a, b) => a.priceValue - b.priceValue);
      } else if (sortMode === "Type") {
          result.sort((a, b) => a.type.localeCompare(b.type));
      } else if (sortMode === "Location") {
          result.sort((a, b) => a.location.localeCompare(b.location));
      }
      return result;
  }, [savedList, searchText, sortMode]);

  const handleRemove = (id: string) => {
      Alert.alert(
          "Remove Property",
          "Remove this property from your saved list?",
          [
              { text: "Cancel", style: "cancel" },
              { 
                  text: "Remove", 
                  style: 'destructive', 
                  onPress: () => {
                      LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
                      setSavedList(prev => prev.filter(item => item.id !== id));
                  }
              }
          ]
      );
  };

  const handleNavigateDetails = (title: string) => {
      Alert.alert("Navigate", `Opening details for ${title}`);
  };

  const tabs = [
      { name: "Home", icon: ASSETS.home, route: "HomeRent" },
      { name: "Lists", icon: ASSETS.list, route: "ListProperty" },
      { name: "Saved", icon: ASSETS.heartNav, route: "Saved" },
      { name: "Payment", icon: ASSETS.pay, route: "Payment" },
      { name: "Account", icon: ASSETS.userNav, route: "Account" },
  ];

  return (
    <View style={styles.mainContainer}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFDD32" translucent />
      
      {/* Yellow Header Background */}
      <View style={styles.yellowBackground} />

      <SafeAreaView style={styles.safeArea}>
        <KeyboardAvoidingView 
            style={{ flex: 1 }} 
            behavior={Platform.OS === "ios" ? "padding" : undefined}
        >
            <ScrollView 
                contentContainerStyle={styles.scrollContent} 
                showsVerticalScrollIndicator={false}
            >
                
                {/* Header */}
                <View style={styles.header}>
                    <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
                        <Image source={{ uri: ASSETS.back }} style={styles.backIcon} />
                    </TouchableOpacity>
                    <Text style={styles.headerTitle}>Saved Properties</Text>
                    <View style={{width: 24}} /> 
                </View>

                {/* Search Bar */}
                <View style={styles.searchBar}>
                    <Image source={{ uri: ASSETS.search }} style={styles.searchIcon} />
                    <TextInput 
                        placeholder="Search saved properties..." 
                        placeholderTextColor="#999"
                        style={styles.searchInput}
                        value={searchText}
                        onChangeText={setSearchText}
                    />
                </View>

                {/* Modern Action Buttons (Filter/Sort/Map) */}
                <View style={styles.actionButtonsContainer}>
                      <ActionButton 
                          label="Filter" 
                          icon={ASSETS.filter} 
                          onPress={() => {
                              // @ts-ignore - FilterScreen is registered in AuthNavigator
                              navigation.navigate('FilterScreen');
                          }} 
                      />
                      <ActionButton label="Sort" icon={ASSETS.sort} onPress={() => Alert.alert("Sort", "Sort options...")} />
                      <ActionButton label="Map" icon={ASSETS.map} onPress={() => Alert.alert("Map", "Map View...")} />
                </View>

                {/* Horizontal Sort Chips */}
                <View style={styles.sortRow}>
                    <Text style={styles.sortLabel}>Sort By:</Text>
                    <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                        {["Price", "Location", "Recently Added", "Type"].map((opt) => (
                            <TouchableOpacity 
                                key={opt} 
                                style={[styles.sortChip, sortMode === opt && styles.sortChipActive]}
                                onPress={() => setSortMode(opt)}
                            >
                                <Text style={[styles.sortText, sortMode === opt && styles.sortTextActive]}>{opt}</Text>
                            </TouchableOpacity>
                        ))}
                    </ScrollView>
                </View>

                {/* --- PROPERTY LIST --- */}
                <View style={styles.listContainer}>
                    {filteredList.length === 0 ? (
                        <View style={styles.emptyState}>
                            <Text style={styles.emptyText}>No saved properties found.</Text>
                            <TouchableOpacity style={styles.exploreBtn} onPress={() => Alert.alert("Explore", "Go to Home")}>
                                <Text style={styles.exploreText}>Explore Properties</Text>
                            </TouchableOpacity>
                        </View>
                    ) : (
                        filteredList.map((item) => (
                            <TouchableOpacity 
                                key={item.id} 
                                style={styles.propertyCard}
                                onPress={() => handleNavigateDetails(item.title)}
                                activeOpacity={0.9}
                            >
                                {/* Image Side */}
                                <View style={styles.imageContainer}>
                                    <SmartImage source={{ uri: item.image }} style={styles.cardImage} />
                                    <View style={styles.heartBadge}>
                                        <Image source={{ uri: ASSETS.heart }} style={styles.heartIcon} />
                                    </View>
                                    <View style={styles.ratingContainer}>
                                        <Text style={styles.ratingText}>★ {item.rating}</Text>
                                    </View>
                                </View>

                                {/* Content Side */}
                                <View style={styles.cardContent}>
                                    <View>
                                        <Text style={styles.cardTitle} numberOfLines={1}>{item.title}</Text>
                                        <Text style={styles.cardType}>{item.type}</Text>
                                        
                                        <View style={styles.locationRow}>
                                            <Image source={{ uri: ASSETS.pin }} style={styles.pinIcon} />
                                            <Text style={styles.locationText} numberOfLines={1}>{item.location}</Text>
                                        </View>
                                    </View>

                                    <View style={styles.cardFooter}>
                                        <Text style={styles.cardPrice}>₹{item.priceDisplay}<Text style={styles.perMonth}>/mo</Text></Text>
                                        
                                        <TouchableOpacity style={styles.removeBtn} onPress={() => handleRemove(item.id)}>
                                            <Image source={{ uri: ASSETS.trash }} style={styles.trashIcon} />
                                        </TouchableOpacity>
                                    </View>
                                </View>
                            </TouchableOpacity>
                        ))
                    )}
                </View>

            </ScrollView>
        </KeyboardAvoidingView>
      </SafeAreaView>

      {/* BOTTOM NAV */}
      <View style={styles.bottomNavContainer}>
          <View style={styles.bottomNav}>
              {tabs.map((tab, index) => {
                  const isActive = activeTab === tab.name;
                  return (
                      <TouchableOpacity 
                          key={index} 
                          style={[styles.navItem, isActive && styles.navItemActive]} 
                          onPress={() => {
                             if(tab.route !== 'Saved') {
                                 // @ts-ignore
                                 navigation.navigate(tab.route);
                             }
                          }}
                          activeOpacity={0.8}
                      >
                          <Image 
                              source={{ uri: tab.icon }} 
                              style={[
                                  styles.navIcon, 
                                  isActive && { tintColor: '#000', width: 20, height: 20 } 
                              ]} 
                              resizeMode="contain"
                          />
                          {isActive && <Text style={styles.navText}>{tab.name}</Text>}
                      </TouchableOpacity>
                  )
              })}
          </View>
      </View>

    </View>
  );
}

const styles = StyleSheet.create({
  mainContainer: { flex: 1, backgroundColor: "#F9F9F9" },
  yellowBackground: { position: 'absolute', top: 0, left: 0, right: 0, height: 280, backgroundColor: '#FFDD32', borderBottomLeftRadius: 30, borderBottomRightRadius: 30 },
  safeArea: { flex: 1, paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0 },
  scrollContent: { paddingBottom: 120 },

  // Header
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 20, paddingTop: 20, paddingBottom: 10 },
  backButton: { padding: 5 },
  backIcon: { width: 24, height: 24, tintColor: '#000' },
  headerTitle: { fontSize: 20, fontWeight: 'bold', color: '#000' },

  // Search Bar
  searchBar: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#FFF', borderRadius: 15, paddingHorizontal: 15, height: 50, marginHorizontal: 20, marginBottom: 15, shadowColor: "#000", shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.05, shadowRadius: 5, elevation: 2 },
  searchIcon: { width: 18, height: 18, tintColor: '#999', marginRight: 10 },
  searchInput: { flex: 1, fontSize: 16, color: '#000' },

  // Action Buttons
  actionButtonsContainer: { flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: 20, marginBottom: 20 },
  actionBtn: { 
      flexDirection: 'row', alignItems: 'center', 
      backgroundColor: 'rgba(255,255,255,0.4)', // Glass style
      paddingVertical: 10, paddingHorizontal: 18, 
      borderRadius: 20, borderWidth: 1, borderColor: 'rgba(0,0,0,0.05)' 
  },
  actionIcon: { width: 18, height: 18, marginRight: 8 },
  actionLabel: { fontSize: 13, fontWeight: '700', color: '#000' },

  // Sort Chips
  sortRow: { flexDirection: 'row', alignItems: 'center', paddingHorizontal: 20, marginBottom: 15 },
  sortLabel: { fontSize: 14, fontWeight: 'bold', color: '#333', marginRight: 10 },
  sortChip: { paddingHorizontal: 15, paddingVertical: 6, backgroundColor: '#FFF', borderRadius: 20, marginRight: 8, borderWidth: 1, borderColor: '#EEE' },
  sortChipActive: { backgroundColor: '#000', borderColor: '#000' },
  sortText: { fontSize: 12, color: '#666', fontWeight: '600' },
  sortTextActive: { color: '#FFF' },

  // List
  listContainer: { paddingHorizontal: 20 },
  
  propertyCard: { flexDirection: 'row', backgroundColor: '#FFF', borderRadius: 20, marginBottom: 15, padding: 10, shadowColor: "#000", shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.05, shadowRadius: 5, elevation: 3 },
  
  imageContainer: { position: 'relative', marginRight: 15 },
  cardImage: { width: 100, height: 100, borderRadius: 15 },
  heartBadge: { position: 'absolute', top: 6, left: 6, backgroundColor: 'rgba(255,255,255,0.9)', padding: 5, borderRadius: 20 },
  heartIcon: { width: 12, height: 12, tintColor: 'red' },
  ratingContainer: { position: 'absolute', bottom: 6, right: 6, backgroundColor: '#FFDD32', paddingHorizontal: 6, paddingVertical: 2, borderRadius: 6 },
  ratingText: { fontSize: 10, fontWeight: 'bold', color: '#000' },

  cardContent: { flex: 1, justifyContent: 'space-between', paddingVertical: 2 },
  cardTitle: { fontSize: 16, fontWeight: 'bold', color: '#000', marginBottom: 2 },
  cardType: { fontSize: 12, color: '#888', marginBottom: 4, fontWeight: '600' },
  locationRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 8 },
  pinIcon: { width: 12, height: 12, tintColor: '#999', marginRight: 4 },
  locationText: { fontSize: 12, color: '#777', flex: 1 },

  cardFooter: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', borderTopWidth: 1, borderTopColor: '#F5F5F5', paddingTop: 8 },
  cardPrice: { fontSize: 16, fontWeight: '800', color: '#000' },
  perMonth: { fontSize: 12, color: '#999', fontWeight: 'normal' },
  
  removeBtn: { backgroundColor: '#FFF0F0', padding: 8, borderRadius: 10 },
  trashIcon: { width: 16, height: 16, tintColor: '#FF3B30' },

  // Empty State
  emptyState: { alignItems: 'center', marginTop: 40 },
  emptyText: { fontSize: 16, color: '#999', marginBottom: 20 },
  exploreBtn: { backgroundColor: '#FFDD32', paddingVertical: 12, paddingHorizontal: 25, borderRadius: 25 },
  exploreText: { fontSize: 14, fontWeight: 'bold', color: '#000' },

  // Bottom Nav
  bottomNavContainer: { position: 'absolute', bottom: 25, left: 0, right: 0, alignItems: 'center', justifyContent: 'center' },
  bottomNav: { flexDirection: 'row', backgroundColor: '#FFF', width: width * 0.9, borderRadius: 35, height: 70, alignItems: 'center', justifyContent: 'space-around', paddingHorizontal: 10, shadowColor: "#000", shadowOffset: { width: 0, height: 10 }, shadowOpacity: 0.15, shadowRadius: 20, elevation: 10 },
  navItem: { alignItems: 'center', justifyContent: 'center', padding: 10, borderRadius: 25 },
  navItemActive: { backgroundColor: '#FFDD32', flexDirection: 'row', paddingHorizontal: 15, paddingVertical: 10 },
  navIcon: { width: 24, height: 24, tintColor: '#CCC' },
  navText: { marginLeft: 8, fontWeight: 'bold', fontSize: 12, color: '#000' },
});
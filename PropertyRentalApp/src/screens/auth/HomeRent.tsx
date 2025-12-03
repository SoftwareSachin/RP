import React, { useState, useEffect, useCallback } from "react";

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
  Platform,
  FlatList,
  Alert,
  Modal,
  ActivityIndicator,
  RefreshControl
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useAuthContext } from "../../context/AuthContext";

const { width, height } = Dimensions.get('window');

// --- 1. TYPES & INTERFACES (Backend Contract) ---
interface UserProfile {
    id: string;
    name: string;
    email: string;
    phone: string;
    avatar: string;
    isPremium: boolean;
}

interface Category {
    id: string;
    name: string;
    icon: string;
}

interface Property {
    id: string;
    title: string;
    location: string;
    price: string; // e.g., "40k"
    rating: number;
    type: string; // "Apartment", "Villa", etc.
    isFeatured: boolean;
    image: string;
    specs?: { beds: number; baths: number; sqft: number };
}

// --- 2. MOCK BACKEND SERVICE (Replace with real API calls) ---
const MockAPI = {
    getUser: async (): Promise<UserProfile> => {
        return new Promise((resolve) => {
            setTimeout(() => resolve({
                id: 'u1',
                name: 'Zenab Vxuh',
                email: 'zenab@example.com',
                phone: '+91 98765 43210',
                avatar: "https://images.unsplash.com/photo-1633332755192-727a05c4013d?q=80&w=250&auto=format&fit=crop",
                isPremium: true
            }), 1000);
        });
    },
    getCategories: async (): Promise<Category[]> => {
        return [
            { id: '1', name: 'All', icon: "https://cdn-icons-png.flaticon.com/512/561/561169.png" },
            { id: '2', name: 'Apartment', icon: "https://cdn-icons-png.flaticon.com/512/1018/1018573.png" },
            { id: '3', name: 'House', icon: "https://cdn-icons-png.flaticon.com/512/609/609803.png" },
            { id: '4', name: 'Villa', icon: "https://cdn-icons-png.flaticon.com/512/2230/2230477.png" },
            { id: '5', name: 'Single Room', icon: "https://cdn-icons-png.flaticon.com/512/3030/3030336.png" },
            { id: '6', name: 'Studio', icon: "https://cdn-icons-png.flaticon.com/512/2413/2413056.png" },
        ];
    },
    getProperties: async (): Promise<Property[]> => {
        return new Promise((resolve) => {
            setTimeout(() => resolve([
                {
                    id: "1",
                    title: "Kdms Skywalk",
                    location: "Jaipur, Rajasthan",
                    price: "40k",
                    rating: 4.8,
                    type: "Apartment",
                    isFeatured: true,
                    image: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
                },
                {
                    id: "2",
                    title: "Royal Villas",
                    location: "Vaishali Nagar",
                    price: "85k",
                    rating: 4.9,
                    type: "Villa",
                    isFeatured: true,
                    image: "https://images.unsplash.com/photo-1613977257363-707ba9348227?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
                },
                {
                    id: "3",
                    title: "Modern Studio",
                    location: "Malviya Nagar",
                    price: "15k",
                    rating: 4.5,
                    type: "Studio",
                    isFeatured: false,
                    image: "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
                    specs: { beds: 1, baths: 1, sqft: 650 }
                },
                {
                    id: "4",
                    title: "Green Cottage",
                    location: "C-Scheme",
                    price: "25k",
                    rating: 4.7,
                    type: "House",
                    isFeatured: false,
                    image: "https://images.unsplash.com/photo-1568605114967-8130f3a36994?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
                    specs: { beds: 2, baths: 2, sqft: 1200 }
                },
                {
                    id: "5",
                    title: "Urban Heights",
                    location: "Jagatpura",
                    price: "32k",
                    rating: 4.6,
                    type: "Apartment",
                    isFeatured: false,
                    image: "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
                    specs: { beds: 3, baths: 2, sqft: 1500 }
                }
            ]), 1500); // Simulated Network Delay
        });
    }
};

// --- ASSETS (Static Icons) ---
const ICONS = {
    notification: "https://cdn-icons-png.flaticon.com/512/3602/3602145.png",
    search: "https://cdn-icons-png.flaticon.com/512/54/54481.png",
    verified: "https://cdn-icons-png.flaticon.com/512/7595/7595571.png",
    filter: "https://storage.googleapis.com/tagjs-prod.appspot.com/v1/kwi0sLffHL/2vrimqtw_expires_30_days.png",
    sort: "https://storage.googleapis.com/tagjs-prod.appspot.com/v1/kwi0sLffHL/91dq2k06_expires_30_days.png",
    map: "https://storage.googleapis.com/tagjs-prod.appspot.com/v1/kwi0sLffHL/lecyldks_expires_30_days.png",
    pin: "https://cdn-icons-png.flaticon.com/512/684/684908.png",
    star: "https://cdn-icons-png.flaticon.com/512/1828/1828884.png",
    heart: "https://cdn-icons-png.flaticon.com/512/833/833472.png",
    bed: "https://cdn-icons-png.flaticon.com/512/3030/3030336.png",
    bath: "https://cdn-icons-png.flaticon.com/512/2423/2423830.png",
    area: "https://cdn-icons-png.flaticon.com/512/3595/3595969.png",
    home: "https://cdn-icons-png.flaticon.com/512/1946/1946436.png",
    list: "https://cdn-icons-png.flaticon.com/512/2910/2910791.png",
    heartNav: "https://cdn-icons-png.flaticon.com/512/1077/1077035.png",
    pay: "https://cdn-icons-png.flaticon.com/512/272/272525.png",
    userNav: "https://cdn-icons-png.flaticon.com/512/1077/1077114.png",
};

// --- UI COMPONENTS ---

const SmartImage = ({ source, style, resizeMode = "cover" }: any) => {
    const [loading, setLoading] = useState(true);
    return (
        <View style={[style, { overflow: 'hidden', backgroundColor: '#E0E0E0', justifyContent: 'center', alignItems: 'center' }]}>
            <Image
                source={source}
                style={[StyleSheet.absoluteFill, style]}
                resizeMode={resizeMode}
                onLoadEnd={() => setLoading(false)}
            />
            {loading && <ActivityIndicator color="#AAA" size="small" />}
        </View>
    );
};

const CategoryItem = ({ item, isActive, onPress }: { item: Category, isActive: boolean, onPress: () => void }) => (
    <TouchableOpacity 
        style={[styles.catItem, isActive && styles.catItemActive]} 
        onPress={onPress}
        activeOpacity={0.7}
    >
        <View style={[styles.catIconContainer, isActive && styles.catIconContainerActive]}>
            <Image source={{ uri: item.icon }} style={styles.catIcon} resizeMode="contain" />
        </View>
        <Text style={[styles.catText, isActive && styles.catTextActive]}>{item.name}</Text>
    </TouchableOpacity>
);

const FeaturedCard = ({ item, onPress }: { item: Property, onPress: (id: string) => void }) => (
    <TouchableOpacity style={styles.featuredCard} activeOpacity={0.95} onPress={() => onPress(item.id)}>
        <SmartImage source={{ uri: item.image }} style={styles.featuredImage} />
        <View style={styles.featuredTag}><Text style={styles.featuredTagText}>Featured</Text></View>
        <View style={styles.featuredOverlay}>
            <Text style={styles.featuredTitle} numberOfLines={1}>{item.title}</Text>
            <View style={styles.rowCenter}>
                <Image source={{ uri: ICONS.pin }} style={styles.pinIconWhite} />
                <Text style={styles.featuredLoc} numberOfLines={1}>{item.location}</Text>
            </View>
            <View style={styles.rowSpace}>
                <Text style={styles.featuredPrice}>₹{item.price}/mo</Text>
                <View style={styles.ratingBadge}><Text style={styles.ratingText}>★ {item.rating}</Text></View>
            </View>
        </View>
    </TouchableOpacity>
);

const NearbyCard = ({ item, onPress }: { item: Property, onPress: (id: string) => void }) => (
    <TouchableOpacity style={styles.nearbyCard} activeOpacity={0.9} onPress={() => onPress(item.id)}>
        <View style={styles.nearbyImageContainer}>
            <SmartImage source={{ uri: item.image }} style={styles.nearbyImage} />
            <View style={styles.nearbyRatingBadge}>
                <Image source={{ uri: ICONS.star }} style={styles.tinyStar} />
                <Text style={styles.tinyRatingText}>{item.rating}</Text>
            </View>
        </View>
        <View style={styles.nearbyContent}>
            <View style={styles.rowSpace}>
                <Text style={styles.nearbyTitle} numberOfLines={1}>{item.title}</Text>
                <Image source={{ uri: ICONS.heart }} style={{ width: 18, height: 18, tintColor: '#CCC' }} />
            </View>
            <View style={[styles.rowCenter, { marginTop: 4, marginBottom: 8 }]}>
                <Image source={{ uri: ICONS.pin }} style={styles.pinIconSmall} />
                <Text style={styles.nearbyLoc} numberOfLines={1}>{item.location}</Text>
            </View>
            {item.specs && (
                <View style={styles.featureRow}>
                    <View style={styles.featureItem}><Image source={{ uri: ICONS.bed }} style={styles.featureIcon} /><Text style={styles.featureText}>{item.specs.beds} Beds</Text></View>
                    <View style={styles.featureItem}><Image source={{ uri: ICONS.bath }} style={styles.featureIcon} /><Text style={styles.featureText}>{item.specs.baths} Bath</Text></View>
                    <View style={styles.featureItem}><Image source={{ uri: ICONS.area }} style={styles.featureIcon} /><Text style={styles.featureText}>{item.specs.sqft} ft²</Text></View>
                </View>
            )}
            <View style={styles.separator} />
            <View style={styles.rowSpace}>
                <Text style={styles.nearbyPrice}>₹{item.price}<Text style={styles.perMonth}>/mo</Text></Text>
                <View style={styles.viewDetailsBtn}><Text style={styles.viewDetailsText}>View</Text></View>
            </View>
        </View>
    </TouchableOpacity>
);

const ActionButton = ({ label, icon, onPress }: any) => (
    <TouchableOpacity style={styles.actionBtn} onPress={onPress} activeOpacity={0.8}>
        <Image source={{ uri: icon }} style={styles.actionIcon} resizeMode="contain" />
        <Text style={styles.actionLabel}>{label}</Text>
    </TouchableOpacity>
);

const ProfileModal = ({ visible, onClose, user, navigation }: any) => {
    if (!user) return null;
    return (
        <Modal animationType="fade" transparent={true} visible={visible} onRequestClose={onClose}>
            <TouchableOpacity style={styles.modalOverlay} activeOpacity={1} onPress={onClose}>
                <View style={styles.modalCard}>
                    <TouchableOpacity style={styles.closeBtn} onPress={onClose}>
                        <Text style={{fontSize: 20, color: '#AAA', fontWeight: 'bold'}}>✕</Text>
                    </TouchableOpacity>
                    <View style={styles.modalHeader}>
                        <View style={styles.avatarContainer}>
                            <SmartImage source={{ uri: user.avatar }} style={styles.modalAvatar} />
                            {user.isPremium && <View style={styles.verifiedBadge}><Image source={{ uri: ICONS.verified }} style={{width: 14, height: 14, tintColor: '#FFF'}} /></View>}
                        </View>
                        <Text style={styles.modalName}>{user.name}</Text>
                        <Text style={styles.modalRole}>{user.isPremium ? 'Premium Member' : 'Standard Member'}</Text>
                    </View>
                    <View style={styles.divider} />
                    <View style={styles.infoRow}><Text style={styles.infoLabel}>Email:</Text><Text style={styles.infoValue}>{user.email}</Text></View>
                    <View style={styles.infoRow}><Text style={styles.infoLabel}>Phone:</Text><Text style={styles.infoValue}>{user.phone}</Text></View>
                    <TouchableOpacity style={styles.fullProfileBtn} onPress={() => { onClose(); navigation.navigate('Account'); }}>
                        <Text style={styles.fullProfileText}>View Full Profile</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.logoutBtn} onPress={() => { onClose(); Alert.alert("Logged Out"); }}>
                        <Text style={styles.logoutText}>Log Out</Text>
                    </TouchableOpacity>
                </View>
            </TouchableOpacity>
        </Modal>
    );
};

// --- MAIN SCREEN ---

export default function HomeRentScreen() {
  const navigation = useNavigation();
  const { user: authUser } = useAuthContext();
  
  // Data State
  const [user, setUser] = useState<UserProfile | null>(null);
  const [categories, setCategories] = useState<Category[]>([]);
  const [properties, setProperties] = useState<Property[]>([]);
  const [filteredList, setFilteredList] = useState<Property[]>([]);
  
  // UI State
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [searchText, setSearchText] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("1"); // Default 'All'
  const [profileVisible, setProfileVisible] = useState(false);
  const [activeTab, setActiveTab] = useState("Home");

  console.log('HomeRentScreen authUser:', authUser);

  // --- 1. FETCH DATA (Simulating Backend) ---
  const loadData = async () => {
      try {
          const [userData, cats, props] = await Promise.all([
              MockAPI.getUser(),
              MockAPI.getCategories(),
              MockAPI.getProperties()
          ]);
          setUser(userData);
          setCategories(cats);
          setProperties(props);
          setFilteredList(props); // Init filtered list
      } catch (e) {
          console.error("Failed to load data", e);
      } finally {
          setLoading(false);
          setRefreshing(false);
      }
  };

  useEffect(() => {
      loadData();
  }, []);

  const onRefresh = useCallback(() => {
      setRefreshing(true);
      loadData();
  }, []);

  // --- 2. FILTER LOGIC ---
  useEffect(() => {
      let result = properties;

      // Category Filter
      const currentCatName = categories.find(c => c.id === selectedCategory)?.name;
      if (currentCatName && currentCatName !== 'All') {
          result = result.filter(p => p.type === currentCatName);
      }

      // Search Filter
      if (searchText) {
          const lower = searchText.toLowerCase();
          result = result.filter(p => 
              p.title.toLowerCase().includes(lower) || 
              p.location.toLowerCase().includes(lower)
          );
      }

      setFilteredList(result);
  }, [searchText, selectedCategory, properties, categories]);


  // --- 3. NAVIGATION HANDLERS ---
  const handlePropertyClick = (id: string) => {
      // Navigate to details screen passing ID (ensure route exists)
      // navigation.navigate('PropertyDetails', { id }); 
      Alert.alert("Navigate", `Opening details for Property ID: ${id}`);
  };

  const tabs = [
      // Route names must match those registered in your active navigator (AuthNavigator)
      { name: "Home", icon: ICONS.home, route: "HomeRent" },  // AuthNavigator screen: HomeRent
      { name: "Lists", icon: ICONS.list, route: "Lists" },     // AuthNavigator screen: Lists
      { name: "Saved", icon: ICONS.heartNav, route: "Saved" }, // AuthNavigator screen: Saved
      { name: "Payment", icon: ICONS.pay, route: "Payment" },  // AuthNavigator screen: Payment
      { name: "Profile", icon: ICONS.userNav, route: "Account" }, // Navigate to Account screen
  ];

  const profileUser = authUser
    ? {
        id: authUser.id,
        name: authUser.name,
        email: authUser.email,
        phone: authUser.phone || user?.phone || '',
        avatar: user?.avatar || "https://images.unsplash.com/photo-1633332755192-727a05c4013d?q=80&w=250&auto=format&fit=crop",
        isPremium: user?.isPremium ?? false,
      }
    : user;

  if (loading) {
      return (
          <View style={[styles.mainContainer, { justifyContent: 'center', alignItems: 'center' }]}>
              <ActivityIndicator size="large" color="#FFDD32" />
          </View>
      );
  }

  return (
    <View style={styles.mainContainer}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFDD32" translucent />
      
      <View style={styles.yellowBackground} />

      <SafeAreaView style={styles.safeArea}>
          <ScrollView 
            contentContainerStyle={{ paddingBottom: 120 }} 
            showsVerticalScrollIndicator={false}
            refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} tintColor="#000" />}
          >
              
              {/* HEADER */}
              <View style={styles.headerSection}>
                  <View style={styles.userRow}>
                      <TouchableOpacity style={styles.profileGroup} onPress={() => setProfileVisible(true)} activeOpacity={0.8}>
                          <SmartImage source={{ uri: authUser?.avatar || user?.avatar }} style={styles.userAvatar} />
                          <View style={styles.userInfo}>
                              <Text style={styles.welcomeText}>Good Morning,</Text>
                              <Text style={styles.userName}>
                                {(authUser?.name || user?.name || authUser?.email || 'Guest').split(' ')[0]}!
                              </Text>
                          </View>
                      </TouchableOpacity>
                      
                      <TouchableOpacity style={styles.notifBtn} onPress={() => Alert.alert("Notifications", "No new notifications")}>
                          <Image source={{ uri: ICONS.notification }} style={styles.notifIcon} />
                          <View style={styles.notifDot} />
                      </TouchableOpacity>
                  </View>

                  <View style={styles.searchBar}>
                      <Image source={{ uri: ICONS.search }} style={styles.searchIcon} />
                      <TextInput 
                          placeholder="Search address, city, location..."
                          placeholderTextColor="#999"
                          style={styles.searchInput}
                          value={searchText}
                          onChangeText={setSearchText}
                      />
                  </View>

                  <View style={styles.actionButtonsContainer}>
                      <ActionButton 
                          label="Filter" 
                          icon={ICONS.filter} 
                          onPress={() => {
                              // @ts-ignore - FilterScreen is registered in AuthNavigator
                              navigation.navigate('FilterScreen');
                          }} 
                      />
                      <ActionButton label="Sort" icon={ICONS.sort} onPress={() => Alert.alert("Sort")} />
                      <ActionButton label="Map" icon={ICONS.map} onPress={() => Alert.alert("Map")} />
                  </View>
              </View>

              {/* BODY */}
              <View style={styles.bodySection}>
                  
                  {/* Categories */}
                  <View style={[styles.sectionHeader, { marginBottom: 15 }]}>
                      <Text style={styles.sectionTitle}>Select Property Type</Text>
                  </View>
                  <View style={{ marginBottom: 25 }}>
                      <FlatList 
                          data={categories}
                          horizontal
                          showsHorizontalScrollIndicator={false}
                          contentContainerStyle={{ paddingHorizontal: 20 }}
                          keyExtractor={item => item.id}
                          renderItem={({ item }) => (
                              <CategoryItem 
                                  item={item} 
                                  isActive={selectedCategory === item.id}
                                  onPress={() => setSelectedCategory(item.id)} 
                              />
                          )}
                      />
                  </View>

                  {/* Featured (Horizontal) */}
                  <View style={styles.sectionHeader}>
                      <Text style={styles.sectionTitle}>High Demand</Text>
                      <TouchableOpacity><Text style={styles.seeAll}>See All</Text></TouchableOpacity>
                  </View>
                  <FlatList 
                      data={filteredList.filter(p => p.isFeatured)}
                      horizontal
                      showsHorizontalScrollIndicator={false}
                      contentContainerStyle={{ paddingHorizontal: 20 }}
                      keyExtractor={item => item.id}
                      renderItem={({ item }) => <FeaturedCard item={item} onPress={handlePropertyClick} />}
                      ListEmptyComponent={<Text style={styles.emptyText}>No featured properties found.</Text>}
                  />

                  {/* Nearby (Vertical Stack) */}
                  <View style={styles.sectionHeader}>
                      <Text style={styles.sectionTitle}>Nearby You</Text>
                      <TouchableOpacity><Text style={styles.seeAll}>See All</Text></TouchableOpacity>
                  </View>
                  <View style={{ paddingHorizontal: 20 }}>
                      {filteredList.map(item => (
                          <NearbyCard key={item.id} item={item} onPress={handlePropertyClick} />
                      ))}
                      {filteredList.length === 0 && (
                          <Text style={styles.emptyText}>No properties found matching your search.</Text>
                      )}
                  </View>

              </View>
          </ScrollView>
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
                              setActiveTab(tab.name);
                              // Navigate to the corresponding route (e.g. "Lists" -> Lists.tsx)
                              // @ts-ignore - route names are defined in your navigator
                              navigation.navigate(tab.route);
                          }}
                          activeOpacity={0.8}
                      >
                          <Image 
                              source={{ uri: tab.icon }} 
                              style={[styles.navIcon, isActive && { tintColor: '#000', width: 20, height: 20 }]} 
                              resizeMode="contain"
                          />
                          {isActive && <Text style={styles.navText}>{tab.name}</Text>}
                      </TouchableOpacity>
                  )
              })}
          </View>
      </View>

      <ProfileModal visible={profileVisible} onClose={() => setProfileVisible(false)} user={profileUser} navigation={navigation} />
    </View>
  );
}

const styles = StyleSheet.create({
  mainContainer: { flex: 1, backgroundColor: "#F9F9F9" },
  yellowBackground: { position: 'absolute', top: 0, left: 0, right: 0, height: 320, backgroundColor: '#FFDD32', borderBottomLeftRadius: 30, borderBottomRightRadius: 30 },
  safeArea: { flex: 1, paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0 },
  
  // Header
  headerSection: { paddingHorizontal: 20, paddingTop: 10, paddingBottom: 20 },
  userRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20, marginTop: 10 },
  profileGroup: { flexDirection: 'row', alignItems: 'center' },
  userAvatar: { width: 50, height: 50, borderRadius: 25, marginRight: 12, borderWidth: 2, borderColor: '#FFF' },
  userInfo: { flexDirection: 'column' },
  welcomeText: { fontSize: 14, color: '#000', fontWeight: '600', opacity: 0.7 },
  userName: { fontSize: 20, fontWeight: '800', color: '#000' },
  notifBtn: { backgroundColor: 'rgba(255,255,255,0.3)', padding: 10, borderRadius: 12 },
  notifIcon: { width: 22, height: 22, tintColor: '#000' },
  notifDot: { width: 8, height: 8, backgroundColor: 'red', borderRadius: 4, position: 'absolute', top: 8, right: 8, borderWidth: 1, borderColor: '#FFF' },

  searchBar: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#FFF', borderRadius: 15, paddingHorizontal: 15, height: 50, marginBottom: 15, shadowColor: "#000", shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.05, shadowRadius: 5, elevation: 2 },
  searchIcon: { width: 18, height: 18, tintColor: '#999', marginRight: 10 },
  searchInput: { flex: 1, fontSize: 16, color: '#000' },

  actionButtonsContainer: { flexDirection: 'row', justifyContent: 'space-between' },
  actionBtn: { flexDirection: 'row', alignItems: 'center', backgroundColor: 'rgba(255,255,255,0.3)', paddingVertical: 8, paddingHorizontal: 15, borderRadius: 20, borderWidth: 1, borderColor: 'rgba(0,0,0,0.05)' },
  actionIcon: { width: 16, height: 16, marginRight: 6 },
  actionLabel: { fontSize: 12, fontWeight: '700', color: '#000' },

  bodySection: { paddingTop: 10 },
  sectionHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 20, marginBottom: 15, marginTop: 10 },
  sectionTitle: { fontSize: 18, fontWeight: 'bold', color: '#000' },
  seeAll: { fontSize: 14, fontWeight: '600', color: '#F5A623' },
  emptyText: { textAlign: 'center', color: '#999', marginTop: 10, fontSize: 14 },

  // Category
  catItem: { alignItems: 'center', marginRight: 15, width: 100 },
  catItemActive: { transform: [{scale: 1.05}] }, // slight zoom active
  catIconContainer: { width: 85, height: 85, backgroundColor: '#FFF', borderRadius: 25, justifyContent: 'center', alignItems: 'center', marginBottom: 8, shadowColor: "#000", shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.1, shadowRadius: 4, elevation: 3, borderWidth: 1, borderColor: '#F0F0F0' },
  catIconContainerActive: { borderColor: '#FFDD32', borderWidth: 2, backgroundColor: '#FFFBE6' },
  catIcon: { width: 48, height: 48 },
  catText: { fontSize: 13, fontWeight: '600', color: '#666', textAlign: 'center' },
  catTextActive: { color: '#000', fontWeight: 'bold' },

  // Featured
  featuredCard: { width: width * 0.75, height: 280, marginRight: 20, borderRadius: 25, backgroundColor: '#000', overflow: 'hidden', elevation: 5, marginBottom: 10 },
  featuredImage: { width: '100%', height: '100%' },
  featuredOverlay: { position: 'absolute', bottom: 0, left: 0, right: 0, padding: 15, justifyContent: 'flex-end', backgroundColor: 'rgba(0,0,0,0.6)', height: 100 },
  featuredTag: { position: 'absolute', top: 15, left: 15, backgroundColor: '#FFDD32', paddingHorizontal: 10, paddingVertical: 5, borderRadius: 8, zIndex: 10 },
  featuredTagText: { color: '#000', fontWeight: 'bold', fontSize: 12 },
  featuredTitle: { fontSize: 20, fontWeight: 'bold', color: '#FFF', marginBottom: 4 },
  featuredLoc: { color: '#DDD', fontSize: 13 },
  featuredPrice: { fontSize: 18, fontWeight: 'bold', color: '#FFDD32' },
  rowCenter: { flexDirection: 'row', alignItems: 'center', marginBottom: 8 },
  rowSpace: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  pinIconWhite: { width: 14, height: 14, tintColor: '#DDD', marginRight: 5 },
  ratingBadge: { backgroundColor: 'rgba(255,255,255,0.2)', paddingHorizontal: 8, paddingVertical: 4, borderRadius: 8 },
  ratingText: { color: '#FFF', fontSize: 12, fontWeight: 'bold' },

  // Nearby
  nearbyCard: { flexDirection: 'row', backgroundColor: '#FFF', padding: 12, borderRadius: 20, marginBottom: 15, shadowColor: "#000", shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.05, shadowRadius: 5, elevation: 2, alignItems: 'center' },
  nearbyImageContainer: { position: 'relative', marginRight: 15, width: 100, height: 100 },
  nearbyImage: { width: '100%', height: '100%', borderRadius: 15 },
  nearbyRatingBadge: { position: 'absolute', top: 8, left: 8, flexDirection: 'row', alignItems: 'center', backgroundColor: 'rgba(255,255,255,0.9)', paddingHorizontal: 6, paddingVertical: 2, borderRadius: 6 },
  tinyStar: { width: 10, height: 10, tintColor: '#FFDD32', marginRight: 2 },
  tinyRatingText: { fontSize: 10, fontWeight: 'bold', color: '#000' },
  nearbyContent: { flex: 1, justifyContent: 'center' },
  nearbyTitle: { fontSize: 16, fontWeight: 'bold', color: '#000', marginBottom: 2 },
  nearbyLoc: { fontSize: 12, color: '#888' },
  pinIconSmall: { width: 12, height: 12, tintColor: '#999', marginRight: 4 },
  featureRow: { flexDirection: 'row', alignItems: 'center', marginTop: 8, marginBottom: 8 },
  featureItem: { flexDirection: 'row', alignItems: 'center', marginRight: 12 },
  featureIcon: { width: 14, height: 14, tintColor: '#666', marginRight: 4 },
  featureText: { fontSize: 11, color: '#666', fontWeight: '600' },
  separator: { height: 1, backgroundColor: '#F0F0F0', width: '100%', marginBottom: 8 },
  nearbyPrice: { fontSize: 18, fontWeight: '800', color: '#000' },
  perMonth: { fontSize: 12, color: '#999', fontWeight: 'normal' },
  viewDetailsBtn: { backgroundColor: '#F5F5F5', paddingHorizontal: 12, paddingVertical: 6, borderRadius: 10 },
  viewDetailsText: { fontSize: 11, fontWeight: 'bold', color: '#333' },

  // Nav
  bottomNavContainer: { position: 'absolute', bottom: 25, left: 0, right: 0, alignItems: 'center', justifyContent: 'center' },
  bottomNav: { flexDirection: 'row', backgroundColor: '#FFF', width: width * 0.9, borderRadius: 35, height: 70, alignItems: 'center', justifyContent: 'space-around', paddingHorizontal: 10, shadowColor: "#000", shadowOffset: { width: 0, height: 10 }, shadowOpacity: 0.15, shadowRadius: 20, elevation: 10 },
  navItem: { alignItems: 'center', justifyContent: 'center', padding: 10, borderRadius: 25 },
  navItemActive: { backgroundColor: '#FFDD32', flexDirection: 'row', paddingHorizontal: 15, paddingVertical: 10 },
  navIcon: { width: 24, height: 24, tintColor: '#CCC' },
  navText: { marginLeft: 8, fontWeight: 'bold', fontSize: 12, color: '#000' },

  // Modal
  modalOverlay: { flex: 1, backgroundColor: 'rgba(0,0,0,0.6)', justifyContent: 'center', alignItems: 'center' },
  modalCard: { width: '85%', backgroundColor: '#FFF', borderRadius: 25, padding: 25, alignItems: 'center', elevation: 10 },
  closeBtn: { position: 'absolute', top: 15, right: 20, padding: 5 },
  modalHeader: { alignItems: 'center', marginTop: 10, marginBottom: 20 },
  avatarContainer: { position: 'relative', marginBottom: 15 },
  modalAvatar: { width: 90, height: 90, borderRadius: 45 },
  verifiedBadge: { position: 'absolute', bottom: 0, right: 0, backgroundColor: '#2ECC71', borderRadius: 12, width: 24, height: 24, justifyContent: 'center', alignItems: 'center', borderWidth: 2, borderColor: '#FFF' },
  modalName: { fontSize: 22, fontWeight: 'bold', color: '#000', marginBottom: 5 },
  modalRole: { fontSize: 14, color: '#666', fontWeight: '600', backgroundColor: '#F5F5F5', paddingHorizontal: 12, paddingVertical: 4, borderRadius: 10 },
  divider: { width: '100%', height: 1, backgroundColor: '#EEE', marginVertical: 15 },
  infoRow: { flexDirection: 'row', justifyContent: 'space-between', width: '100%', marginBottom: 10 },
  infoLabel: { color: '#888', fontSize: 14, fontWeight: '600' },
  infoValue: { color: '#333', fontSize: 14, fontWeight: 'bold' },
  fullProfileBtn: { width: '100%', backgroundColor: '#FFDD32', paddingVertical: 14, borderRadius: 15, alignItems: 'center', marginBottom: 10, marginTop: 10 },
  fullProfileText: { fontSize: 16, fontWeight: 'bold', color: '#000' },
  logoutBtn: { paddingVertical: 10 },
  logoutText: { fontSize: 14, color: '#FF3B30', fontWeight: '600' }
});
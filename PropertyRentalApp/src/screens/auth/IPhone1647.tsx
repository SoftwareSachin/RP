import React, { useState, useRef } from "react";
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
  FlatList,
  NativeSyntheticEvent,
  NativeScrollEvent,
  Alert
} from "react-native";

const { width } = Dimensions.get('window');

// --- DATA & ASSETS ---

const PROPERTY_DATA = {
    id: '1',
    title: "Kdms Skywalk",
    address: "Nirman Nagar, Jaipur 302006",
    rent: "₹40,000",
    deposit: "₹9,000",
    rating: 4.6,
    reviews: 57,
    type: "4 BHK Flat",
    available: "24 Oct - 30 Oct",
    description: "Experience luxury living in this spacious 4 BHK apartment. Featuring modern interiors, modular kitchen, and excellent ventilation. Located in a prime area with easy access to metro, markets, and schools.",
    images: [
        "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?q=80&w=800&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1600596542815-60002d23966d?q=80&w=800&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?q=80&w=800&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?q=80&w=800&auto=format&fit=crop"
    ],
    amenities: [
        { name: 'Parking', icon: "https://cdn-icons-png.flaticon.com/512/3097/3097180.png" },
        { name: 'Free Wifi', icon: "https://cdn-icons-png.flaticon.com/512/93/93158.png" },
        { name: '24/7 Power', icon: "https://cdn-icons-png.flaticon.com/512/4219/4219949.png" },
        { name: 'AC', icon: "https://cdn-icons-png.flaticon.com/512/900/900618.png" },
        { name: 'Furnished', icon: "https://cdn-icons-png.flaticon.com/512/2662/2662503.png" },
        { name: 'Smart TV', icon: "https://cdn-icons-png.flaticon.com/512/5976/5976294.png" },
        { name: 'Security', icon: "https://cdn-icons-png.flaticon.com/512/2493/2493087.png" },
        { name: 'Lift', icon: "https://cdn-icons-png.flaticon.com/512/2421/2421235.png" }
    ],
    // Using a realistic map screenshot
    mapLocation: "https://images.unsplash.com/photo-1524661135-423995f22d0b?q=80&w=800&auto=format&fit=crop" 
};

const ASSETS = {
    back: "https://cdn-icons-png.flaticon.com/512/271/271220.png",
    heartOutline: "https://cdn-icons-png.flaticon.com/512/1077/1077035.png",
    heartFilled: "https://cdn-icons-png.flaticon.com/512/833/833472.png",
    star: "https://cdn-icons-png.flaticon.com/512/1828/1828884.png",
    pin: "https://cdn-icons-png.flaticon.com/512/684/684908.png",
    pinRed: "https://cdn-icons-png.flaticon.com/512/684/684908.png", // Red pin for map center
    share: "https://cdn-icons-png.flaticon.com/512/1358/1358023.png",
    direction: "https://cdn-icons-png.flaticon.com/512/2991/2991231.png",
    fullScreen: "https://cdn-icons-png.flaticon.com/512/2089/2089670.png"
};

export default (props: any) => {
  const [activeImage, setActiveImage] = useState(0);
  const [isLiked, setIsLiked] = useState(false);
  const [showFullDesc, setShowFullDesc] = useState(false);

  const handleScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    const slide = Math.ceil(event.nativeEvent.contentOffset.x / event.nativeEvent.layoutMeasurement.width);
    if (slide !== activeImage) {
      setActiveImage(slide);
    }
  };

  // --- HANDLERS ---
  const handleScheduleVisit = () => {
      Alert.alert("Visit Scheduled", "Your request to visit 'Kdms Skywalk' has been sent to the owner.");
  };

  const handleBookNow = () => {
      Alert.alert("Booking", "Proceeding to payment gateway...");
  };

  const handleFullMap = () => {
      Alert.alert("Map View", "Opening Google Maps in full screen...");
  };

  const handleDirections = () => {
      Alert.alert("Navigation", "Starting navigation to Nirman Nagar...");
  }

  return (
    <>
    <SafeAreaView style={{ flex: 0, backgroundColor: "#FFDD32" }} />
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFDD32" />
      
      {/* --- HEADER --- */}
      <View style={styles.headerContainer}>
          <View style={styles.yellowHeader} />
          <View style={styles.navBar}>
              <TouchableOpacity onPress={() => Alert.alert("Back Pressed")} style={styles.navBtn}>
                  <Image source={{ uri: ASSETS.back }} style={styles.iconSmall} />
              </TouchableOpacity>
              <Text style={styles.headerTitle}>Property Details</Text>
              <TouchableOpacity onPress={() => Alert.alert("Share")} style={styles.navBtn}>
                  <Image source={{ uri: ASSETS.share }} style={styles.iconSmall} />
              </TouchableOpacity>
          </View>
      </View>

      {/* Content Scroll */}
      <ScrollView style={styles.scrollView} contentContainerStyle={{ paddingBottom: 160 }}>
        
        {/* --- IMAGE GALLERY --- */}
        <View style={styles.galleryContainer}>
            <ScrollView
                pagingEnabled
                horizontal
                showsHorizontalScrollIndicator={false}
                onScroll={handleScroll}
                scrollEventThrottle={16}
                style={styles.galleryScroll}
            >
                {PROPERTY_DATA.images.map((image, index) => (
                    <Image key={index} source={{ uri: image }} style={styles.galleryImage} resizeMode="cover" />
                ))}
            </ScrollView>
            
            <TouchableOpacity 
                style={styles.likeButton} 
                onPress={() => setIsLiked(!isLiked)}
                activeOpacity={0.8}
            >
                <Image 
                    source={{ uri: isLiked ? ASSETS.heartFilled : ASSETS.heartOutline }} 
                    style={[styles.iconMedium, isLiked && { tintColor: 'red' }]} 
                />
            </TouchableOpacity>

            <View style={styles.pagination}>
                {PROPERTY_DATA.images.map((_, k) => (
                    <View key={k} style={[styles.dot, k === activeImage && styles.dotActive]} />
                ))}
            </View>
        </View>

        <View style={styles.contentContainer}>
            
            {/* --- TITLE & RATING --- */}
            <View style={styles.titleSection}>
                <View style={{ flex: 1 }}>
                    <Text style={styles.propertyTitle}>{PROPERTY_DATA.title}</Text>
                    <View style={styles.locationRow}>
                        <Image source={{ uri: ASSETS.pin }} style={styles.pinIcon} />
                        <Text style={styles.locationText}>{PROPERTY_DATA.address}</Text>
                    </View>
                </View>
                <View style={styles.ratingBox}>
                    <Image source={{ uri: ASSETS.star }} style={styles.starIcon} />
                    <Text style={styles.ratingText}>{PROPERTY_DATA.rating} <Text style={styles.reviewCount}>({PROPERTY_DATA.reviews})</Text></Text>
                </View>
            </View>

            {/* --- TAGS --- */}
            <View style={styles.tagsRow}>
                <View style={styles.tag}>
                    <Text style={styles.tagText}>{PROPERTY_DATA.type}</Text>
                </View>
                <View style={styles.tag}>
                    <Text style={styles.tagText}>Available: {PROPERTY_DATA.available}</Text>
                </View>
            </View>

            <View style={styles.divider} />

            {/* --- DESCRIPTION --- */}
            <Text style={styles.sectionHeader}>Description</Text>
            <Text style={styles.descriptionText} numberOfLines={showFullDesc ? undefined : 3}>
                {PROPERTY_DATA.description}
            </Text>
            <TouchableOpacity onPress={() => setShowFullDesc(!showFullDesc)}>
                <Text style={styles.readMore}>{showFullDesc ? "Read Less" : "Read More"}</Text>
            </TouchableOpacity>

            <View style={styles.divider} />

            {/* --- AMENITIES --- */}
            <Text style={styles.sectionHeader}>Amenities</Text>
            <View style={styles.amenitiesGrid}>
                {PROPERTY_DATA.amenities.map((item, index) => (
                    <View key={index} style={styles.amenityItem}>
                        <View style={styles.amenityIconContainer}>
                            <Image source={{ uri: item.icon }} style={styles.amenityIcon} />
                        </View>
                        <Text style={styles.amenityName}>{item.name}</Text>
                    </View>
                ))}
            </View>

            <View style={styles.divider} />

            {/* --- LOCATION MAP (IMPROVED) --- */}
            <View style={{flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10}}>
                <Text style={styles.sectionHeader}>Location</Text>
                <TouchableOpacity style={styles.directionBtn} onPress={handleDirections}>
                    <Image source={{uri: ASSETS.direction}} style={{width: 14, height: 14, marginRight: 5, tintColor: '#FFDD32'}} />
                    <Text style={{color: '#FFDD32', fontWeight: 'bold', fontSize: 12}}>Get Directions</Text>
                </TouchableOpacity>
            </View>

            <View style={styles.mapContainer}>
                {/* Background Map Image */}
                <Image source={{ uri: PROPERTY_DATA.mapLocation }} style={styles.mapImage} resizeMode="cover" />
                
                {/* Center Pin Overlay */}
                <View style={styles.mapCenterOverlay}>
                    <Image source={{ uri: ASSETS.pinRed }} style={{width: 32, height: 32, tintColor: 'red'}} />
                </View>

                {/* View Full Map Floating Button */}
                <TouchableOpacity style={styles.viewFullMapBtn} onPress={handleFullMap}>
                    <Text style={styles.viewFullMapText}>View Full Map</Text>
                </TouchableOpacity>
            </View>

        </View>

      </ScrollView>

      {/* --- FLOATING BOTTOM BAR --- */}
      <View style={styles.bottomBar}>
          <View style={styles.priceInfoContainer}>
              <Text style={styles.rentText}>{PROPERTY_DATA.rent}<Text style={styles.perMonth}>/mo</Text></Text>
              <Text style={styles.depositText}>Deposit: {PROPERTY_DATA.deposit}</Text>
          </View>

          <View style={styles.buttonRow}>
              <TouchableOpacity style={styles.scheduleBtn} onPress={handleScheduleVisit}>
                  <Text style={styles.scheduleBtnText}>Schedule Visit</Text>
              </TouchableOpacity>

              <TouchableOpacity style={styles.bookBtn} onPress={handleBookNow}>
                  <Text style={styles.bookBtnText}>Book Now</Text>
              </TouchableOpacity>
          </View>
      </View>

    </SafeAreaView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },
  headerContainer: { backgroundColor: '#fff', zIndex: 10 },
  yellowHeader: { width: '100%', height: 20, backgroundColor: '#FFDD32' },
  navBar: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 16, paddingVertical: 10 },
  navBtn: { padding: 5 },
  iconSmall: { width: 24, height: 24, tintColor: '#000' },
  headerTitle: { fontSize: 18, fontWeight: 'bold', color: '#000' },

  scrollView: { flex: 1 },

  // Gallery
  galleryContainer: { position: 'relative' },
  galleryScroll: { width: width, height: 250 },
  galleryImage: { width: width, height: 250 },
  pagination: { flexDirection: 'row', position: 'absolute', bottom: 15, alignSelf: 'center' },
  dot: { width: 8, height: 8, borderRadius: 4, backgroundColor: 'rgba(255,255,255,0.5)', marginHorizontal: 4 },
  dotActive: { backgroundColor: '#FFDD32', width: 10, height: 10, borderRadius: 5 },
  likeButton: { position: 'absolute', top: 15, right: 15, backgroundColor: '#fff', padding: 8, borderRadius: 20, elevation: 5 },
  iconMedium: { width: 20, height: 20 },

  // Content
  contentContainer: { padding: 20, borderTopLeftRadius: 30, borderTopRightRadius: 30, marginTop: -25, backgroundColor: '#fff' },
  
  titleSection: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start' },
  propertyTitle: { fontSize: 24, fontWeight: 'bold', color: '#000', marginBottom: 5 },
  locationRow: { flexDirection: 'row', alignItems: 'center' },
  pinIcon: { width: 14, height: 14, tintColor: '#777', marginRight: 5 },
  locationText: { fontSize: 14, color: '#666' },
  ratingBox: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#FFFBE6', paddingHorizontal: 8, paddingVertical: 4, borderRadius: 8, borderWidth: 1, borderColor: '#FFDD32' },
  starIcon: { width: 12, height: 12, tintColor: '#FFDD32', marginRight: 4 },
  ratingText: { fontSize: 12, fontWeight: 'bold', color: '#000' },
  reviewCount: { fontWeight: 'normal', color: '#666' },

  tagsRow: { flexDirection: 'row', marginTop: 15, gap: 10 },
  tag: { backgroundColor: '#F5F5F5', paddingHorizontal: 12, paddingVertical: 6, borderRadius: 6 },
  tagText: { fontSize: 12, color: '#555', fontWeight: '600' },

  divider: { height: 1, backgroundColor: '#EEE', marginVertical: 20 },

  sectionHeader: { fontSize: 18, fontWeight: 'bold', color: '#000', marginBottom: 10 },
  descriptionText: { fontSize: 14, color: '#666', lineHeight: 22 },
  readMore: { color: '#FFDD32', fontWeight: 'bold', marginTop: 5 },

  amenitiesGrid: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between' },
  amenityItem: { width: '23%', alignItems: 'center', marginBottom: 15 },
  amenityIconContainer: { 
      width: 50, height: 50, backgroundColor: '#FAFAFA', borderRadius: 12, 
      justifyContent: 'center', alignItems: 'center', marginBottom: 5,
      borderWidth: 1, borderColor: '#EEE' 
  },
  amenityIcon: { width: 24, height: 24 },
  amenityName: { fontSize: 11, color: '#555', textAlign: 'center' },

  // --- Map Styling ---
  mapContainer: { 
      position: 'relative', 
      borderRadius: 15, 
      overflow: 'hidden', 
      marginTop: 5,
      borderWidth: 1,
      borderColor: '#EEE',
      height: 180,
      justifyContent: 'center',
      alignItems: 'center'
  },
  mapImage: { width: '100%', height: '100%', opacity: 0.9 },
  mapCenterOverlay: {
      position: 'absolute',
      top: 0, bottom: 0, left: 0, right: 0,
      justifyContent: 'center',
      alignItems: 'center',
      paddingBottom: 20 // Offset pin slightly up
  },
  viewFullMapBtn: { 
      position: 'absolute', bottom: 15, 
      backgroundColor: '#000', paddingHorizontal: 20, paddingVertical: 10, borderRadius: 20,
      elevation: 5, shadowColor: '#000', shadowOpacity: 0.3, shadowRadius: 3, shadowOffset: {width: 0, height: 2}
  },
  viewFullMapText: { color: '#fff', fontSize: 12, fontWeight: 'bold' },
  directionBtn: { flexDirection: 'row', alignItems: 'center', padding: 5 },

  // --- BOTTOM BAR STYLES ---
  bottomBar: {
      position: 'absolute', bottom: 0, left: 0, right: 0,
      backgroundColor: '#fff', 
      paddingVertical: 15, 
      paddingHorizontal: 20,
      borderTopWidth: 1, 
      borderTopColor: '#EEE',
      elevation: 20, 
      shadowColor: '#000', 
      shadowOffset: {width: 0, height: -4}, 
      shadowOpacity: 0.1, 
      shadowRadius: 5
  },
  priceInfoContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'baseline',
      marginBottom: 15,
  },
  rentText: { fontSize: 22, fontWeight: 'bold', color: '#000' },
  perMonth: { fontSize: 14, color: '#666', fontWeight: 'normal' },
  depositText: { fontSize: 14, color: '#777' },
  
  buttonRow: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      gap: 10
  },
  scheduleBtn: { 
      flex: 1, 
      backgroundColor: '#FFF', 
      paddingVertical: 12, 
      borderRadius: 25,
      borderWidth: 1,
      borderColor: '#000',
      alignItems: 'center'
  },
  scheduleBtnText: { fontSize: 14, fontWeight: 'bold', color: '#000' },
  
  bookBtn: { 
      flex: 1, 
      backgroundColor: '#FFDD32', 
      paddingVertical: 12, 
      borderRadius: 25,
      alignItems: 'center'
  },
  bookBtnText: { fontSize: 14, fontWeight: 'bold', color: '#000' }
});
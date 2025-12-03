import React, { useState, useRef, useEffect } from "react";
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
  LayoutAnimation,
  UIManager,
  PanResponder,
  Animated
} from "react-native";
import { useNavigation } from "@react-navigation/native";

// Enable LayoutAnimation for Android
if (Platform.OS === 'android') {
  if (UIManager.setLayoutAnimationEnabledExperimental) {
    UIManager.setLayoutAnimationEnabledExperimental(true);
  }
}

const { width } = Dimensions.get('window');

// --- PROFESSIONAL LINE ICONS (Monochrome) ---
const ICONS = {
    back: "https://img.icons8.com/ios-glyphs/90/000000/back.png",
    check: "https://img.icons8.com/ios-filled/50/000000/checkmark--v1.png",
    chevronDown: "https://img.icons8.com/ios-glyphs/90/000000/expand-arrow--v1.png",
    chevronUp: "https://img.icons8.com/ios-glyphs/90/000000/collapse-arrow.png",
    
    // Property Types (Clean Lines)
    home: "https://img.icons8.com/ios/100/000000/home.png",
    flat: "https://img.icons8.com/ios/100/000000/apartment.png",
    villa: "https://img.icons8.com/ios/100/000000/greek-house.png",
    shared: "https://img.icons8.com/ios/100/000000/bunk-bed.png",
    
    // Filter Icons
    budget: "https://img.icons8.com/ios/100/000000/money-bag.png",
    furnished: "https://img.icons8.com/ios/100/000000/sofa.png",
    availability: "https://img.icons8.com/ios/100/000000/calendar--v1.png",
    tenant: "https://img.icons8.com/ios/100/000000/user-group-man-man.png",
    
    // Amenities
    wifi: "https://img.icons8.com/ios/100/000000/wifi--v1.png",
    ac: "https://img.icons8.com/ios/100/000000/air-conditioner.png",
    food: "https://img.icons8.com/ios/100/000000/cutlery.png",
    parking: "https://img.icons8.com/ios/100/000000/parking.png",
    bath: "https://img.icons8.com/ios/100/000000/bath.png",
    tv: "https://img.icons8.com/ios/100/000000/tv.png",
    balcony: "https://img.icons8.com/ios/100/000000/balcony.png",
    cleaning: "https://img.icons8.com/ios/100/000000/broom.png",
    gym: "https://img.icons8.com/ios/100/000000/dumbbell.png",
    pool: "https://img.icons8.com/ios/100/000000/pool.png",
};

// --- DATA ---
const PROPERTY_TYPES = [
    { id: '1', name: 'Home', icon: ICONS.home },
    { id: '2', name: 'Flat/Apt', icon: ICONS.flat },
    { id: '3', name: 'Villa', icon: ICONS.villa },
    { id: '4', name: 'Shared', icon: ICONS.shared },
];

const FURNISHED_TYPES = ["Fully Furnished", "Semi Furnished", "Unfurnished"];

const AVAILABILITY_OPTIONS = [
    "Immediately",
    "Within 7 days",
    "Within 15 days",
    "Within 1 month",
    "After 1 month"
];

const TENANT_TYPES = [
    "Only Girls",
    "Only Boys",
    "Only Students",
    "Working Professional",
    "Family",
    "Any"
];

const AMENITIES = [
    { id: '1', name: 'Washroom', icon: ICONS.bath },
    { id: '2', name: 'AC', icon: ICONS.ac },
    { id: '3', name: 'Balcony', icon: ICONS.balcony },
    { id: '4', name: 'Wifi', icon: ICONS.wifi },
    { id: '5', name: 'Food', icon: ICONS.food },
    { id: '6', name: 'Parking', icon: ICONS.parking },
    { id: '7', name: 'Cleaning', icon: ICONS.cleaning },
    { id: '8', name: 'TV', icon: ICONS.tv },
    { id: '9', name: 'Gym', icon: ICONS.gym },
    { id: '10', name: 'Pool', icon: ICONS.pool },
];

// --- CUSTOM RANGE SLIDER COMPONENT ---
const RangeSlider = ({ min, max, onValuesChange }: { min: number, max: number, onValuesChange: (min: number, max: number) => void }) => {
    const [sliderWidth, setSliderWidth] = useState(0);
    const [low, setLow] = useState(min);
    const [high, setHigh] = useState(max);

    // Refs to store values during gestures (avoiding closure stale state)
    const startLow = useRef(min);
    const startHigh = useRef(max);

    // Calculate pixel position from value
    const getPosition = (value: number) => {
        if (sliderWidth === 0) return 0;
        return ((value - min) / (max - min)) * sliderWidth;
    };

    const panResponderLow = useRef(
        PanResponder.create({
            onStartShouldSetPanResponder: () => true,
            onMoveShouldSetPanResponder: () => true, // Claim touch from ScrollView
            onPanResponderGrant: () => {
                startLow.current = low;
            },
            onPanResponderMove: (_, gestureState) => {
                if (sliderWidth === 0) return;
                // Calculate new value based on drag distance
                const diff = (gestureState.dx / sliderWidth) * (max - min);
                const newValue = Math.max(min, Math.min(high - 1000, startLow.current + diff)); // Maintain 1000 gap
                const snapped = Math.round(newValue / 100) * 100; // Snap to 100
                
                setLow(snapped);
                onValuesChange(snapped, high);
            },
        })
    ).current;

    const panResponderHigh = useRef(
        PanResponder.create({
            onStartShouldSetPanResponder: () => true,
            onMoveShouldSetPanResponder: () => true, // Claim touch from ScrollView
            onPanResponderGrant: () => {
                startHigh.current = high;
            },
            onPanResponderMove: (_, gestureState) => {
                if (sliderWidth === 0) return;
                const diff = (gestureState.dx / sliderWidth) * (max - min);
                const newValue = Math.max(low + 1000, Math.min(max, startHigh.current + diff)); // Maintain 1000 gap
                const snapped = Math.round(newValue / 100) * 100;

                setHigh(snapped);
                onValuesChange(low, snapped);
            },
        })
    ).current;

    return (
        <View 
            style={sliderStyles.container} 
            onLayout={(e) => setSliderWidth(e.nativeEvent.layout.width)}
        >
            {/* Track Background */}
            <View style={sliderStyles.rail} />
            
            {/* Active Track */}
            <View 
                style={[
                    sliderStyles.railSelected, 
                    { 
                        left: getPosition(low), 
                        width: getPosition(high) - getPosition(low) 
                    }
                ]} 
            />
            
            {/* Left Thumb */}
            <View 
                style={[sliderStyles.thumb, { left: getPosition(low) - 12 }]} 
                {...panResponderLow.panHandlers} 
            >
                 <View style={sliderStyles.thumbDot} />
            </View>

            {/* Right Thumb */}
            <View 
                style={[sliderStyles.thumb, { left: getPosition(high) - 12 }]} 
                {...panResponderHigh.panHandlers} 
            >
                <View style={sliderStyles.thumbDot} />
            </View>

            {/* Labels */}
            <View style={sliderStyles.labelContainer}>
                <Text style={sliderStyles.labelText}>₹{low}</Text>
                <Text style={sliderStyles.labelText}>₹{high}</Text>
            </View>
        </View>
    );
};

const sliderStyles = StyleSheet.create({
    container: { height: 40, justifyContent: 'center', marginHorizontal: 10, marginTop: 15, marginBottom: 20 },
    rail: { flex: 1, height: 4, borderRadius: 2, backgroundColor: '#E0E0E0', position: 'absolute', width: '100%' },
    railSelected: { height: 4, backgroundColor: '#FFDD32', borderRadius: 2, position: 'absolute' },
    thumb: { 
        width: 24, height: 24, borderRadius: 12, borderWidth: 2, borderColor: '#FFF', 
        backgroundColor: '#FFDD32', position: 'absolute', top: -10, 
        justifyContent: 'center', alignItems: 'center', elevation: 4, shadowColor: '#000', shadowOpacity: 0.2, shadowOffset: {width: 0, height: 2}
    },
    thumbDot: { width: 8, height: 8, borderRadius: 4, backgroundColor: '#FFF' },
    labelContainer: { flexDirection: 'row', justifyContent: 'space-between', position: 'absolute', top: 30, width: '100%' },
    labelText: { fontSize: 14, fontWeight: 'bold', color: '#333' }
});

export default function FilterScreen() {
  const navigation = useNavigation();
  
  // --- State ---
  const [selectedType, setSelectedType] = useState("Home");
  
  // Budget State
  const [minPrice, setMinPrice] = useState(400);
  const [maxPrice, setMaxPrice] = useState(25000);

  // Furnished State
  const [furnishedType, setFurnishedType] = useState("Fully Furnished");

  // Dropdown States
  const [availabilityOpen, setAvailabilityOpen] = useState(true);
  const [selectedAvailability, setSelectedAvailability] = useState("Immediately");

  const [tenantOpen, setTenantOpen] = useState(true);
  const [selectedTenant, setSelectedTenant] = useState("Any");

  // Amenities State
  const [selectedAmenities, setSelectedAmenities] = useState<string[]>([]);

  // --- Handlers ---
  
  const toggleSection = (section: 'availability' | 'tenant') => {
      LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
      if (section === 'availability') setAvailabilityOpen(!availabilityOpen);
      if (section === 'tenant') setTenantOpen(!tenantOpen);
  };

  const toggleAmenity = (id: string) => {
      setSelectedAmenities(prev => 
          prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]
      );
  };

  const handleReset = () => {
      setSelectedType("Home");
      setFurnishedType("Fully Furnished");
      setSelectedAvailability("Immediately");
      setSelectedTenant("Any");
      setMinPrice(400);
      setMaxPrice(25000);
      setSelectedAmenities([]);
  };

  const handleApply = () => {
      navigation.goBack();
  };

  const handleBudgetChange = (min: number, max: number) => {
      // Update local state for potential API calls
      setMinPrice(min);
      setMaxPrice(max);
  }

  return (
    <View style={styles.mainContainer}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFF" />
      <SafeAreaView style={styles.safeArea}>
        
        {/* --- Header --- */}
        <View style={styles.header}>
            <TouchableOpacity onPress={() => navigation.goBack()} style={styles.iconBtn}>
                <Image source={{ uri: ICONS.back }} style={styles.iconSmall} />
            </TouchableOpacity>
            <Text style={styles.headerTitle}>Filters</Text>
            <View style={{width: 20}} /> 
        </View>

        <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>

            {/* --- 1. Property Type (Horizontal) --- */}
            <Text style={styles.sectionTitle}>Property Type</Text>
            <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.horizontalScroll}>
                {PROPERTY_TYPES.map((item) => (
                    <TouchableOpacity 
                        key={item.id} 
                        style={[styles.typeCard, selectedType === item.name && styles.typeCardActive]}
                        onPress={() => setSelectedType(item.name)}
                        activeOpacity={0.8}
                    >
                        <Image 
                            source={{ uri: item.icon }} 
                            style={[styles.typeIcon, { tintColor: selectedType === item.name ? '#000' : '#999' }]} 
                        />
                        <Text style={[styles.typeText, selectedType === item.name && styles.typeTextActive]}>{item.name}</Text>
                    </TouchableOpacity>
                ))}
            </ScrollView>

            <View style={styles.divider} />

            {/* --- 2. Budget Slider (Custom Functional) --- */}
            <View style={styles.sectionRow}>
                <Text style={styles.sectionTitle}>Budget</Text>
                <Image source={{ uri: ICONS.budget }} style={styles.sectionIcon} />
            </View>
            
            <RangeSlider 
                min={400} 
                max={50000} 
                onValuesChange={handleBudgetChange}
            />
            {/* Spacer for labels */}
            <View style={{height: 30}} />

            <View style={styles.divider} />

            {/* --- 3. Furnished Type (Chips) --- */}
            <View style={styles.sectionRow}>
                <Text style={styles.sectionTitle}>Furnished Type</Text>
                <Image source={{ uri: ICONS.furnished }} style={styles.sectionIcon} />
            </View>
            <View style={styles.wrapContainer}>
                {FURNISHED_TYPES.map((item) => (
                    <TouchableOpacity 
                        key={item}
                        style={[styles.chip, furnishedType === item && styles.chipActive]}
                        onPress={() => setFurnishedType(item)}
                    >
                        <Text style={[styles.chipText, furnishedType === item && styles.chipTextActive]}>{item}</Text>
                    </TouchableOpacity>
                ))}
            </View>

            <View style={styles.divider} />

            {/* --- 4. Amenities (Grid) --- */}
            <View style={styles.sectionRow}>
                <Text style={styles.sectionTitle}>Amenities</Text>
                <Text style={styles.subtitle}>{selectedAmenities.length} Selected</Text>
            </View>
            <View style={styles.amenityGrid}>
                {AMENITIES.map((item) => {
                    const isActive = selectedAmenities.includes(item.id);
                    return (
                        <TouchableOpacity 
                            key={item.id}
                            style={[styles.amenityCard, isActive && styles.amenityCardActive]}
                            onPress={() => toggleAmenity(item.id)}
                            activeOpacity={0.7}
                        >
                            <Image source={{ uri: item.icon }} style={[styles.amenityIcon, isActive && {tintColor: '#000'}]} />
                            <Text style={[styles.amenityText, isActive && styles.amenityTextActive]}>{item.name}</Text>
                            {isActive && <View style={styles.activeCheck}><Image source={{uri: ICONS.check}} style={{width: 10, height: 10, tintColor: '#FFF'}} /></View>}
                        </TouchableOpacity>
                    )
                })}
            </View>

            <View style={styles.divider} />

            {/* --- 5. Select Availability (Accordion) --- */}
            <TouchableOpacity style={styles.accordionHeader} onPress={() => toggleSection('availability')} activeOpacity={0.8}>
                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                    <Text style={styles.accordionTitle}>Select Availability</Text>
                </View>
                <Image 
                    source={{ uri: availabilityOpen ? ICONS.chevronUp : ICONS.chevronDown }} 
                    style={styles.chevron} 
                />
            </TouchableOpacity>
            
            {availabilityOpen && (
                <View style={styles.dropdownList}>
                    {AVAILABILITY_OPTIONS.map((option) => (
                        <TouchableOpacity 
                            key={option} 
                            style={styles.dropdownItem}
                            onPress={() => setSelectedAvailability(option)}
                        >
                            <Text style={[styles.dropdownText, selectedAvailability === option && styles.dropdownTextActive]}>
                                {option}
                            </Text>
                            {selectedAvailability === option && (
                                <Image source={{ uri: ICONS.check }} style={styles.checkIcon} />
                            )}
                        </TouchableOpacity>
                    ))}
                </View>
            )}

            <View style={styles.divider} />

            {/* --- 6. Available For (Accordion) --- */}
            <TouchableOpacity style={styles.accordionHeader} onPress={() => toggleSection('tenant')} activeOpacity={0.8}>
                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                    <Text style={styles.accordionTitle}>Available For</Text>
                </View>
                <Image 
                    source={{ uri: tenantOpen ? ICONS.chevronUp : ICONS.chevronDown }} 
                    style={styles.chevron} 
                />
            </TouchableOpacity>

            {tenantOpen && (
                <View style={styles.dropdownList}>
                    {TENANT_TYPES.map((option) => (
                        <TouchableOpacity 
                            key={option} 
                            style={styles.dropdownItem}
                            onPress={() => setSelectedTenant(option)}
                        >
                            <Text style={[styles.dropdownText, selectedTenant === option && styles.dropdownTextActive]}>
                                {option}
                            </Text>
                            {selectedTenant === option && (
                                <Image source={{ uri: ICONS.check }} style={styles.checkIcon} />
                            )}
                        </TouchableOpacity>
                    ))}
                </View>
            )}

            {/* Extra padding for scrolling above footer */}
            <View style={{height: 100}} />

        </ScrollView>

        {/* --- Footer Buttons --- */}
        <View style={styles.footer}>
            <TouchableOpacity style={styles.removeBtn} onPress={handleReset}>
                <Text style={styles.removeBtnText}>Remove Filter</Text>
            </TouchableOpacity>
            
            <TouchableOpacity style={styles.applyBtn} onPress={handleApply}>
                <Text style={styles.applyBtnText}>Apply Filter</Text>
            </TouchableOpacity>
        </View>

      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  mainContainer: { flex: 1, backgroundColor: "#FFF" },
  safeArea: { flex: 1, paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0 },
  
  // Header
  header: { 
      flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', 
      paddingHorizontal: 20, paddingVertical: 15, backgroundColor: '#FFF',
      borderBottomWidth: 1, borderBottomColor: '#F5F5F5'
  },
  iconBtn: { padding: 5 },
  iconSmall: { width: 24, height: 24, tintColor: '#000' },
  headerTitle: { fontSize: 20, fontWeight: 'bold', color: '#000' },

  scrollContent: { padding: 20 },
  
  sectionRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 15 },
  sectionIcon: { width: 20, height: 20, tintColor: '#CCC' },
  sectionTitle: { fontSize: 16, fontWeight: 'bold', color: '#333', marginBottom: 12 },
  subtitle: { fontSize: 12, fontWeight: '600', color: '#888' },
  
  divider: { height: 1, backgroundColor: '#F0F0F0', marginVertical: 20 },

  // Property Type
  horizontalScroll: { marginBottom: 5 },
  typeCard: { 
      backgroundColor: '#F9F9F9', borderRadius: 12, paddingVertical: 15, paddingHorizontal: 10, marginRight: 12,
      alignItems: 'center', width: 90, borderWidth: 1, borderColor: '#F0F0F0'
  },
  typeCardActive: { borderColor: '#FFDD32', backgroundColor: '#FFFBE6' },
  typeIcon: { width: 30, height: 30, marginBottom: 8 },
  typeText: { fontSize: 12, fontWeight: '600', color: '#999' },
  typeTextActive: { color: '#000', fontWeight: 'bold' },

  // Amenities
  amenityGrid: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between' },
  amenityCard: {
      width: '23%', aspectRatio: 1, backgroundColor: '#FFF', borderRadius: 12,
      justifyContent: 'center', alignItems: 'center', padding: 5, marginBottom: 10,
      borderWidth: 1, borderColor: '#EEE',
      shadowColor: "#000", shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.02, shadowRadius: 4, elevation: 1
  },
  amenityCardActive: { borderColor: '#FFDD32', backgroundColor: '#FFFBE6' },
  amenityIcon: { width: 24, height: 24, marginBottom: 5, tintColor: '#999' },
  amenityText: { fontSize: 10, textAlign: 'center', color: '#555', fontWeight: '500' },
  amenityTextActive: { color: '#000', fontWeight: 'bold' },
  activeCheck: { position: 'absolute', top: 4, right: 4, backgroundColor: '#FFDD32', borderRadius: 6, padding: 2 },

  // Chips (Furnished)
  wrapContainer: { flexDirection: 'row', flexWrap: 'wrap', gap: 10 },
  chip: { 
      paddingHorizontal: 20, paddingVertical: 12, borderRadius: 25, 
      backgroundColor: '#F5F5F5', borderWidth: 1, borderColor: 'transparent' 
  },
  chipActive: { backgroundColor: '#FFDD32', borderColor: '#FFDD32' },
  chipText: { fontSize: 14, fontWeight: '500', color: '#555' },
  chipTextActive: { color: '#000', fontWeight: 'bold' },

  // Accordion
  accordionHeader: { 
      flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', 
      paddingVertical: 15, backgroundColor: '#FFDD32', paddingHorizontal: 15, borderRadius: 12,
      shadowColor: "#FFDD32", shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.3, shadowRadius: 5
  },
  accordionTitle: { fontSize: 16, fontWeight: 'bold', color: '#000' },
  chevron: { width: 16, height: 16, tintColor: '#000' },
  
  dropdownList: { 
      marginTop: 10, backgroundColor: '#FFF', borderRadius: 12, padding: 5,
      borderWidth: 1, borderColor: '#F5F5F5'
  },
  dropdownItem: { 
      flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', 
      paddingVertical: 12, paddingHorizontal: 15, borderBottomWidth: 1, borderBottomColor: '#FAFAFA' 
  },
  dropdownText: { fontSize: 15, color: '#555' },
  dropdownTextActive: { color: '#000', fontWeight: 'bold' },
  checkIcon: { width: 16, height: 16, tintColor: '#FFDD32' },

  // Footer
  footer: {
      position: 'absolute', bottom: 0, left: 0, right: 0,
      backgroundColor: '#FFF', padding: 20,
      borderTopWidth: 1, borderTopColor: '#EEE',
      flexDirection: 'row', justifyContent: 'space-between', gap: 15,
      shadowColor: "#000", shadowOffset: { width: 0, height: -4 }, shadowOpacity: 0.05, shadowRadius: 10, elevation: 10
  },
  removeBtn: {
      flex: 1, paddingVertical: 15, borderRadius: 12,
      borderWidth: 1, borderColor: '#FFDD32', alignItems: 'center', justifyContent: 'center',
      backgroundColor: '#FFF'
  },
  removeBtnText: { fontSize: 16, fontWeight: 'bold', color: '#FFDD32' },
  
  applyBtn: {
      flex: 1, paddingVertical: 15, borderRadius: 12,
      backgroundColor: '#FFDD32', alignItems: 'center', justifyContent: 'center',
      shadowColor: "#FFDD32", shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.3, shadowRadius: 5, elevation: 5
  },
  applyBtnText: { fontSize: 16, fontWeight: 'bold', color: '#000' }
});
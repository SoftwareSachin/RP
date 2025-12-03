import React, { useState, useEffect, useRef } from "react";
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
  Modal,
  FlatList,
  Animated,
  Easing,
  ActivityIndicator,
  LayoutAnimation,
  UIManager
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import CountryPicker, { CountryCode, Country } from "react-native-country-picker-modal";

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
    user: "https://cdn-icons-png.flaticon.com/512/1077/1077114.png",
    phone: "https://cdn-icons-png.flaticon.com/512/159/159832.png",
    email: "https://cdn-icons-png.flaticon.com/512/542/542638.png",
    home: "https://cdn-icons-png.flaticon.com/512/1946/1946436.png", 
    city: "https://cdn-icons-png.flaticon.com/512/535/535239.png",
    location: "https://cdn-icons-png.flaticon.com/512/684/684908.png",
    check: "https://cdn-icons-png.flaticon.com/512/14876/14876743.png",
    arrowDown: "https://cdn-icons-png.flaticon.com/512/2985/2985150.png",
    
    // Nav Icons
    navHome: "https://cdn-icons-png.flaticon.com/512/1946/1946436.png",
    navList: "https://cdn-icons-png.flaticon.com/512/2910/2910791.png",
    navSaved: "https://cdn-icons-png.flaticon.com/512/1077/1077035.png",
    navPay: "https://cdn-icons-png.flaticon.com/512/272/272525.png",
    navUser: "https://cdn-icons-png.flaticon.com/512/1077/1077114.png",
};

// --- PROPERTY TYPES ---
const PROPERTY_TYPES = [
    { id: '1', name: 'Apartment' },
    { id: '2', name: 'House' },
    { id: '3', name: 'Villa' },
    { id: '4', name: 'Plot' },
    { id: '5', name: 'Office' },
    { id: '6', name: 'Shop' },
    { id: '7', name: 'Warehouse' },
];

export default function ListProperty() {
  // NOTE: Ensure this component is inside a <NavigationContainer> in App.js
  const navigation = useNavigation();

  // --- Form State ---
  const [ownerName, setOwnerName] = useState('');
  const [mobileNumber, setMobileNumber] = useState('');
  const [email, setEmail] = useState('');
  const [selectedType, setSelectedType] = useState('Apartment');
  const [city, setCity] = useState('');
  const [locality, setLocality] = useState('');
  
  // --- Logic State ---
  const [countryCode, setCountryCode] = useState<CountryCode>('IN');
  const [callingCode, setCallingCode] = useState('91');
  const [isPickerVisible, setPickerVisible] = useState(false);
  
  const [isTermsAccepted, setIsTermsAccepted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [focusedField, setFocusedField] = useState<string | null>(null);

  // --- Animation ---
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideUpAnim = useRef(new Animated.Value(50)).current;

  useEffect(() => {
      Animated.parallel([
          Animated.timing(fadeAnim, { toValue: 1, duration: 800, useNativeDriver: true }),
          Animated.timing(slideUpAnim, { toValue: 0, duration: 800, easing: Easing.out(Easing.cubic), useNativeDriver: true })
      ]).start();
  }, [fadeAnim, slideUpAnim]);

  // --- Handlers ---
  const onSelectCountry = (country: Country) => {
    setCountryCode(country.cca2);
    setCallingCode(country.callingCode[0]);
    setPickerVisible(false);
  };

  const handleContinue = () => {
      if (!ownerName || !mobileNumber || !locality) {
          Alert.alert("Missing Information", "Please fill in all required fields.");
          return;
      }
      if (!isTermsAccepted) {
          Alert.alert("Terms Not Accepted", "Please accept the terms and conditions.");
          return;
      }
      
      setIsLoading(true);
      setTimeout(() => {
          setIsLoading(false);
          // Navigate to VisitScheduled screen after successful submission
          // @ts-ignore - route name exists in AuthNavigator
          navigation.navigate('VisitScheduled');
      }, 2000);
  };

  const handleNav = (route: string) => {
      try {
        // @ts-ignore
        navigation.navigate(route);
      } catch (e) {
        console.warn("Navigation not available or route missing");
      }
  }

  // --- Render Input Helper ---
  const renderInput = (
      label: string, 
      value: string, 
      setter: (text: string) => void, 
      placeholder: string, 
      icon: string, 
      keyboardType: any = "default",
      fieldKey: string
  ) => (
    <View style={styles.inputWrapper}>
        <Text style={styles.label}>{label}</Text>
        <View style={[
            styles.inputField, 
            focusedField === fieldKey && styles.inputFieldFocused
        ]}>
            <Image source={{ uri: icon }} style={[styles.inputIcon, focusedField === fieldKey && { tintColor: '#FFDD32' }]} />
            <TextInput 
                style={styles.textInput} 
                placeholder={placeholder} 
                placeholderTextColor="#999"
                value={value}
                onChangeText={setter}
                keyboardType={keyboardType}
                onFocus={() => { LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut); setFocusedField(fieldKey); }}
                onBlur={() => setFocusedField(null)}
            />
        </View>
    </View>
  );

  const activeTab = "Lists";
  const tabs = [
      // Route names must match those registered in your navigators (App.tsx / AuthNavigator)
      { name: "Home", icon: ASSETS.navHome, route: "Home" },      // MainTabs Home
      { name: "Lists", icon: ASSETS.navList, route: "Lists" },    // MainTabs Lists
      { name: "Saved", icon: ASSETS.navSaved, route: "Saved" },   // Auth stack Saved
      { name: "Payment", icon: ASSETS.navPay, route: "MonthlyRent" }, // First go to MonthlyRent
      { name: "Account", icon: ASSETS.navUser, route: "Account" },
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
                keyboardShouldPersistTaps="handled"
            >
                
                {/* Header */}
                <View style={styles.header}>
                    <TouchableOpacity onPress={() => navigation.canGoBack() ? navigation.goBack() : null} style={styles.backButton}>
                        <Image source={{ uri: ASSETS.back }} style={styles.backIcon} />
                    </TouchableOpacity>
                    <Text style={styles.headerTitle}>List Your Property</Text>
                    <View style={{width: 24}} /> 
                </View>

                {/* --- ANIMATED FORM CONTENT --- */}
                <Animated.View style={[styles.formContainer, { opacity: fadeAnim, transform: [{ translateY: slideUpAnim }] }]}>
                    
                    {/* 1. Owner Name */}
                    {renderInput("Owner Name", ownerName, setOwnerName, "Enter Name", ASSETS.user, "default", "name")}

                    {/* 2. Mobile Number */}
                    <View style={styles.inputWrapper}>
                        <Text style={styles.label}>Mobile Number</Text>
                        <View style={styles.rowInput}>
                            <TouchableOpacity 
                                style={[styles.countryBtn, focusedField === 'mobile' && styles.inputFieldFocused]} 
                                onPress={() => setPickerVisible(true)}
                            >
                                <CountryPicker
                                    visible={isPickerVisible}
                                    onClose={() => setPickerVisible(false)}
                                    onSelect={onSelectCountry}
                                    withFilter
                                    withFlag
                                    countryCode={countryCode}
                                    withCallingCode
                                    containerButtonStyle={{display: 'none'}}
                                />
                                <Text style={styles.countryText}>+{callingCode}</Text>
                                <Image source={{ uri: ASSETS.arrowDown }} style={{width: 10, height: 10, marginLeft: 5, tintColor: '#666'}} />
                            </TouchableOpacity>

                            <View style={[styles.inputFieldFlex, focusedField === 'mobile' && styles.inputFieldFocused]}>
                                <TextInput 
                                    style={styles.textInput} 
                                    placeholder="Mobile Number" 
                                    placeholderTextColor="#999"
                                    keyboardType="phone-pad"
                                    value={mobileNumber}
                                    onChangeText={setMobileNumber}
                                    onFocus={() => setFocusedField('mobile')}
                                    onBlur={() => setFocusedField(null)}
                                />
                            </View>
                        </View>
                    </View>

                    {/* 3. Email */}
                    {renderInput("Email ID", email, setEmail, "example@email.com", ASSETS.email, "email-address", "email")}

                    {/* 4. Property Type Selector */}
                    <View style={styles.inputWrapper}>
                        <Text style={styles.label}>Property Type</Text>
                        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.typeList}>
                            {PROPERTY_TYPES.map((type) => (
                                <TouchableOpacity 
                                    key={type.id} 
                                    style={[styles.typeChip, selectedType === type.name && styles.typeChipActive]}
                                    onPress={() => setSelectedType(type.name)}
                                >
                                    <Text style={[styles.typeText, selectedType === type.name && styles.typeTextActive]}>{type.name}</Text>
                                </TouchableOpacity>
                            ))}
                        </ScrollView>
                    </View>

                    {/* 5. City */}
                    {renderInput("City (Optional)", city, setCity, "Enter City", ASSETS.city, "default", "city")}

                    {/* 6. Locality */}
                    {renderInput("Locality", locality, setLocality, "Search Locality", ASSETS.location, "default", "locality")}

                    {/* Terms Checkbox */}
                    <TouchableOpacity 
                        style={styles.termsRow} 
                        onPress={() => setIsTermsAccepted(!isTermsAccepted)}
                        activeOpacity={0.8}
                    >
                        <View style={[styles.checkbox, isTermsAccepted && styles.checkboxChecked]}>
                            {isTermsAccepted && <Image source={{ uri: ASSETS.check }} style={styles.checkIcon} />}
                        </View>
                        <Text style={styles.termsText}>
                            By signing up, you agree to our <Text style={styles.linkText}>Terms & Conditions</Text>.
                        </Text>
                    </TouchableOpacity>

                    {/* Continue Button */}
                    <TouchableOpacity 
                        style={styles.continueBtn} 
                        onPress={handleContinue}
                        disabled={isLoading}
                    >
                        {isLoading ? (
                            <ActivityIndicator color="#000" />
                        ) : (
                            <Text style={styles.continueText}>Continue</Text>
                        )}
                    </TouchableOpacity>

                </Animated.View>

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
                          onPress={() => handleNav(tab.route)}
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
  yellowBackground: { position: 'absolute', top: 0, left: 0, right: 0, height: 320, backgroundColor: '#FFDD32', borderBottomLeftRadius: 30, borderBottomRightRadius: 30 },
  safeArea: { flex: 1, paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0 },
  scrollContent: { paddingBottom: 120 },

  // Header
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 20, paddingTop: 20, paddingBottom: 10 },
  backButton: { padding: 5 },
  backIcon: { width: 24, height: 24, tintColor: '#000' },
  headerTitle: { fontSize: 20, fontWeight: 'bold', color: '#000' },

  // Form Container
  formContainer: {
      backgroundColor: '#FFF',
      marginHorizontal: 20,
      marginTop: 10,
      borderRadius: 25,
      padding: 25,
      shadowColor: "#000",
      shadowOffset: { width: 0, height: 5 },
      shadowOpacity: 0.1,
      shadowRadius: 15,
      elevation: 8,
  },

  // Inputs
  inputWrapper: { marginBottom: 20 },
  label: { fontSize: 14, fontWeight: 'bold', color: '#333', marginBottom: 8, marginLeft: 4 },
  inputField: {
      flexDirection: 'row', alignItems: 'center',
      backgroundColor: '#F9FAFB', borderWidth: 1, borderColor: '#E5E7EB', borderRadius: 14,
      height: 54, paddingHorizontal: 15
  },
  inputFieldFocused: {
      borderColor: '#FFDD32',
      backgroundColor: '#FFFBE6'
  },
  inputIcon: { width: 20, height: 20, tintColor: '#9CA3AF', marginRight: 12 },
  textInput: { flex: 1, fontSize: 16, color: '#000' },

  // Mobile Row
  rowInput: { flexDirection: 'row' },
  countryBtn: {
      flexDirection: 'row', alignItems: 'center', justifyContent: 'center',
      backgroundColor: '#F9FAFB', borderWidth: 1, borderColor: '#E5E7EB', borderRadius: 14,
      height: 54, paddingHorizontal: 12, marginRight: 10, minWidth: 90
  },
  countryText: { fontSize: 16, fontWeight: 'bold', color: '#333', marginLeft: 5 },
  inputFieldFlex: {
      flex: 1, flexDirection: 'row', alignItems: 'center',
      backgroundColor: '#F9FAFB', borderWidth: 1, borderColor: '#E5E7EB', borderRadius: 14,
      height: 54, paddingHorizontal: 15
  },

  // Type Chips
  typeList: { paddingVertical: 5 },
  typeChip: {
      paddingHorizontal: 20, paddingVertical: 10, borderRadius: 20,
      backgroundColor: '#F5F5F5', marginRight: 10, borderWidth: 1, borderColor: '#EEE'
  },
  typeChipActive: {
      backgroundColor: '#FFFBE6', borderColor: '#FFDD32'
  },
  typeText: { fontSize: 14, color: '#666', fontWeight: '600' },
  typeTextActive: { color: '#000', fontWeight: 'bold' },

  // Terms
  termsRow: { flexDirection: 'row', alignItems: 'flex-start', marginTop: 5, marginBottom: 25 },
  checkbox: {
      width: 22, height: 22, borderWidth: 2, borderColor: '#CCC', borderRadius: 6,
      justifyContent: 'center', alignItems: 'center', marginRight: 12, marginTop: 2
  },
  checkboxChecked: { backgroundColor: '#FFDD32', borderColor: '#FFDD32' },
  checkIcon: { width: 14, height: 14, tintColor: '#000' },
  termsText: { fontSize: 13, color: '#666', flex: 1, lineHeight: 20 },
  linkText: { color: '#FFDD32', fontWeight: 'bold' },

  // Continue Button
  continueBtn: {
      backgroundColor: '#FFDD32', height: 58, borderRadius: 16,
      justifyContent: 'center', alignItems: 'center',
      shadowColor: "#FFDD32", shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.4, shadowRadius: 8, elevation: 5
  },
  continueText: { fontSize: 18, fontWeight: 'bold', color: '#000' },

  // Bottom Nav
  bottomNavContainer: { position: 'absolute', bottom: 25, left: 0, right: 0, alignItems: 'center', justifyContent: 'center' },
  bottomNav: { flexDirection: 'row', backgroundColor: '#FFF', width: width * 0.9, borderRadius: 35, height: 70, alignItems: 'center', justifyContent: 'space-around', paddingHorizontal: 10, shadowColor: "#000", shadowOffset: { width: 0, height: 10 }, shadowOpacity: 0.15, shadowRadius: 20, elevation: 10 },
  navItem: { alignItems: 'center', justifyContent: 'center', padding: 10, borderRadius: 25 },
  navItemActive: { backgroundColor: '#FFDD32', flexDirection: 'row', paddingHorizontal: 15, paddingVertical: 10 },
  navIcon: { width: 24, height: 24, tintColor: '#CCC' },
  navText: { marginLeft: 8, fontWeight: 'bold', fontSize: 12, color: '#000' },
});
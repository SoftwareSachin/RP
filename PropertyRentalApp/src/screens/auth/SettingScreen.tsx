import React, { useState, useRef, useEffect } from "react";
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
  Modal,
  Animated,
  Easing,
  FlatList
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import CountryPicker, { CountryCode, Country } from "react-native-country-picker-modal";

const { width, height } = Dimensions.get('window');

// --- ASSETS ---
const ASSETS = {
    back: "https://cdn-icons-png.flaticon.com/512/271/271220.png",
    camera: "https://cdn-icons-png.flaticon.com/512/1042/1042339.png",
    user: "https://images.unsplash.com/photo-1633332755192-727a05c4013d?q=80&w=250&auto=format&fit=crop",
    success3D: "https://cdn-icons-png.flaticon.com/512/7518/7518748.png",
    
    // Field Icons
    person: "https://cdn-icons-png.flaticon.com/512/1077/1077114.png",
    calendar: "https://cdn-icons-png.flaticon.com/512/2370/2370264.png",
    phone: "https://cdn-icons-png.flaticon.com/512/159/159832.png",
    email: "https://cdn-icons-png.flaticon.com/512/542/542638.png",
    lock: "https://cdn-icons-png.flaticon.com/512/3064/3064197.png",
    location: "https://cdn-icons-png.flaticon.com/512/535/535239.png",
    edit: "https://cdn-icons-png.flaticon.com/512/1159/1159633.png",
    arrowDown: "https://cdn-icons-png.flaticon.com/512/2985/2985150.png"
};

// --- SUCCESS MODAL COMPONENT ---
const SuccessModal = ({ visible, onClose }: { visible: boolean, onClose: () => void }) => {
    const scaleAnim = useRef(new Animated.Value(0)).current;
    const opacityAnim = useRef(new Animated.Value(0)).current;

    useEffect(() => {
        if (visible) {
            Animated.parallel([
                Animated.spring(scaleAnim, { toValue: 1, friction: 5, tension: 60, useNativeDriver: true }),
                Animated.timing(opacityAnim, { toValue: 1, duration: 300, useNativeDriver: true })
            ]).start();
        } else {
            scaleAnim.setValue(0);
            opacityAnim.setValue(0);
        }
    }, [visible]);

    return (
        <Modal transparent visible={visible} animationType="none">
            <View style={styles.modalOverlay}>
                <Animated.View 
                    style={[
                        styles.modalContainer, 
                        { transform: [{ scale: scaleAnim }], opacity: opacityAnim }
                    ]}
                >
                    <View style={styles.iconContainer}>
                        <View style={styles.glowEffect} />
                        <Image source={{ uri: ASSETS.success3D }} style={styles.successIcon} resizeMode="contain" />
                    </View>
                    <Text style={styles.modalTitle}>Profile Updated!</Text>
                    <Text style={styles.modalSub}>Your personal information has been successfully saved.</Text>
                    <TouchableOpacity style={styles.modalBtn} onPress={onClose}>
                        <Text style={styles.modalBtnText}>Great!</Text>
                    </TouchableOpacity>
                </Animated.View>
            </View>
        </Modal>
    );
};

// --- CUSTOM DATE PICKER MODAL ---
const DatePickerModal = ({ visible, onClose, onSelect }: any) => {
    const days = Array.from({ length: 31 }, (_, i) => (i + 1).toString());
    const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    const years = Array.from({ length: 100 }, (_, i) => (2024 - i).toString());

    const [selectedDay, setSelectedDay] = useState("15");
    const [selectedMonth, setSelectedMonth] = useState("Dec");
    const [selectedYear, setSelectedYear] = useState("1987");

    const handleConfirm = () => {
        onSelect(`${selectedDay} ${selectedMonth} ${selectedYear}`);
        onClose();
    };

    if(!visible) return null;

    return (
        <Modal transparent visible={visible} animationType="fade">
            <View style={styles.modalOverlay}>
                <View style={styles.datePickerContainer}>
                    <Text style={styles.pickerTitle}>Select Birth Date</Text>
                    <View style={styles.pickerRow}>
                        {/* Day */}
                        <ScrollView style={styles.pickerColumn} showsVerticalScrollIndicator={false}>
                            {days.map(d => (
                                <TouchableOpacity key={d} onPress={() => setSelectedDay(d)} style={[styles.pickerItem, selectedDay === d && styles.pickerItemActive]}>
                                    <Text style={[styles.pickerText, selectedDay === d && styles.pickerTextActive]}>{d}</Text>
                                </TouchableOpacity>
                            ))}
                        </ScrollView>
                        {/* Month */}
                        <ScrollView style={styles.pickerColumn} showsVerticalScrollIndicator={false}>
                            {months.map(m => (
                                <TouchableOpacity key={m} onPress={() => setSelectedMonth(m)} style={[styles.pickerItem, selectedMonth === m && styles.pickerItemActive]}>
                                    <Text style={[styles.pickerText, selectedMonth === m && styles.pickerTextActive]}>{m}</Text>
                                </TouchableOpacity>
                            ))}
                        </ScrollView>
                        {/* Year */}
                        <ScrollView style={styles.pickerColumn} showsVerticalScrollIndicator={false}>
                            {years.map(y => (
                                <TouchableOpacity key={y} onPress={() => setSelectedYear(y)} style={[styles.pickerItem, selectedYear === y && styles.pickerItemActive]}>
                                    <Text style={[styles.pickerText, selectedYear === y && styles.pickerTextActive]}>{y}</Text>
                                </TouchableOpacity>
                            ))}
                        </ScrollView>
                    </View>
                    <TouchableOpacity style={styles.modalBtn} onPress={handleConfirm}>
                        <Text style={styles.modalBtnText}>Confirm Date</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </Modal>
    );
};

export default function PersonalInfo() {
  const navigation = useNavigation();

  // --- Form State ---
  const [fullName, setFullName] = useState("Zenab Vxuh");
  const [dob, setDob] = useState("15 Dec 1987");
  const [mobile, setMobile] = useState("9876543210");
  const [email, setEmail] = useState("zenab@example.com");
  const [gender, setGender] = useState("Female"); 
  const [password, setPassword] = useState("••••••••");
  const [address, setAddress] = useState("Malviya Nagar, Jaipur");
  
  // Country Picker State
  const [countryCode, setCountryCode] = useState<CountryCode>('IN');
  const [callingCode, setCallingCode] = useState('91');
  const [isCountryPickerVisible, setCountryPickerVisible] = useState(false);

  const [isLoading, setIsLoading] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [focusedField, setFocusedField] = useState<string | null>(null);

  // --- Handlers ---
  const handleSave = () => {
      setIsLoading(true);
      // Simulate API Call
      setTimeout(() => {
          setIsLoading(false);
          setShowSuccess(true);
      }, 1500);
  };

  const handleCloseSuccess = () => {
      setShowSuccess(false);
      navigation.goBack();
  };

  const handleChangePassword = () => {
      Alert.alert("Change Password", "Navigating to password reset flow...");
  };

  const onSelectCountry = (country: Country) => {
    setCountryCode(country.cca2);
    setCallingCode(country.callingCode[0]);
    setCountryPickerVisible(false);
  };

  // --- Render Helper ---
  const renderInput = (
      label: string, 
      value: string, 
      setter: (text: string) => void, 
      icon: string,
      fieldKey: string,
      isSecure: boolean = false,
      isEditable: boolean = true,
      keyboardType: any = "default"
  ) => (
      <View style={styles.inputGroup}>
          <Text style={styles.label}>{label}</Text>
          <View style={[
              styles.inputContainer, 
              focusedField === fieldKey && styles.inputFocused
          ]}>
              <Image source={{ uri: icon }} style={[styles.inputIcon, focusedField === fieldKey && {tintColor: '#FFDD32'}]} />
              <TextInput
                  style={styles.input}
                  value={value}
                  onChangeText={setter}
                  placeholder={`Enter ${label}`}
                  placeholderTextColor="#AAA"
                  secureTextEntry={isSecure}
                  editable={isEditable}
                  keyboardType={keyboardType}
                  onFocus={() => setFocusedField(fieldKey)}
                  onBlur={() => setFocusedField(null)}
              />
              {fieldKey === 'password' && (
                  <TouchableOpacity onPress={handleChangePassword}>
                      <Text style={styles.changeLink}>Change</Text>
                  </TouchableOpacity>
              )}
          </View>
      </View>
  );

  return (
    <View style={styles.mainContainer}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFDD32" translucent />
      
      <View style={styles.yellowBackground} />

      <SafeAreaView style={styles.safeArea}>
        
        {/* Header */}
        <View style={styles.header}>
            <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
                <Image source={{ uri: ASSETS.back }} style={styles.backIcon} />
            </TouchableOpacity>
            <Text style={styles.headerTitle}>Personal Information</Text>
            <View style={{width: 40}} /> 
        </View>

        <KeyboardAvoidingView 
            style={{ flex: 1 }} 
            behavior={Platform.OS === "ios" ? "padding" : undefined}
        >
            <ScrollView 
                contentContainerStyle={styles.scrollContent} 
                showsVerticalScrollIndicator={false}
            >

                {/* --- PROFILE AVATAR SECTION --- */}
                <View style={styles.profileSection}>
                    <View style={styles.avatarWrapper}>
                        <Image source={{ uri: ASSETS.user }} style={styles.avatar} />
                        <TouchableOpacity style={styles.cameraBtn} onPress={() => Alert.alert("Upload", "Choose photo from gallery")}>
                            <Image source={{ uri: ASSETS.camera }} style={styles.cameraIcon} />
                        </TouchableOpacity>
                    </View>
                    <Text style={styles.userName}>{fullName}</Text>
                    <Text style={styles.userEmail}>{email}</Text>
                </View>

                {/* --- FORM FIELDS --- */}
                <View style={styles.formContainer}>
                    
                    {renderInput("Full Name", fullName, setFullName, ASSETS.person, "name")}

                    {/* Date of Birth (Functional) */}
                    <View style={styles.inputGroup}>
                        <Text style={styles.label}>Date of Birth</Text>
                        <TouchableOpacity 
                            style={[styles.inputContainer, focusedField === 'dob' && styles.inputFocused]} 
                            onPress={() => setShowDatePicker(true)}
                        >
                            <Image source={{ uri: ASSETS.calendar }} style={styles.inputIcon} />
                            <Text style={styles.inputTextDisplay}>{dob}</Text>
                        </TouchableOpacity>
                    </View>

                    {/* Mobile Number (Functional Country Picker) */}
                    <View style={styles.inputGroup}>
                        <Text style={styles.label}>Mobile Number</Text>
                        <View style={[styles.inputContainer, focusedField === 'mobile' && styles.inputFocused]}>
                            <TouchableOpacity 
                                style={styles.countryCodeBtn} 
                                onPress={() => setCountryPickerVisible(true)}
                            >
                                <CountryPicker
                                    visible={isCountryPickerVisible}
                                    onClose={() => setCountryPickerVisible(false)}
                                    onSelect={onSelectCountry}
                                    countryCode={countryCode}
                                    withFlag
                                    withCallingCode
                                    withFilter
                                    containerButtonStyle={{display: 'none'}} // Hide default
                                />
                                <Text style={styles.countryText}>+{callingCode}</Text>
                                <Image source={{ uri: ASSETS.arrowDown }} style={styles.dropdownIcon} />
                            </TouchableOpacity>

                            <View style={styles.verticalLine} />
                            
                            <TextInput 
                                style={styles.input} 
                                value={mobile} 
                                onChangeText={setMobile} 
                                keyboardType="phone-pad"
                                onFocus={() => setFocusedField('mobile')}
                                onBlur={() => setFocusedField(null)}
                            />
                        </View>
                    </View>

                    {renderInput("Email", email, setEmail, ASSETS.email, "email", false, true, "email-address")}

                    {/* Gender Selector */}
                    <View style={styles.inputGroup}>
                        <Text style={styles.label}>Gender</Text>
                        <View style={styles.genderContainer}>
                            {['Male', 'Female', 'Other'].map((item) => (
                                <TouchableOpacity 
                                    key={item}
                                    style={[styles.genderBtn, gender === item && styles.genderBtnActive]}
                                    onPress={() => setGender(item)}
                                >
                                    <Text style={[styles.genderText, gender === item && styles.genderTextActive]}>{item}</Text>
                                </TouchableOpacity>
                            ))}
                        </View>
                    </View>

                    {/* Password Row */}
                    {renderInput("Password", password, setPassword, ASSETS.lock, "password", true, false)}

                    {/* Address (Fixed Alignment & Icon) */}
                    <View style={styles.inputGroup}>
                        <Text style={styles.label}>Address</Text>
                        <View style={[
                            styles.inputContainer, 
                            { height: 100, alignItems: 'flex-start' }, // Increased height, top alignment
                            focusedField === 'address' && styles.inputFocused
                        ]}>
                            {/* Icon has top margin to align with first line of text */}
                            <Image source={{ uri: ASSETS.location }} style={[styles.inputIcon, { marginTop: 15 }]} />
                            <TextInput 
                                style={[styles.input, { height: '100%', textAlignVertical: 'top', paddingTop: 12 }]} 
                                value={address} 
                                onChangeText={setAddress}
                                multiline
                                placeholder="Enter full address"
                                placeholderTextColor="#AAA"
                                onFocus={() => setFocusedField('address')}
                                onBlur={() => setFocusedField(null)}
                            />
                        </View>
                    </View>

                </View>

                {/* Submit Button */}
                <TouchableOpacity 
                    style={styles.submitBtn} 
                    onPress={handleSave}
                    disabled={isLoading}
                >
                    {isLoading ? (
                        <ActivityIndicator color="#000" />
                    ) : (
                        <Text style={styles.submitText}>Save Changes</Text>
                    )}
                </TouchableOpacity>

            </ScrollView>
        </KeyboardAvoidingView>
      </SafeAreaView>

      {/* Popups */}
      <SuccessModal visible={showSuccess} onClose={handleCloseSuccess} />
      <DatePickerModal visible={showDatePicker} onClose={() => setShowDatePicker(false)} onSelect={setDob} />

    </View>
  );
}

const styles = StyleSheet.create({
  mainContainer: { flex: 1, backgroundColor: "#F9F9F9" },
  
  // Header Background
  yellowBackground: { 
      position: 'absolute', top: 0, left: 0, right: 0, height: 280, 
      backgroundColor: '#FFDD32', 
      borderBottomLeftRadius: 30, borderBottomRightRadius: 30 
  },
  safeArea: { flex: 1, paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0 },
  
  // Header
  header: { 
      flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', 
      paddingHorizontal: 20, paddingTop: 20, paddingBottom: 15
  },
  backBtn: { padding: 8, backgroundColor: 'rgba(255,255,255,0.3)', borderRadius: 12 },
  backIcon: { width: 20, height: 20, tintColor: '#000' },
  headerTitle: { fontSize: 20, fontWeight: 'bold', color: '#000' },

  scrollContent: { paddingBottom: 50 },

  // Profile Section
  profileSection: { alignItems: 'center', marginBottom: 25, marginTop: 10 },
  avatarWrapper: { position: 'relative', marginBottom: 10 },
  avatar: { width: 100, height: 100, borderRadius: 50, borderWidth: 4, borderColor: '#FFF' },
  cameraBtn: {
      position: 'absolute', bottom: 0, right: 0, 
      backgroundColor: '#000', width: 32, height: 32, borderRadius: 16,
      justifyContent: 'center', alignItems: 'center', borderWidth: 2, borderColor: '#FFF'
  },
  cameraIcon: { width: 16, height: 16, tintColor: '#FFF' },
  userName: { fontSize: 22, fontWeight: 'bold', color: '#000' },
  userEmail: { fontSize: 14, color: '#333', opacity: 0.7 },

  // Form
  formContainer: {
      backgroundColor: '#FFF', marginHorizontal: 20, borderRadius: 24, padding: 20,
      shadowColor: "#000", shadowOffset: { width: 0, height: 5 }, shadowOpacity: 0.05, shadowRadius: 15, elevation: 5,
      marginBottom: 20
  },
  inputGroup: { marginBottom: 18 },
  label: { fontSize: 13, fontWeight: '700', color: '#333', marginBottom: 8, marginLeft: 4 },
  
  inputContainer: {
      flexDirection: 'row', alignItems: 'center', backgroundColor: '#F9FAFB',
      borderWidth: 1, borderColor: '#E5E7EB', borderRadius: 12, height: 52, paddingHorizontal: 15
  },
  inputFocused: { borderColor: '#FFDD32', backgroundColor: '#FFFBE6' },
  inputIcon: { width: 20, height: 20, tintColor: '#9CA3AF', marginRight: 12 },
  input: { flex: 1, fontSize: 15, color: '#1F2937' },
  inputTextDisplay: { flex: 1, fontSize: 15, color: '#1F2937' }, 
  
  changeLink: { color: '#B50E00', fontWeight: 'bold', fontSize: 13 },

  // Country Code
  countryCodeBtn: { flexDirection: 'row', alignItems: 'center', paddingRight: 10 },
  countryText: { fontWeight: 'bold', color: '#333', marginRight: 5 },
  dropdownIcon: { width: 10, height: 10, tintColor: '#666' },
  verticalLine: { width: 1, height: '60%', backgroundColor: '#DDD', marginRight: 10 },

  // Gender Selector
  genderContainer: { flexDirection: 'row', justifyContent: 'space-between', gap: 10 },
  genderBtn: { 
      flex: 1, paddingVertical: 12, borderRadius: 10, backgroundColor: '#F9FAFB', 
      alignItems: 'center', borderWidth: 1, borderColor: '#E5E7EB' 
  },
  genderBtnActive: { backgroundColor: '#FFDD32', borderColor: '#FFDD32' },
  genderText: { fontSize: 14, fontWeight: '600', color: '#666' },
  genderTextActive: { color: '#000', fontWeight: 'bold' },

  // Button
  submitBtn: {
      backgroundColor: '#FFDD32', marginHorizontal: 20, height: 56, borderRadius: 28,
      justifyContent: 'center', alignItems: 'center', 
      shadowColor: "#FFDD32", shadowOffset: {width: 0, height: 4}, shadowOpacity: 0.4, shadowRadius: 10, elevation: 5
  },
  submitText: { fontSize: 18, fontWeight: 'bold', color: '#000' },

  // Modal Styles
  modalOverlay: { flex: 1, backgroundColor: 'rgba(0,0,0,0.6)', justifyContent: 'center', alignItems: 'center' },
  modalContainer: { width: '85%', backgroundColor: '#FFF', borderRadius: 25, padding: 30, alignItems: 'center', elevation: 20, shadowColor: "#000", shadowOffset: { width: 0, height: 10 }, shadowOpacity: 0.3, shadowRadius: 20 },
  iconContainer: { marginBottom: 20, alignItems: 'center', justifyContent: 'center', position: 'relative' },
  successIcon: { width: 80, height: 80, zIndex: 10 },
  glowEffect: { position: 'absolute', width: 100, height: 100, borderRadius: 50, backgroundColor: '#FFDD32', opacity: 0.2 },
  modalTitle: { fontSize: 22, fontWeight: '900', color: '#000', textAlign: 'center', marginBottom: 10 },
  modalSub: { fontSize: 15, color: '#666', textAlign: 'center', lineHeight: 22, marginBottom: 30 },
  modalBtn: { backgroundColor: '#FFDD32', paddingVertical: 14, paddingHorizontal: 40, borderRadius: 30, width: '100%', alignItems: 'center', elevation: 5 },
  modalBtnText: { fontSize: 16, fontWeight: 'bold', color: '#000' },

  // Date Picker
  datePickerContainer: { width: '90%', backgroundColor: '#FFF', borderRadius: 20, padding: 20, alignItems: 'center', maxHeight: 400 },
  pickerTitle: { fontSize: 18, fontWeight: 'bold', marginBottom: 15 },
  pickerRow: { flexDirection: 'row', height: 200, width: '100%', marginBottom: 20 },
  pickerColumn: { flex: 1 },
  pickerItem: { padding: 10, alignItems: 'center', marginVertical: 2 },
  pickerItemActive: { backgroundColor: '#FFFBE6', borderRadius: 8 },
  pickerText: { fontSize: 16, color: '#666' },
  pickerTextActive: { fontSize: 18, fontWeight: 'bold', color: '#000' },
});
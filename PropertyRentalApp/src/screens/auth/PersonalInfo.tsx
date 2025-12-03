import React, { useState } from "react";

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
  ActivityIndicator
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import * as ImagePicker from "expo-image-picker";
import { useAuthContext } from "../../context/AuthContext";

const { width } = Dimensions.get('window');

// --- ASSETS ---
const ASSETS = {
    back: "https://cdn-icons-png.flaticon.com/512/271/271220.png",
    camera: "https://cdn-icons-png.flaticon.com/512/1042/1042339.png",
    user: "https://images.unsplash.com/photo-1633332755192-727a05c4013d?q=80&w=250&auto=format&fit=crop",
    
    // Field Icons
    person: "https://cdn-icons-png.flaticon.com/512/1077/1077114.png",
    calendar: "https://cdn-icons-png.flaticon.com/512/2370/2370264.png",
    phone: "https://cdn-icons-png.flaticon.com/512/159/159832.png",
    email: "https://cdn-icons-png.flaticon.com/512/542/542638.png",
    lock: "https://cdn-icons-png.flaticon.com/512/3064/3064197.png",
    location: "https://cdn-icons-png.flaticon.com/512/535/535239.png",
    edit: "https://cdn-icons-png.flaticon.com/512/1159/1159633.png"
};

export default function PersonalInfo() {
  const navigation = useNavigation();
  const { user, updateProfile } = useAuthContext();

  // --- Form State ---
  const [fullName, setFullName] = useState(user?.name || "");
  const [dob, setDob] = useState(user?.dob || "");
  const [mobile, setMobile] = useState(user?.phone || "");
  const [email] = useState(user?.email || "");
  const [gender, setGender] = useState(user?.gender || "Male"); // Male, Female, Other
  const [password, setPassword] = useState("••••••••");
  const [address, setAddress] = useState(user?.address || "");
  const [avatar, setAvatar] = useState(user?.avatar || ASSETS.user);

  const [isLoading, setIsLoading] = useState(false);
  const [focusedField, setFocusedField] = useState<string | null>(null);

  // --- Handlers ---
  const handleSave = async () => {
      if (!user) {
          Alert.alert("Not logged in", "Please log in to update your profile.");
          return;
      }

      setIsLoading(true);
      try {
          const result = await updateProfile({
              name: fullName,
              phone: mobile,
              gender,
              dob,
              address,
              avatar,
          });

          setIsLoading(false);

          if (!result || !result.success) {
              Alert.alert("Error", result?.error || "Profile update failed");
              return;
          }

          Alert.alert("Success", "Profile updated successfully!", [
              { text: "OK", onPress: () => navigation.goBack() }
          ]);
      } catch (error) {
          setIsLoading(false);
          Alert.alert("Error", "Something went wrong while updating your profile.");
      }
  };

  const handleChangePassword = () => {
      Alert.alert("Change Password", "Navigating to password reset flow...");
  };

  const handleDatePick = () => {
      Alert.alert("Select Date", "Opening Date Picker...");
      // Implement DateTimePicker here
  };

  const handlePickImage = () => {
      Alert.alert(
        "Update Profile Picture",
        "Choose a source",
        [
          { text: "Camera", onPress: handlePickFromCamera },
          { text: "Gallery", onPress: handlePickFromGallery },
          { text: "Cancel", style: "cancel" },
        ]
      );
  };

  const handlePickFromGallery = async () => {
      const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (status !== "granted") {
          Alert.alert("Permission required", "We need access to your photos to select a profile picture.");
          return;
      }

      const result = await ImagePicker.launchImageLibraryAsync({
          mediaTypes: ImagePicker.MediaTypeOptions.Images,
          allowsEditing: true,
          aspect: [1, 1],
          quality: 0.7,
          base64: true,
      });

      if (!result.canceled && result.assets && result.assets.length > 0) {
          const asset = result.assets[0];
          const base64 = asset.base64;
          const uri = base64 ? `data:image/jpeg;base64,${base64}` : asset.uri;
          setAvatar(uri);
      }
  };

  const handlePickFromCamera = async () => {
      const { status } = await ImagePicker.requestCameraPermissionsAsync();
      if (status !== "granted") {
          Alert.alert("Permission required", "We need access to your camera to take a profile picture.");
          return;
      }

      const result = await ImagePicker.launchCameraAsync({
          allowsEditing: true,
          aspect: [1, 1],
          quality: 0.7,
          base64: true,
      });

      if (!result.canceled && result.assets && result.assets.length > 0) {
          const asset = result.assets[0];
          const base64 = asset.base64;
          const uri = base64 ? `data:image/jpeg;base64,${base64}` : asset.uri;
          setAvatar(uri);
      }
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
                        <Image source={{ uri: avatar }} style={styles.avatar} />
                        <TouchableOpacity style={styles.cameraBtn} onPress={handlePickImage}>
                            <Image source={{ uri: ASSETS.camera }} style={styles.cameraIcon} />
                        </TouchableOpacity>
                    </View>
                    <Text style={styles.userName}>{fullName}</Text>
                    <Text style={styles.userEmail}>{email}</Text>
                </View>

                {/* --- FORM FIELDS --- */}
                <View style={styles.formContainer}>
                    
                    {renderInput("Full Name", fullName, setFullName, ASSETS.person, "name")}

                    {/* Date of Birth (Custom Interaction) */}
                    <View style={styles.inputGroup}>
                        <Text style={styles.label}>Date of Birth</Text>
                        <TouchableOpacity 
                            style={[styles.inputContainer, focusedField === 'dob' && styles.inputFocused]} 
                            onPress={handleDatePick}
                        >
                            <Image source={{ uri: ASSETS.calendar }} style={styles.inputIcon} />
                            <Text style={styles.inputTextDisplay}>{dob}</Text>
                        </TouchableOpacity>
                    </View>

                    {/* Mobile Number */}
                    <View style={styles.inputGroup}>
                        <Text style={styles.label}>Mobile Number</Text>
                        <View style={[styles.inputContainer, focusedField === 'mobile' && styles.inputFocused]}>
                            <View style={styles.countryCode}>
                                <Text style={styles.countryText}>+91</Text>
                            </View>
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

                    {renderInput("Email", email, () => {}, ASSETS.email, "email", false, false, "email-address")}

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

                    {/* Password Row (Read Only + Link) */}
                    {renderInput("Password", password, setPassword, ASSETS.lock, "password", true, false)}

                    {/* Address (Multiline) */}
                    <View style={styles.inputGroup}>
                        <Text style={styles.label}>Address</Text>
                        <View style={[styles.inputContainer, {height: 80, alignItems: 'flex-start', paddingTop: 12}, focusedField === 'address' && styles.inputFocused]}>
                            <Image source={{ uri: ASSETS.location }} style={styles.inputIcon} />
                            <TextInput 
                                style={[styles.input, {height: '100%', textAlignVertical: 'top'}]} 
                                value={address} 
                                onChangeText={setAddress}
                                multiline
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
  inputTextDisplay: { flex: 1, fontSize: 15, color: '#1F2937' }, // For non-editable triggers
  
  changeLink: { color: '#B50E00', fontWeight: 'bold', fontSize: 13 },

  // Country Code
  countryCode: { paddingRight: 10 },
  countryText: { fontWeight: 'bold', color: '#333' },
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
  submitText: { fontSize: 18, fontWeight: 'bold', color: '#000' }
});
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
  StatusBar,
  Dimensions,
  KeyboardAvoidingView,
  Platform,
  Alert,
  ActivityIndicator
} from "react-native";
import CountryPicker, { CountryCode, Country } from "react-native-country-picker-modal";
import { useNavigation } from "@react-navigation/native";

const { width } = Dimensions.get('window');

const ASSETS = {
    illustration: "https://cdn-icons-png.flaticon.com/512/8983/8983336.png", 
    backArrow: "https://cdn-icons-png.flaticon.com/512/271/271220.png",
    downArrow: "https://cdn-icons-png.flaticon.com/512/2985/2985150.png"
};

export default function MobileLogin() {
  const navigation = useNavigation();

  const [phoneNumber, setPhoneNumber] = useState('');
  const [countryCode, setCountryCode] = useState<CountryCode>("IN");
  const [callingCode, setCallingCode] = useState("91");
  const [isPickerVisible, setPickerVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const onSelectCountry = (country: Country) => {
    setCountryCode(country.cca2);
    setCallingCode(country.callingCode[0]);
    setPickerVisible(false);
  };

  const handleGetOtp = async () => {
    if (phoneNumber.length < 10) {
      Alert.alert("Invalid Number", "Please enter a valid 10-digit mobile number.");
      return;
    }
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      Alert.alert("OTP Sent", `OTP sent to +${callingCode} ${phoneNumber}`);
    }, 1500);
  };

  return (
    <View style={styles.mainContainer}>
      <StatusBar barStyle="dark-content" backgroundColor="transparent" translucent />
      
      {/* Main Content Area */}
      <SafeAreaView style={styles.safeArea}>
        
        {/* Visual Spacer for Header (Optional extra yellow space) */}
        <View style={{ height: 10 }} />

        <View style={styles.contentWrapper}>
          <KeyboardAvoidingView 
            behavior={Platform.OS === "ios" ? "padding" : undefined}
            style={{ flex: 1 }}
          >
            <ScrollView contentContainerStyle={styles.scrollContent} keyboardShouldPersistTaps="handled">
              
              {/* Header: Back Button */}
              <View style={styles.header}>
                  <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
                      <Image source={{ uri: ASSETS.backArrow }} style={styles.backIcon} />
                  </TouchableOpacity>
              </View>

              {/* Illustration Section */}
              <View style={styles.illustrationContainer}>
                  <View style={styles.circleBg}>
                      <Image 
                          source={{ uri: ASSETS.illustration }} 
                          style={styles.illustration} 
                          resizeMode="contain"
                      />
                  </View>
              </View>

              {/* Title Section */}
              <View style={styles.textContainer}>
                  <Text style={styles.title}>Login via Mobile</Text>
                  <Text style={styles.subtitle}>
                      We will send a One Time Password (OTP) to this mobile number.
                  </Text>
              </View>

              {/* Input Section */}
              <View style={styles.inputContainer}>
                  <Text style={styles.inputLabel}>Mobile Number</Text>
                  
                  <View style={styles.phoneInputRow}>
                      <TouchableOpacity 
                          style={styles.countrySelector} 
                          onPress={() => setPickerVisible(true)}
                      >
                          <CountryPicker
                              visible={isPickerVisible}
                              withFlag
                              withFilter
                              withCallingCode
                              withEmoji
                              countryCode={countryCode}
                              onSelect={onSelectCountry}
                              onClose={() => setPickerVisible(false)}
                              containerButtonStyle={{ display: 'none' }} // Hides default button
                          />
                          <Text style={styles.callingCode}>+{callingCode}</Text>
                          <Image source={{ uri: ASSETS.downArrow }} style={styles.dropdownIcon} />
                      </TouchableOpacity>

                      <TextInput
                          style={styles.phoneInput}
                          placeholder="Enter Number"
                          placeholderTextColor="#AAA"
                          keyboardType="number-pad"
                          maxLength={10}
                          value={phoneNumber}
                          onChangeText={setPhoneNumber}
                      />
                  </View>
              </View>

              {/* Action Button */}
              <TouchableOpacity 
                  style={[
                      styles.otpButton, 
                      phoneNumber.length < 10 && styles.otpButtonDisabled
                  ]} 
                  onPress={handleGetOtp}
                  disabled={isLoading || phoneNumber.length < 10}
              >
                  {isLoading ? (
                      <ActivityIndicator color="#000" />
                  ) : (
                      <Text style={styles.otpButtonText}>Get OTP</Text>
                  )}
              </TouchableOpacity>

              {/* Footer Terms */}
              <Text style={styles.termsText}>
                  By continuing, you agree to our <Text style={styles.linkText}>Terms of Service</Text> and <Text style={styles.linkText}>Privacy Policy</Text>.
              </Text>

            </ScrollView>
          </KeyboardAvoidingView>
        </View>
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: "#FFDD32", // Yellow background for Status Bar area
    // CRITICAL FIX for Android: Pushes content down by status bar height
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0, 
  },
  safeArea: {
    flex: 1,
  },
  contentWrapper: {
    flex: 1,
    backgroundColor: "#FFFFFF", // Main Content Color
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    overflow: 'hidden',
    // Ensure white card doesn't touch the very top edge visually
    marginTop: 0, 
  },
  scrollContent: {
    flexGrow: 1,
    paddingBottom: 40,
  },
  
  // Header
  header: {
    paddingHorizontal: 20,
    paddingTop: 25, // Increased top padding inside white card for Back button
  },
  backButton: {
    padding: 8,
    alignSelf: 'flex-start',
    marginLeft: -5,
  },
  backIcon: {
    width: 24,
    height: 24,
    tintColor: '#000'
  },

  // Illustration
  illustrationContainer: {
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 30,
  },
  circleBg: {
    width: 160,
    height: 160,
    backgroundColor: '#FFFBE6', 
    borderRadius: 80,
    justifyContent: 'center',
    alignItems: 'center',
  },
  illustration: {
    width: 100,
    height: 100,
  },

  // Text
  textContainer: {
    paddingHorizontal: 24,
    marginBottom: 30,
    alignItems: 'center'
  },
  title: {
    fontSize: 28,
    fontWeight: "800",
    color: "#1F2937",
    marginBottom: 10,
    textAlign: 'center'
  },
  subtitle: {
    fontSize: 15,
    color: "#6B7280",
    textAlign: "center",
    lineHeight: 22,
  },

  // Input
  inputContainer: {
    paddingHorizontal: 24,
    marginBottom: 30,
  },
  inputLabel: {
    fontSize: 14,
    fontWeight: "700",
    color: "#374151",
    marginBottom: 10,
    marginLeft: 4
  },
  phoneInputRow: {
    flexDirection: 'row',
    height: 56,
  },
  countrySelector: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F9FAFB',
    borderWidth: 1,
    borderColor: '#E5E7EB',
    borderRadius: 12,
    paddingHorizontal: 12,
    marginRight: 12,
    width: 100,
    justifyContent: 'center'
  },
  callingCode: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1F2937',
    marginRight: 5
  },
  dropdownIcon: {
    width: 10,
    height: 10,
    tintColor: '#6B7280',
    opacity: 0.7
  },
  phoneInput: {
    flex: 1,
    backgroundColor: '#F9FAFB',
    borderWidth: 1,
    borderColor: '#E5E7EB',
    borderRadius: 12,
    paddingHorizontal: 16,
    fontSize: 18,
    color: '#1F2937',
    fontWeight: '500'
  },

  // Button
  otpButton: {
    backgroundColor: "#FFDD32", // Brand Yellow
    marginHorizontal: 24,
    height: 56,
    borderRadius: 14,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: "#FFDD32",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.4,
    shadowRadius: 10,
    elevation: 5,
    marginBottom: 20,
  },
  otpButtonDisabled: {
      backgroundColor: '#E5E7EB', 
      shadowOpacity: 0,
      elevation: 0
  },
  otpButtonText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#000000",
  },

  // Footer
  termsText: {
      textAlign: 'center',
      marginHorizontal: 40,
      fontSize: 12,
      color: '#9CA3AF',
      lineHeight: 18
  },
  linkText: {
      color: '#FFDD32', 
      fontWeight: 'bold',
      textShadowColor: 'rgba(0,0,0,0.1)',
      textShadowRadius: 1
  }
});
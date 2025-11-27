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
  ActivityIndicator,
  LayoutAnimation,
  UIManager
} from "react-native";
import { useNavigation } from "@react-navigation/native";

// Enable Layout Animation
if (Platform.OS === 'android') {
  if (UIManager.setLayoutAnimationEnabledExperimental) {
    UIManager.setLayoutAnimationEnabledExperimental(true);
  }
}

const { width } = Dimensions.get('window');

// --- PROFESSIONAL ICONS ---
const ICONS: any = {
        visa: "https://img.icons8.com/color/96/visa.png",

    mastercard: "https://img.icons8.com/color/96/mastercard.png",

    amex: "https://img.icons8.com/color/96/amex.png",

    rupay: "https://img.icons8.com/color/96/rupay.png",

    defaultCard: "https://img.icons8.com/color/96/bank-cards.png",

   

    gpay: "https://img.icons8.com/color/96/google-pay-india.png",

    phonepe: "https://img.icons8.com/color/96/phone-pe.png",

    paytm: "https://img.icons8.com/color/96/paytm.png",

    bhim: "https://img.icons8.com/color/96/bhim.png",

   

    chip: "https://img.icons8.com/fluency/96/sim-card-chip.png",

    back: "https://cdn-icons-png.flaticon.com/512/271/271220.png",

    lock: "https://img.icons8.com/ios-filled/50/999999/lock.png",

    check: "https://img.icons8.com/emoji/48/check-mark-button-emoji.png",

    cash: "https://img.icons8.com/color/96/cash-in-hand.png",

   

    cardSection: "https://img.icons8.com/ios-filled/100/000000/bank-cards.png",

    upiSection: "https://img.icons8.com/ios-filled/100/000000/bhim-upi.png",

    cashSection: "https://img.icons8.com/ios-filled/100/000000/cash-in-hand.png",

   

    home: "https://cdn-icons-png.flaticon.com/512/1946/1946436.png",

    list: "https://cdn-icons-png.flaticon.com/512/2910/2910791.png",

    heartNav: "https://cdn-icons-png.flaticon.com/512/1077/1077035.png",

    pay: "https://cdn-icons-png.flaticon.com/512/272/272525.png",

    userNav: "https://cdn-icons-png.flaticon.com/512/1077/1077114.png",
};

const UPI_OPTIONS = [
    { id: 'gpay', name: 'Google Pay', icon: ICONS.gpay },
    { id: 'phonepe', name: 'PhonePe', icon: ICONS.phonepe },
    { id: 'paytm', name: 'Paytm', icon: ICONS.paytm },
    { id: 'bhim', name: 'BHIM', icon: ICONS.bhim },
];

export default function PaymentScreen() {
  const navigation = useNavigation();

  const [activeTab, setActiveTab] = useState("Payment");
  const [selectedMethod, setSelectedMethod] = useState<"card" | "upi" | "cash" | "">("");
  const [subMethod, setSubMethod] = useState(""); 

  // Card Data
  const [cardNumber, setCardNumber] = useState("");
  const [cardHolder, setCardHolder] = useState("");
  const [expiry, setExpiry] = useState("");
  const [cvv, setCvv] = useState("");
  const [cardType, setCardType] = useState("defaultCard");
  
  // UPI Data
  const [selectedUpiApp, setSelectedUpiApp] = useState("");
  const [upiId, setUpiId] = useState("");
  const [upiProvider, setUpiProvider] = useState("defaultUpi");
  const [isVerifying, setIsVerifying] = useState(false);
  const [isUpiVerified, setIsUpiVerified] = useState(false);

  // Common
  const [saveCard, setSaveCard] = useState(true);
  const [agreeTerms, setAgreeTerms] = useState(false);
  const [processing, setProcessing] = useState(false);

  // --- LOGIC ---

  const toggleMethod = (method: "card" | "upi" | "cash") => {
      LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
      setSelectedMethod(method === selectedMethod ? "" : method);
      setSubMethod(""); 
  };

  const detectCardType = (number: string) => {
      const clean = number.replace(/\D/g, '');
      if (clean.startsWith("4")) return 'visa';
      if (/^5[1-5]/.test(clean)) return 'mastercard';
      if (/^3[47]/.test(clean)) return 'amex';
      if (/^60|^65|^81|^82|^508/.test(clean)) return 'rupay';
      return 'defaultCard';
  };

  const handleCardChange = (text: string) => {
      const clean = text.replace(/\D/g, '');
      setCardType(detectCardType(clean));
      let formatted = clean.match(/.{1,4}/g)?.join(' ') || clean;
      if (clean.length <= 19) setCardNumber(formatted);
  };

  const handleExpiryChange = (text: string) => {
      let clean = text.replace(/\D/g, '');
      if (clean.length >= 2) {
          clean = clean.substring(0, 2) + '/' + clean.substring(2, 4);
      }
      setExpiry(clean);
  };

  const handleUpiChange = (text: string) => {
      setUpiId(text);
      setIsUpiVerified(false); 
      const lower = text.toLowerCase();
      if (lower.includes("@ok") || lower.includes("@axis")) setUpiProvider("gpay");
      else if (lower.includes("@ybl") || lower.includes("@ibl")) setUpiProvider("phonepe");
      else if (lower.includes("@paytm")) setUpiProvider("paytm");
      else if (lower.includes("@upi")) setUpiProvider("bhim");
      else setUpiProvider("defaultUpi");
  };

  const handleVerifyUpi = () => {
      if (!upiId.includes("@") || upiId.length < 5) {
          Alert.alert("Invalid ID", "Please enter a valid UPI ID (e.g. name@okaxis)");
          return;
      }
      setIsVerifying(true);
      setTimeout(() => {
          setIsVerifying(false);
          setIsUpiVerified(true);
      }, 1500);
  };

  const handleChangeUpi = () => {
      setIsUpiVerified(false);
      setUpiId("");
      setUpiProvider("defaultUpi");
  };

  const handlePay = () => {
      if (!selectedMethod) {
          Alert.alert("Selection Required", "Please select a payment method.");
          return;
      }
      if (!agreeTerms) {
          Alert.alert("Terms Required", "Please agree to the Terms and Conditions.");
          return;
      }
      if (selectedMethod === 'card' && cardNumber.length < 15) {
          Alert.alert("Invalid Card", "Please enter valid card details.");
          return;
      }
      
      setProcessing(true);
      setTimeout(() => {
          setProcessing(false);
          // @ts-ignore - TransactionSuccess is registered in AuthNavigator
          navigation.navigate('TransactionSuccess');
      }, 2000);
  };

  const tabs = [
      { name: "Home", icon: ICONS.home, route: "HomeRent" },
      { name: "Lists", icon: ICONS.list, route: "ListProperty" },
      { name: "Saved", icon: ICONS.heartNav, route: "Saved" },
      { name: "Payment", icon: ICONS.pay, route: "MonthlyRent" },
      { name: "Account", icon: ICONS.userNav, route: "Account" },
  ];

  const handleNav = (route: string) => {
      try {
        // @ts-ignore
        navigation.navigate(route);
      } catch (e) {
        console.warn("Navigation not available or route missing");
      }
  }

  // --- COMPONENT: Virtual Card ---
  const VisualCard = () => (
      <View style={styles.virtualCard}>
          <View style={styles.vcHeader}>
              <Image source={{ uri: ICONS.chip }} style={styles.vcChip} resizeMode="contain" />
              {cardType !== 'defaultCard' && (
                  <Image source={{ uri: ICONS[cardType] }} style={styles.vcLogo} resizeMode="contain" />
              )}
          </View>
          <Text style={styles.vcNumber}>{cardNumber || "•••• •••• •••• ••••"}</Text>
          <View style={styles.vcFooter}>
              <View>
                  <Text style={styles.vcLabel}>Card Holder</Text>
                  <Text style={styles.vcValue}>{cardHolder.toUpperCase() || "NAME"}</Text>
              </View>
              <View>
                  <Text style={styles.vcLabel}>Expires</Text>
                  <Text style={styles.vcValue}>{expiry || "MM/YY"}</Text>
              </View>
          </View>
      </View>
  );

  return (
    <View style={styles.mainContainer}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFDD32" translucent />
      
      {/* 1. YELLOW HEADER BACKGROUND */}
      <View style={styles.yellowBackground} />

      <SafeAreaView style={styles.safeArea}>
        
        {/* 2. HEADER */}
        <View style={styles.header}>
            <TouchableOpacity style={styles.backBtn} onPress={() => navigation.goBack()}>
                <Image source={{ uri: ICONS.back }} style={styles.backIcon} />
            </TouchableOpacity>
            <Text style={styles.headerTitle}>Checkout</Text>
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
                
                <Text style={styles.sectionTitle}>Payment Method</Text>

                {/* --- 1. CREDIT / DEBIT CARD SECTION --- */}
                <TouchableOpacity 
                    style={[styles.methodCard, selectedMethod === 'card' && styles.methodCardActive]} 
                    activeOpacity={0.9}
                    onPress={() => toggleMethod('card')}
                >
                    <View style={styles.methodHeader}>
                        <View style={styles.methodIconContainer}>
                            <Image source={{ uri: ICONS.cardSection }} style={styles.methodIcon} resizeMode="contain" />
                        </View>
                        <Text style={styles.methodTitle}>Credit / Debit Card</Text>
                        <View style={[styles.radio, selectedMethod === 'card' && styles.radioActive]} />
                    </View>

                    {selectedMethod === 'card' && (
                        <View style={styles.methodBody}>
                            <VisualCard />

                            {/* Inputs */}
                            <View style={styles.inputGroup}>
                                <Text style={styles.inputLabel}>Card Number</Text>
                                <View style={styles.inputField}>
                                    <Image source={{ uri: ICONS.cardSection }} style={styles.fieldIcon} />
                                    <TextInput 
                                        style={styles.textInput} 
                                        placeholder="0000 0000 0000 0000"
                                        keyboardType="numeric"
                                        value={cardNumber}
                                        onChangeText={handleCardChange}
                                        maxLength={19}
                                    />
                                </View>
                            </View>

                            <View style={styles.inputGroup}>
                                <Text style={styles.inputLabel}>Card Holder Name</Text>
                                <View style={styles.inputField}>
                                    <Image source={{ uri: ICONS.user }} style={styles.fieldIcon} />
                                    <TextInput 
                                        style={styles.textInput} 
                                        placeholder="Name on card"
                                        value={cardHolder}
                                        onChangeText={setCardHolder}
                                    />
                                </View>
                            </View>

                            <View style={styles.row}>
                                <View style={[styles.inputGroup, {flex: 1, marginRight: 10}]}>
                                    <Text style={styles.inputLabel}>Expiry Date</Text>
                                    <View style={styles.inputField}>
                                        <Image source={{ uri: ICONS.calendar }} style={styles.fieldIcon} />
                                        <TextInput 
                                            style={styles.textInput} 
                                            placeholder="MM / YY"
                                            keyboardType="numeric"
                                            value={expiry}
                                            onChangeText={handleExpiryChange}
                                            maxLength={5}
                                        />
                                    </View>
                                </View>
                                <View style={[styles.inputGroup, {flex: 1}]}>
                                    <Text style={styles.inputLabel}>CVV</Text>
                                    <View style={styles.inputField}>
                                        <Image source={{ uri: ICONS.lock }} style={styles.fieldIcon} />
                                        <TextInput 
                                            style={styles.textInput} 
                                            placeholder="123"
                                            keyboardType="numeric"
                                            value={cvv}
                                            onChangeText={setCvv}
                                            maxLength={4}
                                            secureTextEntry
                                        />
                                    </View>
                                </View>
                            </View>

                            <TouchableOpacity style={styles.checkboxRow} onPress={() => setSaveCard(!saveCard)}>
                                <View style={[styles.checkbox, saveCard && styles.checkboxChecked]}>
                                    {saveCard && <Image source={{ uri: ICONS.check }} style={styles.checkImg} />}
                                </View>
                                <Text style={styles.checkboxText}>Save card securely for future payments</Text>
                            </TouchableOpacity>
                        </View>
                    )}
                </TouchableOpacity>

                {/* --- 2. UPI SECTION --- */}
                <TouchableOpacity 
                    style={[styles.methodCard, selectedMethod === 'upi' && styles.methodCardActive]} 
                    activeOpacity={0.9}
                    onPress={() => toggleMethod('upi')}
                >
                    <View style={styles.methodHeader}>
                        <View style={styles.methodIconContainer}>
                            <Image source={{ uri: ICONS.upiSection }} style={styles.methodIcon} resizeMode="contain" />
                        </View>
                        <Text style={styles.methodTitle}>UPI Payment</Text>
                        <View style={[styles.radio, selectedMethod === 'upi' && styles.radioActive]} />
                    </View>

                    {selectedMethod === 'upi' && (
                        <View style={styles.methodBody}>
                            <Text style={styles.subLabel}>Select App</Text>
                            <View style={styles.upiGrid}>
                                {UPI_OPTIONS.map((app) => (
                                    <TouchableOpacity 
                                        key={app.id} 
                                        style={[styles.upiItem, selectedUpiApp === app.id && styles.upiItemActive]}
                                        onPress={() => setSelectedUpiApp(app.id)}
                                    >
                                        <Image source={{ uri: app.icon }} style={styles.upiIcon} resizeMode="contain" />
                                        <Text style={styles.upiText}>{app.name}</Text>
                                    </TouchableOpacity>
                                ))}
                            </View>

                            <Text style={[styles.subLabel, {marginTop: 15}]}>Or enter UPI ID</Text>
                            
                            <View style={[styles.inputField, isUpiVerified && styles.verifiedBorder]}>
                                <Image 
                                    source={{ uri: ICONS[upiProvider] || ICONS.defaultUpi }} 
                                    style={styles.fieldIcon} 
                                    resizeMode="contain"
                                />
                                <TextInput 
                                    style={styles.textInput} 
                                    placeholder="e.g. name@oksbi"
                                    value={upiId}
                                    onChangeText={handleUpiChange}
                                    autoCapitalize="none"
                                    editable={!isUpiVerified} 
                                />
                                {isUpiVerified ? (
                                    <Image source={{ uri: ICONS.check }} style={styles.checkImg} />
                                ) : (
                                    <TouchableOpacity onPress={handleVerifyUpi} disabled={isVerifying}>
                                        {isVerifying ? <ActivityIndicator color="#FFDD32" /> : <Text style={styles.verifyLink}>VERIFY</Text>}
                                    </TouchableOpacity>
                                )}
                            </View>
                            {isUpiVerified && (
                                <TouchableOpacity onPress={handleChangeUpi} style={{alignSelf: 'flex-end', marginTop: 5}}>
                                    <Text style={{color: '#FF3B30', fontSize: 12, fontWeight: 'bold'}}>Change ID</Text>
                                </TouchableOpacity>
                            )}
                        </View>
                    )}
                </TouchableOpacity>

                {/* --- 3. CASH SECTION --- */}
                <TouchableOpacity 
                    style={[styles.methodCard, selectedMethod === 'cash' && styles.methodCardActive]} 
                    activeOpacity={0.9}
                    onPress={() => toggleMethod('cash')}
                >
                    <View style={styles.methodHeader}>
                        <View style={styles.methodIconContainer}>
                            <Image source={{ uri: ICONS.cashSection }} style={styles.methodIcon} resizeMode="contain" />
                        </View>
                        <Text style={styles.methodTitle}>Cash on Delivery</Text>
                        <View style={[styles.radio, selectedMethod === 'cash' && styles.radioActive]} />
                    </View>

                    {selectedMethod === 'cash' && (
                        <View style={styles.methodBody}>
                            <View style={styles.cashInfoBox}>
                                <Text style={styles.cashInfoText}>Pay securely with cash upon property visit.</Text>
                            </View>
                        </View>
                    )}
                </TouchableOpacity>
                
                {/* Terms Checkbox */}
                <TouchableOpacity style={[styles.checkboxRow, {marginBottom: 10}]} onPress={() => setAgreeTerms(!agreeTerms)}>
                    <View style={[styles.checkbox, agreeTerms && styles.checkboxChecked]}>
                        {agreeTerms && <Image source={{ uri: ICONS.check }} style={styles.checkImg} />}
                    </View>
                    <Text style={styles.checkboxText}>I agree to the Terms & Conditions</Text>
                </TouchableOpacity>

                {/* Footer Section (Scrollable) */}
                <View style={styles.footerSection}>
                    <View style={styles.totalRow}>
                        <Text style={styles.totalLabel}>Total Amount</Text>
                        <Text style={styles.totalValue}>₹49,000</Text>
                    </View>
                    <TouchableOpacity 
                        style={[styles.payButton, (!selectedMethod || !agreeTerms) && styles.payButtonDisabled]} 
                        onPress={handlePay}
                        disabled={processing || !selectedMethod || !agreeTerms}
                    >
                        {processing ? (
                            <ActivityIndicator color="#000" />
                        ) : (
                            <Text style={styles.payButtonText}>
                                {selectedMethod === 'cash' ? 'Confirm Booking' : 'Pay Now'}
                            </Text>
                        )}
                    </TouchableOpacity>
                </View>

            </ScrollView>
        </KeyboardAvoidingView>

        {/* Bottom Navigation */}
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
                            <Image source={{ uri: tab.icon }} style={[styles.navIcon, isActive && { tintColor: '#000', width: 20, height: 20 }]} resizeMode="contain" />
                            {isActive && <Text style={styles.navText}>{tab.name}</Text>}
                        </TouchableOpacity>
                    )
                })}
            </View>
        </View>

      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  mainContainer: { flex: 1, backgroundColor: "#F5F7FA" },
  
  // Yellow Header background (Fixed)
  yellowBackground: { 
      position: 'absolute', 
      top: 0, 
      left: 0, 
      right: 0, 
      height: 320, 
      backgroundColor: '#FFDD32', 
      borderBottomLeftRadius: 30, 
      borderBottomRightRadius: 30 
  },
  
  safeArea: { 
      flex: 1, 
      // CRITICAL FIX: Adjust padding for Android Status Bar
      paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0 
  },
  
  // Header
  header: { 
      flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', 
      paddingHorizontal: 20, 
      paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight! + 20 : 60, 
      paddingBottom: 15, 
      borderBottomWidth: 0
  },
  backBtn: { padding: 5 },
  backIcon: { width: 24, height: 24, tintColor: '#000' },
  headerTitle: { fontSize: 20, fontWeight: 'bold', color: '#000' },

  // Scroll Content: HUGE Padding Bottom allows scroll to clear the floating nav
  scrollContent: { paddingHorizontal: 20, paddingBottom: 150 },
  sectionTitle: { fontSize: 18, fontWeight: 'bold', color: '#333', marginBottom: 15, marginTop: 10 },

  // Method Card
  methodCard: {
      backgroundColor: '#FFF', borderRadius: 16, marginBottom: 15,
      padding: 16,
      shadowColor: "#000", shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.05, shadowRadius: 8, elevation: 2,
      borderWidth: 1, borderColor: 'transparent'
  },
  methodCardActive: { borderColor: '#FFDD32', backgroundColor: '#FFF' },
  methodHeader: { flexDirection: 'row', alignItems: 'center' },
  methodIconContainer: { 
      width: 40, height: 40, borderRadius: 10, backgroundColor: '#F9FAFB', 
      alignItems: 'center', justifyContent: 'center', marginRight: 15 
  },
  methodIcon: { width: 24, height: 24, tintColor: '#333' },
  methodTitle: { flex: 1, fontSize: 16, fontWeight: '600', color: '#1F2937' },
  
  radio: { width: 22, height: 22, borderRadius: 11, borderWidth: 2, borderColor: '#DDD' },
  radioActive: { borderColor: '#FFDD32', backgroundColor: '#FFDD32', borderWidth: 6 },

  methodBody: { marginTop: 20 },

  // Virtual Card
  virtualCard: {
      backgroundColor: '#1A1A1A', borderRadius: 16, padding: 20, height: 200,
      justifyContent: 'space-between', marginBottom: 25,
      shadowColor: "#000", shadowOffset: { width: 0, height: 8 }, shadowOpacity: 0.3, shadowRadius: 12, elevation: 8
  },
  vcHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  vcChip: { width: 40, height: 30, resizeMode: 'contain' },
  vcLogo: { width: 50, height: 30 },
  vcNumber: { color: '#FFF', fontSize: 22, fontFamily: Platform.OS === 'ios' ? 'Courier' : 'monospace', letterSpacing: 2, textAlign: 'center' },
  vcFooter: { flexDirection: 'row', justifyContent: 'space-between' },
  vcLabel: { color: '#AAA', fontSize: 10, marginBottom: 4, textTransform: 'uppercase' },
  vcValue: { color: '#FFF', fontSize: 14, fontWeight: 'bold', textTransform: 'uppercase' },

  // Inputs
  row: { flexDirection: 'row' },
  inputGroup: { marginBottom: 15 },
  inputLabel: { fontSize: 13, fontWeight: '600', color: '#555', marginBottom: 6 },
  inputField: {
      flexDirection: 'row', alignItems: 'center', backgroundColor: '#F9FAFB',
      borderWidth: 1, borderColor: '#E5E7EB', borderRadius: 12, height: 52, paddingHorizontal: 15
  },
  textInput: { flex: 1, fontSize: 16, color: '#000' },
  fieldIcon: { width: 18, height: 18, tintColor: '#999', marginRight: 10 },
  verifyLink: { color: '#F5A623', fontWeight: 'bold', fontSize: 14 },
  verifiedBorder: { borderColor: '#4CAF50', backgroundColor: '#F0FFF4' },

  // Checkbox
  checkboxRow: { flexDirection: 'row', alignItems: 'center', marginTop: 5 },
  checkbox: { width: 20, height: 20, borderRadius: 6, borderWidth: 2, borderColor: '#CCC', alignItems: 'center', justifyContent: 'center', marginRight: 10 },
  checkboxChecked: { backgroundColor: '#FFDD32', borderColor: '#FFDD32' },
  checkImg: { width: 12, height: 12, tintColor: '#000' },
  checkboxText: { fontSize: 13, color: '#555', flex: 1 },

  // UPI Grid
  upiGrid: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between' },
  upiItem: { 
      width: '48%', flexDirection: 'row', alignItems: 'center', backgroundColor: '#F9FAFB',
      padding: 12, borderRadius: 12, marginBottom: 10, borderWidth: 1, borderColor: '#EEE'
  },
  upiItemActive: { borderColor: '#FFDD32', backgroundColor: '#FFFBE6' },
  upiIcon: { width: 24, height: 24, marginRight: 10 },
  upiText: { fontSize: 14, fontWeight: '600', color: '#333' },
  subLabel: { fontSize: 13, fontWeight: '600', color: '#555', marginBottom: 10 },

  // Cash
  cashInfoBox: {
      flexDirection: 'row', alignItems: 'center', backgroundColor: '#F0FFF4', 
      padding: 15, borderRadius: 12, borderWidth: 1, borderColor: '#4CAF50'
  },
  cashInfoText: { marginLeft: 5, color: '#2E7D32', fontSize: 14, flex: 1, fontWeight: '600' },

  // Footer Section (Scrollable, Fixed Height to prevent clash)
  footerSection: {
      marginTop: 20,
      padding: 20,
      backgroundColor: '#FFF',
      borderRadius: 20,
      shadowColor: "#000", shadowOffset: { width: 0, height: -2 }, shadowOpacity: 0.05, shadowRadius: 5, elevation: 2
  },
  totalRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 },
  totalLabel: { fontSize: 14, color: '#666', fontWeight: '600' },
  totalValue: { fontSize: 24, fontWeight: 'bold', color: '#000' },
  payButton: {
      backgroundColor: '#FFDD32', paddingVertical: 16, borderRadius: 30,
      alignItems: 'center', elevation: 5, shadowColor: '#FFDD32', shadowOffset: {width:0, height:4}, shadowOpacity:0.3, shadowRadius:5
  },
  payButtonDisabled: { backgroundColor: '#E0E0E0', shadowOpacity: 0, elevation: 0 },
  payButtonText: { fontSize: 16, fontWeight: 'bold', color: '#000' },

  // Navigation
  bottomNavContainer: { position: 'absolute', bottom: 25, left: 0, right: 0, alignItems: 'center', justifyContent: 'center' },
  bottomNav: { flexDirection: 'row', backgroundColor: '#FFF', width: width * 0.9, borderRadius: 35, height: 70, alignItems: 'center', justifyContent: 'space-around', paddingHorizontal: 10, shadowColor: "#000", shadowOffset: { width: 0, height: 10 }, shadowOpacity: 0.15, shadowRadius: 20, elevation: 10 },
  navItem: { alignItems: 'center', justifyContent: 'center', padding: 10, borderRadius: 25 },
  navItemActive: { backgroundColor: '#FFDD32', flexDirection: 'row', paddingHorizontal: 15, paddingVertical: 10 },
  navIcon: { width: 24, height: 24, tintColor: '#CCC' },
  navText: { marginLeft: 8, fontWeight: 'bold', fontSize: 12, color: '#000' },
});
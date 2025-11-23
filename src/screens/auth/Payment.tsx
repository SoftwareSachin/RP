import React, { useState, useEffect } from "react";
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

// Enable Layout Animation for Android
if (Platform.OS === 'android') {
  if (UIManager.setLayoutAnimationEnabledExperimental) {
    UIManager.setLayoutAnimationEnabledExperimental(true);
  }
}

// Define the type for ASSETS object
type AssetsType = {
  [key: string]: string;
  chip: string;
  visa: string;
  mastercard: string;
  rupay: string;
  defaultCard: string;
  checkIcon: string;
  backIcon: string;
  lockIcon: string;
  cash: string;
  defaultUpi: string;
  gpay: string;
  phonepe: string;
  paytm: string;
  bhim: string;
};

// --- Professional Assets ---
const ASSETS: AssetsType = {
  chip: "https://img.icons8.com/fluency/96/sim-card-chip.png",
  visa: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/5e/Visa_Inc._logo.svg/2560px-Visa_Inc._logo.svg.png",
  mastercard: "https://upload.wikimedia.org/wikipedia/commons/thumb/2/2a/Mastercard-logo.svg/1280px-Mastercard-logo.svg.png",
  rupay: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/cb/Rupay-Logo.png/1200px-Rupay-Logo.png",
  defaultCard: "https://img.icons8.com/color/96/bank-cards.png",
  // UI Icons
  checkIcon: "https://img.icons8.com/emoji/48/check-mark-button-emoji.png",
  backIcon: "https://cdn-icons-png.flaticon.com/512/271/271220.png",
  lockIcon: "https://img.icons8.com/ios-filled/50/cccccc/lock.png",
  cash: "https://img.icons8.com/color/96/cash-in-hand.png",
  defaultUpi: "https://cdn-icons-png.flaticon.com/512/64/64572.png",
  // Payment Apps
  gpay: "https://storage.googleapis.com/tagjs-prod.appspot.com/v1/sE8iZvpPof/bz42qkhq_expires_30_days.png",
  phonepe: "https://storage.googleapis.com/tagjs-prod.appspot.com/v1/sE8iZvpPof/khbtubfe_expires_30_days.png",
  paytm: "https://storage.googleapis.com/tagjs-prod.appspot.com/v1/sE8iZvpPof/nwb1pbx8_expires_30_days.png",
  bhim: "https://storage.googleapis.com/tagjs-prod.appspot.com/v1/sE8iZvpPof/nhwb0jqx_expires_30_days.png",
};

const UPI_APPS = [
  { id: 'gpay', name: 'Google Pay', icon: ASSETS.gpay },
  { id: 'phonepe', name: 'PhonePe', icon: ASSETS.phonepe },
  { id: 'paytm', name: 'Paytm UPI', icon: ASSETS.paytm },
  { id: 'bhim', name: 'BHIM', icon: ASSETS.bhim },
];

export default (props: any) => {
  const [activeTab, setActiveTab] = useState("Payment");
  const [selectedMethod, setSelectedMethod] = useState("");
  
  // Manual UPI State
  const [upiId, setUpiId] = useState("");
  const [isVerifying, setIsVerifying] = useState(false);
  const [isUpiVerified, setIsUpiVerified] = useState(false);
  
  // Card State
  const [cardNumber, setCardNumber] = useState("");
  const [cardType, setCardType] = useState("defaultCard");
  const [expiry, setExpiry] = useState("");
  const [cvv, setCvv] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");

  // Checkboxes
  const [saveCard, setSaveCard] = useState(true);
  const [agreeTerms, setAgreeTerms] = useState(false);

  // --- 1. SELECTION HANDLER (Smooth Transitions) ---
  const handleMethodSelect = (method: string) => {
      LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
      setSelectedMethod(method);
  };

  // --- 2. CARD LOGIC ---
  const detectCardType = (number: string) => {
      const clean = number.replace(/\D/g, '');
      if (clean.startsWith("4")) return 'visa';
      if (/^5[1-5]/.test(clean) || /^2[2-7]/.test(clean)) return 'mastercard';
      if (/^60|^65|^81|^82|^508/.test(clean)) return 'rupay';
      return 'defaultCard';
  };

  const handleCardNumberChange = (text: string) => {
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

  // --- 3. UPI LOGIC ---
  const handleVerifyUpi = () => {
      if (!upiId.includes("@") || upiId.length < 5) {
          Alert.alert("Invalid ID", "Please enter a valid UPI ID (e.g. name@bank)");
          return;
      }
      setIsVerifying(true);
      setTimeout(() => {
          setIsVerifying(false);
          setIsUpiVerified(true);
          handleMethodSelect('manual_upi');
      }, 1500);
  };

  const handleChangeUpi = () => {
      setIsUpiVerified(false);
      setUpiId("");
      handleMethodSelect("");
  };

  // --- 4. PAY BUTTON LOGIC ---
  const handlePay = () => {
      if(!agreeTerms) {
          Alert.alert("Terms Required", "Please agree to the Terms & Conditions to proceed.");
          return;
      }

      if(selectedMethod === 'manual_upi' && !isUpiVerified) {
          Alert.alert("Verify UPI", "Please verify your UPI ID first.");
          return;
      }

      if((selectedMethod === 'debit_card' || selectedMethod === 'credit_card')) {
          if(cardNumber.length < 15 || expiry.length < 5 || cvv.length < 3) {
              Alert.alert("Invalid Details", "Please enter complete card details.");
              return;
          }
      }

      if(!selectedMethod) {
          Alert.alert("Select Method", "Please choose a payment method.");
          return;
      }

      // Success Simulation
      Alert.alert("Processing Payment", "Securely contacting payment gateway...", [
          { text: "OK", onPress: () => console.log("Payment Processed") }
      ]);
  };

  // Dynamic Button Text
  const getButtonText = () => {
      if (selectedMethod === 'cash') return "Confirm Cash Order";
      if (selectedMethod.includes('card')) return "Pay Securely";
      if (selectedMethod === 'manual_upi' && !isUpiVerified) return "Verify ID";
      if (selectedMethod && selectedMethod !== 'manual_upi') {
          const app = UPI_APPS.find(a => a.id === selectedMethod);
          return `Pay via ${app ? app.name : 'UPI'}`;
      }
      return "Pay Now";
  };

  const tabs = [
      { name: "Home", icon: "https://cdn-icons-png.flaticon.com/512/1946/1946436.png" },
      { name: "Lists", icon: "https://storage.googleapis.com/tagjs-prod.appspot.com/v1/kwi0sLffHL/np8e1cjb_expires_30_days.png" },
      { name: "Saved", icon: "https://storage.googleapis.com/tagjs-prod.appspot.com/v1/kwi0sLffHL/y6l2pvxu_expires_30_days.png" },
      { name: "Payment", icon: "https://storage.googleapis.com/tagjs-prod.appspot.com/v1/kwi0sLffHL/feksi6gx_expires_30_days.png" },
      { name: "Account", icon: "https://storage.googleapis.com/tagjs-prod.appspot.com/v1/kwi0sLffHL/ht8icv1v_expires_30_days.png" },
  ];

  // --- VIRTUAL CARD COMPONENT ---
  const VisualCard = () => (
      <View style={styles.virtualCard}>
          <View style={styles.cardHeader}>
              <Image source={{ uri: ASSETS.chip }} style={styles.cardChip} resizeMode="contain" />
              <Image source={{ uri: ASSETS[cardType] || ASSETS.defaultCard }} style={styles.cardBrandLogo} resizeMode="contain" />
          </View>
          <Text style={styles.cardNumPreview}>{cardNumber || "XXXX XXXX XXXX XXXX"}</Text>
          <View style={styles.cardFooter}>
              <View>
                  <Text style={styles.cardLabel}>HOLDER NAME</Text>
                  <Text style={styles.cardValue}>{name.toUpperCase() || "YOUR NAME"}</Text>
              </View>
              <View>
                  <Text style={styles.cardLabel}>EXPIRES</Text>
                  <Text style={styles.cardValue}>{expiry || "MM/YY"}</Text>
              </View>
          </View>
      </View>
  );

  return (
    <>
    <SafeAreaView style={{ flex: 0, backgroundColor: "#FFDD32" }} />
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFDD32" />
      
      <KeyboardAvoidingView style={{ flex: 1 }} behavior={Platform.OS === "ios" ? "padding" : undefined}>
        <View style={{ flex: 1 }}>
            <ScrollView style={styles.scrollView} contentContainerStyle={{ paddingBottom: 120 }} keyboardShouldPersistTaps="handled">
                
                <View style={styles.yellowHeader} />
                <View style={styles.headerRow}><View style={{flex: 1}} /></View>

                <View style={styles.titleRow}>
                    <TouchableOpacity onPress={() => Alert.alert("Back")}>
                        <Image source={{ uri: ASSETS.backIcon }} resizeMode={"contain"} style={styles.backIcon} />
                    </TouchableOpacity>
                    <Text style={styles.pageTitle}>Checkout</Text>
                </View>

                <View style={styles.contentContainer}>
                    
                    {/* 1. UPI APPS */}
                    <Text style={styles.sectionHeader}>UPI Apps</Text>
                    {UPI_APPS.map((app) => (
                        <TouchableOpacity 
                            key={app.id}
                            style={[styles.paymentRow, selectedMethod === app.id && styles.paymentRowActive]} 
                            onPress={() => handleMethodSelect(app.id)}
                        >
                            <View style={styles.paymentLeft}>
                                <Image source={{ uri: app.icon }} resizeMode={"contain"} style={styles.paymentIcon}/>
                                <Text style={styles.paymentText}>{app.name}</Text>
                            </View>
                            <View style={[styles.radioOuter, selectedMethod === app.id && styles.radioActive]}>
                                {selectedMethod === app.id && <View style={styles.radioInner} />}
                            </View>
                        </TouchableOpacity>
                    ))}

                    {/* 2. MANUAL UPI */}
                    <Text style={[styles.sectionHeader, {marginTop: 20}]}>UPI ID / VPA</Text>
                    {!isUpiVerified ? (
                        <View style={styles.manualRow}>
                            <View style={styles.manualInputContainer}>
                                <Image source={{ uri: ASSETS.defaultUpi }} style={styles.inputIcon} resizeMode="contain" />
                                <TextInput 
                                    placeholder="e.g. name@okhdfcbank"
                                    style={styles.inputField}
                                    value={upiId}
                                    onChangeText={(text) => { setUpiId(text); handleMethodSelect('manual_upi'); }}
                                    autoCapitalize="none"
                                    keyboardType="email-address"
                                />
                            </View>
                            <TouchableOpacity 
                                style={styles.verifyBtn} 
                                onPress={handleVerifyUpi}
                                disabled={isVerifying}
                            >
                                {isVerifying ? <ActivityIndicator size="small" color="#000" /> : <Text style={styles.verifyText}>Verify</Text>}
                            </TouchableOpacity>
                        </View>
                    ) : (
                        <View style={[styles.verifiedRow, selectedMethod === 'manual_upi' && styles.paymentRowActive]}>
                            <View style={{flexDirection: 'row', alignItems: 'center', flex: 1}}>
                                <Image source={{ uri: ASSETS.checkIcon }} style={styles.checkIcon} />
                                <View style={{marginLeft: 10}}>
                                    <Text style={styles.verifiedText}>{upiId}</Text>
                                    <Text style={styles.subText}>Verified ID</Text>
                                </View>
                            </View>
                            <TouchableOpacity onPress={handleChangeUpi}><Text style={styles.changeText}>Change</Text></TouchableOpacity>
                        </View>
                    )}

                    {/* 3. CARDS */}
                    <Text style={[styles.sectionHeader, {marginTop: 20}]}>Credit & Debit Cards</Text>

                    {/* Debit Card Selector */}
                    <TouchableOpacity 
                        style={[styles.paymentRow, selectedMethod === 'debit_card' && styles.paymentRowActive]} 
                        onPress={() => handleMethodSelect('debit_card')}
                    >
                        <View style={styles.paymentLeft}>
                            <Image source={{ uri: ASSETS.defaultCard }} resizeMode={"contain"} style={styles.paymentIcon}/>
                            <View style={{flex: 1, paddingRight: 10}}>
                                <Text style={styles.paymentText}>Debit Card (Rupay / Visa / MasterCard)</Text>
                            </View>
                        </View>
                        <View style={[styles.radioOuter, selectedMethod === 'debit_card' && styles.radioActive]}>
                            {selectedMethod === 'debit_card' && <View style={styles.radioInner} />}
                        </View>
                    </TouchableOpacity>

                    {/* Credit Card Selector */}
                    <TouchableOpacity 
                        style={[styles.paymentRow, selectedMethod === 'credit_card' && styles.paymentRowActive, {marginBottom: 5}]} 
                        onPress={() => handleMethodSelect('credit_card')}
                    >
                        <View style={styles.paymentLeft}>
                            <Image source={{ uri: ASSETS.mastercard }} resizeMode={"contain"} style={styles.paymentIcon}/>
                            <Text style={styles.paymentText}>Credit Card</Text>
                        </View>
                        <View style={[styles.radioOuter, selectedMethod === 'credit_card' && styles.radioActive]}>
                            {selectedMethod === 'credit_card' && <View style={styles.radioInner} />}
                        </View>
                    </TouchableOpacity>

                    {/* --- DYNAMIC CARD FORM --- */}
                    {(selectedMethod === 'debit_card' || selectedMethod === 'credit_card') && (
                        <View style={styles.cardFormWrapper}>
                            
                            <VisualCard />

                            <Text style={styles.label}>Card Number</Text>
                            <View style={styles.inputContainer}>
                                <TextInput 
                                    placeholder="0000 0000 0000 0000"
                                    style={styles.inputField}
                                    keyboardType="numeric"
                                    value={cardNumber}
                                    onChangeText={handleCardNumberChange}
                                    maxLength={19}
                                />
                                <Image source={{ uri: cardType in ASSETS ? ASSETS[cardType] : ASSETS.defaultCard }} style={{width: 35, height: 25}} resizeMode="contain" />
                            </View>

                            <Text style={styles.label}>Card Holder Name</Text>
                            <View style={styles.inputContainer}>
                                <TextInput 
                                    placeholder="Name on card"
                                    style={styles.inputField}
                                    value={name}
                                    onChangeText={setName}
                                />
                            </View>

                            <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                                <View style={{width: '48%'}}>
                                    <Text style={styles.label}>Expiry</Text>
                                    <View style={styles.inputContainer}>
                                        <TextInput 
                                            placeholder="MM/YY"
                                            style={styles.inputField}
                                            keyboardType="numeric"
                                            maxLength={5}
                                            value={expiry}
                                            onChangeText={handleExpiryChange}
                                        />
                                    </View>
                                </View>
                                <View style={{width: '48%'}}>
                                    <Text style={styles.label}>CVV</Text>
                                    <View style={styles.inputContainer}>
                                        <TextInput 
                                            placeholder="123"
                                            style={styles.inputField}
                                            keyboardType="numeric"
                                            maxLength={3}
                                            secureTextEntry
                                            value={cvv}
                                            onChangeText={setCvv}
                                        />
                                        <Image source={{uri: ASSETS.lockIcon}} style={{width: 16, height: 16, opacity: 0.5}} />
                                    </View>
                                </View>
                            </View>

                            <Text style={styles.label}>Phone (Optional)</Text>
                            <View style={styles.inputContainer}>
                                <TextInput 
                                    placeholder="Mobile Number"
                                    style={styles.inputField}
                                    keyboardType="phone-pad"
                                    value={phone}
                                    onChangeText={setPhone}
                                />
                            </View>

                            <TouchableOpacity style={styles.checkboxRow} onPress={() => setSaveCard(!saveCard)}>
                                <View style={[styles.checkboxBase, saveCard && styles.checkboxChecked]}>
                                    {saveCard && <Image source={{uri: ASSETS.checkIcon}} style={styles.checkIconImg} />}
                                </View>
                                <Text style={styles.checkboxText}>Securely save card for future payments</Text>
                            </TouchableOpacity>
                        </View>
                    )}

                    {/* 4. CASH */}
                    <Text style={[styles.sectionHeader, {marginTop: 20}]}>More Options</Text>
                    <TouchableOpacity 
                        style={[styles.paymentRow, selectedMethod === 'cash' && styles.paymentRowActive]} 
                        onPress={() => handleMethodSelect('cash')}
                    >
                        <View style={styles.paymentLeft}>
                            <Image source={{ uri: ASSETS.cash }} resizeMode={"contain"} style={styles.paymentIcon}/>
                            <Text style={styles.paymentText}>Pay via Cash</Text>
                        </View>
                        <View style={[styles.radioOuter, selectedMethod === 'cash' && styles.radioActive]}>
                            {selectedMethod === 'cash' && <View style={styles.radioInner} />}
                        </View>
                    </TouchableOpacity>

                    {/* TERMS AGREEMENT */}
                    <TouchableOpacity style={[styles.checkboxRow, {marginTop: 20, marginBottom: 10}]} onPress={() => setAgreeTerms(!agreeTerms)}>
                        <View style={[styles.checkboxBase, agreeTerms && styles.checkboxChecked]}>
                            {agreeTerms && <Image source={{uri: ASSETS.checkIcon}} style={styles.checkIconImg} />}
                        </View>
                        <Text style={styles.checkboxText}>I agree to the Terms & Conditions and Privacy Policy</Text>
                    </TouchableOpacity>

                </View>

                {/* DYNAMIC ACTION BUTTON */}
                <TouchableOpacity 
                    style={[styles.payButton, !agreeTerms && {opacity: 0.6}]} 
                    onPress={handlePay}
                    disabled={false}
                >
                    <Text style={styles.payButtonText}>{getButtonText()}</Text>
                </TouchableOpacity>

            </ScrollView>
        </View>

        {/* Sticky Bottom Navigation */}
        <View style={styles.bottomNav}>
            {tabs.map((tab, index) => {
                const isActive = activeTab === tab.name;
                return (
                    <TouchableOpacity 
                        key={index} 
                        style={styles.navItem} 
                        onPress={() => setActiveTab(tab.name)}
                        activeOpacity={0.8}
                    >
                        <Image 
                            source={{ uri: tab.icon }} 
                            style={{ width: 24, height: 24, marginBottom: 4, opacity: isActive ? 1 : 0.6, tintColor: '#FFF' }} 
                            resizeMode="contain" 
                        />
                        <Text style={{ color: "#FFFFFF", fontSize: 12, fontWeight: isActive ? "bold" : "normal" }}>{tab.name}</Text>
                        {isActive && <View style={{width: 4, height: 4, backgroundColor: '#fff', borderRadius: 2, marginTop: 2}} />}
                    </TouchableOpacity>
                )
            })}
        </View>

      </KeyboardAvoidingView>
    </SafeAreaView>
    </>
  );
}

const { width } = Dimensions.get('window');

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#F8F9FA" },
  scrollView: { flex: 1 },
  yellowHeader: { width: '100%', height: 20, backgroundColor: '#FFDD32', marginBottom: 10 },
  headerRow: { paddingHorizontal: 16, flexDirection: 'row', marginBottom: 5 },
  titleRow: { flexDirection: 'row', alignItems: 'center', paddingHorizontal: 16, marginBottom: 25 },
  backIcon: { width: 24, height: 24, marginRight: 15 },
  pageTitle: { fontSize: 22, fontWeight: "bold", color: "#000" },
  contentContainer: { paddingHorizontal: 20 },
  sectionHeader: { fontSize: 15, fontWeight: '700', color: '#555', marginBottom: 12, marginTop: 10, textTransform: 'uppercase' },

  // Rows
  paymentRow: {
      flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12, 
      borderWidth: 1, borderColor: '#E0E0E0', borderRadius: 12, padding: 16, backgroundColor: '#fff',
      elevation: 1, shadowColor: '#000', shadowOpacity: 0.05, shadowRadius: 2, shadowOffset: {width: 0, height: 1}
  },
  paymentRowActive: { borderColor: '#FFDD32', backgroundColor: '#FFFBE6', borderWidth: 1.5 },
  paymentLeft: { flexDirection: 'row', alignItems: 'center', flex: 1 },
  paymentIcon: { width: 32, height: 32, marginRight: 15 },
  paymentText: { fontSize: 16, fontWeight: '600', color: '#333', flexShrink: 1 },
  
  radioOuter: { width: 22, height: 22, borderRadius: 11, borderWidth: 2, borderColor: '#DDD', justifyContent: 'center', alignItems: 'center' },
  radioActive: { borderColor: '#FFDD32' },
  radioInner: { width: 12, height: 12, borderRadius: 6, backgroundColor: '#FFDD32' },

  // Manual Input
  manualRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 },
  manualInputContainer: {
      flex: 1, flexDirection: 'row', alignItems: 'center', backgroundColor: '#fff', marginRight: 10,
      borderWidth: 1, borderColor: '#D1D1D1', borderRadius: 8, paddingHorizontal: 12, height: 50
  },
  inputField: { flex: 1, fontSize: 16, color: '#000', paddingVertical: 5 },
  inputIcon: { width: 24, height: 24, marginRight: 10, opacity: 0.6 },
  verifyBtn: { backgroundColor: '#FFDD32', paddingVertical: 12, paddingHorizontal: 20, borderRadius: 8, height: 50, justifyContent: 'center' },
  verifyText: { fontWeight: 'bold', fontSize: 14, color: '#000' },

  // Verified State
  verifiedRow: {
      flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between',
      padding: 16, backgroundColor: '#F0FFF4', borderRadius: 12, marginBottom: 20,
      borderWidth: 1, borderColor: '#4CAF50'
  },
  checkIcon: { width: 24, height: 24 },
  verifiedText: { fontSize: 16, fontWeight: 'bold', color: '#000' },
  subText: { fontSize: 12, color: '#388E3C' },
  changeText: { fontSize: 13, color: '#D32F2F', fontWeight: 'bold' },

  // Card Form
  cardFormWrapper: { marginTop: 10, marginBottom: 20 },
  inputContainer: {
      flexDirection: 'row', alignItems: 'center', backgroundColor: '#FFF',
      borderWidth: 1, borderColor: '#D1D1D1', borderRadius: 8,
      paddingHorizontal: 12, height: 50, marginBottom: 15
  },
  label: { fontSize: 12, fontWeight: 'bold', color: '#555', marginBottom: 6, marginLeft: 2 },

  // Virtual Card
  virtualCard: {
      backgroundColor: '#262626',
      borderRadius: 16,
      padding: 24,
      marginBottom: 25,
      height: 220,
      justifyContent: 'space-between',
      shadowColor: "#000", shadowOffset: { width: 0, height: 8 }, shadowOpacity: 0.4, shadowRadius: 10, elevation: 8,
  },
  cardHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  cardChip: { width: 45, height: 35 },
  cardBrandLogo: { width: 60, height: 40 },
  cardNumPreview: { color: '#FFF', fontSize: 22, letterSpacing: 3, fontFamily: Platform.OS === 'ios' ? 'Courier' : 'monospace', textAlign: 'center' },
  cardFooter: { flexDirection: 'row', justifyContent: 'space-between' },
  cardLabel: { color: '#AAA', fontSize: 10, marginBottom: 4, letterSpacing: 1 },
  cardValue: { color: '#FFF', fontSize: 16, fontWeight: 'bold', letterSpacing: 1 },

  // Checkbox
  checkboxRow: { flexDirection: 'row', alignItems: 'center', marginTop: 5 },
  checkboxBase: { width: 22, height: 22, borderWidth: 2, borderColor: '#999', borderRadius: 4, justifyContent: 'center', alignItems: 'center', marginRight: 10, backgroundColor: '#FFF' },
  checkboxChecked: { backgroundColor: '#FFDD32', borderColor: '#FFDD32' },
  checkIconImg: { width: 14, height: 14, tintColor: '#000' },
  checkboxText: { fontSize: 13, color: '#555', flex: 1, lineHeight: 20 },

  // Pay Button
  payButton: {
      backgroundColor: '#FFDD32', marginHorizontal: 20, height: 56, borderRadius: 28,
      justifyContent: 'center', alignItems: 'center', marginTop: 20, marginBottom: 20,
      elevation: 4, shadowColor: '#000', shadowOpacity: 0.2
  },
  payButtonText: { fontSize: 18, fontWeight: "bold", color: "#000", textTransform: 'uppercase' },

  // Nav
  bottomNav: {
    position: 'absolute', bottom: 0, left: 0, width: width, backgroundColor: "#FFDD32",
    borderTopLeftRadius: 24, borderTopRightRadius: 24, flexDirection: "row", paddingHorizontal: 10,
    paddingVertical: 12, alignItems: "center", justifyContent: "space-between",
    shadowColor: "#000", shadowOffset: { width: 0, height: -2 }, shadowOpacity: 0.1, shadowRadius: 4, elevation: 5,
    paddingBottom: Platform.OS === 'ios' ? 20 : 12 
  },
  navItem: { flex: 1, alignItems: "center", justifyContent: 'center', height: 50 },
});
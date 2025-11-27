import React, { useState } from "react";
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
  Alert,
  Switch
} from "react-native";
import { useNavigation } from "@react-navigation/native";

const { width } = Dimensions.get('window');

// --- ASSETS ---
const ASSETS = {
    back: "https://cdn-icons-png.flaticon.com/512/271/271220.png",
    propertyImage: "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?q=80&w=800&auto=format&fit=crop",
    
    // Icons
    home: "https://cdn-icons-png.flaticon.com/512/609/609803.png",
    calendar: "https://cdn-icons-png.flaticon.com/512/2370/2370264.png",
    user: "https://cdn-icons-png.flaticon.com/512/1077/1077114.png",
    info: "https://cdn-icons-png.flaticon.com/512/665/665049.png",
    
    // Nav Icons
    navHome: "https://cdn-icons-png.flaticon.com/512/1946/1946436.png",
    navList: "https://cdn-icons-png.flaticon.com/512/2910/2910791.png",
    navSaved: "https://cdn-icons-png.flaticon.com/512/1077/1077035.png",
    navPay: "https://cdn-icons-png.flaticon.com/512/272/272525.png",
    navUser: "https://cdn-icons-png.flaticon.com/512/1077/1077114.png",
};

export default function MonthlyRent() {
  const navigation = useNavigation();
  const [isAutoPayEnabled, setIsAutoPayEnabled] = useState(false);
  const [activeTab, setActiveTab] = useState("Payment");

  const handlePay = () => {
      // @ts-ignore - Payment is registered in AuthNavigator
      navigation.navigate('Payment');
  };

  const handleNav = (route: string) => {
      try {
        // @ts-ignore
        navigation.navigate(route);
      } catch (e) {
        console.warn("Navigation not available or route missing");
      }
  }

  const tabs = [
      { name: "Home", icon: ASSETS.navHome, route: "HomeRent" },
      { name: "Lists", icon: ASSETS.navList, route: "ListProperty" },
      { name: "Saved", icon: ASSETS.navSaved, route: "Saved" },
      { name: "Payment", icon: ASSETS.navPay, route: "MonthlyRent" },
      { name: "Account", icon: ASSETS.navUser, route: "Account" },
  ];

  return (
    <View style={styles.mainContainer}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFDD32" translucent />
      
      {/* Header Background */}
      <View style={styles.yellowBackground} />

      <SafeAreaView style={styles.safeArea}>
        
        {/* Header */}
        <View style={styles.header}>
            <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
                <Image source={{ uri: ASSETS.back }} style={styles.backIcon} />
            </TouchableOpacity>
            <Text style={styles.headerTitle}>Pay Rent</Text>
            <View style={{width: 24}} /> 
        </View>

        <ScrollView 
            contentContainerStyle={styles.scrollContent} 
            showsVerticalScrollIndicator={false}
        >

            {/* --- PROPERTY SUMMARY CARD --- */}
            <View style={styles.propertyCard}>
                <View style={styles.cardHeader}>
                    <Image source={{ uri: ASSETS.propertyImage }} style={styles.propImage} />
                    <View style={styles.propInfo}>
                        <Text style={styles.propName}>Green View Residency</Text>
                        <Text style={styles.propLoc}>Malviya Nagar, Jaipur</Text>
                        <View style={styles.tagRow}>
                            <View style={styles.tag}><Text style={styles.tagText}>2 BHK</Text></View>
                            <View style={styles.tag}><Text style={styles.tagText}>Flat</Text></View>
                        </View>
                    </View>
                </View>
                
                <View style={styles.divider} />
                
                <View style={styles.metaRow}>
                    <View style={styles.metaItem}>
                        <Image source={{ uri: ASSETS.user }} style={styles.metaIcon} />
                        <Text style={styles.metaText}>Owner: Rahul Sharma</Text>
                    </View>
                    <View style={styles.metaItem}>
                        <Image source={{ uri: ASSETS.calendar }} style={styles.metaIcon} />
                        <Text style={styles.metaText}>Cycle: 1st - 30th</Text>
                    </View>
                </View>
            </View>

            {/* --- PAYMENT BREAKDOWN --- */}
            <Text style={styles.sectionTitle}>Payment Overview</Text>
            <View style={styles.breakdownCard}>
                <View style={styles.row}>
                    <Text style={styles.label}>Monthly Rent</Text>
                    <Text style={styles.value}>₹12,000</Text>
                </View>
                <View style={styles.row}>
                    <Text style={styles.label}>Add-on Services</Text>
                    <Text style={styles.value}>₹3,000</Text>
                </View>
                <View style={styles.row}>
                    <Text style={styles.label}>Previous Dues</Text>
                    <Text style={[styles.value, {color: '#D32F2F'}]}>₹4,000</Text>
                </View>
                <View style={styles.row}>
                    <Text style={styles.label}>Platform Fee</Text>
                    <Text style={styles.value}>₹100</Text>
                </View>
                
                <View style={styles.dashedDivider} />
                
                <View style={styles.totalRow}>
                    <Text style={styles.totalLabel}>Total Due</Text>
                    <Text style={styles.totalValue}>₹19,100</Text>
                </View>
            </View>

            {/* --- DUE DATE & PENALTY --- */}
            <View style={styles.dueCard}>
                <View style={styles.dueHeader}>
                    <View style={styles.calendarIconBox}>
                        <Image source={{ uri: ASSETS.calendar }} style={styles.calIcon} />
                    </View>
                    <View>
                        <Text style={styles.dueTitle}>Due Date</Text>
                        <Text style={styles.dueDate}>5 November 2025</Text>
                    </View>
                </View>
                <View style={styles.warningBox}>
                    <Image source={{ uri: ASSETS.info }} style={styles.infoIcon} />
                    <Text style={styles.warningText}>Late fee of ₹200 applies after 8th Nov.</Text>
                </View>
            </View>

            {/* --- AUTOPAY --- */}
            <View style={styles.autoPayCard}>
                <View style={{flex: 1}}>
                    <Text style={styles.autoTitle}>Enable AutoPay</Text>
                    <Text style={styles.autoSub}>Automatically pay rent on due date.</Text>
                </View>
                <Switch
                    trackColor={{ false: "#E0E0E0", true: "#FFDD32" }}
                    thumbColor={isAutoPayEnabled ? "#FFFFFF" : "#F4F3F4"}
                    onValueChange={() => setIsAutoPayEnabled(!isAutoPayEnabled)}
                    value={isAutoPayEnabled}
                />
            </View>

        </ScrollView>

        {/* --- BOTTOM ACTION BAR --- */}
        <View style={styles.bottomBar}>
            <View>
                <Text style={styles.footerLabel}>Total Payable</Text>
                <Text style={styles.footerPrice}>₹19,100</Text>
            </View>
            <TouchableOpacity style={styles.payBtn} onPress={handlePay}>
                <Text style={styles.payText}>Pay Now</Text>
            </TouchableOpacity>
        </View>

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
  
  yellowBackground: { 
      position: 'absolute', top: 0, left: 0, right: 0, height: 280, 
      backgroundColor: '#FFDD32', 
      borderBottomLeftRadius: 30, 
      borderBottomRightRadius: 30 
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

  scrollContent: { paddingHorizontal: 20, paddingBottom: 160 },

  // Property Card
  propertyCard: {
      backgroundColor: '#FFF', borderRadius: 20, padding: 15, marginBottom: 25,
      shadowColor: "#000", shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.1, shadowRadius: 10, elevation: 5
  },
  cardHeader: { flexDirection: 'row', alignItems: 'center' },
  propImage: { width: 80, height: 80, borderRadius: 12, marginRight: 15 },
  propInfo: { flex: 1 },
  propName: { fontSize: 18, fontWeight: 'bold', color: '#000', marginBottom: 4 },
  propLoc: { fontSize: 13, color: '#666', marginBottom: 8 },
  tagRow: { flexDirection: 'row', gap: 8 },
  tag: { backgroundColor: '#F5F5F5', paddingHorizontal: 10, paddingVertical: 4, borderRadius: 6 },
  tagText: { fontSize: 11, color: '#555', fontWeight: '600' },
  divider: { height: 1, backgroundColor: '#F0F0F0', marginVertical: 15 },
  metaRow: { flexDirection: 'row', justifyContent: 'space-between' },
  metaItem: { flexDirection: 'row', alignItems: 'center' },
  metaIcon: { width: 14, height: 14, tintColor: '#888', marginRight: 6 },
  metaText: { fontSize: 12, color: '#666' },

  sectionTitle: { fontSize: 18, fontWeight: 'bold', color: '#000', marginBottom: 15 },

  // Breakdown
  breakdownCard: {
      backgroundColor: '#FFF', borderRadius: 20, padding: 20, marginBottom: 20,
      shadowColor: "#000", shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.05, shadowRadius: 5, elevation: 2
  },
  row: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 12 },
  label: { fontSize: 14, color: '#666', fontWeight: '500' },
  value: { fontSize: 15, fontWeight: 'bold', color: '#333' },
  dashedDivider: { height: 1, borderWidth: 1, borderColor: '#DDD', borderStyle: 'dashed', marginVertical: 15, borderRadius: 1 },
  totalRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  totalLabel: { fontSize: 16, fontWeight: 'bold', color: '#000' },
  totalValue: { fontSize: 20, fontWeight: 'bold', color: '#000' },

  // Due Date
  dueCard: {
      backgroundColor: '#FFF', borderRadius: 20, padding: 15, marginBottom: 20,
      borderWidth: 1, borderColor: '#FFE0B2'
  },
  dueHeader: { flexDirection: 'row', alignItems: 'center', marginBottom: 15 },
  calendarIconBox: { width: 40, height: 40, backgroundColor: '#FFF3E0', borderRadius: 10, justifyContent: 'center', alignItems: 'center', marginRight: 15 },
  calIcon: { width: 20, height: 20, tintColor: '#F57C00' },
  dueTitle: { fontSize: 12, color: '#888', textTransform: 'uppercase', fontWeight: '600' },
  dueDate: { fontSize: 16, fontWeight: 'bold', color: '#000' },
  warningBox: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#FFEBEE', padding: 10, borderRadius: 10 },
  infoIcon: { width: 14, height: 14, tintColor: '#D32F2F', marginRight: 8 },
  warningText: { fontSize: 12, color: '#D32F2F', fontWeight: '600', flex: 1 },

  // AutoPay
  autoPayCard: {
      flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center',
      backgroundColor: '#FFF', borderRadius: 20, padding: 20, marginBottom: 20,
      shadowColor: "#000", shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.05, shadowRadius: 5, elevation: 2
  },
  autoTitle: { fontSize: 16, fontWeight: 'bold', color: '#000', marginBottom: 4 },
  autoSub: { fontSize: 12, color: '#888' },

  // Bottom Action Bar
  bottomBar: {
      position: 'absolute', bottom: 100, left: 20, right: 20,
      backgroundColor: '#FFF', padding: 15, borderRadius: 25,
      flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center',
      shadowColor: "#000", shadowOffset: { width: 0, height: 5 }, shadowOpacity: 0.2, shadowRadius: 10, elevation: 10
  },
  footerLabel: { fontSize: 12, color: '#888' },
  footerPrice: { fontSize: 20, fontWeight: 'bold', color: '#000' },
  payBtn: { backgroundColor: '#FFDD32', paddingVertical: 12, paddingHorizontal: 30, borderRadius: 20 },
  payText: { fontSize: 16, fontWeight: 'bold', color: '#000' },

  // Nav
  bottomNavContainer: { position: 'absolute', bottom: 25, left: 0, right: 0, alignItems: 'center', justifyContent: 'center' },
  bottomNav: { flexDirection: 'row', backgroundColor: '#FFF', width: width * 0.9, borderRadius: 35, height: 70, alignItems: 'center', justifyContent: 'space-around', paddingHorizontal: 10, shadowColor: "#000", shadowOffset: { width: 0, height: 10 }, shadowOpacity: 0.15, shadowRadius: 20, elevation: 10 },
  navItem: { alignItems: 'center', justifyContent: 'center', padding: 10, borderRadius: 25 },
  navItemActive: { backgroundColor: '#FFDD32', flexDirection: 'row', paddingHorizontal: 15, paddingVertical: 10 },
  navIcon: { width: 24, height: 24, tintColor: '#CCC' },
  navText: { marginLeft: 8, fontWeight: 'bold', fontSize: 12, color: '#000' },
});
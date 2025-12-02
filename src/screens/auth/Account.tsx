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
  Platform,
  Alert,
  Clipboard
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useAuthContext } from "../../context/AuthContext";

const { width } = Dimensions.get('window');

// --- ASSETS ---
const ASSETS = {
    // User
    avatar: "https://images.unsplash.com/photo-1633332755192-727a05c4013d?q=80&w=250&auto=format&fit=crop",
    edit: "https://cdn-icons-png.flaticon.com/512/1159/1159633.png",
    
    // Icons
    property: "https://cdn-icons-png.flaticon.com/512/609/609803.png",
    police: "https://cdn-icons-png.flaticon.com/512/921/921540.png",
    history: "https://cdn-icons-png.flaticon.com/512/2961/2961948.png",
    document: "https://cdn-icons-png.flaticon.com/512/2991/2991112.png",
    gift: "https://cdn-icons-png.flaticon.com/512/4213/4213958.png",
    copy: "https://cdn-icons-png.flaticon.com/512/1621/1621635.png",
    settings: "https://cdn-icons-png.flaticon.com/512/3524/3524659.png",
    info: "https://cdn-icons-png.flaticon.com/512/665/665049.png",
    arrowRight: "https://cdn-icons-png.flaticon.com/512/271/271228.png",
    back: "https://cdn-icons-png.flaticon.com/512/271/271220.png",
    logout: "https://cdn-icons-png.flaticon.com/512/1828/1828479.png", // New Logout Icon

    // Nav Icons
    home: "https://cdn-icons-png.flaticon.com/512/1946/1946436.png",
    list: "https://cdn-icons-png.flaticon.com/512/2910/2910791.png",
    heartNav: "https://cdn-icons-png.flaticon.com/512/1077/1077035.png",
    pay: "https://cdn-icons-png.flaticon.com/512/272/272525.png",
    userNav: "https://cdn-icons-png.flaticon.com/512/1077/1077114.png",
};

export default function Account() {
  const navigation = useNavigation();
  const { user, logout } = useAuthContext();
  const [activeTab, setActiveTab] = useState("Account");
  const [referralCode] = useState("RM2025");

  const handleCopy = () => {
      Clipboard.setString(referralCode);
      Alert.alert("Copied!", "Referral code copied to clipboard.");
  };

  const handleLogout = () => {
    Alert.alert(
      "Log Out",
      "Are you sure you want to log out of your account?",
      [
        { text: "Cancel", style: "cancel" },
        { 
          text: "Log Out", 
          style: 'destructive',
          onPress: () => {
            logout();
          } 
        }
      ]
    );
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
      { name: "Home", icon: ASSETS.home, route: "HomeRent" },
      { name: "Lists", icon: ASSETS.list, route: "ListProperty" },
      { name: "Saved", icon: ASSETS.heartNav, route: "Saved" },
      { name: "Payment", icon: ASSETS.pay, route: "Payment" },
      { name: "Account", icon: ASSETS.userNav, route: "Account" },
  ];

  return (
    <View style={styles.mainContainer}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFDD32" translucent />
      
      {/* Yellow Header Background */}
      <View style={styles.yellowBackground} />

      <SafeAreaView style={styles.safeArea}>
          
          {/* Header */}
          <View style={styles.header}>
              <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
                  <Image source={{ uri: ASSETS.back }} style={styles.backIcon} />
              </TouchableOpacity>
              <Text style={styles.headerTitle}>My Account</Text>
              <TouchableOpacity
                  onPress={() => {
                      // @ts-ignore - route registered in AuthNavigator
                      navigation.navigate('Settings');
                  }}
                  style={styles.editBtn}
              >
                  <Image source={{ uri: ASSETS.edit }} style={styles.editIcon} />
              </TouchableOpacity>
          </View>

          <ScrollView 
            contentContainerStyle={styles.scrollContent} 
            showsVerticalScrollIndicator={false}
          >
              
              {/* Profile Card */}
              <View style={styles.profileCard}>
                  <Image source={{ uri: ASSETS.avatar }} style={styles.avatar} />
                  <View style={styles.profileInfo}>
                      <Text style={styles.userName}>{user?.name || user?.email || "Guest User"}</Text>
                      <Text style={styles.userRole}>{user ? "Verified User" : "Guest User"}</Text>
                      <Text style={styles.userPhone}>{user?.phone || user?.email || "No phone"}</Text>
                  </View>
              </View>

              {/* Quick Actions Grid */}
              <View style={styles.gridContainer}>
                  <TouchableOpacity style={styles.gridItem} onPress={() => {
                      // @ts-ignore - route registered in AuthNavigator
                      navigation.navigate('OccupiedProperty');
                  }}>
                      <View style={[styles.iconBg, {backgroundColor: '#E3F2FD'}]}>
                          <Image source={{ uri: ASSETS.property }} style={[styles.gridIcon, {tintColor: '#1976D2'}]} />
                      </View>
                      <Text style={styles.gridText}>Occupied Property</Text>
                  </TouchableOpacity>

                  <TouchableOpacity
                      style={styles.gridItem}
                      onPress={() => {
                          // @ts-ignore - route registered in AuthNavigator
                          navigation.navigate('PoliceVerification');
                      }}
                  >
                      <View style={[styles.iconBg, {backgroundColor: '#E8F5E9'}]}>
                          <Image source={{ uri: ASSETS.police }} style={[styles.gridIcon, {tintColor: '#388E3C'}]} />
                      </View>
                      <Text style={styles.gridText}>Police Verification</Text>
                  </TouchableOpacity>
              </View>

              {/* Menu Items */}
              <View style={styles.menuContainer}>
                  
                  {/* Payment History */}
                  <TouchableOpacity
                      style={styles.menuItem}
                      onPress={() => {
                          // @ts-ignore - route registered in AuthNavigator
                          navigation.navigate('PaymentHistory');
                      }}
                  >
                      <View style={styles.menuIconBox}><Image source={{ uri: ASSETS.history }} style={styles.menuIcon} /></View>
                      <View style={styles.menuTextContainer}>
                          <Text style={styles.menuTitle}>Payment History</Text>
                          <Text style={styles.menuSub}>View invoices and past transactions</Text>
                      </View>
                      <Image source={{ uri: ASSETS.arrowRight }} style={styles.chevron} />
                  </TouchableOpacity>

                  {/* Rent Agreement */}
                  <TouchableOpacity style={styles.menuItem} onPress={() => Alert.alert("Agreement")}>
                      <View style={styles.menuIconBox}><Image source={{ uri: ASSETS.document }} style={styles.menuIcon} /></View>
                      <View style={styles.menuTextContainer}>
                          <Text style={styles.menuTitle}>Rent Agreement</Text>
                          <TouchableOpacity style={styles.smallBtn} onPress={() => Alert.alert("PDF", "Downloading PDF...")}>
                              <Text style={styles.smallBtnText}>View PDF</Text>
                          </TouchableOpacity>
                      </View>
                  </TouchableOpacity>

              </View>

              {/* Refer & Earn */}
              <View style={styles.referContainer}>
                  <View style={styles.referHeader}>
                      <Image source={{ uri: ASSETS.gift }} style={styles.referIcon} />
                      <Text style={styles.referTitle}>Refer & Earn</Text>
                  </View>
                  <Text style={styles.referDesc}>Refer your friends and earn ₹100 when they rent a property.</Text>
                  
                  <View style={styles.codeContainer}>
                      <Text style={styles.codeLabel}>Your Code:</Text>
                      <View style={styles.codeBox}>
                          <Text style={styles.codeText}>{referralCode}</Text>
                          <TouchableOpacity onPress={handleCopy}>
                              <Image source={{ uri: ASSETS.copy }} style={styles.copyIcon} />
                          </TouchableOpacity>
                      </View>
                  </View>

                  <TouchableOpacity style={styles.inviteBtn} onPress={() => Alert.alert("Invite", "Sharing Link...")}>
                      <Text style={styles.inviteText}>Invite Now</Text>
                  </TouchableOpacity>
              </View>

              {/* Settings & Legal */}
              <View style={styles.menuContainer}>
                  <TouchableOpacity
                      style={styles.menuItem}
                      onPress={() => {
                          // @ts-ignore - route registered in AuthNavigator
                          navigation.navigate('Settings');
                      }}
                  >
                      <View style={styles.menuIconBox}><Image source={{ uri: ASSETS.settings }} style={styles.menuIcon} /></View>
                      <Text style={styles.menuTitle}>Settings</Text>
                      <Image source={{ uri: ASSETS.arrowRight }} style={styles.chevron} />
                  </TouchableOpacity>

                  <TouchableOpacity style={[styles.menuItem, {borderBottomWidth: 0}]} onPress={() => Alert.alert("About")}>
                      <View style={styles.menuIconBox}><Image source={{ uri: ASSETS.info }} style={styles.menuIcon} /></View>
                      <View style={styles.menuTextContainer}>
                          <Text style={styles.menuTitle}>About & Legal</Text>
                          <Text style={styles.menuSub}>Version 1.0.2</Text>
                      </View>
                      <Image source={{ uri: ASSETS.arrowRight }} style={styles.chevron} />
                  </TouchableOpacity>
              </View>

              {/* LOGOUT BUTTON (NEW) */}
              <TouchableOpacity style={styles.logoutButton} onPress={handleLogout} activeOpacity={0.8}>
                  <View style={styles.logoutContent}>
                    <Image source={{ uri: ASSETS.logout }} style={styles.logoutIcon} />
                    <Text style={styles.logoutText}>Log Out</Text>
                  </View>
              </TouchableOpacity>

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
      position: 'absolute', 
      top: 0, left: 0, right: 0, height: 280, 
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
  backBtn: { padding: 5 },
  backIcon: { width: 24, height: 24, tintColor: '#000' },
  headerTitle: { fontSize: 20, fontWeight: 'bold', color: '#000' },
  editBtn: { padding: 5 },
  editIcon: { width: 20, height: 20, tintColor: '#000' },

  scrollContent: { paddingHorizontal: 20, paddingBottom: 120 },

  // Profile Card
  profileCard: {
      flexDirection: 'row', alignItems: 'center',
      backgroundColor: '#FFF', borderRadius: 20, padding: 20,
      shadowColor: "#000", shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.1, shadowRadius: 10, elevation: 5,
      marginBottom: 20
  },
  avatar: { width: 70, height: 70, borderRadius: 35, marginRight: 15 },
  profileInfo: { flex: 1 },
  userName: { fontSize: 18, fontWeight: 'bold', color: '#000' },
  userRole: { fontSize: 14, color: '#FFDD32', fontWeight: 'bold', marginBottom: 4, backgroundColor: '#000', alignSelf: 'flex-start', paddingHorizontal: 8, paddingVertical: 2, borderRadius: 4, overflow: 'hidden' },
  userPhone: { fontSize: 13, color: '#666' },

  // Grid
  gridContainer: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 20 },
  gridItem: { 
      width: '48%', backgroundColor: '#FFF', borderRadius: 16, padding: 15, 
      alignItems: 'center', shadowColor: "#000", shadowOpacity: 0.05, shadowRadius: 5, elevation: 2 
  },
  iconBg: { width: 50, height: 50, borderRadius: 25, justifyContent: 'center', alignItems: 'center', marginBottom: 10 },
  gridIcon: { width: 24, height: 24 },
  gridText: { fontSize: 13, fontWeight: 'bold', textAlign: 'center', color: '#333' },

  // Menu
  menuContainer: { backgroundColor: '#FFF', borderRadius: 16, padding: 5, marginBottom: 20, elevation: 2, shadowColor: "#000", shadowOpacity: 0.05 },
  menuItem: { flexDirection: 'row', alignItems: 'center', padding: 15, borderBottomWidth: 1, borderBottomColor: '#F5F5F5' },
  menuIconBox: { width: 36, height: 36, backgroundColor: '#F9F9F9', borderRadius: 10, justifyContent: 'center', alignItems: 'center', marginRight: 15 },
  menuIcon: { width: 20, height: 20, tintColor: '#333' },
  menuTextContainer: { flex: 1 },
  menuTitle: { fontSize: 15, fontWeight: 'bold', color: '#000' },
  menuSub: { fontSize: 12, color: '#888', marginTop: 2 },
  chevron: { width: 16, height: 16, tintColor: '#CCC' },
  
  smallBtn: { backgroundColor: '#FFDD32', paddingHorizontal: 10, paddingVertical: 5, borderRadius: 6, alignSelf: 'flex-start', marginTop: 5 },
  smallBtnText: { fontSize: 11, fontWeight: 'bold', color: '#000' },

  // Refer
  referContainer: { 
      backgroundColor: '#222', borderRadius: 20, padding: 20, marginBottom: 20,
      shadowColor: "#FFDD32", shadowOpacity: 0.2, shadowRadius: 10, elevation: 5
  },
  referHeader: { flexDirection: 'row', alignItems: 'center', marginBottom: 10 },
  referIcon: { width: 24, height: 24, marginRight: 10 },
  referTitle: { fontSize: 18, fontWeight: 'bold', color: '#FFDD32' },
  referDesc: { fontSize: 13, color: '#CCC', marginBottom: 15, lineHeight: 20 },
  codeContainer: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', backgroundColor: '#333', borderRadius: 12, padding: 12, marginBottom: 15 },
  codeLabel: { color: '#AAA', fontSize: 12 },
  codeBox: { flexDirection: 'row', alignItems: 'center' },
  codeText: { color: '#FFF', fontSize: 16, fontWeight: 'bold', marginRight: 10, letterSpacing: 1 },
  copyIcon: { width: 16, height: 16, tintColor: '#FFDD32' },
  inviteBtn: { backgroundColor: '#FFDD32', paddingVertical: 12, borderRadius: 12, alignItems: 'center' },
  inviteText: { fontSize: 14, fontWeight: 'bold', color: '#000' },

  // Logout Button
  logoutButton: {
      backgroundColor: '#FFF0F0', 
      borderRadius: 16, 
      paddingVertical: 15,
      marginBottom: 20,
      borderWidth: 1, 
      borderColor: '#FFCDD2',
      alignItems: 'center'
  },
  logoutContent: { flexDirection: 'row', alignItems: 'center' },
  logoutIcon: { width: 20, height: 20, tintColor: '#D32F2F', marginRight: 10 },
  logoutText: { fontSize: 16, fontWeight: 'bold', color: '#D32F2F' },

  // Navigation
  bottomNavContainer: { position: 'absolute', bottom: 25, left: 0, right: 0, alignItems: 'center', justifyContent: 'center' },
  bottomNav: { flexDirection: 'row', backgroundColor: '#FFF', width: width * 0.9, borderRadius: 35, height: 70, alignItems: 'center', justifyContent: 'space-around', paddingHorizontal: 10, shadowColor: "#000", shadowOffset: { width: 0, height: 10 }, shadowOpacity: 0.15, shadowRadius: 20, elevation: 10 },
  navItem: { alignItems: 'center', justifyContent: 'center', padding: 10, borderRadius: 25 },
  navItemActive: { backgroundColor: '#FFDD32', flexDirection: 'row', paddingHorizontal: 15, paddingVertical: 10 },
  navIcon: { width: 24, height: 24, tintColor: '#CCC' },
  navText: { marginLeft: 8, fontWeight: 'bold', fontSize: 12, color: '#000' },
});
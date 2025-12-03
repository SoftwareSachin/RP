import React, { useState, useMemo } from "react";
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
  FlatList,
  Alert,
  Animated
} from "react-native";
import { useNavigation } from "@react-navigation/native";

const { width } = Dimensions.get('window');

// --- ASSETS ---
const ASSETS = {
    back: "https://cdn-icons-png.flaticon.com/512/271/271220.png",
    search: "https://cdn-icons-png.flaticon.com/512/54/54481.png",
    
    // Professional UI Icons
    filter: "https://cdn-icons-png.flaticon.com/512/3161/3161355.png",
    download: "https://cdn-icons-png.flaticon.com/512/724/724933.png",
    
    // --- UPDATED: Professional Transaction Icons ---
    rent: "https://img.icons8.com/color/96/exterior.png",        // High-quality House for Rent
    deposit: "https://img.icons8.com/color/96/safe.png",          // Safe for Security Deposit
    service: "https://img.icons8.com/color/96/maintenance.png",   // Tools for Maintenance/Service
    
    // Status Icons
    success: "https://cdn-icons-png.flaticon.com/512/190/190411.png",
    pending: "https://cdn-icons-png.flaticon.com/512/2099/2099166.png",
};

// --- MOCK DATA ---
const TRANSACTIONS = [
    { id: '1', title: 'Green View Residency', date: '24 Oct, 2025', amount: '25,000', type: 'Rent', status: 'Success', icon: ASSETS.rent },
    { id: '2', title: 'Security Deposit', date: '01 Oct, 2025', amount: '50,000', type: 'Deposit', status: 'Success', icon: ASSETS.deposit },
    { id: '3', title: 'Cleaning Service', date: '15 Sep, 2025', amount: '400', type: 'Service', status: 'Success', icon: ASSETS.service },
    { id: '4', title: 'Green View Residency', date: '24 Sep, 2025', amount: '25,000', type: 'Rent', status: 'Success', icon: ASSETS.rent },
    { id: '5', title: 'Maintenance Fee', date: '10 Sep, 2025', amount: '1,200', type: 'Service', status: 'Pending', icon: ASSETS.service },
    { id: '6', title: 'Green View Residency', date: '24 Aug, 2025', amount: '25,000', type: 'Rent', status: 'Success', icon: ASSETS.rent },
];

const FILTERS = ["All", "Rent", "Deposit", "Service"];

export default function PaymentHistory() {
  const navigation = useNavigation();
  const [searchText, setSearchText] = useState('');
  const [activeFilter, setActiveFilter] = useState("All");

  // Filter Logic
  const filteredData = useMemo(() => {
      return TRANSACTIONS.filter(item => {
          const matchesSearch = item.title.toLowerCase().includes(searchText.toLowerCase());
          const matchesFilter = activeFilter === "All" || item.type === activeFilter;
          return matchesSearch && matchesFilter;
      });
  }, [searchText, activeFilter]);

  const handleDownload = (id: string) => {
      Alert.alert("Download Invoice", `Downloading invoice for Transaction #${id}...`);
  };

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
            <Text style={styles.headerTitle}>Payment History</Text>
            <TouchableOpacity onPress={() => Alert.alert("Filter", "Open advanced filters")} style={styles.filterBtn}>
                <Image source={{ uri: ASSETS.filter }} style={styles.backIcon} />
            </TouchableOpacity>
        </View>

        <ScrollView 
            contentContainerStyle={styles.scrollContent} 
            showsVerticalScrollIndicator={false}
        >

            {/* --- FINANCIAL SUMMARY CARD --- */}
            <View style={styles.summaryCard}>
                <View style={styles.summaryRow}>
                    <View>
                        <Text style={styles.summaryLabel}>Total Rent Paid</Text>
                        <Text style={styles.summaryAmount}>₹ 1,25,000</Text>
                    </View>
                    <View style={styles.summaryDivider} />
                    <View>
                        <Text style={styles.summaryLabel}>Security Deposit</Text>
                        <Text style={styles.summaryAmount}>₹ 50,000</Text>
                    </View>
                </View>
                <View style={styles.summaryFooter}>
                    <Text style={styles.summaryFooterText}>Next Due: 24 Nov, 2025</Text>
                    <View style={styles.dueBadge}>
                        <Text style={styles.dueText}>₹25,000</Text>
                    </View>
                </View>
            </View>

            {/* --- SEARCH & FILTER --- */}
            <View style={styles.searchContainer}>
                <Image source={{ uri: ASSETS.search }} style={styles.searchIcon} />
                <TextInput 
                    placeholder="Search transactions..." 
                    placeholderTextColor="#999"
                    style={styles.searchInput}
                    value={searchText}
                    onChangeText={setSearchText}
                />
            </View>

            <View style={{marginBottom: 20}}>
                <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.filterScroll}>
                    {FILTERS.map((filter) => (
                        <TouchableOpacity 
                            key={filter} 
                            style={[styles.filterChip, activeFilter === filter && styles.filterChipActive]}
                            onPress={() => setActiveFilter(filter)}
                        >
                            <Text style={[styles.filterText, activeFilter === filter && styles.filterTextActive]}>
                                {filter}
                            </Text>
                        </TouchableOpacity>
                    ))}
                </ScrollView>
            </View>

            {/* --- TRANSACTIONS LIST --- */}
            <View style={styles.listContainer}>
                <Text style={styles.sectionTitle}>Recent Transactions</Text>

                {filteredData.length === 0 ? (
                    <View style={styles.emptyState}>
                        <Text style={styles.emptyText}>No transactions found.</Text>
                    </View>
                ) : (
                    filteredData.map((item) => (
                        <View key={item.id} style={styles.transactionCard}>
                            {/* Left Icon */}
                            <View style={styles.iconContainer}>
                                <Image source={{ uri: item.icon }} style={styles.transIcon} resizeMode="contain" />
                            </View>

                            {/* Middle Info */}
                            <View style={styles.infoContainer}>
                                <Text style={styles.transTitle} numberOfLines={1}>{item.title}</Text>
                                <Text style={styles.transDate}>{item.date} • {item.type}</Text>
                            </View>

                            {/* Right Amount & Status */}
                            <View style={styles.amountContainer}>
                                <Text style={styles.transAmount}>- ₹{item.amount}</Text>
                                <View style={[
                                    styles.statusBadge, 
                                    item.status === 'Pending' ? styles.statusPending : styles.statusSuccess
                                ]}>
                                    <Text style={[
                                        styles.statusText,
                                        item.status === 'Pending' ? styles.textPending : styles.textSuccess
                                    ]}>{item.status}</Text>
                                </View>
                            </View>
                            
                            {/* Download Button */}
                            <TouchableOpacity style={styles.downloadBtn} onPress={() => handleDownload(item.id)}>
                                <Image source={{ uri: ASSETS.download }} style={styles.downloadIcon} />
                            </TouchableOpacity>
                        </View>
                    ))
                )}
            </View>

        </ScrollView>
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  mainContainer: { flex: 1, backgroundColor: "#F9F9F9" },
  yellowBackground: { 
      position: 'absolute', top: 0, left: 0, right: 0, height: 250, 
      backgroundColor: '#FFDD32', 
      borderBottomLeftRadius: 30, borderBottomRightRadius: 30 
  },
  safeArea: { flex: 1, paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0 },
  
  // Header
  header: { 
      flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', 
      paddingHorizontal: 20, paddingTop: 20, paddingBottom: 15
  },
  backBtn: { padding: 5, backgroundColor: 'rgba(255,255,255,0.3)', borderRadius: 12 },
  filterBtn: { padding: 5, backgroundColor: 'rgba(255,255,255,0.3)', borderRadius: 12 },
  backIcon: { width: 20, height: 20, tintColor: '#000' },
  headerTitle: { fontSize: 20, fontWeight: 'bold', color: '#000' },

  scrollContent: { paddingHorizontal: 20, paddingBottom: 40 },

  // Summary Card
  summaryCard: {
      backgroundColor: '#FFF', borderRadius: 20, padding: 20, marginBottom: 20,
      shadowColor: "#000", shadowOffset: { width: 0, height: 5 }, shadowOpacity: 0.1, shadowRadius: 10, elevation: 5
  },
  summaryRow: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 20 },
  summaryDivider: { width: 1, height: '100%', backgroundColor: '#EEE' },
  summaryLabel: { fontSize: 12, color: '#888', fontWeight: '600', textTransform: 'uppercase', marginBottom: 5 },
  summaryAmount: { fontSize: 20, fontWeight: 'bold', color: '#000' },
  summaryFooter: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingTop: 15, borderTopWidth: 1, borderTopColor: '#F5F5F5' },
  summaryFooterText: { fontSize: 13, color: '#666', fontWeight: '600' },
  dueBadge: { backgroundColor: '#FFF0F0', paddingHorizontal: 10, paddingVertical: 4, borderRadius: 8 },
  dueText: { color: '#FF3B30', fontWeight: 'bold', fontSize: 12 },

  // Search
  searchContainer: { 
      flexDirection: 'row', alignItems: 'center', backgroundColor: '#FFF', 
      borderRadius: 15, paddingHorizontal: 15, height: 50, marginBottom: 20,
      shadowColor: "#000", shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.05, shadowRadius: 5, elevation: 2
  },
  searchIcon: { width: 18, height: 18, tintColor: '#999', marginRight: 10 },
  searchInput: { flex: 1, fontSize: 16, color: '#000' },

  // Filters
  filterScroll: { paddingBottom: 5 },
  filterChip: { 
      paddingHorizontal: 20, paddingVertical: 8, borderRadius: 20, 
      backgroundColor: '#FFF', marginRight: 10, borderWidth: 1, borderColor: '#EEE' 
  },
  filterChipActive: { backgroundColor: '#000', borderColor: '#000' },
  filterText: { fontSize: 13, fontWeight: '600', color: '#666' },
  filterTextActive: { color: '#FFF' },

  // List
  listContainer: { marginTop: 10 },
  sectionTitle: { fontSize: 18, fontWeight: 'bold', color: '#000', marginBottom: 15 },
  
  transactionCard: {
      flexDirection: 'row', alignItems: 'center', backgroundColor: '#FFF', 
      borderRadius: 16, padding: 15, marginBottom: 12,
      shadowColor: "#000", shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.05, shadowRadius: 5, elevation: 2
  },
  iconContainer: { 
      width: 45, height: 45, borderRadius: 12, backgroundColor: '#F9F9F9', 
      justifyContent: 'center', alignItems: 'center', marginRight: 15 
  },
  transIcon: { width: 28, height: 28 }, // Adjusted size for new icons
  infoContainer: { flex: 1 },
  transTitle: { fontSize: 15, fontWeight: 'bold', color: '#000', marginBottom: 4 },
  transDate: { fontSize: 12, color: '#888' },
  
  amountContainer: { alignItems: 'flex-end', marginRight: 10 },
  transAmount: { fontSize: 15, fontWeight: 'bold', color: '#000', marginBottom: 4 },
  statusBadge: { paddingHorizontal: 8, paddingVertical: 2, borderRadius: 6 },
  statusSuccess: { backgroundColor: '#E8F5E9' },
  statusPending: { backgroundColor: '#FFF3E0' },
  statusText: { fontSize: 10, fontWeight: 'bold' },
  textSuccess: { color: '#2E7D32' },
  textPending: { color: '#EF6C00' },

  downloadBtn: { padding: 5 },
  downloadIcon: { width: 18, height: 18, tintColor: '#CCC' },

  emptyState: { alignItems: 'center', marginTop: 40 },
  emptyText: { color: '#999', fontSize: 14 }
});
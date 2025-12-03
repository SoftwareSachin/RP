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
  Alert
} from "react-native";

// Dummy Data (Initially Empty to show the Empty State you designed)
const INITIAL_SAVED_PROPERTIES: any[] = []; 

export default (props: any) => {
  const [searchText, setSearchText] = useState('');
  const [activeTab, setActiveTab] = useState("Saved");
  const [savedList, setSavedList] = useState(INITIAL_SAVED_PROPERTIES);
  const [activeSort, setActiveSort] = useState("Recently Added");

  const handleExplore = () => {
      Alert.alert("Explore", "Navigating to property feed...");
  };

  const handleBack = () => {
      Alert.alert("Navigation", "Going Back...");
  };

  const tabs = [
      { name: "Home", icon: "https://cdn-icons-png.flaticon.com/512/1946/1946436.png" },
      { name: "Lists", icon: "https://storage.googleapis.com/tagjs-prod.appspot.com/v1/kwi0sLffHL/np8e1cjb_expires_30_days.png" },
      { name: "Saved", icon: "https://storage.googleapis.com/tagjs-prod.appspot.com/v1/kwi0sLffHL/y6l2pvxu_expires_30_days.png" },
      { name: "Payment", icon: "https://storage.googleapis.com/tagjs-prod.appspot.com/v1/kwi0sLffHL/feksi6gx_expires_30_days.png" },
      { name: "Account", icon: "https://storage.googleapis.com/tagjs-prod.appspot.com/v1/kwi0sLffHL/ht8icv1v_expires_30_days.png" },
  ];

  const sortOptions = ["Price", "Location", "Recently Added", "Type"];

  return (
    <>
    {/* Top Status Bar Background */}
    <SafeAreaView style={{ flex: 0, backgroundColor: "#FFDD32" }} />
    
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFDD32" />
      
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === "ios" ? "padding" : undefined}
      >
        <View style={{ flex: 1 }}>
            <ScrollView style={styles.scrollView} contentContainerStyle={{ paddingBottom: 100 }}>
                
                {/* Yellow Header Block */}
                <View style={styles.yellowHeader} />

                {/* Header Row with Back Button */}
                <View style={styles.headerRow}>
                    <TouchableOpacity style={styles.backBtn} onPress={handleBack}>
                        <Image
                            source={{ uri: "https://cdn-icons-png.flaticon.com/512/271/271220.png" }}
                            resizeMode={"contain"}
                            style={styles.backArrow}
                        />
                        <Text style={styles.backText}>{"Back"}</Text>
                    </TouchableOpacity>
                    <Text style={styles.headerTitle}>Saved Properties</Text>
                    <View style={{width: 60}} />
                </View>

                {/* Search Bar */}
                <View style={styles.searchBar}>
                    <Image
                        source={{ uri: "https://cdn-icons-png.flaticon.com/512/54/54481.png" }}
                        style={{ width: 20, height: 20, marginLeft: 12, marginRight: 8, tintColor: '#979797' }}
                        resizeMode="contain"
                    />
                    <TextInput
                        placeholder="Search saved properties..."
                        placeholderTextColor="#979797"
                        value={searchText}
                        onChangeText={setSearchText}
                        style={{ flex: 1, color: "#000", fontSize: 14, paddingVertical: 12 }}
                    />
                    <View style={{ flexDirection: 'row', alignItems: 'center', marginRight: 12 }}>
                        {searchText.length > 0 && (
                            <TouchableOpacity onPress={() => setSearchText("")}>
                                <Image
                                source={{ uri: "https://cdn-icons-png.flaticon.com/512/2976/2976286.png" }}
                                style={{ width: 16, height: 16, marginRight: 10, tintColor: '#999' }}
                                />
                            </TouchableOpacity>
                        )}
                    </View>
                </View>

                {/* Sort Section */}
                <View style={styles.sortSection}>
                    <Text style={styles.sortLabel}>{"Sort By:"}</Text>
                    <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.sortScroll}>
                        {sortOptions.map((option) => (
                            <TouchableOpacity 
                                key={option} 
                                style={[
                                    styles.sortBtn, 
                                    activeSort === option && styles.sortBtnActive
                                ]}
                                onPress={() => setActiveSort(option)}
                            >
                                <Text style={[
                                    styles.sortBtnText, 
                                    activeSort === option && styles.sortBtnTextActive
                                ]}>{option}</Text>
                            </TouchableOpacity>
                        ))}
                    </ScrollView>
                </View>

                {/* Empty State (As per your design image) */}
                {savedList.length === 0 ? (
                    <View style={styles.emptyState}>
                        <Image 
                            source={{ uri: "https://storage.googleapis.com/tagjs-prod.appspot.com/v1/sE8iZvpPof/u80gvhnq_expires_30_days.png" }}
                            style={styles.emptyImage}
                            resizeMode="contain"
                        />
                        <Text style={styles.emptyText}>
                            {"You haven’t saved any properties yet.\nTap ❤ on listings you like to save them here"}
                        </Text>
                        
                        <TouchableOpacity style={styles.exploreBtn} onPress={handleExplore}>
                            <Text style={styles.exploreText}>{"Explore properties"}</Text>
                        </TouchableOpacity>
                    </View>
                ) : (
                    <View>
                        <Text>List Items...</Text>
                    </View>
                )}

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
                            style={{ 
                                width: 24, 
                                height: 24, 
                                marginBottom: 4, 
                                opacity: isActive ? 1 : 0.6, 
                                tintColor: '#FFF'
                            }} 
                            resizeMode="contain" 
                        />
                        <Text style={{ color: "#FFFFFF", fontSize: 12, fontWeight: isActive ? "bold" : "normal" }}>
                            {tab.name}
                        </Text>
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
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },
  scrollView: {
    flex: 1,
  },
  
  // Header Styles
  yellowHeader: {
      width: '100%',
      height: 20,
      backgroundColor: '#FFDD32',
      marginBottom: 10
  },
  headerRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
    marginHorizontal: 16,
    marginTop: 20, 
  },
  backBtn: { flexDirection: 'row', alignItems: 'center' },
  backArrow: { width: 20, height: 20, marginRight: 8 },
  backText: { fontSize: 16, fontWeight: 'bold', color: '#000' },
  headerTitle: { fontSize: 18, fontWeight: 'bold', color: '#000' },

  // Search Bar
  searchBar: {
    flexDirection: "row",
    alignItems: "center",
    borderColor: "#979797",
    borderRadius: 20,
    borderWidth: 1,
    marginBottom: 24,
    marginHorizontal: 16,
    backgroundColor: "#fff",
    height: 50,
  },

  // Sort Section
  sortSection: { marginHorizontal: 16, marginBottom: 30 },
  sortLabel: { fontSize: 14, fontWeight: 'bold', marginBottom: 10 },
  sortScroll: { flexDirection: 'row' },
  sortBtn: {
      borderWidth: 1,
      borderColor: '#FFDD32',
      paddingVertical: 8,
      paddingHorizontal: 15,
      borderRadius: 20,
      marginRight: 10,
      backgroundColor: '#fff'
  },
  sortBtnActive: {
      backgroundColor: '#FFDD32',
  },
  sortBtnText: { fontSize: 12, fontWeight: '600', color: '#000' },
  sortBtnTextActive: { fontWeight: 'bold' },

  // Empty State
  emptyState: {
      alignItems: 'center',
      marginTop: 20,
      paddingHorizontal: 30,
  },
  emptyImage: {
      width: 200,
      height: 200,
      marginBottom: 20,
  },
  emptyText: {
      fontSize: 16,
      color: '#666',
      textAlign: 'center',
      lineHeight: 24,
      marginBottom: 30,
  },

  // Explore Button
  exploreBtn: {
      backgroundColor: "#FFDD32",
      paddingVertical: 15,
      paddingHorizontal: 40,
      borderRadius: 30,
      alignItems: 'center',
      shadowColor: "#000",
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.2,
      shadowRadius: 3,
      elevation: 3,
  },
  exploreText: { fontSize: 16, fontWeight: 'bold', color: '#000' },

  // Navigation Styles
  bottomNav: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    width: width,
    backgroundColor: "#FFDD32",
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    flexDirection: "row",
    paddingHorizontal: 10,
    paddingVertical: 12,
    alignItems: "center",
    justifyContent: "space-between",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 5,
    paddingBottom: Platform.OS === 'ios' ? 20 : 12 
  },
  navItem: {
    flex: 1,
    alignItems: "center",
    justifyContent: 'center',
    height: 50
  },
});
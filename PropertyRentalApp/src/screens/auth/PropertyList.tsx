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

export default (props: any) => {
  const [textInput1, onChangeTextInput1] = useState('');
  const [activeTab, setActiveTab] = useState("Lists");

  const tabs = [
      { name: "Home", icon: "https://cdn-icons-png.flaticon.com/512/1946/1946436.png" },
      { name: "Lists", icon: "https://storage.googleapis.com/tagjs-prod.appspot.com/v1/kwi0sLffHL/np8e1cjb_expires_30_days.png" },
      { name: "Saved", icon: "https://storage.googleapis.com/tagjs-prod.appspot.com/v1/kwi0sLffHL/y6l2pvxu_expires_30_days.png" },
      { name: "Payment", icon: "https://storage.googleapis.com/tagjs-prod.appspot.com/v1/kwi0sLffHL/feksi6gx_expires_30_days.png" },
      { name: "Account", icon: "https://storage.googleapis.com/tagjs-prod.appspot.com/v1/kwi0sLffHL/ht8icv1v_expires_30_days.png" },
  ];

  return (
    <>
    <SafeAreaView style={{ flex: 0, backgroundColor: "#FFDD32" }} />
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFDD32" />
      
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === "ios" ? "padding" : undefined}
      >
        <View style={{ flex: 1 }}>
            <ScrollView style={styles.scrollView} contentContainerStyle={{ paddingBottom: 100 }}>
                
                {/* Top Header Decoration */}
                <View style={styles.view}>
                    <View style={styles.box} />
                </View>

                {/* Greeting Row */}
                <View style={styles.row}>
                    <View style={styles.row2}>
                        <Image
                        source={{ uri: "https://storage.googleapis.com/tagjs-prod.appspot.com/v1/sE8iZvpPof/yowd7qaj_expires_30_days.png" }}
                        resizeMode={"stretch"}
                        style={styles.image}
                        />
                        <Text style={styles.text}>
                        {"Hi Zenab!"}
                        </Text>
                    </View>
                    <Image
                        source={{ uri: "https://storage.googleapis.com/tagjs-prod.appspot.com/v1/sE8iZvpPof/9zjs8clk_expires_30_days.png" }}
                        resizeMode={"stretch"}
                        style={styles.image2}
                    />
                </View>

                {/* Filter Buttons */}
                <View style={styles.row3}>
                    <TouchableOpacity 
                        style={styles.buttonColumn} 
                        onPress={() => {
                            // @ts-ignore - FilterScreen exists in AuthNavigator
                            props.navigation.navigate('FilterScreen');
                        }}
                    >
                        <Text style={styles.text2}>{"Filter"}</Text>
                        <Image
                        source={{ uri: "https://storage.googleapis.com/tagjs-prod.appspot.com/v1/sE8iZvpPof/2pig70l9_expires_30_days.png" }}
                        resizeMode={"stretch"}
                        style={styles.image3}
                        />
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.buttonColumn2} onPress={() => alert('Sort Pressed!')}>
                        <Image
                        source={{ uri: "https://storage.googleapis.com/tagjs-prod.appspot.com/v1/sE8iZvpPof/bccpxvht_expires_30_days.png" }}
                        resizeMode={"stretch"}
                        style={styles.image4}
                        />
                        <Text style={styles.text3}>{"Sort"}</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.buttonColumn3} onPress={() => alert('Map Pressed!')}>
                        <Text style={styles.text4}>{"Map"}</Text>
                        <Image
                        source={{ uri: "https://storage.googleapis.com/tagjs-prod.appspot.com/v1/sE8iZvpPof/ektjwxec_expires_30_days.png" }}
                        resizeMode={"stretch"}
                        style={styles.image3}
                        />
                    </TouchableOpacity>
                </View>

                {/* Search Bar */}
                <View style={styles.searchBar}>
                    <Image
                    source={{ uri: "https://cdn-icons-png.flaticon.com/512/54/54481.png" }}
                    style={{ width: 20, height: 20, marginLeft: 12, marginRight: 8, tintColor: '#979797' }}
                    resizeMode="contain"
                    />
                    <TextInput
                    placeholder="Search city, locality, landmark..."
                    placeholderTextColor="#979797"
                    value={textInput1}
                    onChangeText={onChangeTextInput1}
                    style={{ flex: 1, color: "#000", fontSize: 14, paddingVertical: 12 }}
                    />
                    <View style={{ flexDirection: 'row', alignItems: 'center', marginRight: 12 }}>
                        {textInput1.length > 0 && (
                            <TouchableOpacity onPress={() => onChangeTextInput1("")}>
                                <Image
                                source={{ uri: "https://cdn-icons-png.flaticon.com/512/2976/2976286.png" }}
                                style={{ width: 16, height: 16, marginRight: 10, tintColor: '#999' }}
                                />
                            </TouchableOpacity>
                        )}
                        <View style={{ width: 1, height: 20, backgroundColor: '#DDD', marginRight: 10 }} />
                        <TouchableOpacity onPress={() => Alert.alert("Location", "Using current location")}>
                            <Image 
                                source={{ uri: "https://cdn-icons-png.flaticon.com/512/684/684908.png" }}
                                style={{ width: 22, height: 22, tintColor: '#FFDD32' }}
                                resizeMode="contain"
                            />
                        </TouchableOpacity>
                    </View>
                </View>

                {/* Property Card 1 */}
                <View style={styles.row5}>
                    <Image
                        source={{ uri: "https://storage.googleapis.com/tagjs-prod.appspot.com/v1/sE8iZvpPof/8ui2vvsy_expires_30_days.png" }}
                        resizeMode={"stretch"}
                        style={styles.image7}
                    />
                    <View style={styles.column}>
                        <Text style={styles.text5}>{"Samnay The Amelias"}</Text>
                        <Text style={styles.text5_sub}>{"Mansarovar ,Jaipur"}</Text>
                        
                        <View style={styles.row6}>
                        <Image
                            source={{ uri: "https://storage.googleapis.com/tagjs-prod.appspot.com/v1/sE8iZvpPof/em6iks44_expires_30_days.png" }}
                            resizeMode={"stretch"}
                            style={styles.image8}
                        />
                        <Text style={styles.text6}>{"4.8(85 Ratings)"}</Text>
                        </View>
                        
                        <View style={styles.row6}>
                        <Image
                            source={{ uri: "https://storage.googleapis.com/tagjs-prod.appspot.com/v1/sE8iZvpPof/8vrojurh_expires_30_days.png" }}
                            resizeMode={"stretch"}
                            style={styles.image9}
                        />
                        <Text style={styles.text7}>{"8.8 km from Centre"}</Text>
                        </View>
                        
                        <Text style={styles.text8}>{"4 BHK Flat"}</Text>
                        <Text style={styles.text9}>{"₹ 1,00,000"}</Text>
                    </View>
                </View>

                {/* Property Card 2 */}
                <View style={styles.row5}>
                    <Image
                        source={{ uri: "https://storage.googleapis.com/tagjs-prod.appspot.com/v1/sE8iZvpPof/toh0nnn3_expires_30_days.png" }}
                        resizeMode={"stretch"}
                        style={styles.image10}
                    />
                    <View style={styles.column2}>
                        <Text style={styles.text5}>{"Samnay The Amelias"}</Text>
                        <Text style={styles.text5_sub}>{"Mansarovar ,Jaipur"}</Text>
                        <View style={styles.row6}>
                        <Image
                            source={{ uri: "https://storage.googleapis.com/tagjs-prod.appspot.com/v1/sE8iZvpPof/6ub0glkl_expires_30_days.png" }}
                            resizeMode={"stretch"}
                            style={styles.image8}
                        />
                        <Text style={styles.text6}>{"4.8(85 Ratings)"}</Text>
                        </View>
                        <View style={styles.row6}>
                        <Image
                            source={{ uri: "https://storage.googleapis.com/tagjs-prod.appspot.com/v1/sE8iZvpPof/4vzd5cpu_expires_30_days.png" }}
                            resizeMode={"stretch"}
                            style={styles.image9}
                        />
                        <Text style={styles.text7}>{"8.8 km from Centre"}</Text>
                        </View>
                        <Text style={styles.text8}>{"4 BHK Flat"}</Text>
                        <Text style={styles.text9}>{"₹ 1,00,000"}</Text>
                    </View>
                </View>

                {/* Property Card 3 */}
                <View style={styles.row5}>
                    <Image
                        source={{ uri: "https://storage.googleapis.com/tagjs-prod.appspot.com/v1/sE8iZvpPof/vxctosx0_expires_30_days.png" }}
                        resizeMode={"cover"}
                        style={styles.image7}
                    />
                    <View style={styles.column}>
                        <Text style={styles.text5}>{"Samnay The Amelias"}</Text>
                        <Text style={styles.text5_sub}>{"Mansarovar ,Jaipur"}</Text>
                        
                        <View style={styles.row6}>
                        <Image
                            source={{ uri: "https://storage.googleapis.com/tagjs-prod.appspot.com/v1/sE8iZvpPof/em6iks44_expires_30_days.png" }}
                            resizeMode={"stretch"}
                            style={styles.image8}
                        />
                        <Text style={styles.text6}>{"4.8(85 Ratings)"}</Text>
                        </View>
                        
                        <View style={styles.row6}>
                        <Image
                            source={{ uri: "https://storage.googleapis.com/tagjs-prod.appspot.com/v1/sE8iZvpPof/8vrojurh_expires_30_days.png" }}
                            resizeMode={"stretch"}
                            style={styles.image9}
                        />
                        <Text style={styles.text7}>{"8.8 km from Centre"}</Text>
                        </View>
                        
                        <Text style={styles.text8}>{"4 BHK Flat"}</Text>
                        <Text style={styles.text9}>{"₹ 1,00,000"}</Text>
                    </View>
                </View>

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

  // Header
  view: {
    paddingHorizontal: 16,
    paddingTop: 10,
  },
  box: {
    width: 54,
    height: 18,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
    marginHorizontal: 16,
    marginTop: 20, // <--- Added margin top for spacing from yellow header
  },
  row2: {
    flexDirection: "row",
    alignItems: "center",
  },
  image: {
    width: 30,
    height: 30,
    marginRight: 10,
    borderRadius: 15,
  },
  text: {
    color: "#000000",
    fontSize: 16,
    fontWeight: "bold",
  },
  image2: {
    width: 85,
    height: 38,
  },

  // Filter Buttons
  row3: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginHorizontal: 16,
    marginBottom: 20,
  },
  buttonColumn: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    borderColor: "#FFDD32",
    borderRadius: 20,
    borderWidth: 1,
    paddingVertical: 8,
    marginRight: 10,
  },
  buttonColumn2: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    borderColor: "#FFDD32",
    borderRadius: 20,
    borderWidth: 1,
    paddingVertical: 8,
    marginRight: 10,
  },
  buttonColumn3: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    borderColor: "#FFDD32",
    borderRadius: 20,
    borderWidth: 1,
    paddingVertical: 8,
  },
  text2: { fontSize: 12, marginRight: 5 },
  text3: { fontSize: 12, marginLeft: 5 },
  text4: { fontSize: 12, marginRight: 5 },
  image3: { width: 15, height: 15 },
  image4: { width: 15, height: 15 },

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

  // Horizontal Cards (Row 5)
  row5: {
    flexDirection: "row",
    marginHorizontal: 16,
    marginBottom: 20,
    padding: 10,
    backgroundColor: "#fff",
    borderRadius: 15,
    // Shadow
    elevation: 3,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 5,
    shadowOffset: { width: 0, height: 2 },
    borderWidth: 1,
    borderColor: "#eee",
  },
  image7: { width: 100, height: 100, borderRadius: 10, marginRight: 15 },
  image10: { width: 100, height: 100, borderRadius: 10, marginRight: 15 },
  column: { flex: 1, justifyContent: "space-around" },
  column2: { flex: 1, justifyContent: "space-around" },
  text5: { fontSize: 14, fontWeight: "bold", color: "#000" },
  text5_sub: { fontSize: 12, color: "#555", marginBottom: 4 },
  
  row6: { flexDirection: "row", alignItems: "center", marginBottom: 2 },
  image8: { width: 12, height: 12, marginRight: 5 },
  text6: { fontSize: 12, color: "#FFDD32", fontWeight: "bold" },
  
  image9: { width: 12, height: 12, marginRight: 5 },
  text7: { fontSize: 12, color: "#777" },
  
  text8: { fontSize: 13, fontWeight: "600", marginTop: 4 },
  text9: { fontSize: 14, fontWeight: "bold", color: "#000", marginTop: 2 },
});
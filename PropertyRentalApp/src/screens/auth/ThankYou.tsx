import React, { useEffect, useRef } from "react";
import { 
  SafeAreaView, 
  View, 
  ScrollView, 
  Text, 
  TouchableOpacity, 
  Image, 
  StyleSheet, 
  StatusBar,
  Dimensions,
  Animated,
  Easing
} from "react-native";
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import type { AuthStackParamList } from '../../navigation/types';

const { width, height } = Dimensions.get('window');

// --- MODERN ASSETS ---
const ASSETS = {
    // High Quality 3D Success Render
    success3D: "https://cdn-icons-png.flaticon.com/512/7518/7518748.png", 
    // Subtle confetti or decoration can be added here if needed
    homeIcon: "https://cdn-icons-png.flaticon.com/512/1946/1946436.png",
};

interface ThankYouProps {}

const ThankYou: React.FC<ThankYouProps> = () => {
  const navigation = useNavigation<NativeStackNavigationProp<AuthStackParamList>>();
  
  // --- Animations ---
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const scaleAnim = useRef(new Animated.Value(0.5)).current;
  const slideUpAnim = useRef(new Animated.Value(50)).current;

  useEffect(() => {
    Animated.sequence([
      // 1. Icon Pop In
      Animated.parallel([
        Animated.timing(fadeAnim, { toValue: 1, duration: 600, useNativeDriver: true }),
        Animated.spring(scaleAnim, { toValue: 1, friction: 6, tension: 40, useNativeDriver: true }),
      ]),
      // 2. Text Slide Up
      Animated.timing(slideUpAnim, {
        toValue: 0,
        duration: 600,
        easing: Easing.out(Easing.cubic),
        useNativeDriver: true,
      })
    ]).start();
  }, []);

  const handleBackToHome = () => {
    navigation.reset({
      index: 0,
      routes: [{ name: 'HomeRent' }],
    });
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />

      <View style={styles.contentContainer}>
        
        <ScrollView 
            contentContainerStyle={styles.scrollContent} 
            showsVerticalScrollIndicator={false}
        >
            
            {/* --- 1. Animated Success Icon --- */}
            <Animated.View style={[styles.iconContainer, { opacity: fadeAnim, transform: [{ scale: scaleAnim }] }]}>
                <Image 
                    source={{ uri: ASSETS.success3D }} 
                    style={styles.successImage} 
                    resizeMode="contain"
                />
                {/* Subtle Shadow Blob */}
                <View style={styles.shadowBlob} />
            </Animated.View>

            {/* --- 2. Dynamic Text Content --- */}
            <Animated.View style={{ opacity: fadeAnim, transform: [{ translateY: slideUpAnim }] }}>
                <Text style={styles.titleText}>Request Received!</Text>
                
                <Text style={styles.subtitleText}>
                    Thank you for choosing <Text style={styles.brandText}>ClicknBook</Text>.
                </Text>

                <View style={styles.cardMessage}>
                    <Text style={styles.bodyText}>
                        We have received your details successfully. Our expert team will review your property and get in touch with you shortly.
                    </Text>
                </View>
            </Animated.View>

        </ScrollView>

        {/* --- 3. Bottom Floating Button --- */}
        <Animated.View style={[styles.footer, { opacity: fadeAnim, transform: [{ translateY: slideUpAnim }] }]}>
            <TouchableOpacity 
                style={styles.primaryButton} 
                onPress={handleBackToHome}
                activeOpacity={0.9}
            >
                <Text style={styles.buttonText}>Back to Home</Text>
                <Image source={{ uri: ASSETS.homeIcon }} style={styles.btnIcon} />
            </TouchableOpacity>
        </Animated.View>

      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },
  contentContainer: {
    flex: 1,
    justifyContent: 'space-between',
  },
  scrollContent: {
    alignItems: 'center',
    paddingTop: height * 0.1, // Push content down visually
    paddingHorizontal: 30,
  },

  // --- Icon Styling ---
  iconContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 40,
    position: 'relative',
  },
  successImage: {
    width: 180,
    height: 180,
    zIndex: 2,
  },
  shadowBlob: {
    position: 'absolute',
    bottom: -10,
    width: 100,
    height: 20,
    backgroundColor: '#000',
    opacity: 0.05,
    borderRadius: 50,
    transform: [{ scaleX: 1.5 }]
  },

  // --- Typography ---
  titleText: {
    fontSize: 32,
    fontWeight: "900",
    color: "#1F2937",
    textAlign: "center",
    marginBottom: 10,
    letterSpacing: 0.5,
  },
  subtitleText: {
    fontSize: 18,
    color: "#4B5563",
    textAlign: "center",
    marginBottom: 30,
    fontWeight: '500',
  },
  brandText: {
    color: "#F59E0B", // Darker yellow/orange for text readability
    fontWeight: "bold",
  },
  
  // --- Message Card ---
  cardMessage: {
      backgroundColor: '#F9FAFB',
      padding: 20,
      borderRadius: 20,
      borderWidth: 1,
      borderColor: '#F3F4F6',
  },
  bodyText: {
    fontSize: 15,
    color: "#6B7280",
    textAlign: "center",
    lineHeight: 24,
  },

  // --- Footer / Button ---
  footer: {
      paddingHorizontal: 24,
      paddingBottom: 40,
      paddingTop: 20,
      backgroundColor: '#FFF',
  },
  primaryButton: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#FFDD32", 
    borderRadius: 16,
    paddingVertical: 18,
    elevation: 8, 
    shadowColor: "#FFDD32", 
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.4,
    shadowRadius: 15,
  },
  buttonText: {
    color: "#000000",
    fontSize: 18,
    fontWeight: "bold",
    marginRight: 10,
    letterSpacing: 0.5
  },
  btnIcon: {
      width: 20,
      height: 20,
      tintColor: '#000'
  }
});

export default ThankYou;
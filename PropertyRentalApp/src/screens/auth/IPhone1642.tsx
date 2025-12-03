import React, { useEffect, useRef } from "react";
import { 
  SafeAreaView, 
  View, 
  Image, 
  TouchableOpacity, 
  Text, 
  StyleSheet, 
  Animated, 
  Dimensions, 
  StatusBar,
  Platform,
  LayoutAnimation,
  UIManager
} from "react-native";
import { useNavigation } from "@react-navigation/native";

// Enable LayoutAnimation for Android
if (Platform.OS === 'android') {
  if (UIManager.setLayoutAnimationEnabledExperimental) {
    UIManager.setLayoutAnimationEnabledExperimental(true);
  }
}

const { width, height } = Dimensions.get("window");

// --- Assets ---
const ASSETS = {
    // Background Image
    background: "https://storage.googleapis.com/tagjs-prod.appspot.com/v1/sE8iZvpPof/3dab4ya8_expires_30_days.png",
    // Logo
    logo: "https://storage.googleapis.com/tagjs-prod.appspot.com/v1/sE8iZvpPof/jvyiaa5r_expires_30_days.png",
};

interface NavigationProps {
    navigate: (screen: string) => void;
}

export default function LoginOptionsScreen() {
  const navigation = useNavigation<NavigationProps>();

  // --- Animations ---
  const fadeAnim = useRef(new Animated.Value(0)).current; 
  const sheetSlide = useRef(new Animated.Value(height)).current; // Start sheet off-screen
  const logoScale = useRef(new Animated.Value(0)).current;

  // Button Animations
  const btnScalePrimary = useRef(new Animated.Value(1)).current;
  const btnScaleSecondary = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    Animated.sequence([
        // 1. Fade In Background
        Animated.timing(fadeAnim, {
            toValue: 1,
            duration: 600,
            useNativeDriver: true,
        }),
        // 2. Logo Pop
        Animated.spring(logoScale, {
            toValue: 1,
            friction: 6,
            tension: 40,
            useNativeDriver: true,
        }),
        // 3. Sheet Slide Up
        Animated.spring(sheetSlide, {
            toValue: 0,
            friction: 7,
            tension: 30,
            useNativeDriver: true,
        })
    ]).start();
  }, []);

  // --- Button Press Animation Helper ---
  const animateButton = (scaleVal: Animated.Value, callback: () => void) => {
    Animated.sequence([
        Animated.timing(scaleVal, { toValue: 0.95, duration: 100, useNativeDriver: true }),
        Animated.timing(scaleVal, { toValue: 1, duration: 100, useNativeDriver: true }),
    ]).start(callback);
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="transparent" translucent />

      {/* --- Background Image --- */}
      <Image 
        source={{ uri: ASSETS.background }} 
        style={styles.backgroundImage}
        resizeMode="cover"
      />

      <SafeAreaView style={styles.safeArea}>
        
        {/* --- Top Section: Logo --- */}
        <View style={styles.topSection}>
            <Animated.View 
                style={[
                    styles.logoContainer, 
                    { opacity: fadeAnim, transform: [{ scale: logoScale }] }
                ]}
            >
                <Image
                    source={{ uri: ASSETS.logo }} 
                    resizeMode="contain"
                    style={styles.logo}
                />
            </Animated.View>
        </View>

        {/* --- Bottom Section: Interactive Sheet --- */}
        <Animated.View 
            style={[
                styles.bottomSheet,
                { transform: [{ translateY: sheetSlide }] }
            ]}
        >
            <View style={styles.sheetContent}>
                
                {/* Visual Handle */}
                <View style={styles.handleIndicator} />
                
                {/* Welcome Text */}
                <Text style={styles.welcomeTitle}>Welcome Back!</Text>
                <Text style={styles.welcomeSub}>Login to continue finding your perfect stay.</Text>

                {/* Login Email Button */}
                <Animated.View style={{ transform: [{ scale: btnScalePrimary }], width: '100%' }}>
                    <TouchableOpacity 
                        style={styles.primaryButton}
                        activeOpacity={1}
                        onPress={() => animateButton(btnScalePrimary, () => navigation.navigate('Login'))}
                    >
                        <Text style={styles.primaryBtnText}>Login via Email</Text>
                    </TouchableOpacity>
                </Animated.View>

                {/* Divider */}
                <View style={styles.dividerRow}>
                    <View style={styles.line} />
                    <Text style={styles.orText}>OR</Text>
                    <View style={styles.line} />
                </View>

                {/* Phone Button */}
                <Animated.View style={{ transform: [{ scale: btnScaleSecondary }], width: '100%' }}>
                    <TouchableOpacity 
                        style={styles.secondaryButton}
                        activeOpacity={1}
                        onPress={() => animateButton(btnScaleSecondary, () => navigation.navigate('MobileLogin'))}
                    >
                        <Text style={styles.secondaryBtnText}>Continue via Phone Number</Text>
                    </TouchableOpacity>
                </Animated.View>

                {/* Register Row */}
                <View style={styles.registerRow}>
                    <Text style={styles.regText}>Don't have an account? </Text>
                    <TouchableOpacity onPress={() => navigation.navigate('Register')}>
                        <Text style={styles.regLink}>Register</Text>
                    </TouchableOpacity>
                </View>

                {/* Skip Button */}
                <TouchableOpacity 
                    style={styles.skipButton} 
                    onPress={() => navigation.navigate('HomeRent')}
                    activeOpacity={0.8}
                >
                    <Text style={styles.skipText}>Skip for now</Text>
                </TouchableOpacity>

            </View>
        </Animated.View>

      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  backgroundImage: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: width,
    height: height * 0.65, // Image takes top 65%
  },
  safeArea: {
    flex: 1,
    justifyContent: 'space-between',
  },
  
  // --- Top Section ---
  topSection: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingBottom: 50, // Reduced padding, logo is bigger
  },
  logoContainer: {
    width: width * 0.85, // Increased width for a larger logo
    height: width * 0.6,  // Increased height
    alignItems: 'center',
    justifyContent: 'center',
    // Removed shadow for a cleaner look with the large image
  },
  logo: {
    width: '100%',
    height: '100%',
  },

  // --- Bottom Sheet ---
  bottomSheet: {
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingHorizontal: 24,
    paddingTop: 12,
    paddingBottom: Platform.OS === 'ios' ? 40 : 24,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: -10 },
    shadowOpacity: 0.1,
    shadowRadius: 15,
    elevation: 25,
    // Ensure minimum height to cover bottom area
    minHeight: height * 0.45, 
    justifyContent: 'flex-end'
  },
  sheetContent: {
    alignItems: 'center',
    width: '100%',
  },
  handleIndicator: {
      width: 50,
      height: 5,
      backgroundColor: '#E0E0E0',
      borderRadius: 3,
      marginBottom: 20,
  },
  welcomeTitle: {
      fontSize: 22,
      fontWeight: '800',
      color: '#1F2937',
      marginBottom: 5,
  },
  welcomeSub: {
      fontSize: 14,
      color: '#6B7280',
      marginBottom: 25,
      textAlign: 'center'
  },

  // --- Buttons ---
  primaryButton: {
    backgroundColor: "#FFDD32", // Brand Yellow
    width: '100%',
    paddingVertical: 16,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: "#FFDD32",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.4,
    shadowRadius: 8,
    elevation: 5,
    borderWidth: 1,
    borderColor: 'rgba(0,0,0,0.05)'
  },
  primaryBtnText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#000",
    letterSpacing: 0.5,
  },

  secondaryButton: {
    backgroundColor: "#FFFFFF",
    width: '100%',
    paddingVertical: 16,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#E5E7EB',
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 3,
    elevation: 2,
  },
  secondaryBtnText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#374151",
  },

  // --- Divider ---
  dividerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    marginVertical: 20,
  },
  line: {
    flex: 1,
    height: 1,
    backgroundColor: '#F3F4F6',
  },
  orText: {
    marginHorizontal: 15,
    color: '#9CA3AF',
    fontSize: 12,
    fontWeight: '600',
  },

  // --- Footer Actions ---
  registerRow: {
    flexDirection: 'row',
    marginTop: 25,
    alignItems: 'center',
  },
  regText: {
    color: "#6B7280",
    fontSize: 14,
  },
  regLink: {
    color: "#D32F2F", // Strong Accent Color
    fontSize: 14,
    fontWeight: "bold",
  },

  // --- Skip Button (New Design) ---
  skipButton: {
    marginTop: 25,
    paddingVertical: 12,
    paddingHorizontal: 35,
    borderRadius: 30,
    borderWidth: 1.5,
    borderColor: '#E0E0E0',
    backgroundColor: '#FAFAFA',
  },
  skipText: {
    color: "#757575",
    fontSize: 15,
    fontWeight: "700",
    letterSpacing: 0.5,
  }
});
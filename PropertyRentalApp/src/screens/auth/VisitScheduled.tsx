import React, { useEffect, useRef } from "react";
import { 
  SafeAreaView, 
  View, 
  Image, 
  Text, 
  StyleSheet, 
  TouchableOpacity, 
  StatusBar,
  Platform,
  Animated,
  Easing,
  Dimensions
} from "react-native";
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import type { AuthStackParamList } from '../../navigation/types';

const { width, height } = Dimensions.get('window');

// --- ASSETS ---
const ASSETS = {
    // High Quality 3D Calendar/Success Icon
    scheduled3D: "https://cdn-icons-png.flaticon.com/512/9452/9452264.png",
    backIcon: "https://cdn-icons-png.flaticon.com/512/271/271220.png"
};

interface VisitScheduledProps {
  onBack?: () => void;
}

const VisitScheduled: React.FC<VisitScheduledProps> = (props) => {
  const navigation = useNavigation<NativeStackNavigationProp<AuthStackParamList>>();

  // --- Animations ---
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const scaleAnim = useRef(new Animated.Value(0.5)).current; // Start smaller for pop effect
  const floatAnim = useRef(new Animated.Value(0)).current;
  const progressAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    // 1. Entrance Animation (Pop & Fade)
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 800,
        useNativeDriver: true,
      }),
      Animated.spring(scaleAnim, {
        toValue: 1,
        friction: 5,
        tension: 40,
        useNativeDriver: true,
      })
    ]).start();

    // 2. Floating Loop (Breathing Effect for Icon)
    Animated.loop(
      Animated.sequence([
        Animated.timing(floatAnim, {
          toValue: -15,
          duration: 1500,
          easing: Easing.inOut(Easing.sin),
          useNativeDriver: true,
        }),
        Animated.timing(floatAnim, {
          toValue: 0,
          duration: 1500,
          easing: Easing.inOut(Easing.sin),
          useNativeDriver: true,
        })
      ])
    ).start();

    // 3. Progress Bar Animation (Synced to 3.5s timer)
    Animated.timing(progressAnim, {
      toValue: 1,
      duration: 3500,
      easing: Easing.linear,
      useNativeDriver: false, // Width layout animation
    }).start();

    // 4. Navigation Logic (Preserved)
    const timer = setTimeout(() => {
      navigation.replace('ThankYou');
    }, 3500);

    return () => clearTimeout(timer);
  }, [navigation]);

  // Interpolate Progress Width
  const progressWidth = progressAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['0%', '100%']
  });

  return (
    <>
      {/* 1. Top Safe Area (Yellow) */}
      <SafeAreaView style={{ flex: 0, backgroundColor: "#FFDD32" }} />

      {/* 2. Main Content Area */}
      <SafeAreaView style={styles.container}>
        
        <StatusBar barStyle="dark-content" backgroundColor="#FFDD32" />
        
        <View style={styles.contentContainer}>
          
          {/* Header Row */}
          <View style={styles.headerRow}>
            <TouchableOpacity onPress={props.onBack} style={styles.backButtonContainer}>
              <Image
                source={{ uri: ASSETS.backIcon }} 
                resizeMode="contain"
                style={styles.backIcon}
              />
              <Text style={styles.backText}>Back</Text>
            </TouchableOpacity>
          </View>

          {/* Main Content (Centered) */}
          <View style={styles.centerContent}>
              
              {/* Animated 3D Icon */}
              <Animated.View 
                style={[
                    styles.imageWrapper,
                    { 
                        opacity: fadeAnim, 
                        transform: [{ scale: scaleAnim }, { translateY: floatAnim }] 
                    }
                ]}
              >
                  <View style={styles.glowEffect} />
                  <Image
                    source={{ uri: ASSETS.scheduled3D }}
                    resizeMode="contain"
                    style={styles.mainImage}
                  />
              </Animated.View>
              
              {/* Text Content */}
              <Animated.View style={{ opacity: fadeAnim, transform: [{ translateY: floatAnim }] }}>
                  <Text style={styles.titleText}>Visit Scheduled!</Text>
                  <Text style={styles.subtitleText}>
                      We've locked in your request.{"\n"}Get ready to see your future home.
                  </Text>
              </Animated.View>
          </View>

          {/* Footer Loader */}
          <View style={styles.footer}>
              <Text style={styles.redirectText}>Redirecting to confirmation...</Text>
              <View style={styles.progressBarBg}>
                  <Animated.View style={[styles.progressBarFill, { width: progressWidth }]} />
              </View>
          </View>

        </View>
      </SafeAreaView>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },
  contentContainer: {
      flex: 1,
      justifyContent: 'space-between'
  },
  // Header
  headerRow: {
    alignSelf: "flex-start",
    flexDirection: "row",
    alignItems: "center",
    marginTop: Platform.OS === 'android' ? 20 : 10, 
    marginLeft: 20,
    zIndex: 10
  },
  backButtonContainer: {
    flexDirection: 'row', 
    alignItems: 'center',
    padding: 10,
  },
  backIcon: {
    width: 20,
    height: 20,
    marginRight: 8,
    tintColor: '#333'
  },
  backText: {
    color: "#333",
    fontSize: 16,
    fontWeight: "600",
  },

  // Center Content
  centerContent: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      paddingHorizontal: 30,
      marginTop: -40
  },
  imageWrapper: {
      alignItems: 'center',
      justifyContent: 'center',
      marginBottom: 40,
  },
  glowEffect: {
      position: 'absolute',
      width: 150,
      height: 150,
      borderRadius: 75,
      backgroundColor: '#FFDD32',
      opacity: 0.2,
      transform: [{scale: 1.5}]
  },
  mainImage: {
    width: 220,
    height: 220,
    zIndex: 2
  },
  titleText: {
    color: "#1F2937",
    fontSize: 34,
    fontWeight: "900",
    textAlign: "center",
    marginBottom: 12,
    letterSpacing: 0.5
  },
  subtitleText: {
    color: "#6B7280",
    fontSize: 16,
    textAlign: "center",
    lineHeight: 24,
    fontWeight: "500",
    paddingHorizontal: 10
  },

  // Footer Loader
  footer: {
      paddingBottom: 60,
      paddingHorizontal: 40,
      alignItems: 'center'
  },
  redirectText: {
      color: "#9CA3AF",
      fontSize: 13,
      marginBottom: 12,
      fontWeight: '600',
      textTransform: 'uppercase',
      letterSpacing: 1
  },
  progressBarBg: {
      width: '100%',
      height: 6,
      backgroundColor: '#F3F4F6',
      borderRadius: 10,
      overflow: 'hidden'
  },
  progressBarFill: {
      height: '100%',
      backgroundColor: '#FFDD32',
      borderRadius: 10
  }
});

export default VisitScheduled;
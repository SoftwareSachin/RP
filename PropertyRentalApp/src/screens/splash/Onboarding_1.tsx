import React, { useState, useRef, useEffect } from "react";
import {
  SafeAreaView,
  View,
  Image,
  Text,
  StyleSheet,
  Animated,
  PanResponder,
  Dimensions,
  Easing,
  StatusBar,
} from "react-native";

const { width, height } = Dimensions.get('window');

// Slider Configuration
const BUTTON_WIDTH = width * 0.85;
const BUTTON_HEIGHT = 60;
const THUMB_SIZE = 50;
const PADDING = 5;
const SWIPEABLE_DIMENSIONS = BUTTON_WIDTH - 2 * PADDING;

interface Props {
  onNext?: () => void;
}

export default function WelcomeScreen(props: Props) {
  const { onNext } = props;
  
  // --- Animation States ---
  const [sliderCompleted, setSliderCompleted] = useState(false);
  
  // Entrance Animations
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideUpAnim = useRef(new Animated.Value(50)).current;

  // Slider Animations
  const pan = useRef(new Animated.Value(0)).current;
  const scale = useRef(new Animated.Value(1)).current;

  // --- Effects ---
  useEffect(() => {
    // Trigger Entrance Animation
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 800,
        useNativeDriver: true,
      }),
      Animated.spring(slideUpAnim, {
        toValue: 0,
        friction: 6,
        tension: 40,
        useNativeDriver: true,
      })
    ]).start();
  }, []);

  // --- Pan Responder for Slider ---
  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => !sliderCompleted,
      onMoveShouldSetPanResponder: () => !sliderCompleted,
      onPanResponderGrant: () => {
        pan.setOffset(0);
        pan.setValue(0);
        Animated.spring(scale, {
          toValue: 1.1,
          useNativeDriver: false,
        }).start();
      },
      onPanResponderMove: (_, gestureState) => {
        if (sliderCompleted) return;
        
        let newX = gestureState.dx;
        if (newX < 0) newX = 0;
        if (newX > SWIPEABLE_DIMENSIONS - THUMB_SIZE) newX = SWIPEABLE_DIMENSIONS - THUMB_SIZE;
        
        pan.setValue(newX);
      },
      onPanResponderRelease: (_, gestureState) => {
        if (sliderCompleted) return;

        Animated.spring(scale, { toValue: 1, useNativeDriver: false }).start();

        if (gestureState.dx > SWIPEABLE_DIMENSIONS * 0.6) {
          // Success
          setSliderCompleted(true);
          Animated.timing(pan, {
            toValue: SWIPEABLE_DIMENSIONS - THUMB_SIZE,
            duration: 200,
            easing: Easing.out(Easing.ease),
            useNativeDriver: false,
          }).start(() => {
            if (onNext) onNext();
            else console.log("Navigating...");
          });
        } else {
          // Reset
          Animated.spring(pan, {
            toValue: 0,
            friction: 5,
            tension: 40,
            useNativeDriver: false,
          }).start();
        }
      },
    })
  ).current;

  // Text Opacity for Slider
  const textOpacity = pan.interpolate({
    inputRange: [0, SWIPEABLE_DIMENSIONS / 2],
    outputRange: [1, 0],
    extrapolate: 'clamp'
  });

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFDD32" />
      
      {/* Background Image Layer */}
      <View style={styles.bgDecoration}>
         <Image 
            source={{ uri: "https://storage.googleapis.com/tagjs-prod.appspot.com/v1/sE8iZvpPof/edutom3z_expires_30_days.png" }} 
            style={styles.bgImage}
            resizeMode="cover"
         />
      </View>

      <SafeAreaView style={{ flex: 1 }}>
        <View style={styles.contentContainer}>
            
            {/* --- 1. HERO IMAGE --- */}
            <Animated.View style={[styles.heroContainer, { opacity: fadeAnim, transform: [{ translateY: slideUpAnim }] }]}>
                <Image
                    source={{ uri: "https://storage.googleapis.com/tagjs-prod.appspot.com/v1/sE8iZvpPof/5rqezm7k_expires_30_days.png" }}
                    resizeMode="contain"
                    style={styles.heroImage}
                />
            </Animated.View>

            {/* --- 2. TEXT SECTION --- */}
            <Animated.View style={[styles.textContainer, { opacity: fadeAnim, transform: [{ translateY: slideUpAnim }] }]}>
                <Text style={styles.title}>Welcome to <Text style={styles.brandText}>ClicknBook</Text></Text>
                <Text style={styles.subtitle}>
                    Discover your perfect stay with ease. Comfort and luxury are just a slide away.
                </Text>
            </Animated.View>

            {/* --- 3. MODERN SLIDER --- */}
            <View style={styles.sliderWrapper}>
                <View style={styles.sliderTrack}>
                    
                    {/* Progress Fill (Black trail on Yellow bg) */}
                    <Animated.View 
                        style={[
                            styles.progressFill, 
                            { width: Animated.add(pan, THUMB_SIZE) }
                        ]} 
                    />
                    
                    {/* Helper Text */}
                    <Animated.View style={[styles.sliderTextContainer, { opacity: sliderCompleted ? 0 : textOpacity }]}>
                        <Text style={styles.sliderText}>Slide to Start</Text>
                        <Image 
                            source={{ uri: "https://cdn-icons-png.flaticon.com/512/271/271228.png" }} 
                            style={styles.sliderArrowIcon} 
                        />
                    </Animated.View>

                    {/* Success Text */}
                    {sliderCompleted && (
                        <View style={styles.sliderTextContainer}>
                            <Text style={styles.sliderSuccessText}>Loading...</Text>
                        </View>
                    )}

                    {/* Draggable Thumb */}
                    <Animated.View
                        style={[
                            styles.sliderThumb,
                            { transform: [{ translateX: pan }, { scale: scale }] }
                        ]}
                        {...panResponder.panHandlers}
                    >
                        <Image 
                            source={{ uri: "https://cdn-icons-png.flaticon.com/512/271/271228.png" }} 
                            style={{ width: 20, height: 20, tintColor: '#FFDD32' }} 
                        />
                    </Animated.View>
                </View>
            </View>

        </View>
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFDD32", // Yellow Background
  },
  bgDecoration: {
      position: 'absolute',
      top: 0,
      width: width,
      height: height * 0.55,
      zIndex: -1,
      opacity: 0.2, // Subtle texture overlay
  },
  bgImage: {
      width: '100%',
      height: '100%',
      borderBottomLeftRadius: 40,
      borderBottomRightRadius: 40,
  },
  contentContainer: {
      flex: 1,
      justifyContent: 'space-between',
      alignItems: 'center',
      paddingVertical: 40,
  },
  
  // Hero Section
  heroContainer: {
      flex: 2,
      justifyContent: 'center',
      alignItems: 'center',
      marginTop: 20,
  },
  heroImage: {
      width: width * 0.9,
      height: width * 0.9,
      maxWidth: 380,
      maxHeight: 380,
  },

  // Text Section
  textContainer: {
      flex: 1,
      alignItems: 'center',
      paddingHorizontal: 40,
      justifyContent: 'flex-start',
  },
  title: {
      fontSize: 28,
      fontWeight: '800',
      color: '#000000', // Black for contrast
      textAlign: 'center',
      marginBottom: 10,
  },
  brandText: {
      color: '#FFFFFF', // White accent on Yellow bg
      textShadowColor: 'rgba(0,0,0,0.1)',
      textShadowOffset: { width: 1, height: 1 },
      textShadowRadius: 2,
  },
  subtitle: {
      fontSize: 15,
      color: '#333333', // Dark Grey
      textAlign: 'center',
      lineHeight: 22,
      fontWeight: '600',
  },

  // Slider Section
  sliderWrapper: {
      marginBottom: 50,
      alignItems: 'center',
      justifyContent: 'center',
  },
  sliderTrack: {
      width: BUTTON_WIDTH,
      height: BUTTON_HEIGHT,
      backgroundColor: '#FFFFFF', // White Track
      borderRadius: BUTTON_HEIGHT / 2,
      padding: PADDING,
      justifyContent: 'center',
      borderWidth: 1,
      borderColor: '#FFF',
      position: 'relative',
      overflow: 'hidden',
      elevation: 5,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.2,
      shadowRadius: 5,
  },
  progressFill: {
      position: 'absolute',
      left: 0,
      top: 0,
      bottom: 0,
      backgroundColor: 'rgba(0, 0, 0, 0.1)', // Subtle fill trail
  },
  sliderThumb: {
      width: THUMB_SIZE,
      height: THUMB_SIZE,
      borderRadius: THUMB_SIZE / 2,
      backgroundColor: '#000000', // Black Button
      justifyContent: 'center',
      alignItems: 'center',
      shadowColor: "#000",
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.3,
      shadowRadius: 4,
      elevation: 5,
      zIndex: 2,
  },
  sliderTextContainer: {
      position: 'absolute',
      width: '100%',
      height: '100%',
      justifyContent: 'center',
      alignItems: 'center',
      flexDirection: 'row',
      zIndex: 1,
  },
  sliderText: {
      color: '#333333',
      fontSize: 16,
      fontWeight: '700',
      marginRight: 5,
      letterSpacing: 0.5,
  },
  sliderSuccessText: {
      color: '#000000',
      fontSize: 16,
      fontWeight: 'bold',
  },
  sliderArrowIcon: {
      width: 14,
      height: 14,
      tintColor: '#333333',
      opacity: 0.8
  }
});
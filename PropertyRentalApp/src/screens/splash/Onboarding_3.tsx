import React, { useEffect, useRef } from "react";
import {
  SafeAreaView,
  View,
  Image,
  Text,
  StyleSheet,
  TouchableOpacity,
  Animated,
  Easing,
  Dimensions,
  StatusBar,
} from "react-native";

const { width, height } = Dimensions.get("window");

interface NavigationLike {
  navigate?: (screen: string, params?: any) => void;
}

interface Props {
  onSkip?: () => void;
  onNext?: () => void;
  navigation?: NavigationLike;
}

export default function OnboardingStepTwo(props: Props) {
  const { onSkip, onNext, navigation } = props || {};

  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideUpAnim = useRef(new Animated.Value(50)).current;
  const scaleAnim = useRef(new Animated.Value(0.9)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 800,
        useNativeDriver: true,
      }),
      Animated.timing(slideUpAnim, {
        toValue: 0,
        duration: 800,
        easing: Easing.out(Easing.back(1.5)),
        useNativeDriver: true,
      }),
      Animated.spring(scaleAnim, {
        toValue: 1,
        friction: 7,
        tension: 40,
        useNativeDriver: true,
      }),
    ]).start();
  }, []);

  function handleSkip() {
    if (onSkip) onSkip();
    else if (navigation?.navigate) navigation.navigate("Home");
  }

  function handleNext() {
    if (onNext) onNext();
    else if (navigation?.navigate) navigation.navigate("OnboardingStepThree"); // Or Finish
  }

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />

      {/* Decoration */}
      <Image
        source={{ uri: "https://storage.googleapis.com/tagjs-prod.appspot.com/v1/sE8iZvpPof/4k41j3kd_expires_30_days.png" }}
        style={styles.bgDecoration}
        resizeMode="cover"
      />

      <View style={styles.contentContainer}>
        
        {/* Illustration - Updated Image Source */}
        <Animated.View 
          style={[
            styles.imageContainer, 
            { opacity: fadeAnim, transform: [{ scale: scaleAnim }] }
          ]}
        >
          <Image
            source={{ uri: "https://storage.googleapis.com/tagjs-prod.appspot.com/v1/sE8iZvpPof/xw1llfgj_expires_30_days.png" }}
            style={styles.mainImage}
            resizeMode="contain"
          />
        </Animated.View>

        {/* Text & Dots */}
        <Animated.View 
          style={[
            styles.textContainer, 
            { opacity: fadeAnim, transform: [{ translateY: slideUpAnim }] }
          ]}
        >
          <Text style={styles.title}>Discover Properties</Text>
          <Text style={styles.subtitle}>
            Browse through thousands of listings and find the perfect place to call home.
          </Text>

          {/* Pagination Dots (2nd Active) */}
          <View style={styles.paginationRow}>
            <View style={styles.dot} />
            <View style={[styles.dot, styles.activeDot]} />
            <View style={styles.dot} />
          </View>
        </Animated.View>

      </View>

      {/* Footer */}
      <View style={styles.footer}>
        <TouchableOpacity onPress={handleSkip} style={styles.skipButton}>
          <Text style={styles.skipText}>Skip</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={handleNext} style={styles.nextButton} activeOpacity={0.8}>
          <Text style={styles.nextText}>Next</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },
  bgDecoration: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: height * 0.5,
    opacity: 0.3,
  },
  contentContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 24,
  },
  imageContainer: {
    marginBottom: 40,
    shadowColor: "#FFDD32",
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.3,
    shadowRadius: 20,
    elevation: 10,
  },
  mainImage: {
    width: width * 0.8,
    height: width * 0.8,
    maxWidth: 350,
    maxHeight: 350,
  },
  textContainer: { alignItems: 'center', width: '100%' },
  title: {
    fontSize: 28,
    fontWeight: "800",
    color: "#1F2937",
    textAlign: 'center',
    marginBottom: 12,
  },
  subtitle: {
    fontSize: 16,
    color: "#6B7280",
    textAlign: "center",
    lineHeight: 24,
    marginBottom: 30,
    paddingHorizontal: 10,
  },
  paginationRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: "#E5E7EB",
    marginHorizontal: 6,
  },
  activeDot: {
    width: 24,
    backgroundColor: "#FFDD32",
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 30,
    paddingBottom: 40,
    paddingTop: 20,
  },
  skipButton: { padding: 12 },
  skipText: { fontSize: 16, fontWeight: "600", color: "#9CA3AF" },
  nextButton: {
    backgroundColor: "#FFDD32",
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 25,
    shadowColor: "#FFDD32",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.4,
    shadowRadius: 8,
    elevation: 5,
  },
  nextText: { fontSize: 16, fontWeight: "bold", color: "#000000" },
});
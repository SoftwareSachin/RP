import React, { useEffect, useRef } from "react";
import {
  SafeAreaView,
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  Animated,
  Dimensions,
  StatusBar,
  Vibration,
  Easing,
  ScrollView,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import type { AuthStackParamList } from '../../navigation/types';

const { width, height } = Dimensions.get("window");

// --- ASSETS ---
const ASSETS = {
    success3D: "https://cdn-icons-png.flaticon.com/512/7518/7518748.png", 
    home: "https://cdn-icons-png.flaticon.com/512/1946/1946436.png",
    share: "https://cdn-icons-png.flaticon.com/512/1358/1358023.png",
    confetti: "https://cdn-icons-png.flaticon.com/512/1139/1139982.png"
};

export default function TransactionSuccess() {
  const navigation = useNavigation<NativeStackNavigationProp<AuthStackParamList>>();

  // --- Animations ---
  const scaleAnim = useRef(new Animated.Value(0)).current;
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideUpAnim = useRef(new Animated.Value(100)).current;
  const rotateAnim = useRef(new Animated.Value(0)).current;
  const floatAnim = useRef(new Animated.Value(0)).current; // Y-axis float
  const pulseAnim = useRef(new Animated.Value(1)).current; // Subtle scale pulse

  // Confetti Anims
  const confettiY = useRef(new Animated.Value(0)).current;
  const confettiOpacity = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    Vibration.vibrate([0, 50, 50, 50]);

    // 1. Entrance Sequence
    Animated.sequence([
        // Icon Pop with Spring
        Animated.spring(scaleAnim, {
            toValue: 1,
            friction: 6,
            tension: 50,
            useNativeDriver: true,
        }),
        // Text & Ticket Fade In
        Animated.parallel([
            Animated.timing(fadeAnim, {
                toValue: 1,
                duration: 600,
                useNativeDriver: true,
            }),
            Animated.timing(slideUpAnim, {
                toValue: 0,
                duration: 700,
                easing: Easing.out(Easing.cubic),
                useNativeDriver: true,
            })
        ])
    ]).start();

    // 2. Background Sunburst Rotation
    Animated.loop(
        Animated.timing(rotateAnim, {
            toValue: 1,
            duration: 15000, // Slow rotation
            easing: Easing.linear,
            useNativeDriver: true,
        })
    ).start();

    // 3. Continuous Floating & Breathing Animation for Icon
    const floatSequence = Animated.sequence([
        Animated.timing(floatAnim, {
            toValue: -15,
            duration: 2000,
            easing: Easing.inOut(Easing.sin),
            useNativeDriver: true,
        }),
        Animated.timing(floatAnim, {
            toValue: 0,
            duration: 2000,
            easing: Easing.inOut(Easing.sin),
            useNativeDriver: true,
        })
    ]);

    const pulseSequence = Animated.sequence([
        Animated.timing(pulseAnim, {
            toValue: 1.05,
            duration: 2000,
            easing: Easing.inOut(Easing.sin),
            useNativeDriver: true,
        }),
        Animated.timing(pulseAnim, {
            toValue: 1,
            duration: 2000,
            easing: Easing.inOut(Easing.sin),
            useNativeDriver: true,
        })
    ]);

    Animated.loop(Animated.parallel([floatSequence, pulseSequence])).start();


    // 4. Falling Confetti
    Animated.parallel([
        Animated.timing(confettiY, {
            toValue: height,
            duration: 4000,
            easing: Easing.linear,
            useNativeDriver: true
        }),
        Animated.timing(confettiOpacity, {
            toValue: 0,
            duration: 3500,
            delay: 500,
            useNativeDriver: true
        })
    ]).start();

  }, []);

  const spin = rotateAnim.interpolate({
      inputRange: [0, 1],
      outputRange: ['0deg', '360deg']
  });

  const handleHome = () => {
      navigation.reset({
        index: 0,
        routes: [{ name: 'HomeRent' }],
      });
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFF" />

      {/* --- BACKGROUND EFFECTS --- */}
      <Animated.View style={[styles.sunburst, { transform: [{ rotate: spin }] }]} />
      
      <Animated.View style={[styles.confettiContainer, { opacity: confettiOpacity, transform: [{ translateY: confettiY }] }]}>
          <Image source={{ uri: ASSETS.confetti }} style={[styles.confetti, { left: 50 }]} />
          <Image source={{ uri: ASSETS.confetti }} style={[styles.confetti, { right: 50, top: 100 }]} />
          <Image source={{ uri: ASSETS.confetti }} style={[styles.confetti, { left: 150, top: -50 }]} />
          <Image source={{ uri: ASSETS.confetti }} style={[styles.confetti, { right: 150, top: 50 }]} />
      </Animated.View>

      <SafeAreaView style={styles.safeArea}>
        <ScrollView contentContainerStyle={styles.contentContainer} showsVerticalScrollIndicator={false}>
            
            <View style={styles.spacer} />

            {/* 1. SUCCESS ICON (Animated Float & Scale) */}
            <Animated.View 
                style={[
                    styles.iconWrapper, 
                    { 
                        transform: [
                            { scale: scaleAnim }, // Initial pop
                            { translateY: floatAnim }, // Continuous float
                            { scaleX: pulseAnim }, // Continuous breathing
                            { scaleY: pulseAnim }
                        ] 
                    }
                ]}
            >
                <View style={styles.glow} />
                <Image source={{ uri: ASSETS.success3D }} style={styles.successIcon} resizeMode="contain" />
            </Animated.View>

            {/* 2. SUCCESS TEXT */}
            <Animated.View style={{ opacity: fadeAnim, alignItems: 'center', marginTop: 20 }}>
                <Text style={styles.title}>Payment Successful!</Text>
                <Text style={styles.subtitle}>Your booking has been confirmed.</Text>
            </Animated.View>

            {/* 3. RECEIPT TICKET */}
            <Animated.View 
                style={[
                    styles.ticketContainer, 
                    { transform: [{ translateY: slideUpAnim }], opacity: fadeAnim }
                ]}
            >
                {/* Top Half */}
                <View style={styles.ticketTop}>
                    <Text style={styles.amountLabel}>Total Paid</Text>
                    <Text style={styles.amountValue}>₹49,000</Text>
                    <View style={styles.dividerDash} />
                </View>

                {/* Bottom Half */}
                <View style={styles.ticketBottom}>
                    <View style={styles.row}>
                        <Text style={styles.label}>Ref ID</Text>
                        <Text style={styles.value}>#885923048</Text>
                    </View>
                    <View style={styles.row}>
                        <Text style={styles.label}>Date</Text>
                        <Text style={styles.value}>24 Nov, 10:30 AM</Text>
                    </View>
                    <View style={styles.row}>
                        <Text style={styles.label}>Method</Text>
                        <Text style={styles.value}>Credit Card</Text>
                    </View>
                    <View style={styles.row}>
                        <Text style={styles.label}>To</Text>
                        <Text style={styles.value}>Kdms Skywalk</Text>
                    </View>
                </View>

                {/* Cutout Circles */}
                <View style={[styles.cutout, { left: -20, top: '45%' }]} />
                <View style={[styles.cutout, { right: -20, top: '45%' }]} />
            </Animated.View>

        </ScrollView>

        {/* 4. FOOTER ACTIONS */}
        <Animated.View style={[styles.footer, { opacity: fadeAnim }]}>
            <TouchableOpacity style={styles.secondaryBtn} onPress={() => alert("Receipt Shared!")}>
                <Image source={{uri: ASSETS.share}} style={styles.btnIconSmall} />
                <Text style={styles.secondaryBtnText}>Share Receipt</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.primaryBtn} onPress={handleHome}>
                <Text style={styles.primaryBtnText}>Done</Text>
            </TouchableOpacity>
        </Animated.View>

      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    overflow: 'hidden'
  },
  safeArea: { flex: 1 },
  
  // Background Effects
  sunburst: {
      position: 'absolute',
      top: -width * 0.5,
      left: -width * 0.5,
      width: width * 2,
      height: width * 2,
      backgroundColor: 'rgba(255, 221, 50, 0.05)', 
      borderRadius: width,
      borderWidth: 50,
      borderColor: 'rgba(255, 221, 50, 0.02)',
      borderStyle: 'dotted',
  },
  confettiContainer: {
      position: 'absolute',
      top: -100,
      left: 0,
      right: 0,
      height: height,
      zIndex: 0
  },
  confetti: {
      position: 'absolute',
      width: 20,
      height: 20,
      tintColor: '#FFDD32'
  },

  contentContainer: {
      alignItems: 'center',
      paddingHorizontal: 24,
      paddingBottom: 120
  },
  spacer: { height: height * 0.05 }, // Adjusted spacer

  // Icon
  iconWrapper: {
      marginBottom: 30, // Increased bottom margin to prevent clashing with text
      justifyContent: 'center',
      alignItems: 'center',
      height: 140 // Explicit height container
  },
  successIcon: {
      width: 140,
      height: 140,
      zIndex: 10
  },
  glow: {
      position: 'absolute',
      width: 160,
      height: 160,
      borderRadius: 80,
      backgroundColor: '#FFDD32',
      opacity: 0.2,
      transform: [{scale: 1.2}]
  },

  // Typography
  title: {
      fontSize: 28,
      fontWeight: '900',
      color: '#1F2937',
      marginBottom: 8,
      textAlign: 'center'
  },
  subtitle: {
      fontSize: 16,
      color: '#6B7280',
      marginBottom: 40,
      textAlign: 'center'
  },

  // Ticket
  ticketContainer: {
      width: '100%',
      backgroundColor: '#F9FAFB',
      borderRadius: 24,
      padding: 0,
      shadowColor: "#000",
      shadowOffset: { width: 0, height: 10 },
      shadowOpacity: 0.1,
      shadowRadius: 20,
      elevation: 10,
      position: 'relative',
      borderWidth: 1,
      borderColor: '#EEE'
  },
  ticketTop: {
      alignItems: 'center',
      paddingVertical: 30,
      borderBottomWidth: 1,
      borderBottomColor: '#E5E7EB',
      borderStyle: 'dashed', 
      backgroundColor: '#FFF',
      borderTopLeftRadius: 24,
      borderTopRightRadius: 24
  },
  amountLabel: { fontSize: 14, color: '#9CA3AF', fontWeight: '600', textTransform: 'uppercase', letterSpacing: 1 },
  amountValue: { fontSize: 40, color: '#1F2937', fontWeight: '900', marginVertical: 5 },
  
  ticketBottom: {
      padding: 24,
      backgroundColor: '#F9FAFB',
      borderBottomLeftRadius: 24,
      borderBottomRightRadius: 24
  },
  row: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginBottom: 15
  },
  label: { fontSize: 14, color: '#6B7280', fontWeight: '500' },
  value: { fontSize: 15, color: '#111', fontWeight: '700' },

  // Ticket Cutouts
  cutout: {
      position: 'absolute',
      width: 40,
      height: 40,
      borderRadius: 20,
      backgroundColor: '#FFF', 
      zIndex: 10,
      shadowColor: "#000", shadowOffset: {width: 0, height: 2}, shadowOpacity: 0.05, shadowRadius: 2
  },
  dividerDash: {
      position: 'absolute',
      bottom: -1,
      left: 20, 
      right: 20,
      height: 1,
      borderWidth: 1,
      borderColor: '#DDD',
      borderStyle: 'dashed',
      zIndex: 5
  },

  // Footer
  footer: {
      position: 'absolute',
      bottom: 30,
      left: 20,
      right: 20,
      flexDirection: 'row',
      justifyContent: 'space-between',
      gap: 15
  },
  secondaryBtn: {
      flex: 1,
      flexDirection: 'row',
      backgroundColor: '#FFF',
      paddingVertical: 16,
      borderRadius: 16,
      justifyContent: 'center',
      alignItems: 'center',
      borderWidth: 1,
      borderColor: '#E5E7EB',
      shadowColor: "#000", shadowOffset: {width: 0, height: 2}, shadowOpacity: 0.05, shadowRadius: 5, elevation: 2
  },
  btnIconSmall: { width: 18, height: 18, marginRight: 8, tintColor: '#333' },
  secondaryBtnText: { fontSize: 16, fontWeight: 'bold', color: '#374151' },

  primaryBtn: {
      flex: 1,
      backgroundColor: '#FFDD32',
      paddingVertical: 16,
      borderRadius: 16,
      justifyContent: 'center',
      alignItems: 'center',
      shadowColor: "#FFDD32", shadowOffset: {width: 0, height: 4}, shadowOpacity: 0.4, shadowRadius: 10, elevation: 5
  },
  primaryBtnText: { fontSize: 16, fontWeight: 'bold', color: '#000' },
});
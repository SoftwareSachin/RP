import React, { useEffect, useRef } from "react";
import { 
  SafeAreaView, 
  View, 
  Image, 
  Text, 
  StyleSheet, 
  Animated, 
  Easing, 
  StatusBar,
  Dimensions 
} from "react-native";

const { width, height } = Dimensions.get("window");

interface Props {}

export default (props: Props) => {
    // --- Animation Values ---
    const logoScale = useRef(new Animated.Value(0)).current;
    const pulse1 = useRef(new Animated.Value(1)).current;
    const pulse2 = useRef(new Animated.Value(1)).current;
    
    const textTranslateY = useRef(new Animated.Value(40)).current;
    const textOpacity = useRef(new Animated.Value(0)).current;
    
    const loaderWidth = useRef(new Animated.Value(0)).current;

    useEffect(() => {
        // 1. Background Pulse Loops (Sonar Effect)
        const createPulse = (animValue: Animated.Value, delay: number) => {
            return Animated.loop(
                Animated.sequence([
                    Animated.timing(animValue, {
                        toValue: 1.5,
                        duration: 2000,
                        delay: delay,
                        easing: Easing.out(Easing.ease),
                        useNativeDriver: true,
                    }),
                    Animated.timing(animValue, {
                        toValue: 1,
                        duration: 0, // Instant reset
                        useNativeDriver: true,
                    })
                ])
            );
        };

        createPulse(pulse1, 0).start();
        createPulse(pulse2, 1000).start();

        // 2. Entrance Sequence
        Animated.sequence([
            // Logo Spring Entrance
            Animated.spring(logoScale, {
                toValue: 1,
                friction: 5,
                tension: 80,
                useNativeDriver: true,
            }),
            // Text Fade In & Slide Up
            Animated.parallel([
                Animated.timing(textTranslateY, {
                    toValue: 0,
                    duration: 800,
                    easing: Easing.out(Easing.exp),
                    useNativeDriver: true,
                }),
                Animated.timing(textOpacity, {
                    toValue: 1,
                    duration: 800,
                    useNativeDriver: true,
                }),
                // Bottom Loader Expansion
                Animated.timing(loaderWidth, {
                    toValue: 1,
                    duration: 1500,
                    easing: Easing.inOut(Easing.ease),
                    useNativeDriver: false, // Width layout animation
                })
            ]),
        ]).start();
    }, []);

    // Interpolate for Opacity of pulses (Fade out as they expand)
    const pulseOpacity1 = pulse1.interpolate({ inputRange: [1, 1.5], outputRange: [0.4, 0] });
    const pulseOpacity2 = pulse2.interpolate({ inputRange: [1, 1.5], outputRange: [0.4, 0] });
    
    // Interpolate Loader Width
    const loaderWidthInterp = loaderWidth.interpolate({
        inputRange: [0, 1],
        outputRange: ['0%', '30%'] // Grows to 30% of container
    });

    return (
        <SafeAreaView style={styles.container}>
            <StatusBar barStyle="dark-content" backgroundColor="#FFDD32" />
            
            <View style={styles.contentContainer}>
                
                {/* --- Background Sonar Rings --- */}
                <Animated.View 
                    style={[
                        styles.pulseRing, 
                        { transform: [{ scale: pulse1 }], opacity: pulseOpacity1 }
                    ]} 
                />
                <Animated.View 
                    style={[
                        styles.pulseRing, 
                        { transform: [{ scale: pulse2 }], opacity: pulseOpacity2 }
                    ]} 
                />

                {/* --- Main Logo --- */}
                <Animated.View 
                    style={[
                        styles.imageContainer, 
                        { transform: [{ scale: logoScale }] }
                    ]}
                >
                    <Image
                        source={{ uri: "https://storage.googleapis.com/tagjs-prod.appspot.com/v1/sE8iZvpPof/3cri61cu_expires_30_days.png" }}
                        resizeMode="contain"
                        style={styles.image}
                    />
                </Animated.View>

                {/* --- Text Group --- */}
                <Animated.View 
                    style={{ 
                        opacity: textOpacity, 
                        transform: [{ translateY: textTranslateY }],
                        alignItems: 'center',
                        marginTop: 20
                    }}
                >
                    <Text style={styles.titleText}>
                        ClicknBook <Text style={styles.brandText}>Home</Text>
                    </Text>
                    
                    <View style={styles.separator} />
                    
                    <Text style={styles.subtitle}>
                        Your Comfort, Our Priority
                    </Text>
                </Animated.View>

            </View>

            {/* --- Bottom Loader --- */}
            <View style={styles.footer}>
                <Animated.View style={[styles.loadingBar, { width: loaderWidthInterp }]} />
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#FFDD32", // Brand Yellow
        alignItems: 'center',
        justifyContent: 'center'
    },
    contentContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        width: '100%',
    },
    
    // Pulse Effect
    pulseRing: {
        position: 'absolute',
        width: 280,
        height: 280,
        borderRadius: 140,
        backgroundColor: '#FFFFFF',
        top: height * 0.25, // Approx center behind logo
        zIndex: 0,
    },

    imageContainer: {
        marginBottom: 15,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 15 },
        shadowOpacity: 0.2,
        shadowRadius: 25,
        elevation: 20,
        zIndex: 10
    },
    image: {
        width: width * 0.75,
        height: width * 0.65,
        maxWidth: 350,
        maxHeight: 300,
    },

    // Typography
    titleText: {
        color: "#111",
        fontSize: 36,
        fontWeight: "900",
        textAlign: "center",
        letterSpacing: -1,
    },
    brandText: {
        color: "#FFF", // White pop on yellow
        fontSize: 36,
        fontWeight: "900",
        textShadowColor: 'rgba(0,0,0,0.1)',
        textShadowOffset: { width: 2, height: 2 },
        textShadowRadius: 5,
    },
    separator: {
        width: 40,
        height: 5,
        backgroundColor: "#111",
        borderRadius: 3,
        marginTop: 10,
        marginBottom: 10,
    },
    subtitle: {
        color: "#333", 
        fontSize: 14,
        fontWeight: "700",
        letterSpacing: 2,
        textTransform: "uppercase",
        opacity: 0.8
    },

    // Footer Loader
    footer: {
        position: "absolute",
        bottom: 50,
        width: '100%',
        alignItems: "center",
    },
    loadingBar: {
        height: 6,
        backgroundColor: "#000",
        borderRadius: 3,
    }
});
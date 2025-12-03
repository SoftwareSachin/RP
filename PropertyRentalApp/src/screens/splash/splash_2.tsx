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
    // Animation Values
    const fadeAnim = useRef(new Animated.Value(0)).current;
    const scaleAnim = useRef(new Animated.Value(0.3)).current;
    const textTranslateY = useRef(new Animated.Value(20)).current; // Text slides up
    const textOpacity = useRef(new Animated.Value(0)).current;

    useEffect(() => {
        // 1. Animate Logo (Scale + Fade)
        Animated.sequence([
            Animated.parallel([
                Animated.timing(fadeAnim, {
                    toValue: 1,
                    duration: 800,
                    useNativeDriver: true,
                }),
                Animated.spring(scaleAnim, {
                    toValue: 1,
                    friction: 6,
                    tension: 40,
                    useNativeDriver: true,
                }),
            ]),
            // 2. Animate Text (Slide Up + Fade)
            Animated.parallel([
                Animated.timing(textOpacity, {
                    toValue: 1,
                    duration: 600,
                    useNativeDriver: true,
                }),
                Animated.timing(textTranslateY, {
                    toValue: 0,
                    duration: 600,
                    easing: Easing.out(Easing.ease),
                    useNativeDriver: true,
                }),
            ])
        ]).start();
    }, []);

    return (
        <SafeAreaView style={styles.container}>
            <StatusBar barStyle="dark-content" backgroundColor="#FFF" />
            
            <View style={styles.contentContainer}>
                {/* Animated Logo */}
                <Animated.View 
                    style={[
                        styles.logoContainer, 
                        { 
                            opacity: fadeAnim, 
                            transform: [{ scale: scaleAnim }] 
                        }
                    ]}
                >
                    <Image
                        source={{ uri: "https://storage.googleapis.com/tagjs-prod.appspot.com/v1/sE8iZvpPof/svoz6ch5_expires_30_days.png" }}
                        resizeMode="contain" // Changed to contain to prevent distortion
                        style={styles.image}
                    />
                </Animated.View>

                {/* Animated Text Group */}
                <Animated.View 
                    style={[
                        styles.textContainer, 
                        { 
                            opacity: textOpacity, 
                            transform: [{ translateY: textTranslateY }] 
                        }
                    ]}
                >
                    <Text style={styles.titleText}>
                        ClicknBook <Text style={styles.brandText}>Home</Text>
                    </Text>
                    
                    {/* Modern Tagline */}
                    <Text style={styles.tagline}>
                        Find your perfect stay
                    </Text>
                </Animated.View>
            </View>

            {/* Optional: Bottom Footer/Version */}
            <View style={styles.footer}>
                <View style={styles.loadingLine} />
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#FFFFFF",
    },
    contentContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        paddingHorizontal: 20,
    },
    logoContainer: {
        shadowColor: "#FFDD32",
        shadowOffset: { width: 0, height: 10 },
        shadowOpacity: 0.2,
        shadowRadius: 20,
        elevation: 10, // Android shadow
        marginBottom: 30,
    },
    image: {
        width: width * 0.8, // Responsive width (80% of screen)
        height: width * 0.7, // Keep aspect ratio
        maxWidth: 350,
        maxHeight: 300,
    },
    textContainer: {
        alignItems: "center",
    },
    titleText: {
        color: "#1F2937", // Dark Grey/Black
        fontSize: 32,
        fontWeight: "800",
        textAlign: "center",
        letterSpacing: 0.5,
    },
    brandText: {
        color: "#FFDD32", // Your App's Brand Yellow
        fontSize: 32,
        fontWeight: "800",
        // Text Stroke/Shadow for readability if on white
        textShadowColor: 'rgba(0, 0, 0, 0.1)',
        textShadowOffset: { width: 1, height: 1 },
        textShadowRadius: 1,
    },
    tagline: {
        marginTop: 10,
        color: "#9CA3AF", // Cool Grey
        fontSize: 16,
        fontWeight: "500",
        letterSpacing: 1.2,
        textTransform: 'uppercase'
    },
    footer: {
        position: 'absolute',
        bottom: 50,
        alignItems: 'center',
        width: '100%'
    },
    loadingLine: {
        width: 40,
        height: 4,
        backgroundColor: '#FFDD32',
        borderRadius: 2
    }
});
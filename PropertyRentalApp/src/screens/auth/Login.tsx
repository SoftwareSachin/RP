import React, { useState, useEffect, useRef } from "react";
import { 
  SafeAreaView, 
  View, 
  ImageBackground, 
  ScrollView, 
  Image, 
  Text, 
  TouchableOpacity, 
  TextInput, 
  Alert, 
  StyleSheet, 
  Dimensions, 
  StatusBar, 
  KeyboardAvoidingView, 
  Platform,
  Animated,
  Easing,
  ActivityIndicator,
  Keyboard,
  TouchableWithoutFeedback,
  LayoutAnimation,
  UIManager
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { AuthStackParamList } from "../../navigation/types";

import { useAuthContext } from "../../context/AuthContext";

// Enable LayoutAnimation for Android
if (Platform.OS === 'android') {
  if (UIManager.setLayoutAnimationEnabledExperimental) {
    UIManager.setLayoutAnimationEnabledExperimental(true);
  }
}

const { width, height } = Dimensions.get("window");

// --- Assets ---
const ASSETS = {
    headerBg: "https://storage.googleapis.com/tagjs-prod.appspot.com/v1/kwi0sLffHL/k5agtif3_expires_30_days.png",
    logo: "https://storage.googleapis.com/tagjs-prod.appspot.com/v1/kwi0sLffHL/fo43lzyd_expires_30_days.png",
    
    // High-Quality Social Icons
    google: "https://img.icons8.com/color/96/google-logo.png",
    facebook: "https://img.icons8.com/color/96/facebook-new.png",
    apple: "https://img.icons8.com/ios-filled/96/000000/mac-os.png",
    
    // UI Icons
    emailIcon: "https://cdn-icons-png.flaticon.com/512/542/542638.png",
    lockIcon: "https://cdn-icons-png.flaticon.com/512/3064/3064197.png",
    eyeOpen: "https://cdn-icons-png.flaticon.com/512/709/709612.png",
    eyeClosed: "https://cdn-icons-png.flaticon.com/512/2767/2767146.png",
    checkSuccess: "https://cdn-icons-png.flaticon.com/512/14876/14876743.png", // Green Check
    errorIcon: "https://cdn-icons-png.flaticon.com/512/1828/1828843.png" // Red Alert
};

export default function Login() {
    const navigation = useNavigation<StackNavigationProp<AuthStackParamList, "Login">>();
    
    const { login } = useAuthContext();
    
    // --- State ---
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [isPasswordVisible, setIsPasswordVisible] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    
    // Validation State
    const [emailError, setEmailError] = useState("");
    const [passwordError, setPasswordError] = useState("");
    const [isEmailValid, setIsEmailValid] = useState(false);

    // Animation Values
    const fadeAnim = useRef(new Animated.Value(0)).current;
    const slideUpAnim = useRef(new Animated.Value(50)).current;
    const btnScale = useRef(new Animated.Value(1)).current;

    // --- Effects ---
    useEffect(() => {
        Animated.parallel([
            Animated.timing(fadeAnim, { toValue: 1, duration: 800, useNativeDriver: true }),
            Animated.timing(slideUpAnim, { toValue: 0, duration: 800, easing: Easing.out(Easing.back(1.5)), useNativeDriver: true })
        ]).start();
    }, []);

    // Live Validation
    useEffect(() => {
        if (email.length > 0) {
            const emailRegex = /\S+@\S+\.\S+/;
            setIsEmailValid(emailRegex.test(email));
            if(emailRegex.test(email)) setEmailError("");
        } else {
            setIsEmailValid(false);
        }
    }, [email]);

    // --- Handlers ---

    const validateInputs = () => {
        let isValid = true;
        LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);

        if (!email) {
            setEmailError("Email is required");
            isValid = false;
        } else if (!isEmailValid) {
            setEmailError("Please enter a valid email");
            isValid = false;
        } else {
            setEmailError("");
        }

        if (!password) {
            setPasswordError("Password is required");
            isValid = false;
        } else if (password.length < 6) {
            setPasswordError("Password must be at least 6 characters");
            isValid = false;
        } else {
            setPasswordError("");
        }

        return isValid;
    };

    const handleLogin = async () => {
        Keyboard.dismiss();
        if (!validateInputs()) return;

        // Start Loading
        setIsLoading(true);
        
        try {
            const { success, error } = await login({ email, password });

            if (success) {
                Alert.alert("Success", "Login Successful!", [
                    { text: "OK", onPress: () => navigation.navigate("HomeRent") }
                ]);
            } else {
                Alert.alert("Login Failed", error || "Invalid email or password");
            }
        } catch (err) {
            const message = err instanceof Error ? err.message : "Login failed";
            Alert.alert("Login Failed", message);
        } finally {
            setIsLoading(false);
        }
    };

    const handleSocialLogin = (platform: string) => {
        Alert.alert(platform, `Authenticating with ${platform}...`);
    };

    const onPressIn = () => {
        Animated.spring(btnScale, { toValue: 0.95, useNativeDriver: true }).start();
    };

    const onPressOut = () => {
        Animated.spring(btnScale, { toValue: 1, useNativeDriver: true }).start();
    };

    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <View style={styles.mainContainer}>
                <StatusBar barStyle="light-content" backgroundColor="transparent" translucent />

                <ImageBackground
                    source={{ uri: ASSETS.headerBg }}
                    resizeMode="cover"
                    style={styles.headerBackground}
                >
                    <Animated.View 
                        style={[
                            styles.logoContainer, 
                            { opacity: fadeAnim, transform: [{ translateY: slideUpAnim }] }
                        ]}
                    >
                        <Image source={{ uri: ASSETS.logo }} resizeMode="contain" style={styles.logo} />
                    </Animated.View>
                </ImageBackground>

                {/* White Content Card */}
                <Animated.View 
                    style={[
                        styles.contentContainer,
                        { opacity: fadeAnim, transform: [{ translateY: slideUpAnim }] }
                    ]}
                >
                    <KeyboardAvoidingView 
                        behavior={Platform.OS === "ios" ? "padding" : undefined} 
                        style={{ flex: 1 }}
                    >
                        <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
                            
                            <Text style={styles.title}>Login to your account</Text>

                            {/* --- Email Input --- */}
                            <Text style={styles.label}>Email</Text>
                            <View style={[
                                styles.inputWrapper, 
                                emailError ? styles.inputError : (isEmailValid ? styles.inputSuccess : null)
                            ]}>
                                <Image source={{ uri: ASSETS.emailIcon }} style={styles.inputIcon} />
                                <TextInput
                                    value={email}
                                    onChangeText={setEmail}
                                    placeholder="Enter your email"
                                    placeholderTextColor="#999"
                                    keyboardType="email-address"
                                    autoCapitalize="none"
                                    style={styles.input}
                                />
                                {isEmailValid && <Image source={{uri: ASSETS.checkSuccess}} style={styles.validIcon} />}
                            </View>
                            {emailError ? <Text style={styles.errorText}>{emailError}</Text> : null}

                            {/* --- Password Input --- */}
                            <Text style={styles.label}>Password</Text>
                            <View style={[styles.inputWrapper, passwordError ? styles.inputError : null]}>
                                <Image source={{ uri: ASSETS.lockIcon }} style={styles.inputIcon} />
                                <TextInput
                                    value={password}
                                    onChangeText={(text) => { setPassword(text); if(text.length >=6) setPasswordError(""); }}
                                    placeholder="Enter your password"
                                    placeholderTextColor="#999"
                                    secureTextEntry={!isPasswordVisible}
                                    style={styles.input}
                                />
                                <TouchableOpacity onPress={() => setIsPasswordVisible(!isPasswordVisible)} style={{padding: 5}}>
                                    <Image 
                                        source={{ uri: isPasswordVisible ? ASSETS.eyeOpen : ASSETS.eyeClosed }} 
                                        style={styles.eyeIcon} 
                                    />
                                </TouchableOpacity>
                            </View>
                            {passwordError ? <Text style={styles.errorText}>{passwordError}</Text> : null}

                            {/* Forgot Password */}
                            <TouchableOpacity 
                                style={styles.forgotContainer} 
                                onPress={() => Alert.alert("Reset Password", "Redirecting...")}
                            >
                                <Text style={styles.forgotText}>Forgot Password?</Text>
                            </TouchableOpacity>

                            {/* Login Button */}
                            <Animated.View style={{ transform: [{ scale: btnScale }] }}>
                                <TouchableOpacity 
                                    style={[styles.loginButton, isLoading && {opacity: 0.8}]} 
                                    onPress={handleLogin}
                                    onPressIn={onPressIn}
                                    onPressOut={onPressOut}
                                    activeOpacity={1}
                                    disabled={isLoading}
                                >
                                    {isLoading ? (
                                        <ActivityIndicator color="#000" />
                                    ) : (
                                        <Text style={styles.loginButtonText}>Login</Text>
                                    )}
                                </TouchableOpacity>
                            </Animated.View>

                            {/* Divider */}
                            <View style={styles.dividerRow}>
                                <View style={styles.dividerLine} />
                                <Text style={styles.dividerText}>or Continue With</Text>
                                <View style={styles.dividerLine} />
                            </View>

                            {/* Social Buttons */}
                            <View style={styles.socialContainer}>
                                <TouchableOpacity style={styles.socialBtn} onPress={() => handleSocialLogin("Google")}>
                                    <Image source={{ uri: ASSETS.google }} style={styles.socialIcon} resizeMode="contain" />
                                </TouchableOpacity>
                                <TouchableOpacity style={styles.socialBtn} onPress={() => handleSocialLogin("Facebook")}>
                                    <Image source={{ uri: ASSETS.facebook }} style={styles.socialIcon} resizeMode="contain" />
                                </TouchableOpacity>
                                <TouchableOpacity style={styles.socialBtn} onPress={() => handleSocialLogin("Apple")}>
                                    <Image source={{ uri: ASSETS.apple }} style={styles.socialIcon} resizeMode="contain" />
                                </TouchableOpacity>
                            </View>

                            {/* Footer */}
                            <View style={styles.footerRow}>
                                <Text style={styles.footerText}>Don’t have an account?</Text>
                                <TouchableOpacity onPress={() => Alert.alert("Register", "Navigate to Register")}>
                                    <Text style={styles.registerLink}> Register</Text>
                                </TouchableOpacity>
                            </View>

                        </ScrollView>
                    </KeyboardAvoidingView>
                </Animated.View>
            </View>
        </TouchableWithoutFeedback>
    );
}

const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        backgroundColor: "#FFFFFF",
    },
    // Header
    headerBackground: {
        height: height * 0.35, 
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
    },
    logoContainer: {
        marginTop: 40,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#FFF',
        width: 110,
        height: 110,
        borderRadius: 35,
        elevation: 10,
        shadowColor: "#000", shadowOffset: { width: 0, height: 5 }, shadowOpacity: 0.2, shadowRadius: 10,
    },
    logo: {
        width: 70,
        height: 70,
    },

    // Content Card
    contentContainer: {
        flex: 1,
        backgroundColor: "#FFFFFF",
        marginTop: -40, 
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        paddingHorizontal: 24,
        paddingTop: 30,
        shadowColor: "#000", shadowOffset: { width: 0, height: -5 }, shadowOpacity: 0.1, shadowRadius: 10, elevation: 5,
    },
    scrollContent: {
        paddingBottom: 30,
    },
    title: {
        fontSize: 24,
        fontWeight: "800",
        color: "#1F2937",
        marginBottom: 25,
        textAlign: 'center'
    },

    // Inputs
    label: {
        fontSize: 13,
        fontWeight: "700",
        color: "#1F2937",
        marginBottom: 6,
        marginLeft: 4
    },
    inputWrapper: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: "#F9FAFB",
        borderWidth: 1,
        borderColor: "#E5E7EB",
        borderRadius: 12,
        height: 52,
        paddingHorizontal: 15,
        marginBottom: 5, // Reduced to make room for error text
    },
    inputSuccess: {
        borderColor: "#4CAF50",
        backgroundColor: "#F0FFF4",
    },
    inputError: {
        borderColor: "#F44336",
        backgroundColor: "#FFF5F5",
    },
    inputIcon: {
        width: 18,
        height: 18,
        tintColor: "#6B7280",
        marginRight: 12,
    },
    validIcon: {
        width: 18,
        height: 18,
        tintColor: "#4CAF50",
    },
    input: {
        flex: 1,
        fontSize: 16,
        color: "#1F2937",
    },
    eyeIcon: {
        width: 20,
        height: 20,
        tintColor: "#6B7280",
    },
    errorText: {
        color: "#F44336",
        fontSize: 12,
        marginLeft: 5,
        marginBottom: 10,
        fontWeight: '500'
    },

    // Forgot Password
    forgotContainer: {
        alignSelf: 'flex-end',
        marginBottom: 25,
        marginTop: 5,
    },
    forgotText: {
        color: "#2563EB",
        fontSize: 14,
        fontWeight: "600",
    },

    // Buttons
    loginButton: {
        backgroundColor: "#FFDD32",
        height: 56,
        borderRadius: 14,
        justifyContent: 'center',
        alignItems: 'center',
        shadowColor: "#FFDD32", shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.4, shadowRadius: 10, elevation: 5,
        marginBottom: 30,
    },
    loginButtonText: {
        fontSize: 18,
        fontWeight: "bold",
        color: "#000000",
    },

    // Divider
    dividerRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 25,
    },
    dividerLine: {
        flex: 1,
        height: 1,
        backgroundColor: "#E5E7EB",
    },
    dividerText: {
        marginHorizontal: 10,
        color: "#6B7280",
        fontSize: 13,
        fontWeight: "500",
    },

    // Socials
    socialContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginBottom: 30,
        gap: 20,
    },
    socialBtn: {
        width: 60,
        height: 60,
        borderRadius: 30,
        backgroundColor: "#FFFFFF",
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: "#F3F4F6",
        shadowColor: "#000", shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.05, shadowRadius: 5, elevation: 2,
    },
    socialIcon: {
        width: 28,
        height: 28,
    },

    // Footer
    footerRow: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 20
    },
    footerText: {
        fontSize: 14,
        color: "#6B7280",
    },
    registerLink: {
        fontSize: 14,
        fontWeight: "bold",
        color: "#B50E00",
        textDecorationLine: 'underline',
    },
});
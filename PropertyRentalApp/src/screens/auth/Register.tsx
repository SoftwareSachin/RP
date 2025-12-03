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
  StyleSheet, 
  Dimensions, 
  StatusBar, 
  KeyboardAvoidingView, 
  Platform,
  Animated,
  Easing,
  Alert,
  ActivityIndicator
} from "react-native";
import CountryPicker, { CountryCode, Country } from "react-native-country-picker-modal";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { useAuthContext } from "../../context/AuthContext";
import { AuthStackParamList } from "../../navigation/types";

const { width, height } = Dimensions.get("window");

// --- Assets ---
const ASSETS = {
    headerBg: "https://storage.googleapis.com/tagjs-prod.appspot.com/v1/kwi0sLffHL/k5agtif3_expires_30_days.png",
    logo: "https://storage.googleapis.com/tagjs-prod.appspot.com/v1/kwi0sLffHL/fo43lzyd_expires_30_days.png",
    
    // Icons
    userIcon: "https://cdn-icons-png.flaticon.com/512/1077/1077114.png",
    emailIcon: "https://cdn-icons-png.flaticon.com/512/542/542638.png",
    phoneIcon: "https://cdn-icons-png.flaticon.com/512/159/159832.png",
    lockIcon: "https://cdn-icons-png.flaticon.com/512/3064/3064197.png",
    eyeOpen: "https://cdn-icons-png.flaticon.com/512/709/709612.png",
    eyeClosed: "https://cdn-icons-png.flaticon.com/512/2767/2767146.png",
    checkIcon: "https://cdn-icons-png.flaticon.com/512/14876/14876743.png",
    giftIcon: "https://cdn-icons-png.flaticon.com/512/4213/4213958.png"
};

export default function Register() {
    const navigation = useNavigation<StackNavigationProp<AuthStackParamList, "Register">>();
    const { register } = useAuthContext();

    // --- State ---
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [mobile, setMobile] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [referral, setReferral] = useState("");
    
    const [countryCode, setCountryCode] = useState<CountryCode>("IN");
    const [callingCode, setCallingCode] = useState("91");
    const [isPickerVisible, setPickerVisible] = useState(false);

    const [showPassword, setShowPassword] = useState(false);
    const [showConfirm, setShowConfirm] = useState(false);
    const [agreeTerms, setAgreeTerms] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    // --- Animations ---
    const fadeAnim = useRef(new Animated.Value(0)).current;
    const slideUpAnim = useRef(new Animated.Value(50)).current;

    useEffect(() => {
        Animated.parallel([
            Animated.timing(fadeAnim, { toValue: 1, duration: 800, useNativeDriver: true }),
            Animated.timing(slideUpAnim, { toValue: 0, duration: 800, easing: Easing.out(Easing.back(1.5)), useNativeDriver: true })
        ]).start();
    }, []);

    // --- Handlers ---
    const onSelectCountry = (country: Country) => {
        setCountryCode(country.cca2);
        setCallingCode(country.callingCode[0]);
        setPickerVisible(false);
    };

    const handleRegister = async () => {
        if (!firstName || !email || !mobile || !password || !confirmPassword) {
            Alert.alert("Missing Fields", "Please fill in all required fields.");
            return;
        }
        if (password !== confirmPassword) {
            Alert.alert("Password Mismatch", "Passwords do not match.");
            return;
        }
        if (!agreeTerms) {
            Alert.alert("Terms Required", "Please agree to the Terms & Conditions.");
            return;
        }

        setIsLoading(true);
        
        try {
            const fullName = `${firstName} ${lastName}`.trim();
            const phone = mobile ? `+${callingCode}${mobile}` : undefined;
            const { success, error } = await register({
                name: fullName,
                email,
                password,
                phone,
            });

            if (success) {
                Alert.alert("Success", "Account Created Successfully!", [
                    { text: "Go to Home", onPress: () => navigation.navigate("HomeRent") }
                ]);
            } else {
                Alert.alert("Registration Failed", error || "Failed to create account");
            }
        } catch (err) {
            const message = err instanceof Error ? err.message : "Registration failed";
            Alert.alert("Registration Failed", message);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <View style={styles.mainContainer}>
            <StatusBar barStyle="light-content" backgroundColor="transparent" translucent />

            {/* Header Background */}
            <ImageBackground
                source={{ uri: ASSETS.headerBg }}
                resizeMode="cover"
                style={styles.headerBackground}
            >
                <Animated.View style={[styles.logoContainer, { opacity: fadeAnim }]}>
                    <Image source={{ uri: ASSETS.logo }} resizeMode="contain" style={styles.logo} />
                </Animated.View>
            </ImageBackground>

            {/* Content Card */}
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
                    <ScrollView 
                        showsVerticalScrollIndicator={false} 
                        contentContainerStyle={styles.scrollContent}
                        keyboardShouldPersistTaps="handled"
                    >
                        
                        <Text style={styles.title}>Create your account</Text>

                        {/* --- Name Row (Split) --- */}
                        <View style={styles.rowInputContainer}>
                            <View style={{flex: 1, marginRight: 10}}>
                                <Text style={styles.label}>First Name</Text>
                                <View style={styles.inputWrapper}>
                                    <Image source={{ uri: ASSETS.userIcon }} style={styles.inputIcon} />
                                    <TextInput
                                        placeholder="First Name"
                                        placeholderTextColor="#999"
                                        style={styles.input}
                                        value={firstName}
                                        onChangeText={setFirstName}
                                    />
                                </View>
                            </View>
                            <View style={{flex: 1}}>
                                <Text style={styles.label}>Last Name</Text>
                                <View style={styles.inputWrapper}>
                                    <TextInput
                                        placeholder="Last Name"
                                        placeholderTextColor="#999"
                                        style={[styles.input, {paddingLeft: 0}]} // No icon padding needed
                                        value={lastName}
                                        onChangeText={setLastName}
                                    />
                                </View>
                            </View>
                        </View>

                        {/* --- Email --- */}
                        <Text style={styles.label}>Email</Text>
                        <View style={styles.inputWrapper}>
                            <Image source={{ uri: ASSETS.emailIcon }} style={styles.inputIcon} />
                            <TextInput
                                placeholder="Enter your email"
                                placeholderTextColor="#999"
                                keyboardType="email-address"
                                autoCapitalize="none"
                                style={styles.input}
                                value={email}
                                onChangeText={setEmail}
                            />
                        </View>

                        {/* --- Mobile --- */}
                        <Text style={styles.label}>Mobile Number</Text>
                        <View style={styles.inputWrapper}>
                            <TouchableOpacity style={styles.countryBtn} onPress={() => setPickerVisible(true)}>
                                <CountryPicker
                                    visible={isPickerVisible}
                                    withFlag
                                    withCallingCode
                                    withFilter
                                    countryCode={countryCode}
                                    onSelect={onSelectCountry}
                                    onClose={() => setPickerVisible(false)}
                                    containerButtonStyle={{display: 'none'}} // Hide default button
                                />
                                <Text style={styles.callingCode}>+{callingCode}</Text>
                            </TouchableOpacity>
                            <View style={styles.verticalDivider} />
                            <TextInput
                                placeholder="Mobile Number"
                                placeholderTextColor="#999"
                                keyboardType="phone-pad"
                                style={styles.input}
                                value={mobile}
                                onChangeText={setMobile}
                            />
                        </View>

                        {/* --- Password --- */}
                        <Text style={styles.label}>Password</Text>
                        <View style={styles.inputWrapper}>
                            <Image source={{ uri: ASSETS.lockIcon }} style={styles.inputIcon} />
                            <TextInput
                                placeholder="Create Password"
                                placeholderTextColor="#999"
                                secureTextEntry={!showPassword}
                                style={styles.input}
                                value={password}
                                onChangeText={setPassword}
                            />
                            <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
                                <Image source={{ uri: showPassword ? ASSETS.eyeOpen : ASSETS.eyeClosed }} style={styles.eyeIcon} />
                            </TouchableOpacity>
                        </View>

                        {/* --- Confirm Password --- */}
                        <Text style={styles.label}>Confirm Password</Text>
                        <View style={styles.inputWrapper}>
                            <Image source={{ uri: ASSETS.lockIcon }} style={styles.inputIcon} />
                            <TextInput
                                placeholder="Confirm Password"
                                placeholderTextColor="#999"
                                secureTextEntry={!showConfirm}
                                style={styles.input}
                                value={confirmPassword}
                                onChangeText={setConfirmPassword}
                            />
                            <TouchableOpacity onPress={() => setShowConfirm(!showConfirm)}>
                                <Image source={{ uri: showConfirm ? ASSETS.eyeOpen : ASSETS.eyeClosed }} style={styles.eyeIcon} />
                            </TouchableOpacity>
                        </View>

                        {/* --- Referral Code (Optional) --- */}
                        <Text style={styles.label}>Referral Code (Optional)</Text>
                        <View style={styles.inputWrapper}>
                            <Image source={{ uri: ASSETS.giftIcon }} style={styles.inputIcon} />
                            <TextInput
                                placeholder="Have a code?"
                                placeholderTextColor="#999"
                                style={styles.input}
                                value={referral}
                                onChangeText={setReferral}
                            />
                        </View>

                        {/* --- Terms Checkbox --- */}
                        <TouchableOpacity 
                            style={styles.termsRow} 
                            onPress={() => setAgreeTerms(!agreeTerms)}
                            activeOpacity={0.8}
                        >
                            <View style={[styles.checkboxBase, agreeTerms && styles.checkboxChecked]}>
                                {agreeTerms && <Image source={{ uri: ASSETS.checkIcon }} style={{width: 12, height: 12, tintColor: '#000'}} />}
                            </View>
                            <Text style={styles.termsText}>
                                I agree to the <Text style={styles.linkText}>Terms & Conditions</Text> and <Text style={styles.linkText}>Privacy Policy</Text>.
                            </Text>
                        </TouchableOpacity>

                        {/* --- Register Button --- */}
                        <TouchableOpacity 
                            style={[styles.registerButton, isLoading && {opacity: 0.8}]} 
                            onPress={handleRegister}
                            disabled={isLoading}
                        >
                            {isLoading ? (
                                <ActivityIndicator color="#000" />
                            ) : (
                                <Text style={styles.registerButtonText}>Register</Text>
                            )}
                        </TouchableOpacity>

                        {/* --- Footer --- */}
                        <View style={styles.footerRow}>
                            <Text style={styles.footerText}>Already have an account?</Text>
                            <TouchableOpacity onPress={() => navigation.navigate("Login")}>
                                <Text style={styles.loginLink}> Login</Text>
                            </TouchableOpacity>
                        </View>

                    </ScrollView>
                </KeyboardAvoidingView>
            </Animated.View>
        </View>
    );
}

const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        backgroundColor: "#FFFFFF",
    },
    headerBackground: {
        height: height * 0.30, // Reduced slightly to give more room to form
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
    },
    logoContainer: {
        marginTop: 40,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#FFF',
        width: 100,
        height: 100,
        borderRadius: 30,
        elevation: 8,
        shadowColor: "#000", shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.2, shadowRadius: 8,
    },
    logo: {
        width: 65,
        height: 65,
    },
    contentContainer: {
        flex: 1,
        backgroundColor: "#FFFFFF",
        marginTop: -30,
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        paddingHorizontal: 24,
        paddingTop: 25,
        shadowColor: "#000", shadowOffset: { width: 0, height: -5 }, shadowOpacity: 0.1, shadowRadius: 10, elevation: 5,
    },
    scrollContent: {
        paddingBottom: 40,
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
        color: "#374151",
        marginBottom: 6,
        marginLeft: 4
    },
    rowInputContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 5
    },
    inputWrapper: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: "#F9FAFB",
        borderWidth: 1,
        borderColor: "#E5E7EB",
        borderRadius: 12,
        height: 50,
        paddingHorizontal: 12,
        marginBottom: 15,
    },
    inputIcon: {
        width: 18,
        height: 18,
        tintColor: "#9CA3AF",
        marginRight: 10,
    },
    input: {
        flex: 1,
        fontSize: 15,
        color: "#1F2937",
    },
    eyeIcon: {
        width: 20,
        height: 20,
        tintColor: "#9CA3AF",
    },

    // Mobile specific
    countryBtn: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingRight: 10
    },
    callingCode: {
        fontSize: 15,
        fontWeight: '600',
        color: '#374151',
        marginLeft: 5
    },
    verticalDivider: {
        width: 1,
        height: '60%',
        backgroundColor: '#E5E7EB',
        marginRight: 10
    },

    // Checkbox
    termsRow: {
        flexDirection: 'row',
        alignItems: 'flex-start',
        marginTop: 5,
        marginBottom: 20,
        paddingHorizontal: 4
    },
    checkboxBase: {
        width: 20,
        height: 20,
        borderWidth: 2,
        borderColor: '#D1D5DB',
        borderRadius: 6,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 10,
        marginTop: 2,
        backgroundColor: '#FFF'
    },
    checkboxChecked: {
        backgroundColor: '#FFDD32',
        borderColor: '#FFDD32'
    },
    termsText: {
        fontSize: 13,
        color: '#6B7280',
        flex: 1,
        lineHeight: 20
    },
    linkText: {
        color: '#FFDD32',
        fontWeight: 'bold',
        textShadowColor: 'rgba(0,0,0,0.1)',
        textShadowRadius: 1
    },

    // Button
    registerButton: {
        backgroundColor: "#FFDD32",
        height: 56,
        borderRadius: 14,
        justifyContent: 'center',
        alignItems: 'center',
        shadowColor: "#FFDD32", shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.4, shadowRadius: 10, elevation: 5,
        marginBottom: 20,
    },
    registerButtonText: {
        fontSize: 18,
        fontWeight: "bold",
        color: "#000000",
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
    loginLink: {
        fontSize: 14,
        fontWeight: "bold",
        color: "#B50E00",
        textDecorationLine: 'underline',
    },
});
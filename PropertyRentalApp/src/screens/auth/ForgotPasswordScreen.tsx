import React, { useState } from "react";
import { ForgotPasswordScreenProps } from '../../types/navigation';
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
  Alert
} from "react-native";

const ForgotPasswordScreen: React.FC<ForgotPasswordScreenProps> = ({ navigation }) => {
  const [email, setEmail] = useState("");

  const handleSendLink = () => {
    Alert.alert("Reset Link Sent", `A password reset link has been sent to ${email}`);
    // Optionally navigate back to login
    navigation.goBack();
  };

  return (
    <SafeAreaView style={styles.container}>
      <ImageBackground
        source={{
          uri: "https://storage.googleapis.com/tagjs-prod.appspot.com/v1/sE8iZvpPof/aqop9a75_expires_30_days.png",
        }}
        resizeMode={"stretch"}
        style={styles.view}
      >
        <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
          
          {/* Top Image */}
          <View style={styles.view2}>
            <Image
              source={{
                uri: "https://storage.googleapis.com/tagjs-prod.appspot.com/v1/sE8iZvpPof/xc6m4uor_expires_30_days.png",
              }}
              resizeMode={"stretch"}
              style={styles.image}
            />
          </View>

          {/* Heading */}
          <View style={styles.view3}>
            <Text style={styles.text}>Forget Password</Text>
          </View>

          {/* Sub Text */}
          <View style={styles.view4}>
            <Text style={styles.text2}>
              Enter your Email, we will send you OTP to verify later
            </Text>
          </View>

          {/* Email Input (Same as Login Screen) */}
          <View style={styles.column}>
            <Text style={styles.text3}>Email</Text>

            <View
              style={[
                styles.box,
                {
                  paddingHorizontal: 12,
                  justifyContent: "center",
                },
              ]}
            >
              <TextInput
                value={email}
                onChangeText={setEmail}
                placeholder="Enter your email"
                keyboardType="email-address"
                autoCapitalize="none"
                style={{
                  flex: 1,
                  color: "#000000",
                  fontSize: 16,
                }}
              />
            </View>
          </View>

          {/* Send Link Button */}
          <TouchableOpacity style={styles.button} onPress={handleSendLink}>
            <Text style={styles.text4}>Send link</Text>
          </TouchableOpacity>

          {/* Bottom Image */}
          <View style={styles.view5}>
            <Image
              source={{
                uri: "https://storage.googleapis.com/tagjs-prod.appspot.com/v1/sE8iZvpPof/tvnkijyl_expires_30_days.png",
              }}
              resizeMode={"stretch"}
              style={styles.image2}
            />
          </View>
        </ScrollView>
      </ImageBackground>
    </SafeAreaView>
  );
};

export default ForgotPasswordScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },
  view: {
    flex: 1,
    height: 200,
  },
  scrollView: {
    flex: 1,
    borderRadius: 40,
  },
  view2: {
    alignItems: "center",
    marginTop: 71,
    marginBottom: 30,
  },
  view3: {
    alignItems: "center",
    marginBottom: 11,
  },
  view4: {
    alignItems: "center",
    marginBottom: 16,
  },
  text: {
    color: "#000000",
    fontSize: 24,
    fontWeight: "bold",
  },
  text2: {
    color: "#979797",
    fontSize: 14,
    textAlign: "center",
    width: 278,
  },
  column: {
    marginBottom: 28,
    marginHorizontal: 16,
  },
  text3: {
    color: "#000000",
    fontSize: 14,
    fontWeight: "bold",
    marginBottom: 8,
  },
  box: {
    height: 48,
    backgroundColor: "#F8F8F8",
    borderColor: "#000000",
    borderRadius: 8,
    borderWidth: 1,
  },
  button: {
    alignItems: "center",
    backgroundColor: "#F8D800",
    borderRadius: 10,
    paddingVertical: 18,
    marginBottom: 171,
    marginHorizontal: 16,
  },
  text4: {
    color: "#000000",
    fontSize: 14,
    fontWeight: "bold",
  },
  view5: {
    alignItems: "flex-end",
  },
  image: {
    borderRadius: 40,
    width: 151,
    height: 143,
  },
  image2: {
    width: 197,
    height: 184,
  },
});

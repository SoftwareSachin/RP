import React, { useState, useEffect, useRef, useCallback } from "react";
import { TextInput as RNTextInput } from 'react-native';

type VerificationProps = {
  // Add any props if needed
};
import {
  SafeAreaView,
  View,
  ImageBackground,
  ScrollView,
  Image,
  Text,
  TouchableOpacity,
  StyleSheet,
  TextInput,
} from "react-native";

const Verification: React.FC<VerificationProps> = () => {
  // ⏳ Timer State
  const [seconds, setSeconds] = useState(0);
  const [running, setRunning] = useState(false);

  // 🔢 OTP State
  const [otp, setOtp] = useState<string[]>(["", "", "", ""]);
  const inputs = useRef<(RNTextInput | null)[]>([]);

  const handleOTPChange = (value: string, index: number) => {
    if (value.length > 1) return; // only one digit allowed

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    if (value && index < 3 && inputs.current[index + 1]) {
      inputs.current[index + 1]?.focus();
    }
  };

  const handleKeyPress = (e: any, index: number) => {
    if (e.nativeEvent.key === "Backspace" && otp[index] === "" && index > 0 && inputs.current[index - 1]) {
      inputs.current[index - 1]?.focus();
    }
  };

  // ⏳ Timer logic
  useEffect(() => {
    let interval: NodeJS.Timeout;

    if (running && seconds > 0) {
      interval = setInterval(() => {
        setSeconds((prev) => prev - 1);
      }, 1000);
    }

    if (seconds === 0) {
      setRunning(false);
    }

    return () => clearInterval(interval);
  }, [running, seconds]);

  const startTimer = () => {
    setSeconds(180);
    setRunning(true);
  };

  const formatTime = (secs: number): string => {
    const m = Math.floor(secs / 60);
    const s = secs % 60;
    return `${m}:${s < 10 ? "0" + s : s}`;
  };

  return (
    <SafeAreaView style={styles.container}>
      <ImageBackground
        source={{
          uri: "https://storage.googleapis.com/tagjs-prod.appspot.com/v1/sE8iZvpPof/8fp6hhpq_expires_30_days.png",
        }}
        resizeMode={"stretch"}
        style={styles.view}
      >
        <ScrollView style={styles.scrollView}>
          <View style={styles.view2}>
            <Image
              source={{
                uri: "https://storage.googleapis.com/tagjs-prod.appspot.com/v1/sE8iZvpPof/4kgw9kt5_expires_30_days.png",
              }}
              resizeMode={"stretch"}
              style={styles.image}
            />
          </View>

          <Text style={styles.text}>Verification</Text>

          <View style={styles.view3}>
            <Text style={styles.text2}>
              Enter 4 digit number that sent to your mobile number +91
              800XXXXXXX
            </Text>
          </View>

          <View style={styles.view3}>
            <Text style={styles.text3}>Please enter OTP</Text>
          </View>

          {/* Timer */}
          <View style={styles.view3}>
            <TouchableOpacity onPress={startTimer}>
              <Text style={styles.text4}>
                {seconds > 0 ? formatTime(seconds) : "Tap to start 3:00"}
              </Text>
            </TouchableOpacity>
          </View>

          {/* OTP Input Boxes */}
          <View style={styles.row}>
            {[0, 1, 2, 3].map((i) => (
<TextInput
  key={i}
  ref={(ref) => { inputs.current[i] = ref; }}
  style={[
    i === 3 ? styles.box2 : styles.box,
    { 
      fontSize: 20,
      textAlign: 'center' as const
    }
  ]}
  keyboardType="number-pad"
  maxLength={1}
  value={otp[i]}
  onChangeText={(val) => handleOTPChange(val, i)}
  onKeyPress={(e) => handleKeyPress(e, i)}
/>
            ))}
          </View>

          <View style={styles.row2}>
            <TouchableOpacity
              style={styles.button}
              onPress={() => alert("Pressed!")}
            >
              <Text style={styles.text5}>Resend OTP</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.button2}
              onPress={() => alert("Pressed!")}
            >
              <Text style={styles.text4}>Verify OTP</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.view4}>
            <Image
              source={{
                uri: "https://storage.googleapis.com/tagjs-prod.appspot.com/v1/sE8iZvpPof/4av4kalr_expires_30_days.png",
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

export default Verification;

// 🎨 Styles
const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#FFFFFF" },
  box: {
    height: 60,
    flex: 1,
    borderColor: "#FFDD32",
    borderRadius: 10,
    borderWidth: 1,
    marginRight: 17,
  },
  box2: {
    height: 60,
    flex: 1,
    borderColor: "#FFDD32",
    borderRadius: 10,
    borderWidth: 1,
  },
  button: {
    flex: 1,
    alignItems: "center",
    borderColor: "#FFDD32",
    borderRadius: 10,
    borderWidth: 1,
    paddingVertical: 18,
    marginRight: 23,
  },
  button2: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "#F8D800",
    borderRadius: 10,
    paddingVertical: 18,
  },
  image: { borderRadius: 40, width: 151, height: 143 },
  image2: { borderRadius: 10, width: 230, height: 189 },
  row: {
    flexDirection: "row",
    marginBottom: 27,
    marginHorizontal: 31,
  },
  row2: {
    flexDirection: "row",
    marginBottom: 102,
    marginHorizontal: 31,
  },
  scrollView: { flex: 1, borderRadius: 40 },
  text: {
    color: "#000000",
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 16,
    marginLeft: 120,
  },
  text2: { color: "#979797", fontSize: 14, textAlign: "center", width: 258 },
  text3: { color: "#FFDD32", fontSize: 16, fontWeight: "bold" },
  text4: { color: "#000000", fontSize: 14, fontWeight: "bold" },
  text5: { color: "#FFDD32", fontSize: 14, fontWeight: "bold" },
  view: { flex: 1, height: 200 },
  view2: { alignItems: "center", marginTop: 73, marginBottom: 28 },
  view3: { alignItems: "center", marginBottom: 16 },
  view4: { alignItems: "flex-end" },
});

import React, {useState} from "react";
import { SafeAreaView, View, ImageBackground, ScrollView, Image, Text, TouchableOpacity, TextInput, StyleSheet } from "react-native";
import CountryPicker from "react-native-country-picker-modal";

export default (props) => {

  const [textInput1, onChangeTextInput1] = useState('');
  const [countryCode, setCountryCode] = useState("IN");
  const [callingCode, setCallingCode] = useState("91");
  const [visible, setVisible] = useState(false);

  return (
    <SafeAreaView style={styles.container}>
      <ImageBackground 
        source={{uri: "https://storage.googleapis.com/tagjs-prod.appspot.com/v1/sE8iZvpPof/63xt2c92_expires_30_days.png"}} 
        resizeMode={'stretch'}
        style={styles.view}
      >
        <ScrollView style={styles.scrollView}>

          <View style={styles.view2}>
            <Image
              source={{uri: "https://storage.googleapis.com/tagjs-prod.appspot.com/v1/sE8iZvpPof/c47yh96b_expires_30_days.png"}}
              resizeMode={"stretch"}
              style={styles.image}
            />
          </View>

          <Text style={styles.text}>
            {"Login via Mobile Number"}
          </Text>

          <View style={styles.view3}>
            <Text style={styles.text2}>
              {"Enter your Mobile Number, we will send you OTP to verify later"}
            </Text>
          </View>

          {/* MOBILE NUMBER + COUNTRY PICKER */}
          <View style={styles.column}>
            <Text style={styles.text3}>
              {"Mobile Number"}
            </Text>

            <View style={styles.row}>

              {/* Tap to open country picker */}
              <TouchableOpacity 
                style={styles.buttonRow}
                onPress={() => setVisible(true)}
              >
                <Text style={styles.text4}>
                  {`+${callingCode}`}
                </Text>

                <Image
                  source={{uri: "https://storage.googleapis.com/tagjs-prod.appspot.com/v1/sE8iZvpPof/lxw9enwn_expires_30_days.png"}}
                  resizeMode={"stretch"}
                  style={styles.image2}
                />
              </TouchableOpacity>

              {/* COUNTRY PICKER MODAL */}
<CountryPicker
  visible={visible}
  withFilter
  withFlag={true}                 // ✅ flag only in modal
  withCallingCode
  withCountryNameButton={false}   // ❌ do NOT show flag/name on main screen
  withCallingCodeButton={false}   // ❌ do NOT show flag in main screen
  withFlagButton={false}          // ❌ this is the main one!!!
  countryCode={countryCode}
  onSelect={(country) => {
    setCountryCode(country.cca2);
    setCallingCode(country.callingCode[0]);
  }}
  onClose={() => setVisible(false)}
/>




              {/* MOBILE NUMBER INPUT */}
              <TextInput
                placeholder={"80XXXXXXXX"}
                value={textInput1}
                onChangeText={onChangeTextInput1}
                style={styles.input}
                keyboardType="number-pad"
              />

            </View>
          </View>

          <TouchableOpacity style={styles.button} onPress={()=>alert('Pressed!')}>
            <Text style={styles.text5}>
              {"Get OTP"}
            </Text>
          </TouchableOpacity>

          <View style={styles.view4}>
            <Image
              source={{uri: "https://storage.googleapis.com/tagjs-prod.appspot.com/v1/sE8iZvpPof/0ngroacg_expires_30_days.png"}}
              resizeMode={"stretch"}
              style={styles.image3}
            />
          </View>

        </ScrollView>
      </ImageBackground>
    </SafeAreaView>
  )
}


// ----------- STYLES -------------
const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#FFFFFF" },

  button: {
    alignItems: "center",
    backgroundColor: "#F8D800",
    borderRadius: 10,
    paddingVertical: 18,
    marginBottom: 171,
    marginHorizontal: 16,
  },

  buttonRow: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#F8F8F8",
    borderColor: "#000000",
    borderRadius: 8,
    borderWidth: 1,
    paddingVertical: 14,
    paddingHorizontal: 10,
    marginRight: 8,
  },

  column: { marginBottom: 28, marginHorizontal: 18 },

  image: { borderRadius: 40, width: 151, height: 143 },

  image2: { borderRadius: 8, width: 20, height: 20 },

  image3: { width: 195, height: 184 },

  input: {
    color: "#000000",
    fontSize: 12,
    flex: 1,
    backgroundColor: "#F8F8F8",
    borderColor: "#000000",
    borderRadius: 8,
    borderWidth: 1,
    paddingVertical: 15,
    paddingHorizontal: 10,
  },

  row: { flexDirection: "row" },

  scrollView: { flex: 1, borderRadius: 40 },

  text: {
    color: "#000000",
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 11,
    marginLeft: 41,
  },

  text2: {
    color: "#979797",
    fontSize: 14,
    textAlign: "center",
    width: 264,
  },

  text3: {
    color: "#000000",
    fontSize: 14,
    fontWeight: "bold",
    marginBottom: 8,
  },

  text4: { color: "#000000", fontSize: 12, marginRight: 13 },

  text5: { color: "#000000", fontSize: 14, fontWeight: "bold" },

  view: { flex: 1, height: 200 },

  view2: { alignItems: "center", marginTop: 71, marginBottom: 30 },

  view3: { alignItems: "center", marginBottom: 16 },

  view4: { alignItems: "flex-end" },
});

import React, { useEffect, useRef } from "react";
import { SafeAreaView, View, ScrollView, ImageBackground, Image, Text, StyleSheet, ImageStyle, ViewStyle, Animated, Easing, Pressable } from "react-native";

interface Props {
  onNext?: () => void;
  onSkip?: () => void;
}

export default function IPhone1617(props: Props) {
  const { onNext, onSkip } = props;
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const translateAnim = useRef(new Animated.Value(20)).current;

  function handleSkip() {
    if (typeof onSkip === "function") {
      onSkip();
      return;
    }
    console.log("Skip pressed");
  }

  function handleNext() {
    if (typeof onNext === "function") {
      onNext();
      return;
    }
    console.log("Next pressed");
  }

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 600,
        easing: Easing.out(Easing.ease),
        useNativeDriver: true,
      }),
      Animated.timing(translateAnim, {
        toValue: 0,
        duration: 600,
        easing: Easing.out(Easing.ease),
        useNativeDriver: true,
      }),
    ]).start();
  }, [fadeAnim, translateAnim]);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView}>
        <Animated.View style={[styles.column, { opacity: fadeAnim, transform: [{ translateY: translateAnim }] }]}>
          <ImageBackground
            source={{ uri: "https://storage.googleapis.com/tagjs-prod.appspot.com/v1/sE8iZvpPof/4k41j3kd_expires_30_days.png" }}
            resizeMode={'stretch'}
            imageStyle={styles.column3}
            style={styles.column2}
          >
            <Image
              source={{ uri: "https://storage.googleapis.com/tagjs-prod.appspot.com/v1/sE8iZvpPof/xw1llfgj_expires_30_days.png" }}
              resizeMode={"stretch"}
              style={styles.image}
            />
            <Text style={styles.text}>
              {"Welcome to our app"}
            </Text>
            <Text style={styles.text2}>
              {"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor "}
            </Text>
            <View style={styles.row}>
              <View style={styles.box}>
              </View>
              <View style={styles.box2}>
              </View>
              <View style={styles.box3}>
              </View>
            </View>
          </ImageBackground>
          <Pressable onPress={handleSkip} style={styles.absoluteText}>
            <Text style={styles.buttonText}>{"Skip"}</Text>
          </Pressable>
          <Pressable onPress={handleNext} style={styles.absoluteText2}>
            <Text style={styles.buttonText}>{"Next"}</Text>
          </Pressable>
        </Animated.View>
      </ScrollView>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },
  absoluteText: {
    position: "absolute",
    bottom: -233,
    left: 32,
    color: "#000000",
    fontSize: 16,
    paddingHorizontal: 10,
    paddingVertical: 5,
    minWidth: 50,
    minHeight: 40,
    justifyContent: "center",
    alignItems: "center",
  },
  absoluteText2: {
    position: "absolute",
    bottom: -233,
    right: 44,
    color: "#000000",
    fontSize: 16,
    paddingHorizontal: 10,
    paddingVertical: 5,
    minWidth: 50,
    minHeight: 40,
    justifyContent: "center",
    alignItems: "center",
  },
  box: {
    width: 32,
    height: 4,
    backgroundColor: "#000000",
    borderRadius: 2,
    marginRight: 12,
  },
  box2: {
    width: 32,
    height: 4,
    backgroundColor: "#B50E00",
    borderRadius: 2,
    marginRight: 12,
  },
  box3: {
    width: 32,
    height: 4,
    backgroundColor: "#000000",
    borderRadius: 2,
  },
  column: {
    marginBottom: 63,
  },
  column2: {
    alignItems: "center",
    height:500
  } ,
  column3: {
    borderRadius: 40,
  },
  image: {
    borderRadius: 40,
    height: 300,
    marginTop: 99,
    marginBottom: 125,
    alignSelf: "center",
    width:"100%",
  } ,
  row: {
    flexDirection: "row",
    marginBottom: 7,
  },
  scrollView: {
    flex: 1,
    backgroundColor: "#00000000",
    borderRadius: 40,
  },
  text: {
    color: "#000000",
    fontSize: 32,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 16,
    marginHorizontal: 31,
  },
  text2: {
    color: "#000000",
    fontSize: 16,
    textAlign: "center",
    marginBottom: 88,
    marginHorizontal: 36,
  },
  buttonText: {
    color: "#000000",
    fontSize: 16,
  },
});
 
 
 
 
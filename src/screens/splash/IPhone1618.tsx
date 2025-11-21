import React, { useEffect, useRef } from "react";
import {
  SafeAreaView,
  View,
  ScrollView,
  ImageBackground,
  Image,
  Text,
  StyleSheet,
  Pressable,
  Animated,
  Easing,
} from "react-native";

interface NavigationLike {
  navigate?: (screen: string, params?: any) => void;
}

interface Props {
  onSkip?: () => void;
  onNext?: () => void;
  navigation?: NavigationLike;
}

export default function IPhone1618(props: Props) {
  const { onSkip, onNext, navigation } = props || {};

  // Animation values
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideUp = useRef(new Animated.Value(30)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 800,
        useNativeDriver: true,
      }),
      Animated.timing(slideUp, {
        toValue: 0,
        duration: 700,
        easing: Easing.out(Easing.cubic),
        useNativeDriver: true,
      }),
    ]).start();
  }, []);

  function handleSkip() {
    if (typeof onSkip === "function") {
      onSkip();
      return;
    }
    if (navigation && typeof navigation.navigate === "function") {
      navigation.navigate("Home"); // change "Home" to your desired skip target
      return;
    }
    console.log("Skip pressed");
  }

  function handleNext() {
    if (typeof onNext === "function") {
      onNext();
      return;
    }
    if (navigation && typeof navigation.navigate === "function") {
      navigation.navigate("IPhone1617"); // change to your next screen name
      return;
    }
    console.log("Next pressed");
  }

  return (
    <Animated.View
      style={[
        styles.container,
        {
          opacity: fadeAnim,
          transform: [{ translateY: slideUp }],
        },
      ]}
    >
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollViewContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.column}>
          <ImageBackground
            source={{
              uri:
                "https://storage.googleapis.com/tagjs-prod.appspot.com/v1/sE8iZvpPof/4k41j3kd_expires_30_days.png",
            }}
            resizeMode={"stretch"}
            imageStyle={styles.column3}
            style={styles.column2}
          >
            <Image
              source={{
                uri:
                  "https://storage.googleapis.com/tagjs-prod.appspot.com/v1/sE8iZvpPof/5rqezm7k_expires_30_days.png",
              }}
              resizeMode={"stretch"}
              style={styles.image}
            />
            <Text style={styles.text}>{"Welcome to our app"}</Text>
            <Text style={styles.text2}>
              {
                "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor "
              }
            </Text>
            <View style={styles.row}>
              <View style={styles.box2}></View>
              <View style={styles.box}></View>
              <View style={styles.box3}></View>
            </View>
          </ImageBackground>

          {/* Keep visual styles/positions unchanged — Pressable uses same absolute styles */}
          <Pressable
            onPress={handleSkip}
            style={styles.absoluteText}
            android_ripple={{ color: "rgba(0,0,0,0.1)" }}
            accessibilityRole="button"
            accessibilityLabel="Skip"
          >
            <Text style={{ color: "#000000", fontSize: 16 }}>{"Skip"}</Text>
          </Pressable>

          <Pressable
            onPress={handleNext}
            style={styles.absoluteText2}
            android_ripple={{ color: "rgba(0,0,0,0.1)" }}
            accessibilityRole="button"
            accessibilityLabel="Next"
          >
            <Text style={{ color: "#000000", fontSize: 16 }}>{"Next"}</Text>
          </Pressable>
        </View>
      </ScrollView>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },
  absoluteText: {
    position: "absolute",
    bottom: -420,
    left: 44,
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
    bottom: -420,
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
    height: 300,
  },
  column3: {
    borderRadius: 40,
  },
  image: {
    borderRadius: 40,
    height: 300,
    marginTop: 99,
    marginBottom: 125,
    alignSelf: "center",
    width: "100%",
  },
  row: {
    flexDirection: "row",
    marginBottom: 7,
    marginTop:-10
  },
  scrollView: {
    flex: 1,
    backgroundColor: "#00000000",
    borderRadius: 40,
  },
  scrollViewContent: {
    flexGrow: 1,
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
});

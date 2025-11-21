import React, { useState, useRef, useEffect } from "react";
import { SafeAreaView, View, ScrollView, ImageBackground, Image, Text, StyleSheet, Animated, PanResponder, Dimensions, Easing } from "react-native";

const { width } = Dimensions.get('window');
const SLIDER_WIDTH = width * 0.8;
const SLIDER_HEIGHT = 60;
const THUMB_SIZE = 50;

interface Props {
  onNext?: () => void;
}

export default function IPhone1616(props: Props) {
  const { onNext } = props;
  const [sliderCompleted, setSliderCompleted] = useState(false);
  const pan = useRef(new Animated.Value(0)).current;
  const scale = useRef(new Animated.Value(1)).current;

  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => !sliderCompleted,
      onMoveShouldSetPanResponder: () => !sliderCompleted,
      onPanResponderGrant: () => {
        pan.setValue(0);
        Animated.spring(scale, {
          toValue: 1.1,
          useNativeDriver: false,
          friction: 3,
          tension: 40,
        }).start();
      },
      onPanResponderMove: (e, gestureState) => {
        let newX = gestureState.dx;
        if (newX < 0) newX = 0;
        if (newX > SLIDER_WIDTH - THUMB_SIZE) newX = SLIDER_WIDTH - THUMB_SIZE;
        pan.setValue(newX);
      },
      onPanResponderRelease: (e, gestureState) => {
        Animated.spring(scale, {
          toValue: 1,
          useNativeDriver: false,
          friction: 3,
          tension: 40,
        }).start();

        // @ts-ignore
        const currentPan = (pan as any)._value;
        if (currentPan > SLIDER_WIDTH * 0.6) {
          // Complete the slide
          setSliderCompleted(true);
          Animated.timing(pan, {
            toValue: SLIDER_WIDTH - THUMB_SIZE,
            duration: 300,
            easing: Easing.out(Easing.exp),
            useNativeDriver: false,
          }).start(() => {
            if (typeof onNext === "function") {
              onNext();
            }
          });
        } else {
          // Reset slider
          Animated.spring(pan, {
            toValue: 0,
            friction: 5,
            tension: 40,
            useNativeDriver: false,
          }).start();
        }
      },
    })
  ).current;
 
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView}>
        <ImageBackground
          source={{ uri: "https://storage.googleapis.com/tagjs-prod.appspot.com/v1/sE8iZvpPof/edutom3z_expires_30_days.png" }}
          resizeMode={'stretch'}
          imageStyle={styles.column2}
          style={styles.column}
        >
          <Image
            source={{ uri: "https://storage.googleapis.com/tagjs-prod.appspot.com/v1/sE8iZvpPof/5rqezm7k_expires_30_days.png" }}
            resizeMode={"stretch"}
            style={styles.image}
          />
          <Text style={styles.text}>
            {"Welcome to our app"}
          </Text>
          <Text style={styles.text2}>
            {"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor "}
          </Text>
 
          <View style={styles.sliderContainer}>
            {/* progress fill */}
            <Animated.View style={[styles.progressFill, { width: Animated.add(pan, THUMB_SIZE) }]} />
            <View style={styles.sliderTrack} />
            {/* Static "Let's Go" text centered on the track */}
            {!sliderCompleted && (
              <View style={styles.staticTextContainer} pointerEvents="none">
                <Text style={styles.staticText}>Let’s Go</Text>
              </View>
            )}
            {sliderCompleted && (
              <View style={styles.staticTextContainer} pointerEvents="none">
                <Text style={[styles.staticText, { color: '#FFD700' }]}>Go</Text>
              </View>
            )}
            <Animated.View
              {...panResponder.panHandlers}
              style={[
                styles.sliderThumb,
                {
                  transform: [{ translateX: pan }, { scale: scale }],
                  backgroundColor: sliderCompleted ? '#FFD700' : '#222222',
                  shadowColor: '#000',
                  shadowOffset: { width: 0, height: 4 },
                  shadowOpacity: 0.3,
                  shadowRadius: 4,
                  elevation: 5,
                  marginBottom:0
   
                },
              ]}
            >
              <Text style={{ color: '#FFFFFF', fontSize: 24, fontWeight: 'bold' }}>→</Text>
            </Animated.View>
          </View>
 
        </ImageBackground>
      </ScrollView>
    </SafeAreaView>
  )
}
 
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },
  column: {
    alignItems: "center",
    marginBottom: 63,
    height:550
  },
  column2: {
    borderRadius: 40,
  },
  image: {
    borderRadius: 40,
    height: 312,
    marginTop: 146,
    marginBottom: 144,
    alignSelf: "stretch",
  },
  image2: {
    borderRadius: 35,
    width: 40,
    height: 35,
    marginLeft: 8,
  },
  scrollView: {
    flex: 1,
    backgroundColor: "#00000000",
    borderRadius: 40,
  },
  text: {
    color: "#121212",
    fontSize: 28,
    fontWeight: "600",
    textAlign: "center",
    marginHorizontal: 30,
    marginBottom: 16,
  },
  text2: {
    color: "#6D6E71",
    fontSize: 14,
    lineHeight: 20,
    textAlign: "center",
    marginHorizontal: 40,
    marginBottom: 24,
  },
  sliderContainer: {
    width: SLIDER_WIDTH,
    height: SLIDER_HEIGHT,
    justifyContent: 'center',
    marginBottom: 0,
  },
  progressFill: {
    position: 'absolute',
    height: SLIDER_HEIGHT,
    backgroundColor: '#FFD700',
    borderRadius: 35,
  },
  sliderTrack: {
    position: 'absolute',
    height: 60,
    width: SLIDER_WIDTH,
    backgroundColor: '#E6E6E6',
    borderRadius: 35,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 4,
    marginBottom:0
  },
  staticTextContainer: {
    position: 'absolute',
    width: SLIDER_WIDTH,
    height: SLIDER_HEIGHT,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom:0
   
  },
  staticText: {
    color: '#000000',
    fontSize: 18,
    fontWeight: '700',
    textShadowColor: 'rgba(0, 0, 0, 0.4)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 2,
  },
  sliderThumb: {
    backgroundColor: '#FFFFFF',
    flexDirection: 'row',
    alignItems: 'center',
    height: THUMB_SIZE,
    width: THUMB_SIZE,
    borderRadius: THUMB_SIZE / 2,
    paddingHorizontal: 22,
    justifyContent: 'center',
  },
});
 
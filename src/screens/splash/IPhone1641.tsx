import React, { useEffect, useRef } from "react";
import { SafeAreaView, View, ScrollView, Image, Text, StyleSheet, Animated, Easing } from "react-native";
 
interface Props {
  // Add any props if needed
}
 
export default (props: Props) => {
    const fadeAnim = useRef(new Animated.Value(0)).current;
    const translateAnim = useRef(new Animated.Value(20)).current;
 
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
            <ScrollView  style={styles.scrollView}>
                <Animated.View style={[styles.content, { opacity: fadeAnim, transform: [{ translateY: translateAnim }] }] }>
                    <Image
                        source = {{uri: "https://storage.googleapis.com/tagjs-prod.appspot.com/v1/sE8iZvpPof/3cri61cu_expires_30_days.png"}}
                        resizeMode = {"stretch"}
                        style={styles.image}
                    />
                    <Text style={styles.text}>
  ClicknBook{" "}
  <Text style={styles.blueText}>Home</Text>
</Text>
 
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
    image: {
        borderRadius: 40,
        height: 339,
        marginTop: 214,
        width:380,
        marginBottom: 81,
    },
    scrollView: {
        flex: 1,
        backgroundColor: "#FFDD32",
        borderRadius: 40,
    },
    content: {
        alignItems: "center",
    },
    blueText: {
      color: "#2563EB",
      fontSize: 28,
      fontWeight: "700",
    },
    text: {
      color: "#111827",
      fontSize: 30,
      fontWeight: "700",
      textAlign: "center",
      letterSpacing: 0.5,
      marginTop: 8,
      marginBottom: 140,
    },
});
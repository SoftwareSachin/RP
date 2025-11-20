import React, { useEffect, useRef } from "react";
import { SafeAreaView, View, ScrollView, Image, Text, StyleSheet, Animated, Easing } from "react-native";
 
interface Props {
  // Add any props if needed
}
 
export default (props: Props) => {
    const fadeAnim = useRef(new Animated.Value(0)).current;
    const scaleAnim = useRef(new Animated.Value(0.95)).current;
 
    useEffect(() => {
        Animated.parallel([
            Animated.timing(fadeAnim, {
                toValue: 1,
                duration: 600,
                easing: Easing.out(Easing.ease),
                useNativeDriver: true,
            }),
            Animated.timing(scaleAnim, {
                toValue: 1,
                duration: 600,
                easing: Easing.out(Easing.ease),
                useNativeDriver: true,
            }),
        ]).start();
    }, [fadeAnim, scaleAnim]);
 
    return (
        <SafeAreaView style={styles.container}>
            <ScrollView  style={styles.scrollView}>
                <Animated.View style={[styles.content, { opacity: fadeAnim, transform: [{ scale: scaleAnim }] }] }>
                    <Image
                        source = {{uri: "https://storage.googleapis.com/tagjs-prod.appspot.com/v1/sE8iZvpPof/svoz6ch5_expires_30_days.png"}}
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
        marginBottom: 81,
        width:380
    },
    scrollView: {
        flex: 1,
        backgroundColor: "#00000000",
        borderRadius: 40,
    },
    content: {
        alignItems: "center",
    },
    text: {
        color: "#B50E00",
        fontSize: 36,
        fontWeight: "bold",
        marginBottom: 190,
    },
    blueText: {
  color: "#003087",
  fontSize: 36,
  fontWeight: "bold",
},
});
 
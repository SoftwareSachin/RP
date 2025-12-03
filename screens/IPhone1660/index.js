import React from "react";
import { SafeAreaView, View, ScrollView, Image, Text, StyleSheet, } from "react-native";
export default (props) => {
	return (
		<SafeAreaView style={styles.container}>
			<ScrollView  style={styles.scrollView}>
				<Image
					source = {{uri: "https://storage.googleapis.com/tagjs-prod.appspot.com/v1/sE8iZvpPof/svoz6ch5_expires_30_days.png"}} 
					resizeMode = {"stretch"}
					style={styles.image}
				/>
				<Text style={styles.text}>
					{"ClicknBook Home\n"}
				</Text>
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
	},
	scrollView: {
		flex: 1,
		backgroundColor: "#00000000",
		borderRadius: 40,
	},
	text: {
		color: "#B50E00",
		fontSize: 36,
		fontWeight: "bold",
		marginBottom: 190,
	},
});
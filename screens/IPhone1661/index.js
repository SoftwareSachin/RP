import React from "react";
import { SafeAreaView, View, ScrollView, Text, StyleSheet, } from "react-native";
export default (props) => {
	return (
		<SafeAreaView style={styles.container}>
			<ScrollView  style={styles.scrollView}>
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
	scrollView: {
		flex: 1,
		backgroundColor: "#00000000",
		borderRadius: 40,
	},
	text: {
		color: "#B50E00",
		fontSize: 36,
		fontWeight: "bold",
		marginTop: 634,
		marginBottom: 190,
	},
});
import React from "react";
import { SafeAreaView, View, ScrollView, Image, Text, StyleSheet, } from "react-native";
export default (props) => {
	return (
		<SafeAreaView style={styles.container}>
			<ScrollView  style={styles.scrollView}>
				<View style={styles.column}>
					<Image
						source = {{uri: "https://storage.googleapis.com/tagjs-prod.appspot.com/v1/sE8iZvpPof/pk5lbdl9_expires_30_days.png"}} 
						resizeMode = {"stretch"}
						style={styles.image}
					/>
					<Text style={styles.absoluteText}>
						{"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."}
					</Text>
				</View>
				<View style={styles.row}>
					<Text style={styles.text}>
						{"Skip"}
					</Text>
					<View style={styles.row2}>
						<View style={styles.row3}>
							<View style={styles.box}>
							</View>
							<View style={styles.box}>
							</View>
							<View style={styles.box2}>
							</View>
						</View>
						<Text style={styles.text}>
							{"Next"}
						</Text>
					</View>
				</View>
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
		bottom: -85,
		right: 36,
		left: 36,
		color: "#000000",
		fontSize: 16,
		textAlign: "center",
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
	},
	column: {
		marginBottom: 246,
	},
	image: {
		borderRadius: 40,
		height: 517,
	},
	row: {
		flexDirection: "row",
		justifyContent: "space-between",
		marginBottom: 65,
		marginHorizontal: 36,
	},
	row2: {
		flexDirection: "row",
		alignItems: "center",
	},
	row3: {
		flexDirection: "row",
		marginRight: 55,
	},
	scrollView: {
		flex: 1,
		backgroundColor: "#FFDD32",
		borderRadius: 40,
	},
	text: {
		color: "#000000",
		fontSize: 16,
	},
});
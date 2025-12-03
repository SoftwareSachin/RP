import React from "react";
import { SafeAreaView, View, ScrollView, ImageBackground, Image, Text, StyleSheet, } from "react-native";
export default (props) => {
	return (
		<SafeAreaView style={styles.container}>
			<ScrollView  style={styles.scrollView}>
				<View style={styles.column}>
					<ImageBackground 
						source={{uri: "https://storage.googleapis.com/tagjs-prod.appspot.com/v1/sE8iZvpPof/4k41j3kd_expires_30_days.png"}} 
						resizeMode = {'stretch'}
						imageStyle={styles.column3}
						style={styles.column2}
						>
						<Image
							source = {{uri: "https://storage.googleapis.com/tagjs-prod.appspot.com/v1/sE8iZvpPof/xw1llfgj_expires_30_days.png"}} 
							resizeMode = {"stretch"}
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
					<Text style={styles.absoluteText}>
						{"Skip"}
					</Text>
					<Text style={styles.absoluteText2}>
						{"Next"}
					</Text>
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
		bottom: -3,
		left: 32,
		color: "#000000",
		fontSize: 16,
	},
	absoluteText2: {
		position: "absolute",
		bottom: -3,
		right: 44,
		color: "#000000",
		fontSize: 16,
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
	},
	column3: {
		borderRadius: 40,
	},
	image: {
		borderRadius: 40,
		height: 378,
		marginTop: 99,
		marginBottom: 125,
		alignSelf: "stretch",
	},
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
});
import React from "react";
import { SafeAreaView, View, ImageBackground, ScrollView, Image, TouchableOpacity, Text, StyleSheet, } from "react-native";

interface Props {
  onLogin?: () => void;
  onRegister?: () => void;
  onSkip?: () => void;
}

export default function IPhone1642(props: Props) {
	return (
		<SafeAreaView style={styles.container}>
			<ImageBackground 
				source={{uri: "https://storage.googleapis.com/tagjs-prod.appspot.com/v1/sE8iZvpPof/ladbbi5a_expires_30_days.png"}} 
				resizeMode = {'stretch'}
				style={styles.view}
				>
				<ScrollView  style={styles.scrollView}>
					<View style={styles.row}>
						<Image
							source = {{uri: "https://storage.googleapis.com/tagjs-prod.appspot.com/v1/sE8iZvpPof/eonhky98_expires_30_days.png"}} 
							resizeMode = {"stretch"}
							style={styles.image}
						/>
						<View style={styles.box}>
						</View>
						<Image
							source = {{uri: "https://storage.googleapis.com/tagjs-prod.appspot.com/v1/sE8iZvpPof/x69zgh9y_expires_30_days.png"}} 
							resizeMode = {"stretch"}
							style={styles.image2}
						/>
						<Image
							source = {{uri: "https://storage.googleapis.com/tagjs-prod.appspot.com/v1/sE8iZvpPof/sa9l33mi_expires_30_days.png"}} 
							resizeMode = {"stretch"}
							style={styles.image2}
						/>
						<Image
							source = {{uri: "https://storage.googleapis.com/tagjs-prod.appspot.com/v1/sE8iZvpPof/oq2e54vg_expires_30_days.png"}} 
							resizeMode = {"stretch"}
							style={styles.image2}
						/>
						<Image
							source = {{uri: "https://storage.googleapis.com/tagjs-prod.appspot.com/v1/sE8iZvpPof/ilflafe2_expires_30_days.png"}} 
							resizeMode = {"stretch"}
							style={styles.image2}
						/>
						<Image
							source = {{uri: "https://storage.googleapis.com/tagjs-prod.appspot.com/v1/sE8iZvpPof/mx0kbfhz_expires_30_days.png"}} 
							resizeMode = {"stretch"}
							style={styles.image3}
						/>
					</View>
					<Image
						source = {{uri: "https://storage.googleapis.com/tagjs-prod.appspot.com/v1/sE8iZvpPof/e6jk1qs1_expires_30_days.png"}} 
						resizeMode = {"stretch"}
						style={styles.image4}
					/>
					<TouchableOpacity style={styles.button} onPress={()=>alert('Pressed!')}>
						<Text style={styles.text}>
							{"Login via Email"}
						</Text>
					</TouchableOpacity>
					<View style={styles.view2}>
						<Text style={styles.text2}>
							{"or "}
						</Text>
					</View>
					<TouchableOpacity style={styles.button} onPress={()=>alert('Pressed!')}>
						<Text style={styles.text}>
							{"Continue via Phone number"}
						</Text>
					</TouchableOpacity>
					<View style={styles.row2}>
						<Text style={styles.text3}>
							{"Don’t have an account?"}
						</Text>
						<Text style={styles.text4}>
							{"Register"}
						</Text>
					</View>
					<TouchableOpacity style={styles.button2} onPress={()=>alert('Pressed!')}>
						<Text style={styles.text5}>
							{"Skip for now"}
						</Text>
					</TouchableOpacity>
				</ScrollView>
			</ImageBackground>
		</SafeAreaView>
	)
}
const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "#FFFFFF",
	},
	box: {
		flex: 1,
	},
	button: {
		alignItems: "center",
		backgroundColor: "#F8D800",
		borderRadius: 10,
		paddingVertical: 18,
		marginBottom: 16,
		marginHorizontal: 16,
	},
	button2: {
		alignItems: "center",
		borderColor: "#FFDD32",
		borderRadius: 10,
		borderWidth: 1,
		paddingVertical: 18,
		marginBottom: 51,
		marginHorizontal: 16,
	},
	image: {
		width: 54,
		height: 18,
	},
	image2: {
		width: 18,
		height: 18,
		marginRight: 3,
	},
	image3: {
		width: 18,
		height: 18,
	},
	image4: {
		borderRadius: 40,
		height: 492,
		marginBottom: 41,
	},
	row: {
		flexDirection: "row",
		backgroundColor: "#FFDD32",
		paddingVertical: 12,
		paddingHorizontal: 24,
	},
	row2: {
		alignSelf: "flex-start",
		flexDirection: "row",
		marginBottom: 16,
		marginLeft: 20,
	},
	scrollView: {
		flex: 1,
		borderRadius: 40,
	},
	text: {
		color: "#000000",
		fontSize: 14,
		fontWeight: "bold",
	},
	text2: {
		color: "#808080",
		fontSize: 12,
	},
	text3: {
		color: "#000000",
		fontSize: 12,
		fontWeight: "bold",
		marginRight: 6,
	},
	text4: {
		color: "#B50E00",
		fontSize: 12,
		fontWeight: "bold",
	},
	text5: {
		color: "#FFDD32",
		fontSize: 14,
		fontWeight: "bold",
	},
	view: {
		flex: 1,
	},
	view2: {
		alignItems: "center",
		marginBottom: 16,
	},
});
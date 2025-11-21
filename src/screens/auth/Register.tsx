import React, {useState} from "react";
import { SafeAreaView, View, ScrollView, ImageBackground, Image, Text, TouchableOpacity, TextInput, StyleSheet } from "react-native";

interface RegisterProps {
  // Add any props here if needed in the future
}

const Register: React.FC<RegisterProps> = (props) => {
	const [textInput1, onChangeTextInput1] = useState('');
	return (
		<SafeAreaView style={styles.container}>
			<ScrollView  style={styles.scrollView}>
				<View style={styles.column}>
					<ImageBackground 
						source={{uri: "https://storage.googleapis.com/tagjs-prod.appspot.com/v1/sE8iZvpPof/tk9x4rvo_expires_30_days.png"}} 
						resizeMode = {'stretch'}
						imageStyle={styles.column2}
						>
						<View style={styles.view}>
							<Image
								source = {{uri: "https://storage.googleapis.com/tagjs-prod.appspot.com/v1/sE8iZvpPof/tdp7dlh1_expires_30_days.png"}} 
								resizeMode = {"stretch"}
								style={styles.image}
							/>
						</View>
						<Text style={styles.text}>
							{"Create your account"}
						</Text>
						<View style={styles.column3}>
							<Text style={styles.text2}>
								{"First Name"}
							</Text>
							<View style={styles.box}>
							</View>
						</View>
						<View style={styles.column3}>
							<Text style={styles.text2}>
								{"Last Name"}
							</Text>
							<View style={styles.box}>
							</View>
						</View>
						<View style={styles.column3}>
							<Text style={styles.text2}>
								{"Email"}
							</Text>
							<View style={styles.box}>
							</View>
						</View>
						<View style={styles.column3}>
							<Text style={styles.text2}>
								{"Password"}
							</Text>
							<Image
								source = {{uri: "https://storage.googleapis.com/tagjs-prod.appspot.com/v1/sE8iZvpPof/ddo6yme1_expires_30_days.png"}} 
								resizeMode = {"stretch"}
								style={styles.image2}
							/>
						</View>
						<View style={styles.column3}>
							<Text style={styles.text2}>
								{"Confirm Password"}
							</Text>
							<Image
								source = {{uri: "https://storage.googleapis.com/tagjs-prod.appspot.com/v1/sE8iZvpPof/bxj7gkqf_expires_30_days.png"}} 
								resizeMode = {"stretch"}
								style={styles.image2}
							/>
						</View>
						<View style={styles.column3}>
							<Text style={styles.text2}>
								{"Mobile Number"}
							</Text>
							<View style={styles.row}>
								<TouchableOpacity style={styles.buttonRow} onPress={()=>alert('Pressed!')}>
									<Text style={styles.text3}>
										{"+91"}
									</Text>
									<Image
										source = {{uri: "https://storage.googleapis.com/tagjs-prod.appspot.com/v1/sE8iZvpPof/a8lxzt6c_expires_30_days.png"}} 
										resizeMode = {"stretch"}
										style={styles.image3}
									/>
								</TouchableOpacity>
								<TextInput
									placeholder={"80XXXXXXXX"}
									value={textInput1}
									onChangeText={onChangeTextInput1}
									style={styles.input}
								/>
							</View>
						</View>
						<Text style={styles.text4}>
							{"Referral Code(Optional)"}
						</Text>
					</ImageBackground>
					<View style={styles.absoluteBox}>
					</View>
				</View>
				<View style={styles.column4}>
					<View style={styles.row2}>
						<Image
							source = {{uri: "https://storage.googleapis.com/tagjs-prod.appspot.com/v1/sE8iZvpPof/wb4v78bf_expires_30_days.png"}} 
							resizeMode = {"stretch"}
							style={styles.image4}
						/>
						<Text style={styles.text5}>
							{"By Signing Up ,you agree to accept our Terms & Conditions and privacy policy."}
						</Text>
					</View>
					<TouchableOpacity style={styles.button} onPress={()=>alert('Pressed!')}>
						<Text style={styles.text6}>
							{"Register"}
						</Text>
					</TouchableOpacity>
					<View style={styles.row3}>
						<Text style={styles.text7}>
							{"Do you have an account?"}
						</Text>
						<Text style={styles.text8}>
							{"Login"}
						</Text>
					</View>
				</View>
				<View style={styles.view2}>
					<Image
						source = {{uri: "https://storage.googleapis.com/tagjs-prod.appspot.com/v1/sE8iZvpPof/2jtcr3kw_expires_30_days.png"}} 
						resizeMode = {"stretch"}
						style={styles.image5}
					/>
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
	absoluteBox: {
		position: "absolute",
		bottom: -15,
		right: 14,
		left: 14,
		height: 48,
		backgroundColor: "#F8F8F8",
		borderColor: "#000000",
		borderRadius: 8,
		borderWidth: 1,
	},
	box: {
		height: 48,
		backgroundColor: "#F8F8F8",
		borderColor: "#000000",
		borderRadius: 8,
		borderWidth: 1,
	},
	button: {
		alignItems: "center",
		backgroundColor: "#F8D800",
		borderRadius: 10,
		paddingVertical: 18,
		marginBottom: 16,
	},
	buttonRow: {
		flexDirection: "row",
		alignItems: "center",
		backgroundColor: "#F8F8F8",
		borderColor: "#000000",
		borderRadius: 8,
		borderWidth: 1,
		paddingVertical: 14,
		paddingHorizontal: 10,
		marginRight: 8,
	},
	column: {
		marginBottom: 31,
	},
	column2: {
		borderRadius: 40,
	},
	column3: {
		marginBottom: 16,
		marginHorizontal: 14,
	},
	column4: {
		marginBottom: 16,
		marginHorizontal: 12,
	},
	image: {
		borderRadius: 40,
		width: 151,
		height: 143,
	},
	image2: {
		height: 48,
	},
	image3: {
		borderRadius: 8,
		width: 20,
		height: 20,
	},
	image4: {
		width: 24,
		height: 24,
		marginRight: 8,
	},
	image5: {
		borderRadius: 40,
		width: 239,
		height: 184,
	},
	input: {
		color: "#D2D2D2",
		fontSize: 12,
		flex: 1,
		backgroundColor: "#F8F8F8",
		borderColor: "#000000",
		borderRadius: 8,
		borderWidth: 1,
		paddingVertical: 15,
		paddingHorizontal: 10,
	},
	row: {
		flexDirection: "row",
	},
	row2: {
		flexDirection: "row",
		marginBottom: 16,
	},
	row3: {
		alignSelf: "flex-start",
		flexDirection: "row",
	},
	scrollView: {
		flex: 1,
		backgroundColor: "#FFFFFF",
		borderRadius: 40,
	},
	text: {
		color: "#000000",
		fontSize: 24,
		fontWeight: "bold",
		marginBottom: 39,
		marginLeft: 55,
	},
	text2: {
		color: "#000000",
		fontSize: 14,
		fontWeight: "bold",
		marginBottom: 8,
	},
	text3: {
		color: "#000000",
		fontSize: 12,
		marginRight: 13,
	},
	text4: {
		color: "#000000",
		fontSize: 14,
		fontWeight: "bold",
		marginBottom: 41,
		marginLeft: 14,
	},
	text5: {
		color: "#000000",
		fontSize: 12,
		flex: 1,
	},
	text6: {
		color: "#000000",
		fontSize: 12,
		fontWeight: "bold",
	},
	text7: {
		color: "#000000",
		fontSize: 12,
		fontWeight: "bold",
		marginRight: 9,
	},
	text8: {
		color: "#B50E00",
		fontSize: 12,
		fontWeight: "bold",
	},
	view: {
		alignItems: "center",
		marginTop: 77,
		marginBottom: 36,
	},
	view2: {
		alignItems: "flex-end",
	},
});

export default Register;

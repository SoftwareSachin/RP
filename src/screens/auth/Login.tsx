import React, { useState } from "react";
import { SafeAreaView, View, ImageBackground, ScrollView, Image, Text, TouchableOpacity, TextInput, Alert } from "react-native";

interface LoginProps {
  // Add any props here if needed in the future
}

const Login: React.FC<LoginProps> = (props) => {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");

	const handleLogin = () => {
		// For demonstration, just alert the email and password
		Alert.alert("Login Pressed", `Email: ${email}\nPassword: ${password}`);
	};

	const handleGoogleLogin = () => {
		Alert.alert("Google Login Pressed");
	};

	const handleFacebookLogin = () => {
		Alert.alert("Facebook Login Pressed");
	};

	const handleAppleLogin = () => {
		Alert.alert("Apple Login Pressed");
	};

	return (
		<SafeAreaView 
			style={{
				flex: 1,
				backgroundColor: "#FFFFFF",
			}}>
			<ImageBackground 
				source={{uri: "https://storage.googleapis.com/tagjs-prod.appspot.com/v1/kwi0sLffHL/k5agtif3_expires_30_days.png"}} 
				resizeMode = {'stretch'}
				style={{
					flex: 1,
				}}
				>
				<ScrollView  
					style={{
						flex: 1,
						borderRadius: 40,
					}}>
					<View 
						style={{
							alignItems: "center",
							marginTop: 81,
							marginBottom: 40,
						}}>
						<Image
							source = {{uri: "https://storage.googleapis.com/tagjs-prod.appspot.com/v1/kwi0sLffHL/fo43lzyd_expires_30_days.png"}} 
							resizeMode = {"stretch"}
							style={{
								borderRadius: 40,
								width: 151,
								height: 143,
							}}
						/>
					</View>
					<Text 
						style={{
							color: "#000000",
							fontSize: 24,
							fontWeight: "bold",
							marginBottom: 40,
							marginLeft: 58,
						}}>
						{"Login to your account"}
					</Text>
					<View 
						style={{
							marginBottom: 16,
							marginHorizontal: 16,
						}}>
						<View 
							style={{
								marginBottom: 16,
							}}>
							<Text 
								style={{
									color: "#000000",
									fontSize: 14,
									fontWeight: "bold",
									marginBottom: 8,
								}}>
								{"Email"}
							</Text>
							<View 
								style={{
									height: 48,
									backgroundColor: "#F8F8F8",
									borderColor: "#000000",
									borderRadius: 8,
									borderWidth: 1,
									paddingHorizontal: 12,
								}}>
								<TextInput
									value={email}
									onChangeText={setEmail}
									placeholder="Enter your email"
									keyboardType="email-address"
									autoCapitalize="none"
									style={{
										flex: 1,
										color: '#000000',
										fontSize: 16,
									}}
								/>
							</View>
						</View>
						<View >
							<View 
								style={{
									marginBottom: 8,
								}}>
								<Text 
									style={{
										color: "#000000",
										fontSize: 14,
										fontWeight: "bold",
										marginBottom: 8,
									}}>
									{"Password"}
								</Text>
								<View 
									style={{
										height: 48,
										backgroundColor: "#F8F8F8",
										borderColor: "#000000",
										borderRadius: 8,
										borderWidth: 1,
										paddingHorizontal: 12,
									}}>
									<TextInput
										value={password}
										onChangeText={setPassword}
										placeholder="Enter your password"
										secureTextEntry={true}
										style={{
											flex: 1,
											color: '#000000',
											fontSize: 16,
										}}
									/>
								</View>
							</View>
							<View 
								style={{
									alignItems: "flex-end",
								}}>
								<Text 
									style={{
										color: "#808080",
										fontSize: 12,
										marginRight: 1,
									}}>
									{"Forget Password?"}
								</Text>
							</View>
						</View>
					</View>
					<TouchableOpacity 
						style={{
							alignItems: "center",
							backgroundColor: "#F8D800",
							borderRadius: 10,
							paddingVertical: 18,
							marginBottom: 26,
							marginHorizontal: 16,
						}} onPress={handleLogin}>
						<Text 
							style={{
								color: "#000000",
								fontSize: 14,
								fontWeight: "bold",
							}}>
							{"Login"}
						</Text>
					</TouchableOpacity>

					<View 
						style={{
							flexDirection: "row",
							alignItems: "center",
							marginBottom: 25,
							marginHorizontal: 22,
						}}>
						<View 
							style={{
								height: 1,
								flex: 1,
								backgroundColor: "#808080",
								marginRight: 5,
							}}>
						</View>
						<Text 
							style={{
								color: "#808080",
								fontSize: 12,
								marginRight: 8,
							}}>
							{"or Continue With"}
						</Text>
						<View 
							style={{
								height: 1,
								flex: 1,
								backgroundColor: "#808080",
							}}>
						</View>
					</View>

					<View 
						style={{
							flexDirection: 'row',
							justifyContent: 'space-evenly',
							marginHorizontal: 40,
							marginBottom: 40,
						}}>
						<TouchableOpacity
							activeOpacity={0.7}
							onPress={handleGoogleLogin}
							style={{
								borderWidth: 1,
								borderColor: '#808080',
								borderRadius: 40,
								padding: 10,
								alignItems: 'center',
								justifyContent: 'center',
								width: 60,
								height: 60,
							}}>
							<Image
								source={{uri: "https://storage.googleapis.com/tagjs-prod.appspot.com/v1/kwi0sLffHL/k8518ezz_expires_30_days.png"}}
								resizeMode="contain"
								style={{width: 30, height: 30}}
							/>
						</TouchableOpacity>

						<TouchableOpacity
							activeOpacity={0.7}
							onPress={handleFacebookLogin}
							style={{
								borderWidth: 1,
								borderColor: '#808080',
								borderRadius: 40,
								padding: 10,
								alignItems: 'center',
								justifyContent: 'center',
								width: 60,
								height: 60,
							}}>
							<Image
								source={{uri: "https://storage.googleapis.com/tagjs-prod.appspot.com/v1/kwi0sLffHL/4nsyhrqg_expires_30_days.png"}}
								resizeMode="contain"
								style={{width: 30, height: 30}}
							/>
						</TouchableOpacity>

						<TouchableOpacity
							activeOpacity={0.7}
							onPress={handleAppleLogin}
							style={{
								borderWidth: 1,
								borderColor: '#808080',
								borderRadius: 40,
								padding: 10,
								alignItems: 'center',
								justifyContent: 'center',
								width: 60,
								height: 60,
							}}>
							<Image
								source={{uri: "https://storage.googleapis.com/tagjs-prod.appspot.com/v1/kwi0sLffHL/ek9ycjqh_expires_30_days.png"}}
								resizeMode="contain"
								style={{width: 30, height: 30}}
							/>
						</TouchableOpacity>
					</View>

					<View style={{flexDirection: 'row', justifyContent: 'center', marginBottom: 40}}>
						<Text style={{fontSize: 12, color: '#000000', marginRight: 4}}>{"Don’t have an account?"}</Text>
						<TouchableOpacity activeOpacity={0.7} onPress={() => Alert.alert('Register Pressed')}>
							<Text style={{fontSize: 12, color: '#B50E00', fontWeight: 'bold', textDecorationLine: 'underline'}}>{"Register"}</Text>
						</TouchableOpacity>
					</View>

				</ScrollView>
			</ImageBackground>
		</SafeAreaView>
	)
}

export default Login;

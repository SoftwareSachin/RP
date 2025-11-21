import React, {useState} from "react";
import { SafeAreaView, View, ScrollView, ImageBackground, Image, Text, TouchableOpacity, TextInput, useWindowDimensions } from "react-native";
import { NavigationProp } from '@react-navigation/native';

type RegisterScreenProps = {
  navigation: NavigationProp<any>;
  // Add any other props your component expects here
};

export default function Register1({ navigation }: RegisterScreenProps) {
	const [firstName, setFirstName] = useState('');
	const [lastName, setLastName] = useState('');
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [confirmPassword, setConfirmPassword] = useState('');
	const [mobileNumber, setMobileNumber] = useState('');
	const [referralCode, setReferralCode] = useState('');
	const [showPassword, setShowPassword] = useState(false);
	const [showConfirmPassword, setShowConfirmPassword] = useState(false);
	const [countryCode, setCountryCode] = useState('+91');

	const { width } = useWindowDimensions();

	return (
		<SafeAreaView 
			style={{
				flex: 1,
				backgroundColor: "#FFFFFF",
			}}>
			<ScrollView  
				style={{
					flex: 1,
					backgroundColor: "#FFFFFF",
					borderRadius: 40,
				}}>
				<View 
					style={{
						marginBottom: 31,
					}}>
					<ImageBackground 
						source={{uri: "https://storage.googleapis.com/tagjs-prod.appspot.com/v1/IueuF8JG4P/bat5bdsi_expires_30_days.png"}} 
						resizeMode = {'stretch'}
						imageStyle={{borderRadius: 40,}}
						>
						<View 
							style={{
								alignItems: "center",
								marginTop: 77,
								marginBottom: 36,
							}}>
							<Image
								source = {{uri: "https://storage.googleapis.com/tagjs-prod.appspot.com/v1/IueuF8JG4P/a7l66b4v_expires_30_days.png"}} 
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
								marginBottom: 39,
								marginLeft: 55,
							}}>
							{"Create your account"}
						</Text>

						{/* First Name Input */}
						<View 
							style={{
								marginBottom: 16,
								marginHorizontal: 14,
							}}>
							<Text 
								style={{
									color: "#000000",
									fontSize: 14,
									fontWeight: "bold",
									marginBottom: 8,
								}}>
								{"First Name"}
							</Text>
							<TextInput
								value={firstName}
								onChangeText={setFirstName}
								placeholder="Enter first name"
								style={{
									height: 48,
									backgroundColor: "#F8F8F8",
									borderColor: "#000000",
									borderRadius: 8,
									borderWidth: 1,
									paddingHorizontal: 10,
									fontSize: 14,
									color: "#000000",
								}}
							/>
						</View>

						{/* Last Name Input */}
						<View 
							style={{
								marginBottom: 16,
								marginHorizontal: 14,
							}}>
							<Text 
								style={{
									color: "#000000",
									fontSize: 14,
									fontWeight: "bold",
									marginBottom: 8,
								}}>
								{"Last Name"}
							</Text>
							<TextInput
								value={lastName}
								onChangeText={setLastName}
								placeholder="Enter last name"
								style={{
									height: 48,
									backgroundColor: "#F8F8F8",
									borderColor: "#000000",
									borderRadius: 8,
									borderWidth: 1,
									paddingHorizontal: 10,
									fontSize: 14,
									color: "#000000",
								}}
							/>
						</View>

						{/* Email Input */}
						<View 
							style={{
								marginBottom: 16,
								marginHorizontal: 14,
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
							<TextInput
								value={email}
								onChangeText={setEmail}
								placeholder="Enter email"
								keyboardType="email-address"
								autoCapitalize="none"
								style={{
									height: 48,
									backgroundColor: "#F8F8F8",
									borderColor: "#000000",
									borderRadius: 8,
									borderWidth: 1,
									paddingHorizontal: 10,
									fontSize: 14,
									color: "#000000",
								}}
							/>
						</View>

						{/* Password Input with toggle */}
						<View 
							style={{
								marginBottom: 16,
								marginHorizontal: 14,
								position: 'relative',
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
							<TextInput
								value={password}
								onChangeText={setPassword}
								placeholder="Enter password"
								secureTextEntry={!showPassword}
								style={{
									height: 48,
									backgroundColor: "#F8F8F8",
									borderColor: "#000000",
									borderRadius: 8,
									borderWidth: 1,
									paddingHorizontal: 10,
									fontSize: 14,
									color: "#000000",
								}}
							/>
							<TouchableOpacity
								style={{
									position: 'absolute',
									right: 24,
									top: 38,
								}}
								onPress={() => setShowPassword(!showPassword)}
							>
								<Image
									source={{
										uri: showPassword
											? "https://storage.googleapis.com/tagjs-prod.appspot.com/v1/IueuF8JG4P/eye_open_icon.png"
											: "https://storage.googleapis.com/tagjs-prod.appspot.com/v1/IueuF8JG4P/eye_closed_icon.png"
									}}
									resizeMode="contain"
									style={{width: 24, height: 24}}
								/>
							</TouchableOpacity>
						</View>

						{/* Confirm Password Input with toggle */}
						<View 
							style={{
								marginBottom: 16,
								marginHorizontal: 14,
								position: 'relative',
							}}>
							<Text 
								style={{
									color: "#000000",
									fontSize: 14,
									fontWeight: "bold",
									marginBottom: 8,
								}}>
								{"Confirm Password"}
							</Text>
							<TextInput
								value={confirmPassword}
								onChangeText={setConfirmPassword}
								placeholder="Confirm password"
								secureTextEntry={!showConfirmPassword}
								style={{
									height: 48,
									backgroundColor: "#F8F8F8",
									borderColor: "#000000",
									borderRadius: 8,
									borderWidth: 1,
									paddingHorizontal: 10,
									fontSize: 14,
									color: "#000000",
								}}
							/>
							<TouchableOpacity
								style={{
									position: 'absolute',
									right: 24,
									top: 38,
								}}
								onPress={() => setShowConfirmPassword(!showConfirmPassword)}
							>
								<Image
									source={{
										uri: showConfirmPassword
											? "https://storage.googleapis.com/tagjs-prod.appspot.com/v1/IueuF8JG4P/eye_open_icon.png"
											: "https://storage.googleapis.com/tagjs-prod.appspot.com/v1/IueuF8JG4P/eye_closed_icon.png"
									}}
									resizeMode="contain"
									style={{width: 24, height: 24}}
								/>
							</TouchableOpacity>
						</View>

						{/* Mobile Number Input with country code selector */}
						<View 
							style={{
								marginBottom: 16,
								marginHorizontal: 14,
							}}>
							<Text 
								style={{
									color: "#000000",
									fontSize: 14,
									fontWeight: "bold",
									marginBottom: 8,
								}}>
								{"Mobile Number"}
							</Text>
							<View 
								style={{
									flexDirection: "row",
								}}>
								<TouchableOpacity 
									style={{
										flexDirection: "row",
										alignItems: "center",
										backgroundColor: "#F8F8F8",
										borderColor: "#000000",
										borderRadius: 8,
										borderWidth: 1,
										paddingVertical: 14,
										paddingHorizontal: 10,
										marginRight: 8,
									}} onPress={()=>alert('Country code selector pressed!')}>
									<Text 
										style={{
											color: "#000000",
											fontSize: 12,
											marginRight: 13,
										}}>
										{countryCode}
									</Text>
									<Image
										source = {{uri: "https://storage.googleapis.com/tagjs-prod.appspot.com/v1/IueuF8JG4P/d8km6m1x_expires_30_days.png"}} 
										resizeMode = {"stretch"}
										style={{
											borderRadius: 8,
											width: 20,
											height: 20,
										}}
									/>
								</TouchableOpacity>
								<TextInput
									placeholder={"80XXXXXXXX"}
									value={mobileNumber}
									onChangeText={setMobileNumber}
									keyboardType="phone-pad"
									style={{
										color: "#000000",
										fontSize: 14,
										flex: 1,
										backgroundColor: "#F8F8F8",
										borderColor: "#000000",
										borderRadius: 8,
										borderWidth: 1,
										paddingVertical: 15,
										paddingHorizontal: 10,
									}}
								/>
							</View>
						</View>

						{/* Referral Code Input */}
						<View 
							style={{
								marginBottom: 41,
								marginHorizontal: 14,
							}}>
							<Text 
								style={{
									color: "#000000",
									fontSize: 14,
									fontWeight: "bold",
									marginBottom: 8,
								}}>
								{"Referral Code (Optional)"}
							</Text>
							<TextInput
								value={referralCode}
								onChangeText={setReferralCode}
								style={{
									height: 48,
									backgroundColor: "#F8F8F8",
									borderColor: "#000000",
									borderRadius: 8,
									borderWidth: 1,
									paddingHorizontal: 10,
									fontSize: 14,
									color: "#000000",
								}}
							/>
						</View>

					</ImageBackground>
					<View 
						style={{
							position: "absolute",
							bottom: -15,
							right: 14,
							left: 14,
							height: 48,
							backgroundColor: "#F8F8F8",
							borderColor: "#000000",
							borderRadius: 8,
							borderWidth: 1,
						}}>
					</View>
				</View>

				<View 
					style={{
						marginBottom: 16,
						marginHorizontal: 12,
					}}>
					<View 
						style={{
							flexDirection: "row",
							marginBottom: 16,
						}}>
						<Image
							source = {{uri: "https://storage.googleapis.com/tagjs-prod.appspot.com/v1/IueuF8JG4P/9izy1dc6_expires_30_days.png"}} 
							resizeMode = {"stretch"}
							style={{
								width: 24,
								height: 24,
								marginRight: 8,
							}}
						/>
						<Text 
							style={{
								color: "#000000",
								fontSize: 12,
								flex: 1,
							}}>
							{"By Signing Up ,you agree to accept our Terms & Conditions and privacy policy."}
						</Text>
					</View>
					<TouchableOpacity 
						style={{
							alignItems: "center",
							backgroundColor: "#F8D800",
							borderRadius: 10,
							paddingVertical: 18,
							marginBottom: 16,
						}} onPress={()=>alert('Pressed!')}>
						<Text 
							style={{
								color: "#000000",
								fontSize: 12,
								fontWeight: "bold",
							}}>
							{"Register"}
						</Text>
					</TouchableOpacity>

					{/* Responsive alignment for login prompt */}
					<View 
						style={{
							flexDirection: width < 400 ? 'column' : 'row',
							alignItems: 'center',
							justifyContent: width < 400 ? 'center' : 'flex-start',
							marginHorizontal: 12,
						}}>
						<Text 
							style={{
								color: "#000000",
								fontSize: 12,
								fontWeight: "bold",
								marginRight: width < 400 ? 0 : 9,
								marginBottom: width < 400 ? 4 : 0,
								textAlign: width < 400 ? 'center' : 'left'
							}}>
							{"Do you have an account?"}
						</Text>
						<TouchableOpacity onPress={() => alert('Navigate to Login')}>
							<Text 
								style={{
									color: "#B50E00",
									fontSize: 12,
									fontWeight: "bold",
									textAlign: width < 400 ? 'center' : 'left'
								}}>
								{"Login"}
							</Text>
						</TouchableOpacity>
					</View>
				</View>

				<View 
					style={{
						alignItems: "flex-end",
					}}>
					<Image
						source = {{uri: "https://storage.googleapis.com/tagjs-prod.appspot.com/v1/IueuF8JG4P/uucz3hs1_expires_30_days.png"}} 
						resizeMode = {"stretch"}
						style={{
							borderRadius: 40,
							width: 239,
							height: 184,
						}}
					/>
				</View>
			</ScrollView>
		</SafeAreaView>
	)
}
import React, {useState} from "react";
import { SafeAreaView, View, ScrollView, ImageBackground, Image, Text, TouchableOpacity, TextInput, useWindowDimensions } from "react-native";
import { NavigationProp } from '@react-navigation/native';
import CountryPicker, { CountryCode } from "react-native-country-picker-modal";

interface RegisterProps {
  navigation: NavigationProp<any>;
  // Add any props here if needed in the future
}

const Register: React.FC<RegisterProps> = (props) => {
  const { navigation } = props;
	const [firstName, setFirstName] = useState('');
	const [lastName, setLastName] = useState('');
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [confirmPassword, setConfirmPassword] = useState('');
	const [mobileNumber, setMobileNumber] = useState('');
	const [referralCode, setReferralCode] = useState('');
	const [showPassword, setShowPassword] = useState(false);
	const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [agreeToTerms, setAgreeToTerms] = useState(false);
  const [countryCode, setCountryCode] = useState<CountryCode>('IN');
  const [callingCode, setCallingCode] = useState('91');
  const [countryPickerVisible, setCountryPickerVisible] = useState(false);

	const { width } = useWindowDimensions();

	return (
		<SafeAreaView 
			style={{
				flex: 1,
				backgroundColor: "#FFFFFF",
			}}>
			<ScrollView
				contentContainerStyle={{
					flexGrow: 1,
					paddingBottom: 0,
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
							<View style={{ flexDirection: 'row' }}>
								<TouchableOpacity 
									style={{
										flexDirection: 'row',
										alignItems: 'center',
										backgroundColor: '#F8F8F8',
										borderRadius: 8,
										padding: 12,
										marginRight: 8,
										borderWidth: 1,
										borderColor: '#000000',
										height: 48,
									}}
									onPress={() => setCountryPickerVisible(true)}
								>
									<Text style={{ marginRight: 4 }}>+{callingCode}</Text>
									<Image
										source={{ uri: "https://storage.googleapis.com/tagjs-prod.appspot.com/v1/sE8iZvpPof/lxw9enwn_expires_30_days.png" }}
										style={{ width: 16, height: 16 }}
									/>
								</TouchableOpacity>

								<TextInput
									placeholder="80XXXXXXXX"
									value={mobileNumber}
									onChangeText={setMobileNumber}
									keyboardType="phone-pad"
									style={{
										flex: 1,
										height: 48,
										backgroundColor: "#F8F8F8",
										borderColor: "#000000",
										borderRadius: 8,
										borderWidth: 1,
										paddingHorizontal: 10,
										color: "#000000",
									}}
								/>
							</View>

							{/* Country Picker Modal */}
							<CountryPicker
								visible={countryPickerVisible}
								withFilter
								withFlag={true}
								withCallingCode
								withCountryNameButton={false}
								withCallingCodeButton={false}
								withFlagButton={false}
								countryCode={countryCode}
								onSelect={(country) => {
									setCountryCode(country.cca2);
									setCallingCode(country.callingCode[0]);
									setCountryPickerVisible(false);
								}}
								onClose={() => setCountryPickerVisible(false)}
							/>
						</View>

						{/* Referral Code Input */}
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
				</View>

				<View 
					style={{
						marginBottom: 0,
						marginHorizontal: 12,
					}}>
					<View 
						style={{
							flexDirection: "row",
							marginBottom: 16,
							alignItems: 'center',
						}}>
						<TouchableOpacity 
							onPress={() => setAgreeToTerms(!agreeToTerms)}
							style={{
								width: 20,
								height: 20,
								borderWidth: 1,
								borderColor: '#000000',
								borderRadius: 4,
								justifyContent: 'center',
								alignItems: 'center',
								marginRight: 12,
								backgroundColor: agreeToTerms ? '#000000' : 'transparent',
							}}
						>
							{agreeToTerms && (
								<Text style={{ color: '#FFFFFF' }}>✓</Text>
							)}
						</TouchableOpacity>
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
							marginBottom: 0,
						}}>
						<Text 
							style={{
								color: "#000000",
								fontSize: 16,
								fontWeight: "bold",
								marginRight: width < 400 ? 0 : 12,
								marginBottom: 0,
								textAlign: width < 400 ? 'center' : 'left'
							}}>
							{"Do you have an account?"}
						</Text>
						<TouchableOpacity onPress={() => navigation.navigate('Login')}>
							<Text 
								style={{
									color: "#B50E00",
									fontSize: 16,
									fontWeight: "bold",
									textAlign: width < 400 ? 'center' : 'left',
									borderBottomWidth: 1,
									borderBottomColor: '#B50E00',
									paddingBottom: 1
								}}>
								{"Login"}
							</Text>
						</TouchableOpacity>
					</View>
				</View>

				<View 
					style={{
						marginTop: -30,
						alignItems: "flex-end",
					}}>
					<Image
						source = {{uri: "https://storage.googleapis.com/tagjs-prod.appspot.com/v1/IueuF8JG4P/uucz3hs1_expires_30_days.png"}} 
						resizeMode = {"stretch"}
						style={{
							borderRadius: 40,
							width: 239,
							height: 160,
						}}
					/>
				</View>
			</ScrollView>
		</SafeAreaView>
	)
}

export default Register;
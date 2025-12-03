import React, { useState, useRef, useEffect } from "react";
import {
  SafeAreaView,
  View,
  ScrollView,
  Image,
  Text,
  TouchableOpacity,
  TextInput,
  StyleSheet,
  Dimensions,
  StatusBar,
  Platform,
  Alert,
  ActivityIndicator,
  KeyboardAvoidingView,
  Modal,
  Animated,
  Easing
} from "react-native";
import { useNavigation } from "@react-navigation/native";

const { width, height } = Dimensions.get('window');

// --- ASSETS ---
const ASSETS = {
    back: "https://cdn-icons-png.flaticon.com/512/271/271220.png",
    uploadIcon: "https://cdn-icons-png.flaticon.com/512/126/126477.png",
    camera: "https://cdn-icons-png.flaticon.com/512/1042/1042339.png",
    check: "https://cdn-icons-png.flaticon.com/512/14876/14876743.png",
    trash: "https://cdn-icons-png.flaticon.com/512/1214/1214428.png",
    success3D: "https://cdn-icons-png.flaticon.com/512/7518/7518748.png", // 3D Success Icon
    
    // Mock ID Images (Simulating captured photos)
    mockDocFront: "https://images.unsplash.com/photo-1562564025-51dc115152f2?q=80&w=600&auto=format&fit=crop",
    mockDocBack: "https://images.unsplash.com/photo-1589829085413-56de8ae18c73?q=80&w=600&auto=format&fit=crop",
    mockUser: "https://images.unsplash.com/photo-1633332755192-727a05c4013d?q=80&w=400&auto=format&fit=crop"
};

// --- DOCUMENT TYPES ---
const DOC_TYPES = ["Aadhar Card", "PAN Card", "Passport", "Driving License"];

// --- SUCCESS MODAL COMPONENT ---
const SuccessModal = ({ visible, onClose }: { visible: boolean, onClose: () => void }) => {
    const scaleAnim = useRef(new Animated.Value(0)).current;
    const opacityAnim = useRef(new Animated.Value(0)).current;

    useEffect(() => {
        if (visible) {
            Animated.parallel([
                Animated.spring(scaleAnim, {
                    toValue: 1,
                    friction: 6,
                    tension: 50,
                    useNativeDriver: true
                }),
                Animated.timing(opacityAnim, {
                    toValue: 1,
                    duration: 300,
                    useNativeDriver: true
                })
            ]).start();
        } else {
            scaleAnim.setValue(0);
            opacityAnim.setValue(0);
        }
    }, [visible]);

    return (
        <Modal transparent visible={visible} animationType="none">
            <View style={styles.modalOverlay}>
                <Animated.View 
                    style={[
                        styles.modalContainer, 
                        { transform: [{ scale: scaleAnim }], opacity: opacityAnim }
                    ]}
                >
                    {/* 3D Icon */}
                    <View style={styles.successIconContainer}>
                        <View style={styles.glowEffect} />
                        <Image source={{ uri: ASSETS.success3D }} style={styles.successIcon} resizeMode="contain" />
                    </View>
                    
                    <Text style={styles.modalTitle}>Verification Submitted!</Text>
                    <Text style={styles.modalSub}>
                        Your documents have been received. We will notify you once the police verification is complete.
                    </Text>

                    <TouchableOpacity style={styles.modalBtn} onPress={onClose}>
                        <Text style={styles.modalBtnText}>Done</Text>
                    </TouchableOpacity>
                </Animated.View>
            </View>
        </Modal>
    );
};

export default function PoliceVerification() {
  const navigation = useNavigation();

  // --- State ---
  const [memberName, setMemberName] = useState("");
  const [selectedDocType, setSelectedDocType] = useState("Aadhar Card");
  
  // Image Data
  const [frontImage, setFrontImage] = useState<string | null>(null);
  const [backImage, setBackImage] = useState<string | null>(null);
  const [userPhoto, setUserPhoto] = useState<string | null>(null);
  
  // Loading States
  const [loadingFront, setLoadingFront] = useState(false);
  const [loadingBack, setLoadingBack] = useState(false);
  const [loadingPhoto, setLoadingPhoto] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  // Modal State
  const [showSuccess, setShowSuccess] = useState(false);

  // --- Handlers ---
  
  const simulateImagePick = (type: 'front' | 'back' | 'photo') => {
      if (type === 'front') setLoadingFront(true);
      if (type === 'back') setLoadingBack(true);
      if (type === 'photo') setLoadingPhoto(true);

      setTimeout(() => {
          if (type === 'front') {
              setFrontImage(ASSETS.mockDocFront);
              setLoadingFront(false);
          } else if (type === 'back') {
              setBackImage(ASSETS.mockDocBack);
              setLoadingBack(false);
          } else {
              setUserPhoto(ASSETS.mockUser);
              setLoadingPhoto(false);
          }
      }, 1500);
  };

  const handleUploadAction = (type: 'front' | 'back' | 'photo') => {
      Alert.alert(
          "Select Source",
          "Choose where to pick the image from:",
          [
              { text: "Camera", onPress: () => simulateImagePick(type) },
              { text: "Gallery", onPress: () => simulateImagePick(type) },
              { text: "Cancel", style: "cancel" }
          ]
      );
  };

  const handleSubmit = () => {
      if (!memberName.trim()) {
          Alert.alert("Required", "Please enter the member name.");
          return;
      }
      if (!frontImage || !backImage || !userPhoto) {
          Alert.alert("Required", "Please upload all required documents and photo.");
          return;
      }

      setIsSubmitting(true);
      
      // Simulate API Submission
      setTimeout(() => {
          setIsSubmitting(false);
          setShowSuccess(true); // Show Custom Modal
      }, 2000);
  };

  const handleModalClose = () => {
      setShowSuccess(false);
      navigation.goBack();
  };

  // --- Render Helper: Dynamic Upload Box ---
  const UploadBox = ({ title, image, loading, onUpload, onRemove }: any) => (
      <View style={styles.uploadContainer}>
          <Text style={styles.uploadLabel}>{title}</Text>
          
          {loading ? (
              <View style={styles.loadingBox}>
                  <ActivityIndicator size="large" color="#FFDD32" />
                  <Text style={styles.loadingText}>Uploading...</Text>
              </View>
          ) : image ? (
              <View style={styles.imagePreviewContainer}>
                  <Image source={{ uri: image }} style={styles.imagePreview} resizeMode="cover" />
                  <View style={styles.uploadedOverlay}>
                      <TouchableOpacity style={styles.removeBtn} onPress={onRemove}>
                          <Image source={{ uri: ASSETS.trash }} style={styles.trashIcon} />
                      </TouchableOpacity>
                      <View style={styles.checkBadge}>
                          <Image source={{ uri: ASSETS.check }} style={styles.checkIcon} />
                      </View>
                  </View>
              </View>
          ) : (
              <TouchableOpacity style={styles.uploadBox} onPress={onUpload} activeOpacity={0.7}>
                  <View style={styles.dashedBorder}>
                    <Image source={{ uri: ASSETS.uploadIcon }} style={styles.uploadIcon} />
                    <Text style={styles.uploadText}>Tap to Upload</Text>
                    <Text style={styles.uploadSubText}>JPG/PNG, max 5MB</Text>
                  </View>
              </TouchableOpacity>
          )}
      </View>
  );

  return (
    <View style={styles.mainContainer}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFDD32" translucent />
      
      {/* Header Background */}
      <View style={styles.yellowBackground} />

      <SafeAreaView style={styles.safeArea}>
        
        {/* Header */}
        <View style={styles.header}>
            <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
                <Image source={{ uri: ASSETS.back }} style={styles.backIcon} />
            </TouchableOpacity>
            <Text style={styles.headerTitle}>Police Verification</Text>
            <View style={{width: 24}} /> 
        </View>

        <KeyboardAvoidingView 
            style={{ flex: 1 }} 
            behavior={Platform.OS === "ios" ? "padding" : undefined}
        >
            <ScrollView 
                contentContainerStyle={styles.scrollContent} 
                showsVerticalScrollIndicator={false}
            >
                
                {/* 1. Member Details */}
                <View style={styles.section}>
                    <Text style={styles.label}>Member Name</Text>
                    <TextInput 
                        style={styles.input}
                        placeholder="Enter Full Name (e.g. John Doe)"
                        placeholderTextColor="#999"
                        value={memberName}
                        onChangeText={setMemberName}
                    />
                </View>

                {/* 2. Document Selector */}
                <View style={styles.section}>
                    <Text style={styles.label}>Select Document Type</Text>
                    <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.pillScroll}>
                        {DOC_TYPES.map((doc) => (
                            <TouchableOpacity 
                                key={doc} 
                                style={[styles.pill, selectedDocType === doc && styles.pillActive]}
                                onPress={() => setSelectedDocType(doc)}
                            >
                                <Text style={[styles.pillText, selectedDocType === doc && styles.pillTextActive]}>
                                    {doc}
                                </Text>
                            </TouchableOpacity>
                        ))}
                    </ScrollView>
                </View>

                {/* 3. ID Proof Uploads (Front & Back) */}
                <View style={styles.rowContainer}>
                    <View style={{flex: 1, marginRight: 10}}>
                        <UploadBox 
                            title={`${selectedDocType} (Front)`}
                            image={frontImage}
                            loading={loadingFront}
                            onUpload={() => handleUploadAction('front')}
                            onRemove={() => setFrontImage(null)}
                        />
                    </View>
                    <View style={{flex: 1}}>
                        <UploadBox 
                            title={`${selectedDocType} (Back)`}
                            image={backImage}
                            loading={loadingBack}
                            onUpload={() => handleUploadAction('back')}
                            onRemove={() => setBackImage(null)}
                        />
                    </View>
                </View>

                {/* 4. User Photo Upload (Selfie) */}
                <View style={styles.section}>
                    <Text style={styles.label}>Upload Photo / Selfie</Text>
                    <View style={styles.photoUploadRow}>
                        <TouchableOpacity onPress={() => handleUploadAction('photo')}>
                            {loadingPhoto ? (
                                <View style={[styles.userPhotoPlaceholder, {backgroundColor: '#FFFBE6'}]}>
                                    <ActivityIndicator color="#FFDD32" />
                                </View>
                            ) : userPhoto ? (
                                <Image source={{ uri: userPhoto }} style={styles.userPhoto} />
                            ) : (
                                <View style={styles.userPhotoPlaceholder}>
                                    <Image source={{ uri: ASSETS.camera }} style={styles.cameraIcon} />
                                </View>
                            )}
                        </TouchableOpacity>
                        
                        <View style={styles.photoInfo}>
                            <Text style={styles.infoTitle}>Selfie or Portrait</Text>
                            <Text style={styles.infoSub}>
                                {userPhoto ? "Photo uploaded successfully!" : "Please capture a clear photo of your face for verification."}
                            </Text>
                            {userPhoto && (
                                <TouchableOpacity onPress={() => setUserPhoto(null)}>
                                    <Text style={styles.removeText}>Remove Photo</Text>
                                </TouchableOpacity>
                            )}
                        </View>
                    </View>
                </View>

                {/* 5. Submit Button */}
                <TouchableOpacity 
                    style={[
                        styles.submitBtn, 
                        (!memberName || !frontImage || !backImage || !userPhoto) && styles.submitBtnDisabled
                    ]} 
                    onPress={handleSubmit}
                    disabled={isSubmitting}
                >
                    {isSubmitting ? (
                        <ActivityIndicator color="#000" />
                    ) : (
                        <Text style={styles.submitText}>Submit Verification</Text>
                    )}
                </TouchableOpacity>

            </ScrollView>
        </KeyboardAvoidingView>
      </SafeAreaView>

      {/* Success Popup Modal */}
      <SuccessModal visible={showSuccess} onClose={handleModalClose} />

    </View>
  );
}

const styles = StyleSheet.create({
  mainContainer: { flex: 1, backgroundColor: "#F9F9F9" },
  yellowBackground: { position: 'absolute', top: 0, left: 0, right: 0, height: 280, backgroundColor: '#FFDD32', borderBottomLeftRadius: 30, borderBottomRightRadius: 30 },
  safeArea: { flex: 1, paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0 },
  
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 20, paddingTop: 20, paddingBottom: 15 },
  backButton: { padding: 5 },
  backIcon: { width: 24, height: 24, tintColor: '#000' },
  headerTitle: { fontSize: 20, fontWeight: 'bold', color: '#000' },

  scrollContent: { padding: 20, paddingBottom: 50 },
  
  // Sections
  section: { marginBottom: 25 },
  label: { fontSize: 14, fontWeight: '700', color: '#333', marginBottom: 10 },
  
  // Input
  input: {
      backgroundColor: '#FFF',
      height: 54,
      borderRadius: 14,
      paddingHorizontal: 15,
      fontSize: 16,
      color: '#000',
      borderWidth: 1,
      borderColor: '#EEE',
      shadowColor: "#000", shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.05, shadowRadius: 5, elevation: 2
  },

  // Pills
  pillScroll: { flexDirection: 'row' },
  pill: {
      paddingVertical: 8,
      paddingHorizontal: 18,
      backgroundColor: 'rgba(255,255,255,0.8)',
      borderRadius: 25,
      marginRight: 10,
      borderWidth: 1,
      borderColor: 'rgba(0,0,0,0.05)'
  },
  pillActive: {
      backgroundColor: '#000',
      borderColor: '#000'
  },
  pillText: { fontSize: 13, fontWeight: '600', color: '#333' },
  pillTextActive: { color: '#FFDD32' },

  // Upload Boxes
  rowContainer: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 25 },
  uploadContainer: { flex: 1 },
  uploadLabel: { fontSize: 12, fontWeight: '600', color: '#555', marginBottom: 8 },
  
  uploadBox: {
      height: 140,
      backgroundColor: '#FFF',
      borderRadius: 16,
      overflow: 'hidden',
  },
  dashedBorder: {
      flex: 1,
      borderWidth: 1.5,
      borderColor: '#CCC',
      borderStyle: 'dashed',
      borderRadius: 16,
      justifyContent: 'center',
      alignItems: 'center',
      width: '100%'
  },
  uploadIcon: { width: 32, height: 32, marginBottom: 8, tintColor: '#AAA' },
  uploadText: { fontSize: 12, fontWeight: 'bold', color: '#555' },
  uploadSubText: { fontSize: 10, color: '#999', textAlign: 'center', marginTop: 2 },

  loadingBox: {
      height: 140,
      backgroundColor: '#FFF',
      borderRadius: 16,
      justifyContent: 'center',
      alignItems: 'center',
      borderWidth: 1,
      borderColor: '#EEE'
  },
  loadingText: { marginTop: 10, fontSize: 12, color: '#666', fontWeight: '500' },

  imagePreviewContainer: { height: 140, borderRadius: 16, overflow: 'hidden', position: 'relative', borderWidth: 1, borderColor: '#EEE' },
  imagePreview: { width: '100%', height: '100%' },
  uploadedOverlay: { ...StyleSheet.absoluteFillObject, backgroundColor: 'rgba(0,0,0,0.05)', justifyContent: 'space-between', padding: 8 },
  removeBtn: { alignSelf: 'flex-end', backgroundColor: '#FFF', borderRadius: 15, padding: 6, elevation: 2 },
  trashIcon: { width: 14, height: 14, tintColor: '#FF3B30' },
  checkBadge: { alignSelf: 'center', marginTop: 15, backgroundColor: '#2ECC71', borderRadius: 20, padding: 6, elevation: 3 },
  checkIcon: { width: 16, height: 16, tintColor: '#FFF' },

  photoUploadRow: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#FFF', padding: 15, borderRadius: 20, shadowColor: "#000", shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.05, shadowRadius: 8, elevation: 3 },
  userPhoto: { width: 70, height: 70, borderRadius: 35 },
  userPhotoPlaceholder: { width: 70, height: 70, borderRadius: 35, backgroundColor: '#F5F5F5', justifyContent: 'center', alignItems: 'center', borderWidth: 1, borderColor: '#DDD' },
  cameraIcon: { width: 26, height: 26, tintColor: '#999' },
  photoInfo: { marginLeft: 15, flex: 1 },
  infoTitle: { fontSize: 16, fontWeight: 'bold', color: '#000' },
  infoSub: { fontSize: 12, color: '#666', marginTop: 4, lineHeight: 18 },
  removeText: { fontSize: 12, color: '#FF3B30', fontWeight: 'bold', marginTop: 5 },

  submitBtn: {
      backgroundColor: '#FFDD32',
      height: 56,
      borderRadius: 30,
      justifyContent: 'center',
      alignItems: 'center',
      shadowColor: "#FFDD32", shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.4, shadowRadius: 10, elevation: 5,
      marginTop: 10
  },
  submitBtnDisabled: {
      backgroundColor: '#E0E0E0',
      shadowOpacity: 0,
      elevation: 0
  },
  submitText: { fontSize: 18, fontWeight: 'bold', color: '#000' },

  // Modal Styles
  modalOverlay: {
      flex: 1,
      backgroundColor: 'rgba(0,0,0,0.6)',
      justifyContent: 'center',
      alignItems: 'center'
  },
  modalContainer: {
      width: '80%',
      backgroundColor: '#FFF',
      borderRadius: 25,
      padding: 30,
      alignItems: 'center',
      elevation: 20,
      shadowColor: "#000", shadowOffset: { width: 0, height: 10 }, shadowOpacity: 0.3, shadowRadius: 20
  },
  successIconContainer: {
      marginBottom: 20,
      alignItems: 'center',
      justifyContent: 'center',
      position: 'relative'
  },
  successIcon: {
      width: 100,
      height: 100
  },
  glowEffect: {
      position: 'absolute',
      width: 120,
      height: 120,
      borderRadius: 60,
      backgroundColor: '#FFDD32',
      opacity: 0.2
  },
  modalTitle: { fontSize: 22, fontWeight: '900', color: '#000', textAlign: 'center', marginBottom: 10 },
  modalSub: { fontSize: 15, color: '#666', textAlign: 'center', lineHeight: 22, marginBottom: 30 },
  modalBtn: {
      backgroundColor: '#FFDD32',
      paddingVertical: 14,
      paddingHorizontal: 40,
      borderRadius: 30,
      width: '100%',
      alignItems: 'center',
      elevation: 5
  },
  modalBtnText: { fontSize: 16, fontWeight: 'bold', color: '#000' }
});
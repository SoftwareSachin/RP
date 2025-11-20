export type RootStackParamList = {
  Welcome: undefined;
  Login: undefined;
  Signup: undefined;
  ForgotPassword: undefined;
  OTPVerification: { phone?: string; email?: string };
  Main: undefined;
  Home: undefined;
  Search: undefined;
  PropertyList: { searchQuery?: string; filters?: any };
  PropertyDetail: { propertyId: string };
  BookingDetails: { propertyId: string };
  SelectMembers: { propertyId: string };
  SelectDate: { propertyId: string; members: number };
  Payment: { propertyId: string; bookingDetails: any };
  PaymentSuccess: { bookingId: string };
  Profile: undefined;
  EditProfile: undefined;
  SavedProperties: undefined;
  Notifications: undefined;
  Settings: undefined;
  HelpSupport: undefined;
  MapView: { properties: any[] };
  Filter: { onApply: (filters: any) => void; initialFilters?: any };
  Sort: { onApply: (sortOption: string) => void; currentSort?: string };
  Messages: { threadId?: string };
  Referral: undefined;
  PaymentHistory: undefined;
  AddProperty: undefined;
  PropertyVerification: undefined;
  TermsAndConditions: undefined;
  PrivacyPolicy: undefined;
};

export type AuthStackParamList = {
  Welcome: undefined;
  Login: undefined;
  Signup: undefined;
  ForgotPassword: undefined;
  OTPVerification: { phone?: string; email?: string };
};

export type MainTabParamList = {
  Home: undefined;
  Search: undefined;
  AddProperty: undefined;
  Saved: undefined;
  Account: undefined;
};

export type HomeStackParamList = {
  Home: undefined;
  PropertyDetail: { propertyId: string };
  Filter: { onApply: (filters: any) => void; initialFilters?: any };
  Sort: { onApply: (sortOption: string) => void; currentSort?: string };
  MapView: { properties: any[] };
};

export type AccountStackParamList = {
  Account: undefined;
  EditProfile: undefined;
  PaymentHistory: undefined;
  HelpSupport: undefined;
  Settings: undefined;
  Referral: undefined;
  TermsAndConditions: undefined;
  PrivacyPolicy: undefined;
};

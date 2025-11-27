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
  IPhone1642: undefined;
  Settings: undefined;
  PersonalInfo: undefined;
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
  IPhone1642: undefined;
  Register: undefined;
  MobileLogin: undefined;
  Verification: { phoneNumber: string; callingCode: string; countryCode: string };
  HomeRent: undefined; // Added for navigation from IPhone1642
  PropertyList: { searchQuery: string }; // Added for search navigation
  Lists: undefined; // Added for Lists tab navigation
  VisitScheduled: undefined; // Added for VisitScheduled screen
  ThankYou: undefined; // Added for ThankYou screen
  Saved: undefined; // Added for Saved screen
  Saved1: undefined; // Added for Saved1 screen
  PaymentHistory: undefined; // Added for payment history screen in Auth stack
  Payment: undefined; // Added for Payment screen in Auth stack
  TransactionSuccess: undefined; // Added for payment confirmation screen
  Account: undefined; // Added for Account/profile screen in Auth stack
  Settings: undefined; // Added for Settings screen in Auth stack
  PersonalInfo: undefined; // Added for PersonalInfo screen in Auth stack
  MonthlyRent: undefined; // Added for MonthlyRent screen in Auth stack
  FilterScreen: undefined; // Added for filter UI in auth stack
  OccupiedProperty: undefined; // Added for occupied property details screen
  PoliceVerification: undefined; // Added for police verification screen
  IPhone1647: { propertyId: string }; // Added for property detail view
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
  PersonalInfo: undefined;
};

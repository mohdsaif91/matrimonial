import { RelOptions } from "../types/form";

export type Field = {
  value?: string | number;
  type:
    | "text"
    | "textarea"
    | "select"
    | "date"
    | "time"
    | "dob"
    | "checkbox"
    | "searchabelSelect";
  name: string;
  label: string;
  required?: boolean;
  options?: RelOptions[] | string[]; // for dropdowns
};

export const formSchema = {
  leadId: { type: "text", name: "leadId", label: "Lead Id", value: "" },
  sourcedFrom: {
    type: "searchabelSelect",
    name: "sourcedFrom",
    label: "Sourced From",
    options: [],
    required: false,
    value: "",
  },
  profileHandled: {
    type: "searchabelSelect",
    name: "profileHandled",
    label: "Profile Handled",
    options: [],
    required: true,
    value: "",
  },
  profileCreated: {
    type: "searchabelSelect",
    name: "profileCreated",
    label: "Profile Created",
    options: [],
    required: true,
    value: "",
  },
  profileVisited: {
    type: "searchabelSelect",
    name: "profileVisited",
    label: "Profile Visited",
    options: [],
    value: "",
  },
  clientType: {
    type: "searchabelSelect",
    name: "clientType",
    label: "Client Type",
    options: [],
    value: "",
  },
  clientVerification: {
    type: "searchabelSelect",
    name: "clientVerification",
    label: "Client Verification",
    options: [],
    value: "",
  },
  contactPersonName: {
    type: "text",
    name: "contactPersonName",
    label: "Name of the Contact Person",
    value: "",
  },
  contactPersonAddress: {
    type: "text",
    name: "contactPersonAddress",
    label: "Contact Person Address",
    value: "",
  },
  whatsappNumber: {
    type: "text",
    name: "whatsappNumber",
    label: "Whatsapp Number",
    value: "",
  },
  mobileNumber: {
    type: "text",
    name: "mobileNumber",
    label: "Mobile Number",
    value: "",
  },
  contactPersonEmail: {
    type: "text",
    name: "contactPersonEmail",
    label: "Contact Person Email",
    value: "",
  },

  clientName: {
    type: "text",
    name: "clientName",
    label: "Client Name",
    required: true,
    value: "",
  },
  clientMobile: {
    type: "text",
    value: "",
    name: "clientMobile",
    label: "Client Mobile",
    required: true,
  },
  clientEmail: {
    type: "text",
    value: "",
    name: "clientEmail",
    label: "Client Email",
    required: true,
  },

  profileComment: {
    type: "text",
    value: "",
    name: "profileComment",
    label: "Profile Comment",
  },
  gender: {
    type: "select",
    name: "gender",
    label: "Gender",
    required: true,
    options: [
      { label: "Male", value: "male" },
      { label: "Female", value: "female" },
      { label: "Other", value: "other" },
    ],
    value: "",
  },
  maritalStatus: {
    type: "select",
    name: "maritalStatus",
    label: "Marital Status",
    required: true,
    options: [
      { label: "Single", value: "0" },
      { label: "Married", value: "1" },
      { label: "Divorced", value: "2" },
      { label: "Widowed", value: "3" },
      { label: "Single (Never Married)", value: "4" },
    ],
    value: "",
  },
  religion: {
    type: "searchabelSelect",
    name: "religion",
    label: "Religion",
    required: true,
    options: [
      { label: "Hindu", value: "1" },
      { label: "Muslim", value: "2" },
      { label: "Christian", value: "3" },
      { label: "Sikh", value: "4" },
      { label: "Buddhist", value: "5" },
      { label: "Jain", value: "6" },
      { label: "Parsi", value: "7" },
      { label: "Jewish", value: "8" },
      { label: "Other", value: "9" },
    ],
    value: "",
  },
  caste: {
    type: "searchabelSelect",
    name: "caste",
    label: "Caste",
    required: true,
    options: [],
    value: "",
  },
  subCaste: {
    type: "searchabelSelect",
    name: "subCaste",
    label: "Sub Caste",
    options: [],
    value: "",
  },
  details: { type: "textarea", name: "details", label: "Details", value: "" },
  dateOfBirth: {
    type: "dob",
    name: "dateOfBirth",
    label: "Date of Birth",
    required: true,
    value: "",
  },
  timeOfBirth: {
    type: "time",
    name: "timeOfBirth",
    label: "Time of Birth",
    value: "",
  },
  birthPlace: {
    type: "text",
    name: "birthPlace",
    label: "Birth of Place",
    value: "",
  },
  astrologically: {
    type: "select",
    name: "astrologically",
    label: "Astrologically",
    required: true,
    options: ["Manglik", "Not Manglik", "Partially Manglik", "Don't Know"],
  },
  gotra: { type: "text", name: "gotra", label: "Gotra", value: "" },
  height: {
    type: "text",
    name: "height",
    label: "Height",
    required: true,
    value: "",
  },
  weight: { type: "text", name: "weight", label: "Weight", value: "" },
  complexion: {
    type: "searchabelSelect",
    name: "complexion",
    label: "Complexion",
    options: [],
    value: "",
  },
  personality: {
    type: "searchabelSelect",
    name: "personality",
    label: "Personality",
    options: [],
    value: "",
  },

  drinkingHabits: {
    type: "select",
    name: "drinkingHabits",
    label: "Drinking Habits",
    options: [
      { label: "Never", value: "never" },
      { label: "regularly", value: "regularly" },
      { label: "Seldom", value: "seldom" },
      { label: "Occasionally/Rarely", value: "occasionally/rarely" },
    ],
    value: "",
  },
  eatingHabits: {
    type: "select",
    name: "eatingHabits",
    label: "Eating Habits",
    options: [
      { label: "Non-Vegetarain", value: "non-vegetarain" },
      { label: "Vegetarain", value: "vegetarain" },
      { label: "Both", value: "both" },
      { label: "Occasionally non-veg", value: "occasionally non-veg" },
      { label: "Eggetarian", value: "eggetarian" },
    ],
    value: "",
  },
  smokingHabits: {
    type: "select",
    name: "smokingHabits",
    label: "Smoking Habits",
    options: [
      { label: "Never", value: "never" },
      { label: "regularly", value: "regularly" },
      { label: "Seldom", value: "seldom" },
      { label: "Occasionally/Rarely", value: "occasionally/rarely" },
    ],
    value: "",
  },
  partnerPreferences: {
    type: "textarea",
    name: "partnerPreferences",
    label: "Partner Preferences",
    required: true,
    value: "",
  },
  openForOtherCaste: {
    type: "checkbox",
    options: [
      { label: "Yes", value: "yes" },
      { label: "No", value: "no" },
    ],
    name: "openForOtherCaste",
    label: "Open for other caste",
    value: 0,
  },
  openForDivorce: {
    type: "checkbox",
    options: [
      { label: "Yes", value: "yes" },
      { label: "No", value: "no" },
    ],
    name: "openForDivorce",
    label: "Open for divorcee",
    value: 0,
  },
  openForOtherState: {
    type: "checkbox",
    options: [
      { label: "Yes", value: "yes" },
      { label: "No", value: "no" },
    ],
    name: "openForOtherState",
    label: "Open for other state",
    value: 0,
  },
  healthScreeningConsent: {
    type: "checkbox",
    options: [
      { label: "Yes", value: "yes" },
      { label: "No", value: "no" },
    ],
    name: "healthScreeningConsent",
    label: "Health screening Consent",
    value: 0,
  },
  eyeSight: {
    type: "select",
    name: "eyeSight",
    label: "Eye Sight",
    options: [
      { label: "Normal", value: "Normal" },
      { label: "Use Spectacles", value: "Use Spectacles" },
      { label: "Lenses", value: "Lenses" },
    ],
    value: "",
  },
  believesInPatri: {
    type: "checkbox",
    options: [
      { label: "Yes", value: "yes" },
      { label: "No", value: "no" },
    ],
    name: "believesInPatri",
    label: "Believes in Patri",
    value: 0,
  },
  willingToGoAbroad: {
    type: "checkbox",
    options: [
      { label: "Yes", value: "yes" },
      { label: "No", value: "no" },
    ],
    name: "willingToGoAbroad",
    label: "Willing to go Abroad",
    value: 0,
  },
  nriStatus: {
    type: "select",
    name: "nriStatus",
    label: "NRI Status",
    options: [
      { label: "Yes", value: 0 },
      { label: "No", value: 1 },
    ],
    value: "",
  },
  visa: {
    type: "select",
    name: "visa",
    label: "Visa",
    options: [
      { label: "H1", value: "H1" },
      { label: "Green Card", value: "Green Card" },
    ],
    value: "",
  },
  disability: {
    type: "checkbox",
    name: "disability",
    label: "Disability",
    value: 0,
  },
  hobbies: {
    type: "text",
    name: "hobbies",
    label: "Hobbies",
    required: true,
    value: "",
  },
  clientNotes: {
    type: "textarea",
    name: "clientNotes",
    label: "Client Notes",
    value: "",
  },
};

export const defaultClientData = {
  profile_id: "",
  lead_id: "",
  name: "",
  email: "",
  mobile: "",
  gender: "",
  marital_status: "",
  open_for_divorce: false,
  occupation_id: "0",
  profile_visited: "0",
  sourced_from_id: "0",
  profile_handled_by: "0",
  profile_created_by: "0",
  membership_profile: "",
  premium_college: "",
  active: false,
  client_type: "",
  religion_id: "0",
  country: "",
  state: "",
  city: "",
  native_town: "",
  native_state: "",
  contact_person_name: "",
  contact_person_address: "",
  whatsapp_number: "",
  contact_person_email: "",
  date_of_birth: "",
  time_of_birth: "",
  birth_place: "",
  astrologically: "",
  gotra: "",
  height: "",
  weight: "",
  complexion: "",
  personality: "",
  drinking_habits: "",
  eating_habits: "",
  smoking_habits: "",
  partner_preferences: "",
  open_for_other_caste: false,
  open_for_other_state: false,
  health_screening_consent: false,
  eye_sight: "",
  believes_in_patri: false,
  willing_to_go_abroad: false,
  nri_status: false,
  visa: "",
  disability: false,
  hobbies: "",
  profile_comment: "",
  details: "",
  client_notes: "",
  client_verification: "",
  cast_id: "",
  sub_caste_id: "",
  relationship_with_member: "",
  client_name: "",
  clientMobile: "",
  client_email: "",
};

export const clientFormbtn = [
  { value: 1, label: "Personal Details" },
  { value: 2, label: "Education & Occupation" },
  { value: 3, label: "Family Details" },
  { value: 4, label: "Contact Details" },
  { value: 5, label: "Registration Details" },
  { value: 6, label: "Payment Details" },
];

export const validationOptions = [
  { value: "alphabet", label: "Alphabet" },
  { value: "number", label: "Number" },
  { value: "email", label: "Email" },
  { value: "none", label: "None" },
];

export const requiredOptions = [
  { value: 1, label: "Yes" },
  { value: 0, label: "No" },
];

export const viewInPdfOptions = [
  { value: 1, label: "Yes" },
  { value: 0, label: "No" },
];

export const statusOptions = [
  { value: "active", label: "Active" },
  { value: "inactive", label: "In Active" },
];

export const statusOptionsCap = [
  { value: "Active", label: "Active" },
  { value: "Inactive", label: "In Active" },
];

export const techLeadOptions = [
  { value: "Lead", label: "Lead" },
  { value: "Profile", label: "Profile" },
];

export const formItemOptions = [
  { value: "text", label: "Text" },
  { value: "dropdown", label: "Dropdown" },
  { value: "textArea", label: "Text Area" },
  { value: "radio", label: "Radio Button" },
  { value: "checkbox", label: "Checkbox" },
  { value: "datepicker", label: "Date Picker" },
  { value: "richText", label: "Rich Text" },
  { value: "image", label: "Image Picker" },
];

export const addClientFormClientType = [
  { value: "general", label: "General" },
  { value: "imporatnt(vip)", label: "Important (VIP)" },
  { value: "confidential", label: "Confidential" },
];

export const clientVerificationOptions = [
  { value: "physical", label: "Physical" },
  { value: "video", label: "Video" },
  { value: "kyc", label: "KYC" },
];

export const complexionOptions = [
  { label: "Very Fair", value: "very_fair" },
  { label: "Fair", value: "fair" },
  { label: "Wheatish", value: "wheatish" },
  { label: "Dusky", value: "dusky" },
  { label: "Dark", value: "dark" },
];

export const personalityOptions = [
  { label: "slim", value: "veg" },
  { label: "average", value: "non_veg" },
  { label: "athletic", value: "Athletic" },
  { label: "heavy", value: "Heavy" },
];

export const yesNoOptions = [
  { label: "Yes", value: 1 },
  { label: "No", value: 0 },
];

export const genderOptions = [
  { label: "Male", value: "male" },
  { label: "Female", value: "female" },
  { label: "Other", value: "other" },
];

export const maritialStatusOptions = [
  { label: "Single", value: "0" },
  { label: "Married", value: "1" },
  { label: "Divorced", value: "2" },
  { label: "Widowed", value: "3" },
  { label: "Single (Never Married)", value: "4" },
];

export const astrologicalOptions = [
  { label: "Manglik", value: "manglik" },
  { label: "Not Manglik", value: "notmanglik" },
  { label: "Partially Manglik", value: "partiallymanglik" },
  { label: "Don't Know", value: "DontKnow" },
];

export const heightOptions = [
  { label: "4ft", value: "4.0" },
  { label: "4ft 1in", value: "4.01" },
  { label: "4ft 2in", value: "4.02" },
  { label: "4ft 3in", value: "4.03" },
  { label: "4ft 4in", value: "4.04" },
  { label: "4ft 5in", value: "4.05" },
  { label: "4ft 6in", value: "4.06" },
  { label: "4ft 7in", value: "4.07" },
  { label: "4ft 8in", value: "4.08" },
  { label: "4ft 9in", value: "4.09" },
  { label: "4ft 10in", value: "4.10" },
  { label: "4ft 11in", value: "4.11" },
  { label: "5ft", value: "5.0" },
  { label: "5ft 1in", value: "5.01" },
  { label: "5ft 2in", value: "5.02" },
  { label: "5ft 3in", value: "5.03" },
  { label: "5ft 4in", value: "5.04" },
  { label: "5ft 5in", value: "5.05" },
  { label: "5ft 6in", value: "5.06" },
  { label: "5ft 7in", value: "5.07" },
  { label: "5ft 8in", value: "5.08" },
  { label: "5ft 9in", value: "5.09" },
  { label: "5ft 10in", value: "5.10" },
  { label: "5ft 11in", value: "5.11" },
  { label: "6ft", value: "6.0" },
  { label: "6ft 1in", value: "6.01" },
  { label: "6ft 2in", value: "6.02" },
  { label: "6ft 3in", value: "6.03" },
  { label: "6ft 4in", value: "6.04" },
  { label: "6ft 5in", value: "6.05" },
  { label: "6ft 6in", value: "6.06" },
  { label: "6ft 7in", value: "6.07" },
  { label: "6ft 8in", value: "6.08" },
  { label: "6ft 9in", value: "6.09" },
];

export const drinkingHabitOptions = [
  { label: "Never", value: "never" },
  { label: "regularly", value: "regularly" },
  { label: "Seldom", value: "seldom" },
  { label: "Occasionally/Rarely", value: "occasionally/rarely" },
];

export const eatingHabitOptions = [
  { label: "Non-Vegetarain", value: "non-vegetarain" },
  { label: "Vegetarain", value: "vegetarain" },
  { label: "Both", value: "both" },
  { label: "Occasionally non-veg", value: "occasionally non-veg" },
  { label: "Eggetarian", value: "eggetarian" },
];

export const smokingHabitsOptions = [
  { label: "Never", value: "never" },
  { label: "regularly", value: "regularly" },
  { label: "Seldom", value: "seldom" },
  { label: "Occasionally/Rarely", value: "occasionally/rarely" },
];

export const eyeSightOptions = [
  { label: "Normal", value: "Normal" },
  { label: "Use Spectacles", value: "Use Spectacles" },
  { label: "Lenses", value: "Lenses" },
];

export const incomeOptions = [
  {
    label: "Lakh",
    value: "lakh",
  },
  {
    label: "Cr",
    value: "cr",
  },
];

export const personalIncomeOptions = [
  { label: "2 Lacs", value: "200000" },
  { label: "3 Lacs", value: "300000" },
  { label: "4 Lacs", value: "400000" },
  { label: "5 Lacs", value: "500000" },
  { label: "6 Lacs", value: "600000" },
  { label: "7 Lacs", value: "700000" },
  { label: "7.5 Lacs", value: "750000" },
  { label: "8 Lacs", value: "800000" },
  { label: "9 Lacs", value: "900000" },
  { label: "10 Lacs", value: "1000000" },
  { label: "11 Lacs", value: "1100000" },
  { label: "12 Lacs", value: "1200000" },
  { label: "13 Lacs", value: "1300000" },
  { label: "14 Lacs", value: "1400000" },
  { label: "15 Lacs", value: "1500000" },
  { label: "16 Lacs", value: "1600000" },
  { label: "17 Lacs", value: "1700000" },
  { label: "18 Lacs", value: "1800000" },
  { label: "19 Lacs", value: "1900000" },
  { label: "20 Lacs", value: "2000000" },
  { label: "21 Lacs", value: "2100000" },
  { label: "22 Lacs", value: "2200000" },
  { label: "23 Lacs", value: "2300000" },
  { label: "24 Lacs", value: "2400000" },
  { label: "25 Lacs", value: "2500000" },
  { label: "26 Lacs", value: "2600000" },
  { label: "27 Lacs", value: "2700000" },
  { label: "28 Lacs", value: "2800000" },
  { label: "29 Lacs", value: "2900000" },
  { label: "30 Lacs", value: "3000000" },
  { label: "31 Lacs", value: "3100000" },
  { label: "32 Lacs", value: "3200000" },
  { label: "33 Lacs", value: "3300000" },
  { label: "34 Lacs", value: "3400000" },
  { label: "35 Lacs", value: "3500000" },
  { label: "36 Lacs", value: "3600000" },
  { label: "37 Lacs", value: "3700000" },
  { label: "38 Lacs", value: "3800000" },
  { label: "39 Lacs", value: "3900000" },
  { label: "40 Lacs", value: "4000000" },
  { label: "41 Lacs", value: "4100000" },
  { label: "42 Lacs", value: "4200000" },
  { label: "43 Lacs", value: "4300000" },
  { label: "44 Lacs", value: "4400000" },
  { label: "45 Lacs", value: "4500000" },
  { label: "46 Lacs", value: "4600000" },
  { label: "47 Lacs", value: "4700000" },
  { label: "48 Lacs", value: "4800000" },
  { label: "49 Lacs", value: "4900000" },
  { label: "50 Lacs", value: "5000000" },
  { label: "51 Lacs", value: "5100000" },
  { label: "52 Lacs", value: "5200000" },
  { label: "53 Lacs", value: "5300000" },
  { label: "54 Lacs", value: "5400000" },
  { label: "55 Lacs", value: "5500000" },
  { label: "56 Lacs", value: "5600000" },
  { label: "57 Lacs", value: "5700000" },
  { label: "58 Lacs", value: "5800000" },
  { label: "59 Lacs", value: "5900000" },
  { label: "60 Lacs", value: "6000000" },
  { label: "61 Lacs", value: "6100000" },
  { label: "62 Lacs", value: "6200000" },
  { label: "63 Lacs", value: "6300000" },
  { label: "64 Lacs", value: "6400000" },
  { label: "70 Lacs", value: "7000000" },
  { label: "80 Lacs", value: "8000000" },
  { label: "90 Lacs", value: "9000000" },
  { label: "95 Lacs", value: "9500000" },
  { label: "1 Cr", value: "10000000" },
  { label: "1.15 Cr", value: "11500000" },
  { label: "1.5 Cr", value: "15000000" },
  { label: "1.6 Cr", value: "16000000" },
  { label: "1.8 Cr", value: "18000000" },
  { label: "2 Cr", value: "20000000" },
  { label: "2.5 Cr", value: "25000000" },
  { label: "3 Cr", value: "30000000" },
  { label: "4 Cr", value: "40000000" },
  { label: "5 Cr", value: "50000000" },
  { label: "6 Cr", value: "60000000" },
  { label: "7 Cr", value: "70000000" },
  { label: "8 Cr", value: "80000000" },
  { label: "9 Cr", value: "90000000" },
  { label: "10 Cr", value: "100000000" },
  { label: "11 Cr", value: "110000000" },
  { label: "12 Cr", value: "120000000" },
  { label: "13 Cr", value: "130000000" },
  { label: "14 Cr", value: "140000000" },
  { label: "15 Cr", value: "150000000" },
  { label: "16 Cr", value: "160000000" },
  { label: "17 Cr", value: "170000000" },
  { label: "18 Cr", value: "180000000" },
  { label: "19 Cr", value: "190000000" },
  { label: "20 Cr", value: "200000000" },
  { label: "21 Cr", value: "210000000" },
  { label: "22 Cr", value: "220000000" },
  { label: "23 Cr", value: "230000000" },
  { label: "24 Cr", value: "240000000" },
  { label: "25 Cr", value: "250000000" },
  { label: "26 Cr", value: "260000000" },
  { label: "27 Cr", value: "270000000" },
  { label: "28 Cr", value: "280000000" },
  { label: "29 Cr", value: "290000000" },
  { label: "30 Cr", value: "300000000" },
  { label: "31 Cr", value: "310000000" },
  { label: "32 Cr", value: "320000000" },
  { label: "33 Cr", value: "330000000" },
  { label: "34 Cr", value: "340000000" },
  { label: "35 Cr", value: "350000000" },
  { label: "36 Cr", value: "360000000" },
  { label: "37 Cr", value: "370000000" },
  { label: "38 Cr", value: "380000000" },
  { label: "39 Cr", value: "390000000" },
  { label: "40 Cr", value: "400000000" },
  { label: "41 Cr", value: "410000000" },
  { label: "42 Cr", value: "420000000" },
  { label: "43 Cr", value: "430000000" },
  { label: "44 Cr", value: "440000000" },
  { label: "45 Cr", value: "450000000" },
  { label: "46 Cr", value: "460000000" },
  { label: "47 Cr", value: "470000000" },
  { label: "48 Cr", value: "480000000" },
  { label: "49 Cr", value: "490000000" },
  { label: "50 Cr", value: "500000000" },
];

export const deadAliveOptions = [
  { label: "Alive", value: "alive" },
  { label: "Deceased", value: "deceased" },
];

export const familyTypeOptions = [
  { label: "Nuclear Family", value: "nuclearFamily" },
  { label: "Joint Family", value: "jointFamily" },
];

export const houseTypeOptions = [
  { label: "Apartment", value: "22" },
  { label: "Floor/Floors", value: "23" },
  { label: "Banglow", value: "24" },
  { label: "Kothi", value: "25" },
  { label: "Rented", value: "26" },
  { label: "Own House", value: "27" },
];

export const packageTypeOptions = [
  { label: "Essence Package/Foundation Plan", value: "6" },
  { label: "Essence Package/Essential Match Plan", value: "7" },
  { label: "Elite/Premium Membership", value: "8" },
  { label: "Elite/Signature Membership", value: "9" },
  { label: "Grand/Elan Package", value: "10" },
  { label: "Grand/Prestige Package", value: "11" },
  { label: "Grand/Premium Package", value: "12" },
];

export const membershipProfileStatus = [
  { label: "Unpaid", value: "1" },
  { label: "Paid", value: "2" },
  { label: "Others", value: "3" },
  { label: "Partially Paid", value: "4" },
];

export const statusOption = [
  { label: "Active", value: "44" },
  { label: "Inactive", value: "45" },
  { label: "Closed", value: "46" },
  { label: "Closed By Us", value: "47" },
];

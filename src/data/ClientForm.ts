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
      { label: "Regularly", value: "regularly" },
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
  { value: "In Active", label: "In Active" },
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
  { value: "General", label: "General" },
  { value: "Important (VIP)", label: "Important (VIP)" },
  { value: "Confidential", label: "Confidential" },
];

export const clientVerificationOptions = [
  { value: "Physical", label: "Physical" },
  { value: "Video", label: "Video" },
  { value: "KYC", label: "KYC" },
];

export const complexionOptions = [
  { label: "Very Fair", value: "Very Fair" },
  { label: "Fair", value: "Fair" },
  { label: "Wheatish", value: "Wheatish" },
  { label: "Dusky", value: "Dusky" },
  { label: "Dark", value: "Dark" },
];

export const personalityOptions = [
  { label: "Slim", value: "Slim" },
  { label: "Average", value: "Average" },
  { label: "Athletic", value: "Athletic" },
  { label: "Heavy", value: "Heavy" },
];

export const yesNoOptions = [
  { label: "Yes", value: "Yes" },
  { label: "No", value: "No" },
];

export const yesNoOptionsSmall = [
  { label: "Yes", value: "yes" },
  { label: "No", value: "no" },
];

export const genderOptions = [
  { label: "Male", value: "Male" },
  { label: "Female", value: "Female" },
  { label: "Other", value: "Other" },
];

export const maritialStatusOptions = [
  { label: "Single", value: "Single" },
  { label: "Married", value: "Married" },
  { label: "Divorced", value: "Divorced" },
  { label: "Widowed", value: "Widowed" },
  { label: "Single (Never Married)", value: "Single (Never Married)" },
];

export const astrologicalOptions = [
  { label: "Manglik", value: "Manglik" },
  { label: "Not Manglik", value: "Not Manglik" },
  { label: "Partially Manglik", value: "Partially Manglik" },
  { label: "Don't Know", value: "Don't Know" },
];

export const heightOptions = [
  { label: "4ft", value: "4ft" },
  { label: "4ft 1in", value: "4ft 1in" },
  { label: "4ft 2in", value: "4ft 2in" },
  { label: "4ft 3in", value: "4ft 3in" },
  { label: "4ft 4in", value: "4ft 4in" },
  { label: "4ft 5in", value: "4ft 5in" },
  { label: "4ft 6in", value: "4ft 6in" },
  { label: "4ft 7in", value: "4ft 7in" },
  { label: "4ft 8in", value: "4ft 8in" },
  { label: "4ft 9in", value: "4ft 9in" },
  { label: "4ft 10in", value: "4ft 10in" },
  { label: "4ft 11in", value: "4ft 11in" },
  { label: "5ft", value: "5ft" },
  { label: "5ft 1in", value: "5ft 1in" },
  { label: "5ft 2in", value: "5ft 2in" },
  { label: "5ft 3in", value: "5ft 3in" },
  { label: "5ft 4in", value: "5ft 4in" },
  { label: "5ft 5in", value: "5ft 5in" },
  { label: "5ft 6in", value: "5ft 6in" },
  { label: "5ft 7in", value: "5ft 7in" },
  { label: "5ft 8in", value: "5ft 8in" },
  { label: "5ft 9in", value: "5ft 9in" },
  { label: "5ft 10in", value: "5ft 10in" },
  { label: "5ft 11in", value: "5ft 11in" },
  { label: "6ft", value: "6ft" },
  { label: "6ft 1in", value: "6ft 1in" },
  { label: "6ft 2in", value: "6ft 2in" },
  { label: "6ft 3in", value: "6ft 3in" },
  { label: "6ft 4in", value: "6ft 4in" },
  { label: "6ft 5in", value: "6ft 5in" },
  { label: "6ft 6in", value: "6ft 6in" },
  { label: "6ft 7in", value: "6ft 7in" },
  { label: "6ft 8in", value: "6ft 8in" },
  { label: "6ft 9in", value: "6ft 9in" },
];

export const drinkingHabitOptions = [
  { label: "Never", value: "Never" },
  { label: "Regularly", value: "Regularly" },
  { label: "Seldom", value: "Seldom" },
  { label: "Occasionally/Rarely", value: "Occasionally/Rarely" },
];

export const eatingHabitOptions = [
  { label: "Non-Vegetarain", value: "Non-Vegetarain" },
  { label: "Vegetarain", value: "Vegetarain" },
  { label: "Both", value: "Both" },
  { label: "Occasionally non-veg", value: "Occasionally non-veg" },
  { label: "Eggetarian", value: "Eggetarian" },
];

export const smokingHabitsOptions = [
  { label: "Never", value: "Never" },
  { label: "Regularly", value: "Regularly" },
  { label: "Seldom", value: "Seldom" },
  { label: "Occasionally/Rarely", value: "Occasionally/Rarely" },
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
  { label: "1 Lac", value: "1 Lac" },
  { label: "2 Lacs", value: "2 Lacs" },
  { label: "3 Lacs", value: "3 Lacs" },
  { label: "4 Lacs", value: "4 Lacs" },
  { label: "5 Lacs", value: "5 Lacs" },
  { label: "6 Lacs", value: "6 Lacs" },
  { label: "7 Lacs", value: "7 Lacs" },
  { label: "7.5 Lacs", value: "7.5 Lacs" },
  { label: "8 Lacs", value: "8 Lacs" },
  { label: "9 Lacs", value: "9 Lacs" },
  { label: "10 Lacs", value: "10 Lacs" },
  { label: "11 Lacs", value: "11 Lacs" },
  { label: "12 Lacs", value: "12 Lacs" },
  { label: "13 Lacs", value: "13 Lacs" },
  { label: "14 Lacs", value: "14 Lacs" },
  { label: "15 Lacs", value: "15 Lacs" },
  { label: "16 Lacs", value: "16 Lacs" },
  { label: "17 Lacs", value: "17 Lacs" },
  { label: "18 Lacs", value: "18 Lacs" },
  { label: "19 Lacs", value: "19 Lacs" },
  { label: "20 Lacs", value: "20 Lacs" },
  { label: "21 Lacs", value: "21 Lacs" },
  { label: "22 Lacs", value: "22 Lacs" },
  { label: "23 Lacs", value: "23 Lacs" },
  { label: "24 Lacs", value: "24 Lacs" },
  { label: "25 Lacs", value: "25 Lacs" },
  { label: "26 Lacs", value: "26 Lacs" },
  { label: "27 Lacs", value: "27 Lacs" },
  { label: "28 Lacs", value: "28 Lacs" },
  { label: "29 Lacs", value: "29 Lacs" },
  { label: "30 Lacs", value: "30 Lacs" },
  { label: "31 Lacs", value: "31 Lacs" },
  { label: "32 Lacs", value: "32 Lacs" },
  { label: "33 Lacs", value: "33 Lacs" },
  { label: "34 Lacs", value: "34 Lacs" },
  { label: "35 Lacs", value: "35 Lacs" },
  { label: "36 Lacs", value: "36 Lacs" },
  { label: "37 Lacs", value: "37 Lacs" },
  { label: "38 Lacs", value: "38 Lacs" },
  { label: "39 Lacs", value: "39 Lacs" },
  { label: "40 Lacs", value: "40 Lacs" },
  { label: "41 Lacs", value: "41 Lacs" },
  { label: "42 Lacs", value: "42 Lacs" },
  { label: "43 Lacs", value: "43 Lacs" },
  { label: "44 Lacs", value: "44 Lacs" },
  { label: "45 Lacs", value: "45 Lacs" },
  { label: "46 Lacs", value: "46 Lacs" },
  { label: "47 Lacs", value: "47 Lacs" },
  { label: "48 Lacs", value: "48 Lacs" },
  { label: "49 Lacs", value: "49 Lacs" },
  { label: "50 Lacs", value: "50 Lacs" },
  { label: "51 Lacs", value: "51 Lacs" },
  { label: "52 Lacs", value: "52 Lacs" },
  { label: "53 Lacs", value: "53 Lacs" },
  { label: "54 Lacs", value: "54 Lacs" },
  { label: "55 Lacs", value: "55 Lacs" },
  { label: "56 Lacs", value: "56 Lacs" },
  { label: "57 Lacs", value: "57 Lacs" },
  { label: "58 Lacs", value: "58 Lacs" },
  { label: "59 Lacs", value: "59 Lacs" },
  { label: "60 Lacs", value: "60 Lacs" },
  { label: "61 Lacs", value: "61 Lacs" },
  { label: "62 Lacs", value: "62 Lacs" },
  { label: "63 Lacs", value: "63 Lacs" },
  { label: "64 Lacs", value: "64 Lacs" },
  { label: "70 Lacs", value: "70 Lacs" },
  { label: "80 Lacs", value: "80 Lacs" },
  { label: "90 Lacs", value: "90 Lacs" },
  { label: "95 Lacs", value: "95 Lacs" },
  { label: "1 Cr", value: "1 Cr" },
  { label: "1.15 Cr", value: "115 Cr" },
  { label: "1.5 Cr", value: "1.5 Cr" },
  { label: "1.6 Cr", value: "1.6 Cr" },
  { label: "1.8 Cr", value: "1.8 Cr" },
  { label: "2 Cr", value: "2 Cr" },
  { label: "2.5 Cr", value: "2.5 Cr" },
  { label: "3 Cr", value: "3 Cr" },
  { label: "4 Cr", value: "4 Cr" },
  { label: "5 Cr", value: "5 Cr" },
  { label: "6 Cr", value: "6 Cr" },
  { label: "7 Cr", value: "7 Cr" },
  { label: "8 Cr", value: "8 Cr" },
  { label: "9 Cr", value: "9 Cr" },
  { label: "10 Cr", value: "10 Cr" },
  { label: "11 Cr", value: "11 Cr" },
  { label: "12 Cr", value: "12 Cr" },
  { label: "13 Cr", value: "13 Cr" },
  { label: "14 Cr", value: "14 Cr" },
  { label: "15 Cr", value: "15 Cr" },
  { label: "16 Cr", value: "16 Cr" },
  { label: "17 Cr", value: "17 Cr" },
  { label: "18 Cr", value: "18 Cr" },
  { label: "19 Cr", value: "19 Cr" },
  { label: "20 Cr", value: "20 Cr" },
  { label: "21 Cr", value: "21 Cr" },
  { label: "22 Cr", value: "22 Cr" },
  { label: "23 Cr", value: "23 Cr" },
  { label: "24 Cr", value: "24 Cr" },
  { label: "25 Cr", value: "25 Cr" },
  { label: "26 Cr", value: "26 Cr" },
  { label: "27 Cr", value: "27 Cr" },
  { label: "28 Cr", value: "28 Cr" },
  { label: "29 Cr", value: "29 Cr" },
  { label: "30 Cr", value: "30 Cr" },
  { label: "31 Cr", value: "31 Cr" },
  { label: "32 Cr", value: "32 Cr" },
  { label: "33 Cr", value: "33 Cr" },
  { label: "34 Cr", value: "34 Cr" },
  { label: "35 Cr", value: "35 Cr" },
  { label: "36 Cr", value: "36 Cr" },
  { label: "37 Cr", value: "37 Cr" },
  { label: "38 Cr", value: "38 Cr" },
  { label: "39 Cr", value: "39 Cr" },
  { label: "40 Cr", value: "40 Cr" },
  { label: "41 Cr", value: "41 Cr" },
  { label: "42 Cr", value: "42 Cr" },
  { label: "43 Cr", value: "43 Cr" },
  { label: "44 Cr", value: "44 Cr" },
  { label: "45 Cr", value: "45 Cr" },
  { label: "46 Cr", value: "46 Cr" },
  { label: "47 Cr", value: "47 Cr" },
  { label: "48 Cr", value: "48 Cr" },
  { label: "49 Cr", value: "49 Cr" },
  { label: "50 Cr", value: "50 Cr" },
];

export const deadAliveOptions = [
  { label: "Alive", value: "Alive" },
  { label: "Deceased", value: "deceased" },
];

export const familyTypeOptions = [
  { label: "Nuclear Family", value: "Nuclear Family" },
  { label: "Joint Family", value: "Joint Family" },
];

export const houseTypeOptions = [
  { label: "Apartment", value: "Apartment" },
  { label: "Floor/Floors", value: "Floor/Floors" },
  { label: "Banglow", value: "Banglow" },
  { label: "Kothi", value: "Kothi" },
  { label: "Rented", value: "Rented" },
  { label: "Own House", value: "Own House" },
];

export const packageTypeOptions = [
  {
    label: "Essence Package/Foundation Plan",
    value: "Essence Package/Foundation Plan",
  },
  {
    label: "Essence Package/Essential Match Plan",
    value: "Essence Package/Essential Match Plan",
  },
  { label: "Elite/Premium Membership", value: "Elite/Premium Membership" },
  { label: "Elite/Signature Membership", value: "Elite/Signature Membership" },
  { label: "Grand/Elan Package", value: "Grand/Elan Package" },
  { label: "Grand/Prestige Package", value: "Grand/Prestige Package" },
  { label: "Grand/Premium Package", value: "Grand/Premium Package" },
];

export const membershipProfileStatus = [
  { label: "Unpaid", value: "Unpaid" },
  { label: "Paid", value: "Paid" },
  { label: "Others", value: "Others" },
  { label: "Partially Paid", value: "Partially Paid" },
];

export const statusOption = [
  { label: "Active", value: "Active" },
  { label: "Inactive", value: "Inactive" },
  { label: "Closed", value: "Closed" },
  { label: "Closed By Us", value: "Closed By Us" },
];

export const lookingForOptions = [
  { label: "Bride", value: "Bride" },
  { label: "Groom", value: "Groom" },
];

export const leadStatus = [
  { label: "New", value: "New" },
  { label: "Converted", value: "Converted" },
  { label: "Not-converted", value: "Not-converted" },
  { label: "Working", value: "Working" },
  { label: "Servicing", value: "Servicing" },
  { label: "Not Connected", value: "Not Connected" },
  { label: "Product Pitch", value: "Product Pitch" },
];

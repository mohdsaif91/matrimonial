import moment from "moment";
import { GetStatusProps } from "../types/clientModule";

export const getLabelValue = (arr: any[] = [], label = false) => {
  return arr.map((s: any) => ({
    label: s.name,
    value: label ? s.name : s.id,
  }));
};

export const yesNoArr = [
  { label: "Yes", value: "yes" },
  { label: "No", value: "no" },
];

export const getFeildname = (feildName: string) => {
  if (feildName === "main_profile_photo") {
    return "main_photo";
  } else if (feildName === "additional_profile_photo") {
    return "profile_photo";
  } else {
    return "bio_data";
  }
};

export const parseTimeStringToDate = (timeStr?: string): Date | null => {
  if (!timeStr) return null;

  const match = timeStr.match(/(\d{1,2}):(\d{2})\s?(AM|PM)/i);
  if (!match) return null;

  let [_, hoursStr, minutesStr, period] = match;
  let hours = parseInt(hoursStr, 10);
  const minutes = parseInt(minutesStr, 10);

  if (period.toUpperCase() === "PM" && hours < 12) hours += 12;
  if (period.toUpperCase() === "AM" && hours === 12) hours = 0;

  const date = new Date();
  date.setHours(hours, minutes, 0, 0);
  return date;
};

export const statusColor: Record<
  "Paid" | "Others" | "Unpaid" | "PartiallyPaid",
  string
> = {
  Paid: "#B3F5BC",
  Others: "#374151",
  Unpaid: "#374151",
  PartiallyPaid: "#374151",
};

export const getStatusColor = (obj: GetStatusProps | undefined) => {
  if (!obj) return "#fff";
  return statusColor[obj.value];
};

export const getCRMObject = () => {
  const settingsArray =
    JSON.parse(sessionStorage.getItem("CRM") as string) || [];

  const settingsObject = settingsArray.reduce((acc, item) => {
    acc[item.slug_key] = item;
    return acc;
  }, {});

  return settingsObject;
};

export const safeValue = (field: any, fallback: string = "-") => {
  if (!field) return fallback;
  if (typeof field === "string") return field || fallback;
  if (typeof field?.value === "string") return field.value || fallback;
  return fallback;
};

export const safeDate = (date: any, format: string = "DD-MM-YYYY") => {
  if (!date) return "-";
  const d = moment(date);
  return d.isValid() ? d.format(format) : "-";
};

export function convertDynamicFieldsToPaymentRows(fieldsArray, name) {
  const groups = {};

  fieldsArray.forEach((item) => {
    const prefix = item.field_name.split("_")[0]; // "registration"
    const suffix = item.field_name.replace(prefix + "_", ""); // "amount"
    if (!groups[prefix]) {
      groups[prefix] = {};
    }
    groups[prefix][suffix] = item.value ?? null; // dynamic value here
  });

  return Object.keys(groups).map((key) => {
    const g = groups[key];

    return {
      payment_type: key, // registration
      expected_amount: g.amount || null, // registration_amount
      received_payment: g.received_amount || null, // registration_received_amount
      payment_mode: g.payment_mode || null, // registration_payment_mode
      payment_date: g.payment_date || null, // registration_payment_date
      brief: g.brief || null, // registration_brief
      payment_followup_date: g.followup_date || null, // optional
      client_name: name,
    };
  });
}

export const paymentSlugs = [""];

export const buildQueryParams = (filter: Record<string, any>) => {
  let params = "";
  Object.entries(filter).forEach(([key, value]) => {
    if (value !== "" && value !== undefined && value !== null) {
      params = `${params === "" ? "" : `${params}&`}${key}=${String(value)}`;
    }
  });
  return params;
};

export const getAuthUserPermission = () => {
  let permissions: string[] = [];
  const authUser = JSON.parse(sessionStorage.getItem("authUser") as string);
  if (authUser) {
    permissions = authUser.permissions;
  }
  return [...permissions, "showAlways"];
};

export const defaultFooterNote =
  " WE ARE SENDING THIS BIODATA AS PER THE INFORMATION PROVIDED BY THE SAID PARTY, WE ARE NOT RESPONSIBLE FOR ANY MISREPRESENTATION OR FOR ANY OF THE FACTS GIVEN ABOVE.";

export const companyDetails = {
  name: "OUSPL",
  address: "                12-1/24, Bulandshahar Road, Hapur",
  phone: "+91-8868871967",
  email: "support@oneunitsolutions.com",
  domain: "ceo@oneunitsolutions.com",
  Website: "https://oneunitsolutions.com/",
};

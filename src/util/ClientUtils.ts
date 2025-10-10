import { ClientModuleField } from "../types/clientModule";

export const getLabelValue = (arr: any[] = []) => {
  return arr.map((s: any) => ({
    label: s.name,
    value: s.id,
  }));
};

export const yesNoArr = [
  { label: "Yes", value: "yes" },
  { label: "No", value: "no" },
];

export const generateFormItem = (item: ClientModuleField) => {};

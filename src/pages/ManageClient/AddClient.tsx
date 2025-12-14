import React, { useEffect, useRef, useState } from "react";
import {
  addClientFormClientType,
  astrologicalOptions,
  clientVerificationOptions,
  complexionOptions,
  deadAliveOptions,
  drinkingHabitOptions,
  eatingHabitOptions,
  eyeSightOptions,
  familyTypeOptions,
  genderOptions,
  heightOptions,
  houseTypeOptions,
  maritialStatusOptions,
  membershipProfileStatus,
  packageTypeOptions,
  personalIncomeOptions,
  personalityOptions,
  smokingHabitsOptions,
  statusOption,
  yesNoOptions,
} from "../../data/ClientForm";
import { TextField } from "../../component/form/TextField";
import Button from "../../component/form/Button";
import { DropDown } from "../../component/form/SearchableDropdown";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  AddClientApi,
  AddClientImageApi,
  fetchSourcedFrom,
  updateClient,
} from "../../service/client";
import LoadingPage from "../Loading/Loading";
import { getFeildname, getLabelValue } from "../../util/ClientUtils";
import { fetchClientFormModule } from "../../service/clientFormModule";
import { staticClientFormTab } from "../../types/form";
import TextArea from "../../component/form/TextArea";
import { fetchCasteAPI } from "../../service/caste";
import { fetchSubCasteAPI } from "../../service/subCaste";
import { fetchManageUserAPI } from "../../service/manageUser";
import { DateTimePicker } from "../../component/form/DateField";
import { fetchState } from "../../service/state";
import { fetchVisaAPI } from "../../service/visa";
import { ClientForm } from "../../types/module";
import { fetchCity } from "../../service/city";
import { fetchReligion } from "../../service/religion";
import {
  FormSubmitItemProps,
  FormSubmitProps,
  ImageSubmitProps,
} from "../../types/client";
import { fetchPremiumCollege } from "../../service/premiumCollege";
import { fetchQualificationAPI } from "../../service/qualification";
import { fetchOccupationAPI } from "../../service/occupation";
import { fetchCountry } from "../../service/country";
import { ImageField } from "../../component/form/ImageField";
import { toast } from "react-toastify";
import CustomEditor from "../../component/form/RichText";
import PhotoBioData from "./Components/PhotoBioData";
import { useLocation, useNavigate } from "react-router-dom";
import TimePickerExample from "../../component/form/TimePicker";
import moment from "moment";

const MemoizedTextField = React.memo(TextField);
const MemoizedDropDown = React.memo(DropDown);
const MemoizedTextArea = React.memo(TextArea);
const MemoizedDateField = React.memo(DateTimePicker);
const MemoizedImageField = React.memo(ImageField);
const MemoizedRichText = React.memo(CustomEditor);
const MemoizedTimePicker = React.memo(TimePickerExample);

const AddClient = () => {
  const [clientData, setClientData] = useState<ClientForm[]>([]);
  const [activeTab, setActiveTab] = useState<number>(0);
  const [formValues, setFormValues] = useState<any>();
  const [imageValues, setImageValues] = useState<ImageSubmitProps[]>([]);
  const [activeImgBtn, setActiveImgBtn] = useState("");

  const idRef = useRef<number | null>(null);

  const queryClient = useQueryClient();
  const { state } = useLocation();
  const navigate = useNavigate();

  const { data: clientFormModuleData, isLoading: clientFromModuleLoading } =
    useQuery({
      queryKey: ["client-form-module-list"],
      queryFn: fetchClientFormModule,
      retry: false,
    });

  useEffect(() => {
    if (clientFormModuleData?.data?.length) {
      const forms = clientFormModuleData.data[activeTab].client_forms;
      setClientData(forms);
      // Initialize form values from API data
      const initialValues: Record<string, any> = {};
      forms.forEach((item: ClientForm) => {
        initialValues[item.field_name] = {
          value: item.value || "",
          id: item.id,
        };
      });
      setFormValues(initialValues);
    }
    if (state && state.data) {
      setFormValues({ ...state.data.items });
    }
  }, [clientFormModuleData, activeTab]);

  const {
    data: sourcedData,
    error: sourcedError,
    isLoading: sourcedLoading,
    refetch: refetchSource,
  } = useQuery({
    queryKey: ["sourced_from"], // unique cache key
    queryFn: fetchSourcedFrom,
    staleTime: 1000 * 60 * 60 * 3,
    gcTime: 1000 * 60 * 60 * 3,
    refetchOnWindowFocus: false,
    enabled: !!(state && state.data),
  });

  const {
    data: profileHandledData,
    error: profileHandledError,
    isLoading: profileHandledLoading,
    refetch: profileHandledRefetch,
  } = useQuery({
    queryKey: ["manage-user-list"], // unique cache key
    queryFn: fetchManageUserAPI,
    staleTime: 1000 * 60 * 60 * 3,
    gcTime: 1000 * 60 * 60 * 3,
    refetchOnWindowFocus: false,
    enabled: !!(state && state.data),
  });

  const {
    data: casteData,
    error: casteError,
    isLoading: casteLoading,
    refetch: casteRefetch,
  } = useQuery({
    queryKey: ["caste-list"], // unique cache key
    queryFn: fetchCasteAPI,
    staleTime: 1000 * 60 * 60 * 3,
    gcTime: 1000 * 60 * 60 * 3,
    refetchOnWindowFocus: false,
    enabled: !!(state && state.data),
  });

  const {
    data: subCasteData,
    error: subCasteError,
    isLoading: subCasteLoading,
    refetch: subCasteRefetch,
  } = useQuery({
    queryKey: ["sub-caste-list"], // unique cache key
    queryFn: fetchSubCasteAPI,
    staleTime: 1000 * 60 * 60 * 3,
    gcTime: 1000 * 60 * 60 * 3,
    refetchOnWindowFocus: false,
    enabled: !!(state && state.data),
  });

  const {
    data: stateData,
    error: stateError,
    isLoading: stateLoading,
    refetch: stateRefetch,
  } = useQuery({
    queryKey: ["state-list"], // unique cache key
    queryFn: fetchState,
    staleTime: 1000 * 60 * 60 * 3,
    gcTime: 1000 * 60 * 60 * 3,
    refetchOnWindowFocus: false,
    enabled: !!(state && state.data),
  });

  const {
    data: CityData,
    error: CityError,
    isLoading: CityLoading,
    refetch: CityRefetch,
  } = useQuery({
    queryKey: ["City-list"], // unique cache key
    queryFn: fetchCity,
    staleTime: 1000 * 60 * 60 * 3,
    gcTime: 1000 * 60 * 60 * 3,
    refetchOnWindowFocus: false,
    enabled: !!(state && state.data),
  });

  const {
    data: religionData,
    error: religionError,
    isLoading: religionLoading,
    refetch: religionRefetch,
  } = useQuery({
    queryKey: ["religion-list"], // unique cache key
    queryFn: fetchReligion,
    staleTime: 1000 * 60 * 60 * 3,
    gcTime: 1000 * 60 * 60 * 3,
    refetchOnWindowFocus: false,
    enabled: !!(state && state.data),
  });

  const {
    data: visaData,
    error: visaError,
    isLoading: visaLoading,
    refetch: visaRefetch,
  } = useQuery({
    queryKey: ["visa-list"], // unique cache key
    queryFn: fetchVisaAPI,
    staleTime: 1000 * 60 * 60 * 3,
    gcTime: 1000 * 60 * 60 * 3,
    refetchOnWindowFocus: false,
    enabled: !!(state && state.data),
  });

  const {
    data: premiumCollegeData,
    error: premiumCollegeError,
    isLoading: premiumCollegeLoading,
    refetch: premiumCollegeRefetch,
  } = useQuery({
    queryKey: ["premiumCollege-list"], // unique cache key
    queryFn: fetchPremiumCollege,
    staleTime: 1000 * 60 * 60 * 3,
    gcTime: 1000 * 60 * 60 * 3,
    refetchOnWindowFocus: false,
    enabled: !!(state && state.data),
  });
  // highest_qualification

  const {
    data: qualificationData,
    error: qualificationError,
    isLoading: qualificationLoading,
    refetch: qualificationRefetch,
  } = useQuery({
    queryKey: ["qualification-list"],
    queryFn: fetchQualificationAPI,
    staleTime: 1000 * 60 * 60 * 3,
    gcTime: 1000 * 60 * 60 * 3,
    refetchOnWindowFocus: false,
    enabled: !!(state && state.data),
  });

  const {
    data: occupationData,
    error: occupationError,
    isLoading: occupationLoading,
    refetch: occupationRefetch,
  } = useQuery({
    queryKey: ["occupation-list"],
    queryFn: fetchOccupationAPI,
    staleTime: 1000 * 60 * 60 * 3,
    gcTime: 1000 * 60 * 60 * 3,
    refetchOnWindowFocus: false,
    enabled: !!(state && state.data),
  });

  const {
    data: countryData,
    error: countryError,
    isLoading: countryLoading,
    refetch: countryRefetch,
  } = useQuery({
    queryKey: ["country-list"],
    queryFn: fetchCountry,
    staleTime: 1000 * 60 * 60 * 3,
    gcTime: 1000 * 60 * 60 * 3,
    refetchOnWindowFocus: false,
    enabled: !!(state && state.data),
  });

  const handleClientFromModule: any[] = clientFormModuleData
    ? clientFormModuleData.data
    : [];

  const mutation = useMutation({
    mutationFn: AddClientApi,
    onSuccess: (data) => {
      idRef.current = data.client_id;
      sessionStorage.setItem("id_forPhoto", data.client_id);
      // invalidate or refresh client list queries
      queryClient.invalidateQueries({ queryKey: ["clients"] });
      if (activeTab + 1 === handleClientFromModule.length) {
        navigate("/addingClientComplete");
        toast(`Saving Client Data Completed.`);
      } else {
        toast(
          `${clientFormModuleData.data[activeTab].name} Successfully Added.`
        );
        setActiveTab((prevState) => prevState + 1);
      }
    },
    onError: (error: any) => {
      console.error("❌ Error adding client:", error);
      alert(error.response?.data?.message || "Failed to add client");
    },
  });

  const updateMutation = useMutation({
    mutationFn: updateClient,
    onSuccess: (data) => {
      console.log("Called <>? UPDAte Mutation");
      idRef.current = data.client_id;
      sessionStorage.setItem("id_forPhoto", data.client_id);
      // invalidate or refresh client list queries
      queryClient.invalidateQueries({ queryKey: ["clients"] });
      if (activeTab + 1 === handleClientFromModule.length) {
        navigate("/addingClientComplete", {
          state: { addClientSuccessType: true },
        });
        toast(`Saving Client Data Completed.`);
      } else {
        toast(
          `${clientFormModuleData.data[activeTab].name} Successfully Added.`
        );
        setActiveTab((prevState) => prevState + 1);
      }
    },
    onError: (error: any) => {
      console.error("❌ Error adding client:", error);
      alert(error.response?.data?.message || "Failed to add client");
    },
  });

  const imageMutation = useMutation({
    mutationFn: AddClientImageApi,
    onSuccess: (data) => {
      // invalidate or refresh client list queries
      const message = clientFormModuleData.data[activeTab].name || "";
      queryClient.invalidateQueries({ queryKey: ["clients-image"] });
      toast(`Image Added Successfully!`);
      // setActiveTab((prevState) => prevState + 1);
    },
    onError: (error: any) => {
      console.error("❌ Error adding client Document:", error);
      alert(error.response?.data?.message || "Failed to add client Document");
    },
  });

  const getOptions = (fieldName: string) => {
    let arr: { label: string; value: string | number }[] = [];
    switch (fieldName) {
      case "sourced_from":
        arr = getLabelValue(sourcedData ? sourcedData.data : [], true);
        break;
      case "profile_handled":
        arr = getLabelValue(
          profileHandledData ? profileHandledData.data : [],
          true
        );
        break;
      case "profile_created":
        arr = getLabelValue(
          profileHandledData ? profileHandledData.data : [],
          true
        );
        break;
      case "profile_visited":
        arr = getLabelValue(
          profileHandledData ? profileHandledData.data : [],
          true
        );
        break;
      case "client_type":
        arr = addClientFormClientType;
        break;
      case "client_verification":
        arr = clientVerificationOptions;
        break;
      case "caste":
        arr = getLabelValue(casteData ? casteData.data : [], true);
        break;
      case "sub_caste":
        arr = getLabelValue(subCasteData ? subCasteData.data : [], true);
        break;
      case "complexion":
        arr = complexionOptions;
        break;
      case "personality":
        arr = personalityOptions;
        break;
      case "gender":
        arr = genderOptions;
        break;
      case "marital_status":
        arr = maritialStatusOptions;
        break;
      case "astrologically":
        arr = astrologicalOptions;
        break;
      case "height":
        arr = heightOptions;
        break;
      case "drinking_habits":
        arr = drinkingHabitOptions;
        break;
      case "eating_habits":
        arr = eatingHabitOptions;
        break;
      case "smoking_habits":
        arr = smokingHabitsOptions;
        break;
      case "open_for_other_caste":
      case "open_for_divorcee":
      case "health_screening_consent":
      case "believes_in_patri":
      case "willing_to_go_abroad":
      case "open_for_other_state":
      case "nri_status":
      case "disability":
      case "do_you_have_any_siblings":
        arr = yesNoOptions;
        break;
      case "eye_sight":
        arr = eyeSightOptions;
        break;
      case "native_state":
      case "residential_state":
        arr = getLabelValue(stateData ? stateData.data : [], true);
        break;
      case "native_town":
      case "residential_city":
        arr = getLabelValue(CityData ? CityData.data : [], true);
        break;
      case "visa":
        arr = getLabelValue(visaData ? visaData.data : [], true);
        break;
      case "religion":
        arr = getLabelValue(religionData ? religionData.data : [], true);
        break;
      case "premium_college":
        arr = getLabelValue(
          premiumCollegeData ? premiumCollegeData.data : [],
          true
        );
        break;
      case "fathers_qualification":
      case "highest_qualification":
      case "mothers_qualification":
        arr = getLabelValue(
          qualificationData ? qualificationData.data : [],
          true
        );
        break;
      case "personal_income":
        arr = personalIncomeOptions;
        break;
      case "occupation":
      case "fathers_occupation":
      case "mothers_occupation":
        arr = getLabelValue(occupationData ? occupationData.data : [], true);
        break;
      case "family_type":
        arr = familyTypeOptions;
        break;
      case "annual_family_income":
      case "from_marriage_budget":
      case "to_marriage_budget":
        arr = personalIncomeOptions;
        break;
      case "father_is_alive":
      case "mother_is_alive":
        arr = deadAliveOptions;
        break;
      case "house_status":
        arr = houseTypeOptions;
        break;
      case "residing_country":
        arr = getLabelValue(countryData ? countryData.data : [], true);
        break;
      case "package_type":
        arr = packageTypeOptions;
        break;
      case "membership_profile_status":
        arr = membershipProfileStatus;
        break;
      case "member_status":
        arr = statusOption;
        break;

      default:
        arr = [];
    }
    return arr;
  };

  const getLoading = (fieldName: string) => {
    switch (fieldName) {
      case "sourced_from":
        return sourcedLoading;
      case "profile_handled":
        return profileHandledLoading;
      case "profile_created":
        return profileHandledLoading;
      case "profile_visited":
        return profileHandledLoading;
      case "caste":
        return casteLoading;
      case "sub_caste":
        return subCasteLoading;
      case "native_state":
      case "residential_state":
        return stateLoading;
      case "visa":
        return visaLoading;
      case "native_town":
      case "residential_city":
        return CityLoading;
      case "religion":
        return religionLoading;
      case "premium_college":
        return premiumCollegeLoading;
      case "highest_qualification":
      case "fathers_qualification":
      case "mothers_qualification":
        return qualificationLoading;
      case "occupation":
      case "fathers_occupation":
      case "mothers_occupation":
        return occupationLoading;
      case "residing_country":
        return countryLoading;
      default:
        return false;
    }
  };

  const fetchData = (fieldName: string) => {
    switch (fieldName) {
      case "sourced_from":
        refetchSource();
        break;
      case "profile_handled":
        profileHandledRefetch();
        break;
      case "profile_created":
        refetchSource();
        break;
      case "profile_visited":
        refetchSource();
        break;
      case "caste":
        casteRefetch();
        break;
      case "sub_caste":
        subCasteRefetch();
        break;
      case "native_state":
      case "residential_state":
        stateRefetch();
        break;
      case "native_town":
      case "residential_city":
        CityRefetch();
        break;
      case "visa":
        visaRefetch();
        break;
      case "religion":
        religionRefetch();
        break;
      case "premium_college":
        premiumCollegeRefetch();
        break;
      case "highest_qualification":
      case "fathers_qualification":
      case "mothers_qualification":
        qualificationRefetch();
        break;
      case "occupation":
      case "fathers_occupation":
      case "mothers_occupation":
        occupationRefetch();
        break;
      case "residing_country":
        countryRefetch();
        break;
      default:
        return false;
    }
  };

  if (clientFromModuleLoading) {
    return <LoadingPage />;
  }

  const handleChange = (name: string, value: any) => {
    const jsonObj = { ...formValues[name], value: value, feildName: name };
    setFormValues((prev) => ({ ...prev, [name]: jsonObj }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (state && state.data) {
      if (clientFormModuleData.data[activeTab].name === "Photo and Bio-Data") {
        toast(`Stage ${activeTab + 1} Added.`);
        setActiveTab((prevState) => prevState + 1);
      } else {
        const moduleFormItems =
          clientFormModuleData.data[activeTab].client_forms;
        const updatedFormFeilds = moduleFormItems.map((formItems) => {
          if (formValues[formItems.field_name]) {
            return {
              field_id: formItems.id,
              value: formValues[formItems.field_name].value,
            };
          }
        });
        updateMutation.mutate({
          form_fields: updatedFormFeilds,
          client_id: state.data.id,
        });
      }
    } else {
      const formData: FormSubmitItemProps[] = [];
      Object.keys(formValues).map((item) => {
        formData.push({
          field_id: formValues[item].id,
          value: formValues[item].value,
        });
      });
      let finalObj:
        | { form_fields: FormSubmitItemProps[]; client_id: number }
        | { form_fields: FormSubmitItemProps[] };
      if (
        idRef.current != null &&
        clientFormModuleData.data[activeTab].name !== "Photo and Bio-Data"
      ) {
        finalObj = {
          form_fields: formData,
          client_id: idRef.current,
        };
        mutation.mutate(finalObj as FormSubmitProps);
      } else if (
        clientFormModuleData.data[activeTab].name === "Photo and Bio-Data"
      ) {
        toast(`Stage ${activeTab + 1} Added.`);
        setActiveTab((prevState) => prevState + 1);
      } else {
        finalObj = {
          form_fields: formData,
        };
        mutation.mutate(finalObj as FormSubmitProps);
      }
    }
  };

  const getImageDataAndSubmit = (feildName: string) => {
    const foundImageObject = imageValues.find((f) => f.type === feildName);
    setActiveImgBtn(feildName);
    const imgArr: any[] = [];
    foundImageObject &&
      Object.keys(foundImageObject.file).map((im) => {
        imgArr.push(foundImageObject.file[im]);
      });
    const clientId = state && state.data ? state.data.id : idRef.current;
    if (foundImageObject && JSON.stringify(foundImageObject) !== "{}") {
      if (clientId) {
        const formData = new FormData();
        formData.append("client_id", clientId);
        formData.append("type", getFeildname(feildName));
        imgArr.forEach((file, index) => {
          formData.append(`files[${index}]`, file);
        });
        imageMutation.mutate(formData);
      } else {
        toast(`Client ID not Provided`);
      }
    } else {
      toast(`Please select an image`);
    }
  };

  const getFormItems = (item: ClientForm, index: number) => {
    switch (item.field_type) {
      case "text":
        if (item.field_name === "time_of_birth") {
          return (
            <MemoizedTimePicker
              key={item.field_name}
              label={item.display_name}
              name={item.field_name}
              required={item.required === 1}
              value={
                (formValues[item.field_name] &&
                  formValues[item.field_name].value) ||
                ""
              }
              onChange={(e) => handleChange(item.field_name, e)}
            />
          );
        } else {
          return (
            <MemoizedTextField
              key={item.field_name}
              label={item.display_name}
              name={item.field_name}
              required={item.required === 1}
              value={
                (formValues[item.field_name] &&
                  formValues[item.field_name].value) ||
                ""
              }
              onChange={(e) => handleChange(item.field_name, e.target.value)}
            />
          );
        }
      case "dropdown":
        return (
          <MemoizedDropDown
            sendLabel={true}
            key={item.field_name}
            onClick={() => {
              fetchData(item.field_name);
            }}
            loading={getLoading(item.field_name)}
            searchable
            label={item.display_name}
            name={item.field_name}
            required={item.required === 1}
            options={getOptions(item.field_name)}
            value={
              state && state.data
                ? !isNaN(
                    Number(
                      formValues[item.field_name]
                        ? formValues[item.field_name].value
                        : null
                    )
                  )
                  ? formValues[item.field_name] &&
                    formValues[item.field_name].value &&
                    Number(
                      formValues[item.field_name]
                        ? formValues[item.field_name].value
                        : null
                    )
                  : formValues[item.field_name].value
                : formValues[item.field_name].value || ""
            }
            onChange={(val) => handleChange(item.field_name, val)}
          />
        );
      case "textArea":
        return (
          <div key={item.field_name} className="col-span-4">
            <MemoizedTextArea
              label={item.display_name}
              name={item.field_name}
              required={item.required === 1}
              value={
                (formValues[item.field_name] &&
                  formValues[item.field_name].value) ||
                ""
              }
              onChange={(val) => handleChange(item.field_name, val)}
            />
          </div>
        );
      case "datepicker":
        return (
          <MemoizedDateField
            key={item.field_name}
            label={item.display_name}
            value={
              (formValues[item.field_name] &&
                formValues[item.field_name].value) ||
              ""
            }
            onChange={(val) => {
              handleChange(item.field_name, moment(val).format("YYYY-MM-DD"));
            }}
            required={item.required === 1}
          />
        );
      case "image":
        if (
          clientFormModuleData.data[activeTab].name === "Photo and Bio-Data"
        ) {
          const format =
            item.field_name === "bio_data"
              ? ".pdf,.doc,.docx"
              : ".jpg,.jpeg,.png,.gif";
          return (
            <div className="">
              <MemoizedImageField
                multiple={true}
                formatType={format}
                label={item.display_name}
                onChange={(val) => {
                  const imagObj = { client_id: 0, type: "", file: {} };
                  imagObj.client_id = idRef.current || 14;
                  imagObj.type = item.field_name;
                  imagObj.file = val;
                  setImageValues([...imageValues, imagObj]);
                }}
                name={item.field_name}
                required={item.required === 1}
              />
              <Button
                type="button"
                loading={
                  imageMutation.isPending && activeImgBtn === item.field_name
                }
                className="mt-3 px-2 py-1  bg-[#161D27] text-white"
                text={`+ ${item.display_name}`}
                onClick={() => getImageDataAndSubmit(item.field_name)}
              />
            </div>
          );
        } else {
          return (
            <MemoizedImageField
              label={item.display_name}
              onChange={(val) => handleChange(item.field_name, val)}
              name={item.field_name}
              required={item.required === 1}
            />
          );
        }
      case "richText":
        return (
          <div className="col-span-3">
            <MemoizedRichText
              label={item.display_name}
              onChange={(str) => handleChange(item.field_name, str)}
              required={item.required === 1}
              value={
                (formValues[item.field_name] &&
                  formValues[item.field_name].value) ||
                ""
              }
            />
          </div>
        );
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-md m-1">
      <div className="flex p-4">
        {handleClientFromModule.map(
          (moduleItem: staticClientFormTab, moduleIndex: number) => (
            <Button
              // disabled={!state}
              type="clientFormBtn"
              className={`px-4 py-2 mr-2 text-sm font-medium text-white ${
                activeTab === moduleIndex ? "bg-[#161D27]" : "bg-[#a71634]"
              } rounded-lg`}
              key={moduleItem.name}
              text={moduleItem.name}
              onClick={() => {
                if (state && state.data) {
                  setActiveTab(moduleIndex);
                }
              }}
            />
          )
        )}
      </div>
      <form onSubmit={handleSubmit} className="grid grid-cols-4 gap-3 p-6">
        {clientData.map(
          (formItem, index: number) =>
            formItem.status === "active" && getFormItems(formItem, index)
        )}
        {clientFormModuleData.data[activeTab].name === "Photo and Bio-Data" && (
          <div className="col-span-4">
            <PhotoBioData client_id={state && state.data.id} />
          </div>
        )}
        <div className="flex-1 mt-4 cursor-pointer col-span-4">
          <Button
            loading={mutation.isPending || updateMutation.isPending}
            onClick={() => {}}
            type="submit"
            className=""
            text={`${state && state.data ? "Update" : "Save"} ${
              clientFormModuleData.data[activeTab].name
            }`}
          />
        </div>
      </form>
    </div>
  );
};
export default AddClient;

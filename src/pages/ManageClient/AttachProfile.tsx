import { useState } from "react";

import { TextField } from "../../component/form/TextField";
import { SendProfileProps } from "../../types/sendProfile";
import Button from "../../component/form/Button";

export default function AttachProfile({ onClose, data }: SendProfileProps) {
  const [profileData, setProfileData] = useState({
    sendTo: {
      name: data.shared_profiles.shared_profile_name,
      mobile: data.shared_profiles.shared_profile_phone || "-",
      photo:
        data.shared_profiles.documents.find((f) => f.file_type === "main_photo")
          ?.file_path || "",
      email: data.items.shared_profile_email || "-",
    },
    attachProfile: {
      name: data.items.client_name.value || "-",
      mobile: data.items.client_mobile.value || "-",
      photo:
        data.client_documents.find((f) => f.file_type === "main_photo")
          ?.file_path || "-",
      email: data.items.client_email.value || "-",
      subject: `Matrimonial Profile of ${data.shared_profiles.shared_profile_name} for ${data.items.client_name.value}`,
    },
  });
  const [hideContent, setHideContent] = useState({
    whatsApp: true,
    email: true,
  });
  const [takeContent, setTakeContent] = useState({
    whatsApp: true,
    email: true,
  });

  const sendTo = {
    name: data.shared_profiles.shared_profile_name,
    mobile: data.shared_profiles.shared_profile_phone || "-",
    photo:
      data.shared_profiles.documents.find((f) => f.file_type === "main_photo")
        ?.file_path || "",
    email: data.items.shared_profile_email || "-",
  };
  const attachProfile = {
    name: data.items.client_name.value || "-",
    mobile: data.items.client_mobile.value || "-",
    photo:
      data.client_documents.find((f) => f.file_type === "main_photo")
        ?.file_path || "-",
    email: data.items.client_email.value || "-",
  };

  return (
    <div className="flex items-center justify-center bg-black/50">
      <div className="bg-white w-[90%] max-w-6xl rounded-2xl shadow-lg p-6 overflow-y-auto max-h-[90vh]">
        <h2 className="text-xl font-semibold mb-4">Send Profile</h2>
        <div className="w-full border border-gray-300 rounded-md overflow-hidden">
          <div className="grid grid-cols-5 border-b border-gray-300">
            <div className="border-r border-gray-300 p-4 font-semibold">
              Send Mail To
            </div>
            <div className="border-r border-gray-300 p-4">{sendTo.name}</div>
            <div className="border-r border-gray-300 p-4">{sendTo.mobile}</div>
            <div className="border-r border-gray-300 p-4">{sendTo.email}</div>
            <div className="p-4 flex justify-center">
              <img
                src={sendTo.photo}
                className="h-28 w-28 object-cover rounded-md"
              />
            </div>
          </div>
          <div className="grid grid-cols-5">
            <div className="border-r border-gray-300 p-4 font-semibold">
              Attached Profile
            </div>
            <div className="border-r border-gray-300 p-4">
              {attachProfile.name}
            </div>
            <div className="border-r border-gray-300 p-4">
              {attachProfile.mobile}
            </div>
            <div className="border-r border-gray-300 p-4">
              {attachProfile.email}
            </div>
            <div className="p-4 flex justify-center">
              <img
                src={attachProfile.photo}
                className="h-28 w-28 object-cover rounded-md"
              />
            </div>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {hideContent.whatsApp && (
            <div className="border border-gray-300 rounded-lg p-3">
              <input
                type="checkbox"
                checked={takeContent.whatsApp}
                className="mr-2 cursor-pointer"
                onChange={(e) =>
                  setTakeContent({ ...takeContent, whatsApp: e.target.checked })
                }
                defaultChecked
              />
              <TextField
                label="To :"
                name="mobileTo"
                value={profileData.attachProfile.mobile}
                onChange={(e) => {
                  setProfileData({
                    ...profileData,
                    attachProfile: {
                      ...profileData.attachProfile,
                      mobile: e?.target.value,
                    },
                  });
                }}
              />
              <TextField
                disabled={true}
                label="From :"
                name=""
                value={profileData.mobileAttached}
                onChange={(e) => {
                  setProfileData({
                    ...profileData,
                    mobileAttached: e?.target.value,
                  });
                }}
              />
            </div>
          )}
          {hideContent.email && (
            <div className="border border-gray-300 rounded-lg p-3">
              <input
                type="checkbox"
                checked={takeContent.email}
                className="mr-2 cursor-pointer"
                defaultChecked
                onChange={(e) =>
                  setTakeContent({ ...takeContent, email: e.target.checked })
                }
              />
              <TextField
                label="To :"
                name="mobileTo"
                value={profileData.attachProfile.mobile}
                onChange={(e) => {
                  setProfileData({
                    ...profileData,
                    attachProfile: {
                      ...profileData.attachProfile,
                      mobile: e?.target.value,
                    },
                  });
                }}
              />
              <TextField
                label="Subject :"
                name=""
                value={profileData.attachProfile.subject}
                onChange={(e) => {
                  setProfileData({
                    ...profileData,
                    attachProfile: {
                      ...profileData.attachProfile,
                      subject: e?.target.value,
                    },
                  });
                }}
              />
              <TextField
                label="From :"
                disabled={true}
                name=""
                value={profileData.mobileAttached}
                onChange={(e) => {
                  setProfileData({
                    ...profileData,
                    mobileAttached: e?.target.value,
                  });
                }}
              />
            </div>
          )}
        </div>
        <div className="flex justify-end mt-6">
          <Button
            text="Submit"
            className="mr-4"
            type="button"
            onClick={() => {}}
          />
          <Button text="reset" type="reset" onClick={() => {}} />
        </div>
      </div>
    </div>
  );
}

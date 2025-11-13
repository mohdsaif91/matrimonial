import { useState } from "react";
import { TextField } from "../../component/form/TextField";
import { SendProfileProps } from "../../types/sendProfile";

export default function AttachProfile({ onClose, data }: SendProfileProps) {
  const [profileData, setProfileData] = useState({ ...data });
  console.log(profileData, " <>?");

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="bg-white w-[90%] max-w-6xl rounded-2xl shadow-lg p-6 overflow-y-auto max-h-[90vh]">
        <h2 className="text-xl font-semibold mb-4">Send Profile</h2>

        {/* Top table section */}
        <div className="border border-gray-300 rounded-lg overflow-hidden mb-6">
          <table className="w-full text-sm text-gray-700 border-collapse">
            <thead className="bg-gray-50 border-b">
              <tr>
                <th className="p-3 border-r text-left">Send Mail To</th>
                <th className="p-3 border-r text-left">{profileData.nameTo}</th>
                <th className="p-3 border-r text-left">
                  {profileData.mobileTo}
                </th>
                <th className="p-3 border-r text-left">
                  {profileData.emailTo}
                </th>
                <th className="p-3 text-left">
                  <img
                    src={profileData.imageTo}
                    alt="profile"
                    className="w-20 h-24 object-cover rounded"
                  />
                </th>
              </tr>
              <tr>
                <th className="p-3 border-r text-left">Attached Profile</th>
                <th className="p-3 border-r text-left">
                  {profileData.nameAttach}
                </th>
                <th className="p-3 border-r text-left">
                  {profileData.mobileAttached}
                </th>
                <th className="p-3 border-r text-left">
                  {profileData.emailAttached}
                </th>
                <th className="p-3 text-left">
                  <img
                    src={profileData.imageAttached}
                    alt="profile"
                    className="w-20 h-24 object-cover rounded"
                  />
                </th>
              </tr>
            </thead>
          </table>
        </div>

        {/* Form section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Left section - phone */}
          <div className="border border-gray-300 rounded-lg p-3">
            <input type="checkbox" className="mr-2" defaultChecked />
            <TextField
              labelPosition="left"
              label="To :"
              name="mobileTo"
              value={profileData.mobileTo}
              onChange={(e) => {
                setProfileData({ ...profileData, mobileTo: e?.target.value });
              }}
            />
            <TextField
              labelPosition="left"
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

          {/* Right section - email */}
          <div className="border border-gray-300 rounded-lg p-3">
            <input type="checkbox" className="mr-2" defaultChecked />
            <TextField
              labelPosition="left"
              label="To :"
              name="mobileTo"
              value={profileData.mobileTo}
              onChange={(e) => {
                setProfileData({ ...profileData, mobileTo: e?.target.value });
              }}
            />
            <TextField
              labelPosition="left"
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
            <div className="flex items-center mb-3">
              <label className="w-12 font-medium">To :</label>
              <input
                type="text"
                defaultValue="ceo@oneunitsolutions.com"
                className="flex-1 border rounded-md px-2 py-1 text-sm"
              />
            </div>
            <div className="flex items-center mb-3">
              <label className="w-12 font-medium">Subject :</label>
              <input
                type="text"
                defaultValue="Matrimonial Profile of Abhishekh Garg for Kavita Dhupar"
                className="flex-1 border rounded-md px-2 py-1 text-sm"
              />
            </div>
            <div className="flex items-center">
              <label className="w-12 font-medium">From :</label>
              <input
                type="text"
                readOnly
                defaultValue="info@code10.in"
                className="flex-1 border rounded-md px-2 py-1 bg-gray-100 text-sm"
              />
            </div>
          </div>
        </div>

        {/* Footer buttons */}
        <div className="flex justify-end mt-6">
          <button
            onClick={onClose}
            className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-medium py-2 px-4 rounded mr-2"
          >
            Close
          </button>
          <button className="bg-black hover:bg-gray-800 text-white font-medium py-2 px-6 rounded">
            Send
          </button>
        </div>
      </div>
    </div>
  );
}

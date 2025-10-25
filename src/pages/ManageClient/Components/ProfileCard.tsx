import React from "react";
import { Plus, Check } from "lucide-react";
import Button from "../../../component/form/Button";

interface ProfileCardProps {
  image: string;
  name: string;
  age: number | string;
  dateTime: string;
  onAttachProfile: () => void;
  onAddResponse: () => void;
}

const ProfileCard: React.FC<ProfileCardProps> = ({
  image,
  name,
  age,
  dateTime,
  onAttachProfile,
  onAddResponse,
}) => {
  return (
    <div className="flex flex-col items-center bg-green-100 p-4 rounded-2xl shadow-md border border-green-200 w-[220px]">
      {/* Image */}
      <img
        src={image}
        alt={name}
        className="rounded-xl w-[150px] h-[150px] object-cover mb-2"
      />

      {/* Name & Details */}
      <h3 className="text-gray-800 font-semibold text-lg">{name}</h3>
      <p className="text-gray-600 text-sm">{age}</p>
      <p className="text-gray-500 text-sm">{dateTime}</p>

      {/* Plus Icon */}
      <div className="my-2 text-gray-700">
        <Plus size={20} className="mx-auto" />
      </div>

      {/* Buttons */}
      <Button
        text="Attach Profile"
        className="bg-[#161D27] text-white w-full mb-2"
        onClick={onAttachProfile}
      />
      <Button
        text="Add Response"
        className="bg-[#C22B36] text-white w-full"
        onClick={onAddResponse}
      />

      <div className="mt-3 text-blue-600">
        <Check size={20} className="mx-auto" />
      </div>
    </div>
  );
};

export default ProfileCard;

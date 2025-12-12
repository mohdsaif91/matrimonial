import moment from "moment";

import { SharedProfile } from "../../../../types/client";
import { getCRMObject } from "../../../../util/ClientUtils";

const CRMData = getCRMObject();

export function SharedProfileCard({ data }: { data: SharedProfile }) {
  const mainProfile = data.documents.find((f) => f.file_type === "main_photo");
  return (
    <div
      className="flex flex-col border rounded-[8px] w-[200px] p-2 mr-2"
      style={{ border: "1px solid #6b7280" }}
    >
      <div
        className="border rounded-[6px]"
        style={{ border: "1px solid #6b7280" }}
      >
        <img src={mainProfile?.file_path} alt="profilePicture" className="" />
      </div>
      <div className="">
        <div>
          <span className="text-[12px]" style={{ color: "#6b7280" }}>
            Name:
          </span>{" "}
          <span>{data.shared_profile_name}</span>
        </div>
        <div>
          <span className="text-[12px]" style={{ color: "#6b7280" }}>
            Profile Id:
          </span>
          <span>{`(${CRMData.PREFIX_PROFILE_TEXT.value}-${data.shared_profile_id})`}</span>
        </div>
        <div>
          <span className="text-[12px]" style={{ color: "#6b7280" }}>
            Age:
          </span>{" "}
          <span>{data.shared_profile_age}</span>
        </div>
        <div>
          <span className="text-[12px]" style={{ color: "#6b7280" }}>
            Send Date:
          </span>{" "}
          <span>{moment(data.shared_at).format("DD-MM-YYYY")}</span>
        </div>
      </div>
    </div>
  );
}

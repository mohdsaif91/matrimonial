import moment from "moment";
import React from "react";

export default function ClientCard({
  img,
  name,
  id,
  createdDate = new Date(),
  borderColor = "",
  responseDate = "",
  clientRemark = "",
  staffRemark = "",
}: {
  img: string;
  name: string;
  id: string;
  createdDate: string | Date;
  borderColor: string;
  responseDate: string;
  clientRemark: string;
  staffRemark: string;
}) {
  return (
    <div
      style={{ border: `2px solid ${borderColor}` }}
      className={`rounded-2xl w-[280px]`}
    >
      <img src={img} className="h-[200px] w-full rounded-2xl" />
      <div className="p-2">
        <div>{name}</div>
        <div>{id}</div>
        <div>{moment(createdDate).format("YYYY-MM-DD")}</div>
        {responseDate && responseDate !== "" && (
          <div className="text-wrap">
            Response Date:{" "}
            <span className="font-bold">
              {responseDate && responseDate !== ""
                ? moment(responseDate).format("YYYY-MM-DD")
                : ""}
            </span>
          </div>
        )}
        {clientRemark && clientRemark !== "" && (
          <div>
            Client Remark:{" "}
            <span className="font-bold text-wrap">{clientRemark}</span>
          </div>
        )}
        {staffRemark && staffRemark !== "" && (
          <div>
            Staff Remark: <span>{staffRemark}</span>
          </div>
        )}
      </div>
    </div>
  );
}

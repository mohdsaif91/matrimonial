import React, { useEffect, useRef, useState } from "react";
import { ToastContainer } from "react-toastify";
import ClientReportFilters from "./component/ClientReportFilters";
import { useQuery } from "@tanstack/react-query";
import { getClientReportById } from "../../service/clientReport";
import LoadingPage from "../Loading/Loading";
import ClientCard from "./component/ClientCard";
import Button from "../../component/form/Button";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import {
  companyDetails,
  defaultFooterNote,
  getCRMObject,
} from "../../util/ClientUtils";
import { cp } from "fs";

const initialData = {
  profile_id: "",
  filter: "",
  from: "",
  to: "",
};

const ClientReport = () => {
  const [filter, setFilter] = useState({ ...initialData });
  const [filters, setFilters] = useState();

  const pdfRef = useRef(null);

  const { data, isLoading } = useQuery({
    queryKey: ["client-report-list", filters],
    queryFn: ({ queryKey }) => {
      const [, key] = queryKey;
      return getClientReportById(key);
    },
    retry: false,
  });

  useEffect(() => {}, []);

  const CRMData = getCRMObject();

  const generatePDF = async () => {
    if (!pdfRef.current) return;

    const element = pdfRef.current;

    // Fix images not loading + improve quality
    const canvas = await html2canvas(element, {
      scale: 2,
      useCORS: true,
      allowTaint: true,
      logging: false,
      onclone: (clonedDoc) => {
        // Make hidden header/footer visible for PDF only
        clonedDoc.querySelectorAll(".pdf-hidden").forEach((el) => {
          el.style.display = "block";
        });
      },
    });

    const imgData = canvas.toDataURL("image/png");

    const pdf = new jsPDF("p", "mm", "a4");
    const pageWidth = pdf.internal.pageSize.getWidth();
    const pageHeight = pdf.internal.pageSize.getHeight();

    const imgWidth = pageWidth;
    const imgHeight = (canvas.height * imgWidth) / canvas.width;

    let heightLeft = imgHeight;
    let position = 0;

    // First page
    pdf.addImage(imgData, "PNG", 0, position, imgWidth, imgHeight);
    heightLeft -= pageHeight;

    // Additional pages
    while (heightLeft > 0) {
      position = heightLeft - imgHeight;
      pdf.addPage();
      pdf.addImage(imgData, "PNG", 0, position, imgWidth, imgHeight);
      heightLeft -= pageHeight;
    }

    pdf.save("Client-Report.pdf");
  };

  if (isLoading) {
    return <LoadingPage />;
  }

  const handledClientReport = data ? data : "";
  const send = handledClientReport.sent || [];
  const received = handledClientReport.received || [];

  const searchedProfileName = handledClientReport?.name || "";
  const searchedProfileId = handledClientReport?.profile_id
    ? `(${handledClientReport?.profile_id})`
    : "";

  return (
    <div className="p-4 bg-gray-100">
      <div className="flex bg-white  mb-2 p-2 flex-col justify-between">
        <div className="flex justify-between">
          <ClientReportFilters
            btnLoader={isLoading}
            filterData={filter}
            onClick={(fil) => {
              setFilters({ ...fil });
            }}
            onReset={() => {
              setFilter({ ...initialData });
              setFilters({ ...initialData });
            }}
            setFilter={setFilter}
          />
          {data && (
            <div className="mr-2 mt-2 flex h-[60px]">
              <Button
                text="Download PDF"
                onClick={() => generatePDF()}
                className="bg-blue-600 cursor-pointer text-white px-4 py-2 rounded shadow mr-2"
              />

              <Button text="Send Report" />
            </div>
          )}
        </div>
      </div>
      <div id="pdf-wrapper" ref={pdfRef} className="w-full flex flex-col gap-6">
        {/* HEADER */}
        <div className={`${data ? "block" : "hidden"}`}>
          <div
            style={{ backgroundColor: "#1a214b", color: "#FFFFFF" }}
            className="p-6 rounded-xl flex justify-between align-top"
          >
            <div
              style={{ color: "#FFFFFF" }}
              className="text-3xl font-bold tracking-wider"
            >
              {companyDetails.name}
            </div>

            <div className="text-sm leading-6">
              <p style={{ color: "#FFFFFF" }}>
                {CRMData["OFFICE_ADDRESS"]?.value || companyDetails.address}
              </p>
              <p style={{ color: "#FFFFFF" }}>
                Phone: {CRMData["OFFICE_PHONE"]?.value || companyDetails.phone}
              </p>
              <p style={{ color: "#FFFFFF" }}>
                Email: {CRMData["OFFICE_EMAIL"]?.value || companyDetails.email}
              </p>
              <p style={{ color: "#FFFFFF" }}>{companyDetails.domain}</p>
              <p style={{ color: "#FFFFFF" }}>
                Website:{" "}
                {CRMData["OFFICE_WEBSITE"]?.value || companyDetails.Website}
              </p>
            </div>
          </div>

          <div
            className="my-2"
            style={{ borderBottom: "1px solid #D1D5DB" }} // gray-300
          ></div>

          {/* COLOR LEGEND */}
          <div
            className="px-2 text-sm italic"
            style={{ color: "#374151" }} // gray-700
          >
            <p className="mb-1 font-semibold" style={{ color: "#374151" }}>
              Simple Guide to Card Border Colors and What They Mean:
            </p>

            <ul className="space-y-1 ml-4">
              <li>
                <span className="font-bold" style={{ color: "#10B981" }}>
                  – Green Border →
                </span>{" "}
                This profile has been approved.
              </li>
              <li>
                <span className="font-bold" style={{ color: "#EF4444" }}>
                  – Red Border →
                </span>{" "}
                This profile has been rejected.
              </li>
              <li>
                <span className="font-bold" style={{ color: "#F59E0B" }}>
                  – Yellow Border →
                </span>{" "}
                This profile is pending decision.
              </li>
            </ul>
          </div>

          <div
            className="mt-2"
            style={{ borderBottom: "1px solid #D1D5DB" }} // gray-300
          ></div>
        </div>

        {/* CONTENT */}
        <div className="p-2" style={{ backgroundColor: "#FFFFFF" }}>
          {data && (
            <div
              className="text-3xl mt-3"
              style={{ backgroundColor: "#FFFFFF", color: "#111827" }}
            >
              Cleint Name: {`${searchedProfileName} ${searchedProfileId}`}
            </div>
          )}

          {/* RECEIVED PROFILES */}
          {received.length > 0 && (
            <div className="mt-4 mb-2">
              <h1 className="text-2xl mb-2" style={{ color: "#111827" }}>
                Received Profiles
              </h1>

              <div className="flex flex-wrap gap-4">
                {received.map((m) => {
                  const image =
                    m?.client_details?.client_documents?.find(
                      (im) => im.file_type === "main_photo"
                    ) || "";

                  const borderColor =
                    m.response_status === "Pending"
                      ? "#E11D48"
                      : m.response_status === "Approve"
                      ? "#10B981"
                      : "#D1D5DB";

                  const name = m?.client_details?.name;

                  return (
                    <ClientCard
                      borderColor={borderColor}
                      createdDate={m?.sent_date || ""}
                      id=""
                      img={image.file_path}
                      name={name}
                      clientRemark={m.client_remark}
                      responseDate={m.sent_date}
                      staffRemark={m.staff_remark}
                    />
                  );
                })}
              </div>
            </div>
          )}

          {/* SENT PROFILES */}
          {send.length > 0 && (
            <div className="mt-4 mb-2">
              <h1 className="text-2xl mb-2" style={{ color: "#111827" }}>
                Sent Profiles
              </h1>

              <div className="flex flex-wrap gap-4">
                {send.map((m) => {
                  const image =
                    m?.client_details?.client_documents?.find(
                      (im) => im.file_type === "main_photo"
                    ) || "";

                  const borderColor =
                    m.response_status === "Pending"
                      ? "#E11D48"
                      : m.response_status === "Approve"
                      ? "#10B981"
                      : "#D1D5DB";

                  const name = m?.client_details?.name;

                  return (
                    <ClientCard
                      borderColor={borderColor}
                      createdDate={m?.sent_date || ""}
                      id=""
                      img={image.file_path}
                      name={name}
                      clientRemark={m.client_remark}
                      responseDate={m.sent_date}
                      staffRemark={m.staff_remark}
                    />
                  );
                })}
              </div>
            </div>
          )}
        </div>

        {/* FOOTER */}
        <div
          className={`${
            data ? "block" : "hidden"
          } print:flex flex-col print:mt-10 text-xs`}
          style={{ color: "#374151" }} // gray-700
        >
          <div style={{ borderTop: "1px solid #D1D5DB" }} className="pt-2">
            <p className="font-semibold" style={{ color: "#374151" }}>
              *Note:
            </p>
            <p style={{ color: "#374151" }}>
              {CRMData["PDF-NOTE"]?.value || defaultFooterNote}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ClientReport;

import { useEffect, useRef, useState } from "react";
import { Worker, Viewer } from "@react-pdf-viewer/core";
import { useLocation } from "react-router-dom";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";

import { ClientData } from "../../../../types/client";
import { SharedProfileCard } from "./SharedProfileCard";

import "@react-pdf-viewer/core/lib/styles/index.css";
import "./PDFPage.css";
import moment from "moment";

const PDFPage = () => {
  const [pdfUrl, setPdfUrl] = useState(null);
  const { state } = useLocation();

  const pdfRef = useRef(null);

  useEffect(() => {
    generatePDF();
  }, []);

  const generatePDF = async () => {
    const element = pdfRef.current;

    const canvas = await html2canvas(element, { scale: 2 });
    const imgData = canvas.toDataURL("image/png");

    const pdf = new jsPDF("p", "mm", "a4");
    const pageWidth = pdf.internal.pageSize.getWidth();
    const pageHeight = pdf.internal.pageSize.getHeight();

    const imgWidth = pageWidth;
    const imgHeight = (canvas.height * imgWidth) / canvas.width;

    let heightLeft = imgHeight;
    let position = 0;

    pdf.addImage(imgData, "PNG", 0, position, imgWidth, imgHeight);

    heightLeft -= pageHeight;

    while (heightLeft > 0) {
      position = heightLeft - imgHeight;
      pdf.addPage();
      pdf.addImage(imgData, "PNG", 0, position, imgWidth, imgHeight);
      heightLeft -= pageHeight;
    }

    const pdfBlob = pdf.output("blob");
    const pdfUrl = URL.createObjectURL(pdfBlob);

    setPdfUrl(pdfUrl);
  };
  const data: ClientData = state.pdfData;

  return (
    <div className="p-5">
      {pdfUrl && (
        <>
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-xl font-semibold">PDF Preview</h2>

            {/* Download Button */}
            <a
              href={pdfUrl}
              download="client-profile.pdf"
              className="bg-blue-600 text-white px-4 py-2 rounded shadow"
            >
              Download PDF
            </a>
          </div>
          <div style={{ border: "1px solid #ddd", height: "80vh" }}>
            <Worker workerUrl="https://unpkg.com/pdfjs-dist@3.7.107/build/pdf.worker.min.js">
              <Viewer fileUrl={pdfUrl} />
            </Worker>
          </div>
        </>
      )}
      <>
        {/* Hidden container for PDF generation */}
        <div style={{ padding: 20, width: "700px" }} ref={pdfRef}>
          <h1>Client Profile</h1>
          <div className="grid grid-cols-3 gap-2 mt-2">
            {Object.values(data.items).map((item) => (
              <div
                className="flex flex-col rounded-lg p-3"
                key={item.field_id}
                style={{
                  marginBottom: 10,
                  backgroundColor: "#F3F4F6",
                  borderColor: "#F3F4F6",
                }}
              >
                <div className="text-[12px]">{item.display_name}:</div>{" "}
                <span
                  dangerouslySetInnerHTML={{
                    __html:
                      item.field_type === "datepicker"
                        ? moment(item.value).format("DD-MM-YYYY")
                        : item.value,
                  }}
                ></span>
              </div>
            ))}
          </div>

          {/* Example image (you can loop images if available) */}
          <div className="mb-5 flex flex-wrap">
            {data.shared_profiles &&
              Array.isArray(data.shared_profiles) &&
              data.shared_profiles.map((sharedItem) => (
                <SharedProfileCard data={sharedItem} />
              ))}
          </div>
        </div>
      </>
    </div>
  );
};

export default PDFPage;

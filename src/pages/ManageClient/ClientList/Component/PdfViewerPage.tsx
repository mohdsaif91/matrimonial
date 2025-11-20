import React, { useState } from "react";
import { Worker, Viewer } from "@react-pdf-viewer/core";
import PdfGenerator from "./PDFView";

import "@react-pdf-viewer/core/lib/styles/index.css";

const PdfViewerPage = ({ objectData }) => {
  const [pdfUrl, setPdfUrl] = useState(null);

  return (
    <div className="p-5">
      <PdfGenerator data={objectData} onGenerated={(url) => setPdfUrl(url)} />

      <hr className="my-5" />

      {pdfUrl && (
        <>
          <h2 className="text-xl font-semibold mb-3">PDF Preview</h2>
          <div style={{ border: "1px solid #ddd", height: "80vh" }}>
            <Worker workerUrl="https://pdfjs-dist/build/pdf.worker.min.mjs">
              <Viewer fileUrl={pdfUrl} />
            </Worker>
          </div>
        </>
      )}
    </div>
  );
};

export default PdfViewerPage;

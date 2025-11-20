import { useLocation } from "react-router-dom";
import PdfViewerPage from "./PdfViewerPage";

function PDFPage() {
  const { state } = useLocation();
  return <PdfViewerPage objectData={state.pdfData} />;
}

export default PDFPage;

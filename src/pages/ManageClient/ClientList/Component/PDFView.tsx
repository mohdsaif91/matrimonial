import { useRef } from "react";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";

const PdfGenerator = ({ data, onGenerated }) => {
  const pdfRef = useRef(null);

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

    onGenerated(pdfUrl);
  };

  return (
    <>
      {/* Hidden container for PDF generation */}
      <div style={{ padding: 20, width: "700px" }} ref={pdfRef}>
        <h1>Client Profile</h1>

        {Object.values(data.items).map((item) => (
          <div key={item.field_id} style={{ marginBottom: 10 }}>
            <strong>{item.display_name}:</strong>{" "}
            <span dangerouslySetInnerHTML={{ __html: item.value }}></span>
          </div>
        ))}

        {/* Example image (you can loop images if available) */}
        {data.profile_image && (
          <img
            src={data.profile_image}
            alt="Profile"
            style={{ width: 200, marginTop: 20 }}
          />
        )}
      </div>

      <button
        onClick={generatePDF}
        className="bg-blue-600 text-white px-4 py-2 rounded mt-5"
      >
        Generate PDF
      </button>
    </>
  );
};

export default PdfGenerator;

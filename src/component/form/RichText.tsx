import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";

const RichTextEditor = ({ value, onChange, label, required }) => {
  return (
    <div className="w-full">
      {label && (
        <label className="text-sm font-medium text-gray-700">
          {label} {required && <span className="text-red-500">*</span>}
        </label>
      )}

      <div className="border rounded-md overflow-hidden shadow-sm h-60">
        <CKEditor
          className="h-60"
          editor={ClassicEditor}
          data={value}
          config={{
            toolbar: [
              "heading",
              "|",
              "bold",
              "italic",
              "link",
              "bulletedList",
              "numberedList",
              "|",
              "insertTable",
              "imageUpload",
              "mediaEmbed",
              "|",
              "undo",
              "redo",
            ],
            table: {
              contentToolbar: ["tableColumn", "tableRow", "mergeTableCells"],
            },
          }}
          onChange={(event, editor) => {
            const data = editor.getData();
            onChange(data);
          }}
        />
      </div>
    </div>
  );
};

export default RichTextEditor;

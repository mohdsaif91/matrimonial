import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";

const RichTextEditor = ({ value, onChange, label }) => {
  return (
    <div className="w-full">
      {label && <label className="block mb-2 font-medium">{label}</label>}

      <div className="border rounded-md overflow-hidden shadow-sm">
        <CKEditor
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

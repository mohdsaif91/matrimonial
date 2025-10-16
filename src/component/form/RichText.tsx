import { useState } from "react";
import Editor, {
  BtnBold,
  BtnItalic,
  Toolbar,
  BtnRedo,
  BtnBulletList,
  BtnClearFormatting,
  BtnLink,
  BtnNumberedList,
  BtnStrikeThrough,
  BtnStyles,
  BtnUnderline,
  BtnUndo,
  ContentEditable,
} from "react-simple-wysiwyg";
import { RichTextProps } from "../../types/form";

export default function CustomEditor({
  onChange,
  value,
  label,
  required,
}: RichTextProps) {
  return (
    <div className="col-span-4 ">
      <label className="text-sm font-medium text-gray-700">
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      <Editor
        className="h-60"
        value={value}
        onChange={(e) => onChange(e.target.value)}
      >
        <Toolbar>
          <BtnRedo />
          <BtnUndo />
          <BtnBulletList />
          <BtnClearFormatting />
          <BtnLink />
          <BtnNumberedList />
          <BtnStrikeThrough />
          <BtnStyles />
          <BtnUnderline />
          <BtnBold />
          <BtnItalic />
          <ContentEditable />
        </Toolbar>
      </Editor>
    </div>
  );
}

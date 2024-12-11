import React from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

const modules = {
  toolbar: [
    [{ 'header': [1, 2, 3, false] }],
    ['bold', 'italic', 'underline', 'strike'],
    ['blockquote', 'code-block'],
    [{ 'list': 'ordered'}, { 'list': 'bullet' }],
    ['link'],
    [{ 'font': [] }],
    [{ 'align': [] }],
    [{ 'color': [] }, { 'background': [] }],  
    ['clean']
  ],
};

const formats = [
  'header',
  'bold', 'italic', 'underline', 'strike',
  'blockquote', 'code-block',
  'list', 'bullet',
  'link', 'font', 'align', 'color'
];

export function Editor({ value, onChange }) {
  return (
<div className="bg-white rounded-md border border-slate-200 overflow-hidden">
  <ReactQuill 
    theme="snow"
    value={value}
    onChange={onChange}
    modules={modules}
    formats={formats}
    style={{
      height: '400px',
      display: 'flex',
      flexDirection: 'column'
    }}
  />
</div>

  );
}

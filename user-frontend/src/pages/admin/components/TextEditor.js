import React, { useEffect, useState } from 'react';
import Quill from 'quill';

export default function TextEditor({ value, onChange }) {
  const [valueSetAlready, isValueSetAlready] = useState(false);
  // Install quill script
  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://cdn.quilljs.com/1.3.6/quill.js';
    if (!valueSetAlready && value.length > 0) {
      script.onload = () => {
        // Set editor ref
        const quill = new Quill('#editor', {
          modules: {
            toolbar: [
              [{ header: [1, 2, false] }],
              ['bold', 'italic', 'underline']
            ]
          },
          theme: 'snow'
        });
        if (value.length !== 0) {
          quill.updateContents(value);
          isValueSetAlready(true);
        }
        if (!valueSetAlready) {
          quill.on('text-change', function (delta, oldDelta, source) {
            if (source === 'user') {
              onChange(quill.getContents().ops);
            }
          });
        }
      };
      document.body.appendChild(script);
    }
  }, [onChange, value, valueSetAlready]);

  return (
    <div>
      <div id="editor"></div>
    </div>
  );
}

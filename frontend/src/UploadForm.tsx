import React, { useState } from 'react';

// UploadForm allows users to select a document and POST it to `/api/upload`.
// When processing finishes, the extracted text is displayed below the form.

const UploadForm: React.FC = () => {
  const [file, setFile] = useState<File | null>(null);
  const [text, setText] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!file) return;

    const data = new FormData();
    data.append('document', file);

    try {
      const res = await fetch('/api/upload', {
        method: 'POST',
        body: data
      });
      if (!res.ok) throw new Error('Upload failed');
      const { documentId } = await res.json();

      // poll for processing
      for (let i = 0; i < 10; i++) {
        const statusRes = await fetch(`/api/document/${documentId}`);
        if (statusRes.ok) {
          const doc = await statusRes.json();
          if (doc.extracted_text) {
            setText(doc.extracted_text);
            return;
          }
        }
        await new Promise(r => setTimeout(r, 1000));
      }
      setError('Timed out waiting for processing');
    } catch (err) {
      setError((err as Error).message);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input type="file" onChange={e => setFile(e.target.files?.[0] || null)} />
        <button type="submit">Upload</button>
      </form>
      {error && <p>{error}</p>}
      {text && <pre>{text}</pre>}
    </div>
  );
};

export default UploadForm;

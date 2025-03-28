import { useState } from 'react';
import './App.css';
import Upload from './pages/Upload';
import { Consulta } from './pages/Consulta';

export default function App() {
  const [showUpload, setShowUpload] = useState<boolean>(true);

  return (
    <div className="App">
      <div className="fixed-buttons d-flex justify-content-center mb-4">
        <button
          className={`btn ${showUpload ? 'btn-primary' : 'btn-secondary'} mx-2`}
          onClick={() => setShowUpload(true)}
        >
          Upload
        </button>
        <button
          className={`btn ${!showUpload ? 'btn-primary' : 'btn-secondary'} mx-2`}
          onClick={() => setShowUpload(false)}
        >
          Consulta
        </button>
      </div>

      {showUpload ? <Upload /> : <Consulta />}
    </div>
  );
}

import React, { useState } from 'react';
import styles from './FileDownloader.module.css';
import Button from '../Button/Button';

interface FileOption {
  value: string;
  label: string;
}

interface FileDownloaderProps {
  files: FileOption[];
}

const FileDownloader: React.FC<FileDownloaderProps> = ({ files }) => {
  const [selectedFile, setSelectedFile] = useState<string | null>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedFile(event.target.value);
  };

  const handleDownloadClick = () => {
    if (selectedFile) {
      const link = document.createElement('a');
      link.href = selectedFile;
      link.download = selectedFile.split('/').pop() || 'file.xlsx';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  return (
    <div className={styles.fileDownloaderContainer}>
      <select value={selectedFile || ''} onChange={handleFileChange} className={styles.select}>
        <option value="" disabled>История проверок</option>
        {files.map((file) => (
          <option key={file.value} value={file.value}>
            {file.label}
          </option>
        ))}
      </select>
      <Button
        text="Скачать результат"
        variant="primary"
        size="medium"
        disabled={!selectedFile}
        onClick={handleDownloadClick}
      />
    </div>
  );
};

export default FileDownloader;
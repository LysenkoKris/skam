import React, { useState } from 'react';
import styles from './MonitoringDomain.module.css';
import KebabMenu from '../KebabMenu/KebabMenu';
import ProgressBar from '../ProgressBar/ProgressBar';
import FileDownloader from '../FileDownloader/FileDownloader';
import EditSiteModal from '../EditSiteModal/EditSiteModal';

interface MonitoringDomainProps {
  domain: string;
  subdomains: { [key: string]: string | null }; // Объект с состоянием поддоменов
  progress: number;
  files: { value: string; label: string }[];
  expandedDomain: string | null;
  onDomainClick: (domain: string) => void;
  onEdit: (domain: string, subdomains: { [key: string]: string | null }, valueOne: number, valueTwo: number) => void;
  onDelete: (domain: string) => void;
  valueOne: number;
  valueTwo: number;
}

const MonitoringDomain: React.FC<MonitoringDomainProps> = ({
  domain,
  subdomains,
  progress,
  files,
  expandedDomain,
  onDomainClick,
  onEdit,
  onDelete,
  valueOne,
  valueTwo,
}) => {
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  const handleEdit = () => {
    setIsEditModalOpen(true);
  };

  const handleCloseEditModal = () => {
    setIsEditModalOpen(false);
  };

  const handleSaveEditModal = (newSubdomains: { [key: string]: string | null }, newValueOne: number, newValueTwo: number) => {
    onEdit(domain, newSubdomains, newValueOne, newValueTwo);
    setIsEditModalOpen(false);
  };

  // Фильтруем поддомены, которые были перемещены в droppable1 или droppable2
  const filteredSubdomains = Object.keys(subdomains).filter(
    (subdomain) => subdomains[subdomain] === 'droppable1' || subdomains[subdomain] === 'droppable2'
  );

  return (
    <div
      className={`${styles.domain} ${expandedDomain === domain ? styles.expanded : ''}`}
    >
      <div className={styles.domainHead}>
        <h5 onClick={() => onDomainClick(domain)}>{domain}</h5>
        <KebabMenu domain={domain} onEdit={handleEdit} onDelete={() => onDelete(domain)} />
      </div>
      {expandedDomain === domain && (
        <div className={styles.domainContent}>
          <ProgressBar value={progress} max={100} />
          <div className={styles.subdomains}>
            {filteredSubdomains.map((subdomain, subIndex) => (
              <div className={styles.subdomain} key={subIndex}>{subdomain}</div>
            ))}
          </div>
          <FileDownloader files={files} />
        </div>
      )}
      <EditSiteModal
        isOpen={isEditModalOpen}
        onClose={handleCloseEditModal}
        onSave={handleSaveEditModal}
        domain={domain}
        subdomains={subdomains}
        valueOne={valueOne}
        valueTwo={valueTwo}
      />
    </div>
  );
};

export default MonitoringDomain;
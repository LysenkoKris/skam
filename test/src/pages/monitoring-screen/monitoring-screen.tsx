import React, { useState } from 'react';
import Breadcrumbs from '../../components/Breadcrumbs/Breadcrumbs';
import Header from '../../components/Header/Header';
import { AuthorizationStatus } from '../../const';
import styles from './monitoring-screen.module.css';
import Button from '../../components/Button/Button';
import Footer from '../../components/Footer/Footer';
import AddSiteModal from '../../components/AddSiteModal/AddSiteModal';
import MonitoringDomain from '../../components/MonitoringDomain/MonitoringDomain';

interface MonitoringScreenProps {
  authorizationStatus: AuthorizationStatus;
  email: string | null;
  onLogout: () => void;
}

export default function MonitoringScreen({
  authorizationStatus,
  email,
  onLogout,
}: MonitoringScreenProps): JSX.Element {
  const breadcrumbItems = [
    { label: 'Главная', link: '/' },
    { label: 'Мониторинг доменов' },
  ];
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [sites, setSites] = useState<{
    domain: string;
    subdomains: { [key: string]: string | null }; // Объект с состоянием поддоменов
    valueOne: number;
    valueTwo: number;
  }[]>([]);
  const [expandedDomain, setExpandedDomain] = useState<string | null>(null);

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleAddSite = (domain: string, subdomains: { [key: string]: string | null }, valueOne: number, valueTwo: number) => {
    setSites([...sites, { domain, subdomains, valueOne, valueTwo }]);
  };

  const handleEdit = (domain: string, subdomains: { [key: string]: string | null }, valueOne: number, valueTwo: number) => {
    setSites(sites.map((site) => (site.domain === domain ? { ...site, subdomains, valueOne, valueTwo } : site)));
  };

  const handleDelete = (domain: string) => {
    setSites(sites.filter((site) => site.domain !== domain));
  };

  const [progress, setProgress] = useState(50);

  const files = [
    { value: '/files/2-12-2024.xlsx', label: 'Проверка 2.12.2024' },
    { value: '/files/20-11-2024.xlsx', label: 'Проверка 20.11.2024' },
    { value: '/files/4-11-2024.xlsx', label: 'Проверка 4.11.2024' },
  ];

  const handleDomainClick = (domain: string) => {
    setExpandedDomain((prevDomain) => (prevDomain === domain ? null : domain));
  };

  return (
    <div className='Container'>
      <Header
        authorizationStatus={authorizationStatus}
        email={email}
        onLogout={onLogout}
      />
      <div className="Page">
        <Breadcrumbs items={breadcrumbItems} />
        <div className={styles.monitoringPage}>
          <div className={styles.monitoringContent}>
            <div className={styles.monitoringHead}>
              <h2>Сайты на мониторинге</h2>
              <h4>
                <span>На этой странице вы можете поставить сайт на мониторинг и ...</span>
                <span></span>
              </h4>
            </div>
            <div className={styles.addSiteButton}>
              {sites.length === 0 && (
                <p className={styles.noSitesMessage}>Пока нет сайтов на мониторинге</p>
              )}
              <Button text="Хотите добавить?" variant="link" size="medium" onClick={handleOpenModal} />
            </div>
            <AddSiteModal isOpen={isModalOpen} onClose={handleCloseModal} onAddSite={handleAddSite} />
            <div className={styles.monitoringDomains}>
              {sites.map((site, index) => (
                <MonitoringDomain
                key={index}
                domain={site.domain}
                subdomains={site.subdomains} // Объект с состоянием поддоменов
                progress={progress}
                files={files}
                expandedDomain={expandedDomain}
                onDomainClick={handleDomainClick}
                onEdit={handleEdit}
                onDelete={handleDelete}
                valueOne={site.valueOne}
                valueTwo={site.valueTwo}
              />
              ))}
            </div>
          </div>
        </div>
      </div>
      <Footer title="My React App" subtitle="Welcome to the best app ever!" />
    </div>
  );
}
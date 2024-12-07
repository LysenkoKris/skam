import React, { useState } from 'react';
import Breadcrumbs from '../../components/Breadcrumbs/Breadcrumbs';
import Header from '../../components/Header/Header';
import { AuthorizationStatus } from '../../const';
import styles from './monitoring-screen.module.css';
import Button from '../../components/Button/Button';
import Footer from '../../components/Footer/Footer';
import AddSiteModal from '../../components/AddSiteModal/AddSiteModal';
import KebabMenu from '../../components/KebabMenu/KebabMenu';

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
  const [sites, setSites] = useState<{ domain: string; subdomains: string[] }[]>([]);

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleAddSite = (domain: string, subdomains: string[]) => {
    setSites([...sites, { domain, subdomains }]);
  };

  const handleEdit = (domain: string) => {
    alert(`Редактировать ${domain}`);
  };

  const handleDelete = (domain: string) => {
    setSites(sites.filter((site) => site.domain !== domain));
  };

  return (
    <div>
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
            <div>
              {sites.map((site, index) => (
                <div key={index}>
                  <h3>{site.domain}</h3>
                  <ul>
                    {site.subdomains.map((subdomain, subIndex) => (
                      <li key={subIndex}>{subdomain}</li>
                    ))}
                  </ul>
                  <KebabMenu
                    domain={site.domain}
                    onEdit={() => handleEdit(site.domain)}
                    onDelete={() => handleDelete(site.domain)}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      <Footer title="My React App" subtitle="Welcome to the best app ever!" />
    </div>
  );
}
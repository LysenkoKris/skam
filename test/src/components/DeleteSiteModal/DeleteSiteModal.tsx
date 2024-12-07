import React from 'react';
import styles from './DeleteSiteModal.module.css';
import Button from '../Button/Button';
import close from '../../assets/Close.svg';

interface DeleteSiteModalProps {
  domain: string;
  isOpen: boolean;
  onClose: () => void;
  onDelete: () => void;
}

const DeleteSiteModal: React.FC<DeleteSiteModalProps> = ({
  domain,
  isOpen,
  onClose,
  onDelete,
}) => {
  if (!isOpen) return null;

  const handleOverlayClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div className={styles.modalOverlay} onClick={handleOverlayClick}>
      <div className={styles.modalContent}>
        <div className={styles.modalHead}>
          <span>Удаление сайта</span> 
          <img src={close} onClick={onClose}/>
        </div>
        <p>Вы уверены, что хотите удалить сайт {domain} с мониторинга?</p>
        <div className={styles.modalActions}>
          <Button text="Удалить" variant="delete" onClick={onDelete} />
          <Button text="Отменить" variant="secondary" onClick={onClose} />
        </div>
      </div>
    </div>
  );
};

export default DeleteSiteModal;
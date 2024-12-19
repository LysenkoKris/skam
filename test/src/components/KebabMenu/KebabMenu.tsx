import React, { useState, useEffect, useRef } from 'react';
import styles from './KebabMenu.module.css';
import kebab from '../../assets/kebab.svg';
import del from '../../assets/Delete.svg';
import edit from '../../assets/Edit.svg';
import DeleteSiteModal from '../DeleteSiteModal/DeleteSiteModal';

interface KebabMenuProps {
  domain: string;
  onEdit: () => void;
  onDelete: () => void;
}

const KebabMenu: React.FC<KebabMenuProps> = ({ domain, onEdit, onDelete }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement | null>(null);

  const handleToggle = () => {
    setIsOpen(!isOpen);
  };

  const handleEdit = (e: React.MouseEvent) => {
    e.stopPropagation();
    onEdit();
    setIsOpen(false);
  };

  const handleDelete = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsDeleteModalOpen(true);
    setIsOpen(false);
  };

  const handleConfirmDelete = () => {
    onDelete();
    setIsDeleteModalOpen(false);
  };

  const handleCancelDelete = () => {
    setIsDeleteModalOpen(false);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div className={styles.kebabMenuContainer} ref={menuRef}>
      <button className={styles.kebabButton} onClick={handleToggle}>
        <img src={kebab} alt="kebab" />
      </button>
      {isOpen && (
        <div className={styles.menu}>
          <button className={styles.menuItem} onClick={handleEdit}>
            <img src={edit} alt="edit" />Редактировать
          </button>
          <button className={styles.menuItem} onClick={handleDelete}>
            <img src={del} alt="delete" /> Удалить
          </button>
        </div>
      )}
      <DeleteSiteModal
        domain={domain}
        isOpen={isDeleteModalOpen}
        onClose={handleCancelDelete}
        onDelete={handleConfirmDelete}
      />
    </div>
  );
};

export default KebabMenu;
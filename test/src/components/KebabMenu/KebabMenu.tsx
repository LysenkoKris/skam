import React, { useState } from 'react';
import styles from './KebabMenu.module.css';
import kebab from '../../assets/kebab.svg';
import del from '../../assets/Delete.svg';
import edit from '../../assets/Edit.svg';

interface KebabMenuProps {
  onEdit: () => void;
  onDelete: () => void;
}

const KebabMenu: React.FC<KebabMenuProps> = ({ onEdit, onDelete }) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleToggle = () => {
    setIsOpen(!isOpen);
  };

  const handleEdit = () => {
    onEdit();
    setIsOpen(false);
  };

  const handleDelete = () => {
    onDelete();
    setIsOpen(false);
  };

  return (
    <div className={styles.kebabMenuContainer}>
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
    </div>
  );
};

export default KebabMenu;
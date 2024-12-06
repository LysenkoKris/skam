import React from 'react';
import styles from './Breadcrumbs.module.css';

interface BreadcrumbItem {
  label: string;
  link?: string;
}

interface BreadcrumbsProps {
  items: BreadcrumbItem[];
}

const Breadcrumbs: React.FC<BreadcrumbsProps> = ({ items }) => {
  return (
    <nav aria-label="breadcrumb">
      <ol className={styles.breadcrumb}>
        {items.map((item, index) => (
          <li
            key={index}
            className={`${styles.breadcrumbItem} ${index === items.length - 1 ? styles.active : ''}`}
          >
            {item.link ? (
              <a href={item.link}>{item.label}</a>
            ) : (
              item.label
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
};

export default Breadcrumbs;
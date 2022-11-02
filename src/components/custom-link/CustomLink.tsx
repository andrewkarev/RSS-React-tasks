import React from 'react';
import { NavLink } from 'react-router-dom';
import AppPathesEnum from 'common/enums/app-pathes';
import styles from './custom-link.module.css';

interface CustomLinkProps {
  path: AppPathesEnum;
  title: string;
}

const CustomLink: React.FC<CustomLinkProps> = ({ path, title }) => (
  <div className={styles['link-container']}>
    <NavLink
      to={path}
      className={({ isActive }) => (isActive ? styles['link-active'] : styles['link'])}
      end
    >
      {title}
    </NavLink>
  </div>
);

export default CustomLink;

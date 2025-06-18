import { useContext } from 'react';
import { MenuOptionsContext } from '../contexts/MenuOptions/MenuOptionsContext';

export const useMenuOptions = () => useContext(MenuOptionsContext);

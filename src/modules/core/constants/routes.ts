import HomeComponent from '../../home/components/Home/Home';
import { generatePath } from 'react-router-dom';

const ROUTES = {
  HOME: {
    path: '/',
    component: HomeComponent,
  },
};

const { HOME } = ROUTES;

export const DEFAULT_PAGE = generatePath(HOME.path);

export const BASE_NAME = '/bitcoin';

export { HOME};
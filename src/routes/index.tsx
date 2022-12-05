import React from 'react';
import { Navigate, useRoutes, useLocation } from 'react-router-dom';
import { RouteObject } from '@/routes/interface';
import { Home } from '@/pages';
import lazyLoadRouter from './utils/lazyLoad';

export const rootRouter: RouteObject[] = [
  {
    path: '/',
    element: <Home />,
  }
];

const Router = () => {
  const lazyRouter = lazyLoadRouter(rootRouter);
  
  const routes = useRoutes(lazyRouter as any);
  
  return routes; 
};

export default Router;

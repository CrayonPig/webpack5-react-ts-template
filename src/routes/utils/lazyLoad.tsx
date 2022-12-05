import React, { ReactElement } from 'react';
import { MetaProps, RouteObject } from '../interface';
import BaseAuthRouter from '@/routes/utils/baseAuthRouter';

/**
 * @description The route is lazy to load
 * @param {Element} Comp The component you want to access
 * @returns element
 */
const load = (Element: any, meta: MetaProps | undefined): React.LazyExoticComponent<any> | ReactElement => {
  meta = meta || {};
  return <BaseAuthRouter element={ Element } meta={ meta }></BaseAuthRouter>;
};

/**
 * @description Use lazy loading, and hang meta in the component
 * @param {Array} menuList List of all menus
 * @return menuOptions
 */
const lazyLoadRouter = (menuList: RouteObject[]) => {
  const newArr: RouteObject[] = [];

  function loop (menuItem: RouteObject) {
    let menuItemChildren:any[] = [];
    if (menuItem.children?.length) {
      menuItem.children.forEach(item => {
        const loopMenuItem = loop(item);
        menuItemChildren.push(loopMenuItem);
      });
    } else {
      if (menuItem.element) {
        menuItem.element = load(menuItem.element, menuItem.meta);
      }
    }
    return {
      ...menuItem,
      children: menuItemChildren
    };
  }

  menuList.forEach(item => newArr.push(loop(item)));
  return newArr;
};

export default lazyLoadRouter;

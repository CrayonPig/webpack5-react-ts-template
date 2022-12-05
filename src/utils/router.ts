import { RouteObject } from '@/routes/interface';
import { Menu } from '@/typings/global';

/**
 * @description 递归查询对应的路由
 * Query the corresponding route recursively
 * @param {String} path 当前访问地址
 * Current access address
 * @param {Array} routes 路由列表
 * @returns array
 */

export const searchRouteFromPath = (path: string, routes: RouteObject[] = [], prePath?: string): RouteObject => {
  let result: RouteObject = {};
  for (const item of routes) {
    // console.log(`${prePath || ''}${item.path}`.toLocaleLowerCase() === path.toLocaleLowerCase(), `${prePath || ''}${item.path}`.toLocaleLowerCase(), path.toLocaleLowerCase());
    
    if (`${prePath || ''}${item.path}`.toLocaleLowerCase() === path.toLocaleLowerCase()) return item;
    if (item.children) {
      const res = searchRouteFromPath(path, item.children, item.path);
      if (Object.keys(res).length) result = res;
    }
  }
  return result;
};

/**
 * @description 递归查询对应的路由
 * Query the corresponding route recursively
 * @param {String} key 
 * @param {Array} routes 
 * @returns array
 */
export const searchRouteFromKey = (key: string, routes: RouteObject[] = []): RouteObject => {
  let result: RouteObject = {};
  for (const item of routes) {
    if (item.meta?.key === key) {
      return item;
    }
    if (item.children) {
      const res = searchRouteFromKey(key, item.children);
      if (Object.keys(res).length) result = res;
    }
  }
  return result;
};

/**
 * @description 递归当前路由的 所有 关联的路由，生成面包屑导航栏
 * Recursively all the routes associated with the current route to generate the breadcrumb navigation bar
 * @param {String} path 当前访问地址
 * Current access address
 * @param {Array} menuList 菜单列表
 * Menu list
 * @returns array
 */
export const getBreadcrumbList = (code: string, menuList: Menu.MenuOptions[]) => {
  const tempPath: any[] = [];
  try {
    const getNodePath = (node: Menu.MenuOptions) => {
      tempPath.push(node);
      // 找到符合条件的节点，通过throw终止掉递归
      // Find a node that meets the criteria and throw it to terminate the recursion
      if (node.code === code) {
        throw new Error('GOT IT!');
      }
      if (node.childMenu && node.childMenu.length > 0) {
        for (let i = 0; i < node.childMenu.length; i++) {
          getNodePath(node.childMenu[i]);
        }
        // 当前节点的子节点遍历完依旧没找到，则删除路径中的该节点
        // If the child node of the current node is not found, delete the node from the path
        tempPath.pop();
      } else {
        // 找到叶子节点时，删除路径当中的该叶子节点
        // When a leaf node is found, it is deleted from the path
        tempPath.pop();
      }
    };
    for (let i = 0; i < menuList.length; i++) {
      getNodePath(menuList[i]);
    }
  } catch (e) {
    return tempPath.map(item => ({
      title: item.title || '',
      originTitle: item.title,
      path: item.path,
      code: item.code,
      isLeftMenu: item.isLeftMenu
    }));
  }
};

/**
 * @description 找出面包屑
 * find breadcrumb
 * @param {String} menuList 当前菜单列表
 * Current Menu list
 * @returns object
 */
export const findBreadcrumb = (menuList: Menu.MenuOptions[]): Array<{title: string;
  path: string}> => {
  const handleBreadcrumbList: any = {};
  const loop = (menuItem: Menu.MenuOptions) => {
    if (menuItem.isLeftMenu === 1) {
      if (menuItem?.childMenu?.length) {
        menuItem.childMenu.forEach(item => loop(item));
      } else {
        handleBreadcrumbList[menuItem.code] = getBreadcrumbList(menuItem.code, menuList);
      }
    } else {
      menuItem.childMenu = [];
      handleBreadcrumbList[menuItem.code] = getBreadcrumbList(menuItem.code, menuList);
    }
  };
  menuList.forEach(item => loop(item));
  return handleBreadcrumbList;
};

/**
 * @description 使用递归处理路由菜单，生成一维数组，做菜单权限判断
 * Use recursive processing routing menu, generate a one-dimensional array, do menu authority judgment
 * @param {Array} menuList 所有菜单列表
 * List of all menus
 * @param {Array} newArr 菜单的一维数组
 * A one-dimensional array of menus
 * @return array
 */
export function handleRouter (routerList: Menu.MenuOptions[], newArr: string[] = []) {
  routerList.forEach((item: Menu.MenuOptions) => {
    typeof item === 'object' && item.code && newArr.push(item.code);
    item.childMenu && item.childMenu.length && handleRouter(item.childMenu, newArr);
  });
  return newArr;
}
/**
 * @description 查找后端返回菜单中第一个有效路由
 * @param {Array} menuList 所有菜单列表
 * @return menuOptions
 */
export function findMenuFirstRouter (routerList: Menu.MenuOptions[]) {
  // todo: 后续需优化为判断path是否为空或者为根
  let MenuList: Menu.MenuOptions = routerList[0];
  let loopFlag = true;
  while (loopFlag) {
    const childMenu: any = MenuList?.childMenu || [];
    if (childMenu?.length) {
      if (childMenu[0].category !== 3) {
      // 还有菜单子集，并且子集类型不是按钮,向下查找
        MenuList = childMenu[0];
      } else {
        loopFlag = false;
      }
    } else {
      loopFlag = false;
    }
  }
  return MenuList;
}

/**
 * @description 使用递归处理权限树，生成左侧菜单tree
 * Use recursion to process the permission tree to generate the left menu tree
 * @param {Array} permissionList 权限树
 * Permissions on the tree
 * @param {Array} newArr 左侧菜单tree
 * Left menu tree
 * @return array
 */
export function findAllMenu (permissionList: Menu.MenuOptions[], rootRouter: RouteObject[]) {
  const newArr: Menu.MenuOptions[] = [];

  function loop (menuItem: Menu.MenuOptions) {
    if (menuItem.isLeftMenu === 1) {
      const childMenu:Menu.MenuOptions[] = [];
      if (menuItem.childMenu?.length) {
        menuItem.childMenu.forEach(item => {
          const loopMenuItem = loop(item);
          if (loopMenuItem) {
            childMenu.push(loopMenuItem);
          }
        });
      }
      const rootMenu = searchRouteFromKey(menuItem.code, rootRouter);
      return {
        ...menuItem,
        childMenu: childMenu,
        title: rootMenu.meta?.title,
        originTitle: menuItem.title
      };
    } else {
      return null;
    }
  }

  permissionList.forEach(item => {
    const loopMenuItem = loop(item);
    if (loopMenuItem) {
      newArr.push(loopMenuItem);
    }
  });

  return newArr;
}

/**
 * @description 使用递归处理权限树，生成role固定id 
 * Use recursion to process the permission tree and generate the role fixed id
 * @param {Array} permissionList 权限树 
 * Permissions on the tree
 * @param {Array} selectIds 已选择的role id 
 * The role id has been selected
 * @return {Array<string>} role固定id 
 * Role of fixed id
 */
export function findPrivateRole (permissionList: Menu.MenuOptions[], selectIds: Array<number>) {
  const newArr: Array<string | number> = [];

  function loop (menuItem: Menu.MenuOptions) {
    if (menuItem.isLeftMenu === 1) {
      if (menuItem.childMenu?.length) {
        menuItem.childMenu.forEach(item => loop(item));
      }
      if (selectIds.indexOf(Number(menuItem.id)) === -1) {
        newArr.push(Number(menuItem.id));
        console.log(newArr);
      }
    }
  }

  permissionList.forEach(item => loop(item));

  return newArr.concat(selectIds);
}

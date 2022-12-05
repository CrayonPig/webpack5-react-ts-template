/**
 * @description Object array deep clone
 * @param {Object} obj source object
 * @return object
 */
export const deepCopy = <T>(obj: Array<any> | any): T => {
  let newObj: any;
  try {
    newObj = obj.push ? [] : {};
  } catch (error) {
    newObj = {};
  }
  for (const attr in obj) {
    if (typeof obj[attr] === 'object') {
      newObj[attr] = deepCopy(obj[attr]);
    } else {
      newObj[attr] = obj[attr];
    }
  }
  return newObj;
};

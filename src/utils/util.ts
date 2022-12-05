import { map, uniqueId, isNil, size, isEmpty } from 'lodash';

/**
 * @description 判断数据类型
 * Determining the data type
 * @param {Any} val 需要判断类型的数据
 * You need to determine the type of data
 * @return string
 */
export const isType = (val: any) => {
  if (val === null) return 'null';
  if (typeof val !== 'object') return typeof val;
  else
    return Object.prototype.toString.call(val).slice(8, -1).toLocaleLowerCase();
};

/**
 * @description 判断数据类型
 * Determining the data type
 * @param {Any} val 需要判断类型的数据
 * You need to determine the type of data
 * @return string
 */

export const checkRespone = (response:any)=>response.code == 200;

export const getNewUrl = (query: any) => {
  const url = new URLSearchParams('');
  Object.keys(query).forEach((key) => {
    url.set(key, query[key]);
  });
  return url.toString();
};

export function getImageFileFromUrl (url: string, filename: string, callBack: (file: File) => void) {
  const image = new Image();
  image.crossOrigin = ''; // 必须有这个 must use it
  image.src = url + '?v=' + Math.random();
  console.log('url + Math.random();', url);
  
  image.onload = () => { // 图片加载完成后，调用getBase64Image方法 
    // When the image is loaded, the getBase64Image method is called
    const base64ImageSrc = getBase64Image(image);
    if (base64ImageSrc) {
      const imageFile = dataURLtoFile(base64ImageSrc, filename);
      if (imageFile) {
        callBack(imageFile);
      }
    }
  };
}

// url to base64
export function getBase64Image (image: HTMLImageElement, width?: number, height?: number) { 
  // width、height调用时传入具体像素值，控制大小 ,不传则默认图像大小
  // When width and height are called, the specific pixel value is passed to control the size. If not, the default image size is passed
  const canvas: HTMLCanvasElement = document.createElement('canvas');
  canvas.width = width !== undefined ? width : image.width;
  canvas.height = height !== undefined ? height : image.height;
  const ctx = canvas.getContext('2d');
  if (ctx) {
    ctx.drawImage(image, 0, 0, canvas.width, canvas.height);
    const ext = image.src.substring(image.src.lastIndexOf('.') + 1).toLowerCase();
    const dataURL = canvas.toDataURL('image/' + ext);
    return dataURL;
  } else {
    return null;
  }
}

// base64 to file
export function dataURLtoFile (dataurl: string, filename: string) {
  const arr = dataurl.split(',');
  const arrMatch = arr[0].match(/:(.*?);/);
  if (arrMatch) {
    const mime =  arrMatch[1];
    const bstr = atob(arr[1]);
    let n = bstr.length;
    const u8arr = new Uint8Array(n);
    while (n--) {
      u8arr[n] = bstr.charCodeAt(n);
    }
    return new File([u8arr], filename, { type: mime });
  }
}


export const strAllSpace = (str: string) => /^[ ]*$/.test(str);


export const strContainSpecailWord = (str: string) =>
  /[`~!#$%^&*\-+=<>?:"{}|,\/;'\\[\]·~！#￥%……&*——\-+={}|《》？.：“”【】、；‘'，。）（)(、@]/im.test(
    str,
  );


export const labelNameValidator = (value: string) => {
  if (isEmpty(value)) {
    return 'Enter label name';
  }
  if (size(value) > 100) {
    return 'Can not exceed 100 characters';
  }
  if (strAllSpace(value)) {
    return 'The characters cannot all contain Spaces.';
  }
  if (/[<>&'"]/im.test(value)) {
    return  'Can not contain <>&\'" character';
  }
  return null;
};


// get projectId from path
export function getPathProjectId () {
  const pathSplit = location.pathname.split('/').filter(key => key !== '');
  if (pathSplit[0] === 'project') {
    return pathSplit[1];
  } else {
    return 0;
  }
}

/**
 * 
 * @param blob file blob
 * @param type file type   text/csv、application/vnd.ms-excel
https://blog.csdn.net/john1337/article/details/117279007
 * @param fileName 
 */
export function downloadBlobFile (blob: Blob, type: string, fileName: string ) {
  let url = window.URL.createObjectURL(new Blob([blob],{type: type}))
  let link = document.createElement('a')
  link.style.display = 'none'
  link.href = url
  link.setAttribute('download', fileName)
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link); //下载完成移除元素
  window.URL.revokeObjectURL(url); //释放掉blob对象
}

export function deviceTypeToString(deviceType: string): string {
  let deviceTypeString = "";
  switch (deviceType) {
    case 'DEVICE_GATEWAY':
        deviceTypeString = "Device & gateway";
        break;

    case 'EDGE_GATEWAY':
        deviceTypeString = "Edge & gateway";
        break;
    case 'EDGE':
        deviceTypeString = "Edge";
        break;

    case 'DEVICE':
        deviceTypeString = "Device";
        break;
    default:
        deviceTypeString = deviceType;
        break;
  }
  return deviceTypeString;
}

export function getDeviceTypeEnum(deviceType: string): string {
  let deviceTypeString = "";
  switch (deviceType) {
    case 'DEVICE_GATEWAY':
        deviceTypeString = "DEVICE";
        break;
    case 'DEVICE':
        deviceTypeString = "DEVICE";
        break;
    case 'EDGE_GATEWAY':
        deviceTypeString = "EDGE";
        break;
    case 'EDGE':
        deviceTypeString = "EDGE";
        break;
    default:
        deviceTypeString = deviceType;
        break;
  }
  return deviceTypeString;
}
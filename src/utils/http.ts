import Axios, { AxiosRequestConfig, AxiosInstance, AxiosPromise, AxiosInterceptorManager, AxiosResponse } from 'axios';
import { omit } from 'lodash';
import { store } from '@/store/index';
import ls from '@/utils/ls';
import Message from '@/components/Message';
import { getPathProjectId } from './util';

let baseURL = import.meta.env.VITE_APP_BASE_URL;

if (import.meta.env.DEV) {
  baseURL = '/';
  // baseURL = 'http://10.0.195.115:8102'
}
interface IAxiosResponse <T=any> {
  code: number;
  data: T;
  msg: string;
}

interface IAxiosRequest extends AxiosRequestConfig {
  bizCode?: string;
  isMock?: boolean;
  url?: string;
  contentType?: string;
  isHideProjectId?: boolean;
}

interface IMyAxiosInstance extends AxiosInstance {
  (config: IAxiosRequest): AxiosPromise<IAxiosResponse>;
  interceptors: {
    request: AxiosInterceptorManager<AxiosRequestConfig>;
    response: AxiosInterceptorManager<AxiosResponse<IAxiosResponse>>;
  }
}

const MockBaseUrl = 'https://mock.apifox.cn/m1/1525914-0-default';

const http: IMyAxiosInstance = Axios.create({
  baseURL,
  timeout: 1000 * 60,
});

// Request interception (configure the information to send the request)
// 请求拦截（配置发送请求的信息）
http.interceptors.request.use(
  function (config: IAxiosRequest)  {
    const routeMeta: Record<string, any> = store.getState().user.routeMeta;
    const userInfo = ls.get('userInfo');

    config.headers = {
      ...config.headers,
    };
    if (userInfo) {
      config.headers.access_token = 'Bearer ' + userInfo.token;
    }
    if (routeMeta.title) {
      config.headers.pageName = routeMeta.pageName;
      config.headers.pageNameCode = routeMeta.title || '';
    }
    // if (config.isMock) {
    //   config.baseURL = MockBaseUrl;
    // }
    config.headers.projectId = getPathProjectId();

    const { headers, isHideProjectId, ...rest } = config;

    const finalConfig = { ...rest, headers: isHideProjectId ? omit(headers, ['projectId']) : headers };

    return finalConfig;
  },
  function (error) {
    // 请求失败的处理
    return Promise.reject(error);
  }
);

// Response interception (configure the information returned from the request)
// 响应拦截（配置请求回来的信息）
http.interceptors.response.use(
  function (response) {
    
    const res = response.data;
    if ([901, 902, 903, 904].includes(res.code)) {
      // token 过期，被顶掉
      const msg = res.msg || '';
      Message.pop({
        type: 'error',
        message: msg
      });
      setTimeout(() => {
        ls.delete('userInfo');
        // 强制刷新是为了清除缓存
        // A flush is forced to clear the cache
        window.location.href = '/login?path=' + encodeURIComponent(location.pathname);
      }, 1000);
    } else if (res.code === 905) {
      // permission denied
      const msg = res.msg || '';
      Message.pop({
        type: 'error',
        message: msg
      });
      setTimeout(() => {
        window.location.href = '/myProject/list';
      }, 1000);
    } else if (res.code && res.code !== 200) {
      const msg = res.msg || '';
      Message.pop({
        type: 'error',
        message: msg
      });
    }
    return response;
  },
  error => {
    const { config, request } = error || {};
    if (request.status == 502) {
      Message.pop({
        type: 'error',
        message: 'API 502'
      });
      return Promise.resolve({
        error: '未知错误',
        data: {}
      });
    }
    if (request.status == 504) {
      Message.pop({
        type: 'error',
        message: 'API 504'
      });
      return Promise.resolve({
        error: '服务器错误',
        data: {}
      });
    }
    if (request.status === 401) {
      return Promise.resolve({
        error: '登录已过期，请重新登录',
        data: {}
      });
    }
    if (!navigator.onLine) {
      return Promise.resolve({
        error: '当前网络不给力，请检查网络',
        data: {}
      });
    }
    return Promise.resolve({
      error: '未知错误',
      data: {}
    });
  }
);

const base = function (config: IAxiosRequest) {
  return new Promise <IAxiosResponse>((resolve, reject) => {
    http(config).then(res => {
      resolve(res.data);
    }).catch(error => {
      reject(error);
    });
  });
};

export function qsFormData (data: any) {
  const params = new FormData();
  //你要传给后台的key-value对
  Object.keys(data).forEach(key => {
    if (data[key]) {
      console.log('key', key, data[key]);
      params.append(key, data[key]);
    }
  });
  return params;
}

export default base;

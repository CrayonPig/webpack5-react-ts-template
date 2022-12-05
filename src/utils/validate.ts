export const mobileReg = /^1(2|3|4|5|6|7|8|9)\d{9}$/;
export const emailReg = /^[a-zA-Z0-9_.-]+@[a-zA-Z0-9-]+(\\.[a-zA-Z0-9-]+)*\.[a-zA-Z0-9]{2,6}$/;
export const mobuleOrEmailReg = /(^1(2|3|4|5|6|7|8|9)\d{9}$)|(^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$)/;
export const landline = /^((0\d{2,3})-)?(\d{7,8})(-(\d{3,}))?$/;
export const doubleNumberReg = /^[-+]?\d+(\.\d+)?$/;
export const chineseReg = /^[\u0391-\uFFE5]+$/;
export const number1Reg = /^\d+$/;
export const englishReg = /^[A-Za-z]+$/;
export const priceReg = /(^[1-9][0-9]{0,7}$)|(^((0\.0[1-9]$)|(^0\.[1-9]\d?)$)|(^[1-9][0-9]{0,7}\.\d{1,2})$)/;
// 电话字段，校验数字和-
export const phoneOtherReg = /^[0-9-]*$/;
// 0.0.1 => 99.99.99
export const versionReg = /^([1-9]\d{1,2}|\d)(.([1-9]\d{1,2}|\d))(.([1-9]\d{1,2}|\d))$/;
export const pwdReg = /^[!|@|#|\$|\%|\^|&|\*|\(|\)|_|\+|\-|=|\[|\]|{|}|\||\']/; 
// 特殊字符
export const specialReg = /[`~!@#$%^&*()_+<>?:"{},.\/;'[\]]/im;
// 网页
export const urlReg = /^((http|ftp|https):\/\/)(([a-zA-Z0-9._-]+\.[a-zA-Z]{2,6})|([0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}))(:[0-9]{1,4})*(\/[a-zA-Z0-9&%_./-~-]*)?/;
// 微信公众号
export const wxUrlReg = /^https:\/\/mp.weixin.qq.com/;

export const numberAndLowercaseAndSpecialReg = /^[\da-zA-z!@#$%^&\*()_+-=\[\]{}|']+$/;

export const numberAndLowercaseReg = /^[a-z0-9]+$/;
export const numberAndLetterReg = /^[a-zA-Z0-9_]+$/;
export const isValidUsername = (str: string) => ['admin', 'editor'].indexOf(str.trim()) >= 0;

export const isExternal = (path: string) => /^(https?:|mailto:|tel:)/.test(path);

export const isPhone = (str: string) => /^[0-9]\d{3,16}$/.test(str);
// 座机
export const isLandline = (str: string) => /^[0-9]\d{3,9}$/.test(str);
export const isEmail = (str: string) => emailReg.test(str);
// 2位小数
export const isNumber2 = (str: string) => /^\d+(\.\d{1,2})?$/.test(str);
// 正整数
export const isNumber = (str: string) => /^[1-9]\d*$/.test(str);
// 中英文和数字
export const isName = (str: string) => /^[\u0391-\uFFE5a-zA-Z0-9]+$/.test(str);
export const isChinese = (str: string) => /^[\u0391-\uFFE5]+$/.test(str);
// 英文和数字和点
export const isLoginName = (str: string) => /^[a-zA-Z0-9.]+$/.test(str);
export const isNumberAndLowercase = (str: string) => numberAndLowercaseReg.test(str);
// url
export const isUrl = (str: string) => urlReg.test(str);
export const isPassword = (str: string) => /([A-Za-z])+/.test(str);
export const isMobile = (str: string) => /^1(2|3|4|5|6|7|8|9)\d{9}$/.test(str);
export const isAlias = (str: string) => /^[a-zA-Z]+[a-zA-Z0-9_]*$/.test(str);

// 密码校验
export const isPwdLength = (str: string) => /^[\D\d]{8,20}$/.test(str); // 8-20位任意字符
// export const isCapitalLetter = (str: string) => /^[\D\d]{8,20}$/.test(str); // 大写字母
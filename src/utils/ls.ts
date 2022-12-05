export default {
  /**
   * @param key (String)
   * @param val (String)
   */
  set (key: string, val: any) {
    const myVal = JSON.stringify(val);
    window.localStorage.setItem(key, myVal);
    return true;
  },
  /**
   * @param key (String)
   * @param value (String)
   */
  get (key: string) {
    const myVal = window.localStorage.getItem(key);

    if (myVal) {
      return JSON.parse(myVal);
    } else {
      return '';
    }
  },
  /**
   * @param key (String)
   */
  delete (key: string) {
    return window.localStorage.removeItem(key);
  },
  clear () {
    return window.localStorage.clear();
  }
};

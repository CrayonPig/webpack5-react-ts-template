interface IAddLang {
  key: string,
  lang: Record<string, string>
}

export const addLang = (origin: Record<string, string>, add : IAddLang,) => {
  // 统一增加语言包作用域前缀，如login.password
  // Add language pack scope prefixes such as login.password
  const { key, lang } = add;

  Object.keys(lang).forEach((langKey: string) => {
    origin[key + '.' + langKey] = lang[langKey];
  });
};
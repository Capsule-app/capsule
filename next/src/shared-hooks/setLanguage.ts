export const setLanguage = (func: Function, language: string) => {
  if (!window) return;
  
  func(language);
  localStorage.setItem("lang", language);
}
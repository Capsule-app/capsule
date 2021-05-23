import { isClient } from "lib/constants";

export const setLanguage = (func: Function, language: string) => {
  if (!isClient()) return;

  func(language);
  localStorage.setItem("lang", language);
};

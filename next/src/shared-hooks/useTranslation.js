import { useContext } from "react";
import { LanguageContext, defaultLocale } from "../lib/translations";
import { Languages } from "../lib/lang";

export function useTranslation() {
  const [locale] = useContext(LanguageContext);

  function t(key) {
    if (key.includes(".")) {
      var splitKey = key.split(".");
      if (!Languages[locale][splitKey[0]])
        return console.warn(
          `No string '${splitKey[0]}' for locale '${locale}'`
        );

      return (
        Languages[locale][splitKey[0]][splitKey[1]] ||
        Languages[defaultLocale][splitKey[0]][splitKey[1]] ||
        ""
      );
    }

    if (!Languages[locale][key]) {
      console.warn(`No string '${key}' for locale '${locale}'`);
    }

    return Languages[locale][key] || Languages[defaultLocale][key] || "";
  }

  return { t, locale };
}

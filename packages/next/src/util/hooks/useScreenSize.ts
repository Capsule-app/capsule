import { createMedia } from "@artsy/fresnel";

export const { MediaContextProvider, Media } = createMedia({
  breakpoints: {
    sm: 0,
    md: 1050,
    lg: 1250,
    xl: 1550,
  },
});

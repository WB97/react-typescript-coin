import "styled-components";

// and extend them!
declare module "styled-components" {
  export interface DefaultTheme {
    bgColor: string;
    textColor: string;
    accentColor?: string;
    linkHoverColor?: string;
    boxColor?: string;
    rankColor?: string;
  }
}

declare module '*/variables.json' {
  interface Data {
    breakpoints: {
      xs: 600;
      sm: 769;
      md: 1000;
      lg: 1200;
      xl: 1366;
    };
    colors: {
      [key: string]: {
        [key: string]: string;
      };
    };
    fontFamily: {
      [key: string]: string[];
    };
    zIndex: {
      [key: string]: number;
    };
  }
  const value: Data;
  export default value;
}

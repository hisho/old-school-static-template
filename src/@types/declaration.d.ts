declare module '*.scss';

declare let process: {
  env: {
    NODE_ENV: 'development' | 'production';
    FROM_POST: string;
  };
};

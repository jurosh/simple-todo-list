declare module '*.png' {
  const value: any;
  export = value;
}

declare module 'react-native-image-preview' {
  const value: any;
  export = value;
}

type GetReturnedType<T> = T extends ((...args: any[]) => infer R) ? R : T;

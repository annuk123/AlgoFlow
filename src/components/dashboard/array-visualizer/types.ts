export type BaseArrayElement = {
  value: string | number;
  id: string;
  active?: boolean;
  error?: boolean;
};
export type ArrayElement = BaseArrayElement;
export type Array2DElement = BaseArrayElement;
export type Array3DElement = BaseArrayElement;
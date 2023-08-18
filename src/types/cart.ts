export interface SelectedProduct {
  brand: string;
  id: string;
  name: string;
  price: number;
  count: number;
}

export enum CartAction {
  Add,
  AdjustQuantity,
  Clear,
}

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

export interface Product {
	category: number;
	brand: string;
	id: string;
	name: string;
	price: number;
	img: string;
}
import {SelectedProduct, CartAction } from "../types/cart";

export const manageCart = (cart: SelectedProduct[]=[], action: CartAction, payload?: any): SelectedProduct[] => {
  switch (action) {
    case CartAction.Add: {
      const productToAdd: SelectedProduct = payload;
      const existingProduct = cart?.find(item => item.id === productToAdd.id);
      if (existingProduct) {
        // 商品已存在，更新数量
        existingProduct.count += 1;
      } else {
        // 商品不存在，添加到购物车
        cart.push({ ...productToAdd, count: 1 });
      }
      break;
    }
    case CartAction.AdjustQuantity: {
      const { productId, newQuantity } = payload;
			if(!cart) {
				return []
			}
      return cart.map(item => {
        if (item.id === productId) {
          return { ...item, count: newQuantity };
        }
        return item;
      });
    }
    case CartAction.Clear: {
      return [];
    }
    default:
      break;
  }
	
  return cart ? [...cart]: [];
}
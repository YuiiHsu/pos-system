import { SelectedProduct, CartAction } from "../types/cart";

export const manageCart = (cart: SelectedProduct[] = [], action: CartAction, payload?: any): SelectedProduct[] => {
  let updatedCart: SelectedProduct[] = [];

  switch (action) {
    case CartAction.Add: {
      const productToAdd: SelectedProduct = payload;
      const existingProduct = cart?.find(item => item.id === productToAdd.id);
      if (existingProduct) {
        existingProduct.count += 1;
      } else {
        cart.push({ ...productToAdd, count: 1 });
      }
      updatedCart = [...cart];
      break;
    }
    case CartAction.AdjustQuantity: {
      const { productId, newCount } = payload;

      if (newCount < 1) {
        updatedCart = cart.filter(item => item.id !== productId);
      } else {
        updatedCart = cart.map(item => {
          if (item.id === productId) {
            return { ...item, count: newCount };
          }
          return item;
        });
      }
      break;
    }
    case CartAction.Clear: {
      updatedCart = [];
      break;
    }
    default:
      updatedCart = [...cart];
      break;
  }

  localStorage.setItem('cart', JSON.stringify(updatedCart));

  return updatedCart;
};





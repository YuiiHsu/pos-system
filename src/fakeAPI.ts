import {SelectedProduct}from"./types/cart";

export const fetchProductFromDatabase = async (productId: string): Promise<SelectedProduct | null> => {
  const product: SelectedProduct = 
    { id: 'DV1292763', brand: '第一饗宴', name: '無穀低敏 雞肉藍莓全犬配方(小顆粒) (2.3公斤*2包)', price: 980, count:1 }

  return product || null;
};
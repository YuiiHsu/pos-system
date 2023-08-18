import React, { useState } from 'react';
import CartItems from '../../components/CartItems/CartItems';
import styles from './Cart.module.css';
import {SelectedProduct} from"../../types/cart";
import { Button, Typography } from '@mui/material';

interface ChildProps {
  handleCartPage:  (isOpen:boolean ) => void; 
  handleBillPage:  (isOpen:boolean ) => void; 
	cart: SelectedProduct[]|[],
	clearCart: () => void; 
	adjustCartItemQuantity: (productId: string, newQuantity: number) => void; 
}

function Cart(props: ChildProps) { 
  const { handleCartPage, handleBillPage, cart, clearCart, adjustCartItemQuantity } = props;
	const items: SelectedProduct[] = cart;

  const cartItems: SelectedProduct[] = Array.isArray(cart) ? cart : [];
  const totalPrice: number = cartItems.reduce(
    (sum: number, product: SelectedProduct) => sum + product.price * product.count,
    0
  );

  return (
    <div className={styles.cartContainer}>
      <div className={styles.headerAndTitle}>
        <div className={styles.header}>
          <Button onClick={() => handleCartPage(false)}>
            縮小購物車
          </Button>
          <Button 
						variant="outlined" 
						className={styles.clearCartButton}
						onClick={() => {clearCart()}}>
            清空
          </Button>
        </div>
        <Typography className={styles.cartTitle}>當前購物車</Typography>
      </div>

      <CartItems items={items} adjustCartItemQuantity={adjustCartItemQuantity} />

      {/* TODO 折扣 */}
      <div className={styles.discount}>
        <Typography>折扣</Typography>
        <Typography>0</Typography>
      </div>
      <div className={styles.total}>
        <Typography>總計</Typography>
        <Typography>{totalPrice}</Typography>
      </div>
      <div className={styles.cartButtons}>
        <Button 
					className={styles.nextButton}
					onClick={() => {
						handleCartPage(false);
						handleBillPage(true);
						}} >下一步</Button>
      </div>
    </div>
  );
}

export default Cart;
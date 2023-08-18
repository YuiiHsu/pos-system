import React, { useState } from 'react';
import { Button, Typography } from '@mui/material';
import CartItems from '../../components/CartItems/CartItems';
import styles from './Cart.module.css';
import { useNavigate } from 'react-router-dom';
import {SelectedProduct} from"../../types/cart";

interface Item {
  id: string;
  brand: string;
  name: string;
  price: number;
}
interface ChildProps {
  setShowCart: React.Dispatch<React.SetStateAction<boolean>>
	cart: SelectedProduct[]|[]
}

function Cart(props: ChildProps) { 
	const navigate = useNavigate();
  const { setShowCart, cart } = props;
	const items: SelectedProduct[] = cart;

  return (
    <div className={styles.cartContainer}>
      <div className={styles.headerAndTitle}>
        <div className={styles.header}>
          <Button onClick={() => setShowCart(false)}>
            縮小購物車
          </Button>
          <Button variant="outlined" className={styles.clearCartButton}>
            清空
          </Button>
        </div>
        <Typography className={styles.cartTitle}>當前購物車</Typography>
      </div>

      <CartItems items={items} />

      {/* TODO 折扣 */}
      <div className={styles.discount}>
        <Typography>折扣</Typography>
        <Typography>0</Typography>
      </div>
      <div className={styles.total}>
        <Typography>總計</Typography>
        <Typography>總金額</Typography>
      </div>
      <div className={styles.cartButtons}>
        <Button 
					className={styles.nextButton}
					onClick={() => {
						setShowCart(false)
						navigate('/bill');
						}} >下一步</Button>
      </div>
    </div>
  );
}

export default Cart;
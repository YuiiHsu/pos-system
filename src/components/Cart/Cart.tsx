import React from 'react';
import { Button, Typography } from '@mui/material';
import CartItems from '../../components/CartItems/CartItems';
import styles from './Cart.module.css'; // 引入外部的 CSS 文件
import { useNavigate } from 'react-router-dom';

interface Item {
  id: string;
  brand: string;
  name: string;
  price: number;
}
interface ChildProps {
  setShowCart: React.Dispatch<React.SetStateAction<boolean>>;
}

function Cart(props: ChildProps) { 
	const navigate = useNavigate();
  const { setShowCart } = props;
	const items: Item[] = [
		{ id: 'DV1292763', brand: '第一饗宴', name: '無穀低敏 雞肉藍莓全犬配方(小顆粒) (2.3公斤*2包)', price: 980 },
		{ id: 'HW2903117', brand: '瑞威', name: '室內犬低敏配方', price: 900 },
	];

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
import React from 'react';
import { Button, Grid, Typography } from '@mui/material';
import { styled } from '@mui/system';

const CartItemsContainer = styled('div')({
  height: 'calc(100% - 360px)',
  padding: '10px 0',
});

const CartItem = styled('div')({
	display: 'flex',
	flexDirection: 'column',
	justifyContent: 'space-between',
	alignItems: 'center',
	borderBottom: '1px solid #7BAA3C',
	borderRadius: '5px',
	padding: '10px 0',
});

const BrandAndCode = styled('div')({
	display: 'flex',
	justifyContent: 'space-between',
	width: '100%',
	padding: '0 10px',
});


interface Item {
  id: string;
  brand: string;
  name: string;
  price: number;
}

interface CartItemsProps {
  items: Item[];
}

function CartItems({ items }: CartItemsProps) {
  return (
    <CartItemsContainer>
      {items.map((item) => (
        <CartItem key={item.id}>
          <BrandAndCode>
            <div>
              <Typography>{item.brand}</Typography>
              <Typography>{item.name}</Typography>
            </div>
            <Typography>{item.id}</Typography>
          </BrandAndCode>
          <Grid sx={{ display: 'flex', justifyContent: 'end', width: '100%' }}>
            <Button>-</Button>
            <Typography>{item.price}</Typography>
            <Button>+</Button>
          </Grid>
        </CartItem>
      ))}
    </CartItemsContainer>
  );
}

export default CartItems;


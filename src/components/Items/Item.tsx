import React from 'react';
import { Button, Grid } from '@mui/material';

interface ItemProps {
	item: { id: string; brand: string; name: string; price: number, img: string };
}

const Item: React.FC<ItemProps> = ({ item }) => {
	return (
		<Grid item xs={3} sx={{ display: 'flex', marginBottom: '30px' }}>
			<div
				style={{
					border: '1px solid #7BAA3C',
					padding: 10,
					boxSizing: 'border-box',
					width: '350px',
					height: '200px',
					display: 'flex',
					flexDirection: 'column',
					position: 'relative',
					borderRadius: '5px'
				}}
			>
				<Grid container spacing={2}>
					<Grid item xs={4} sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
						<img src={item.img} alt={item.name} style={{ maxWidth: '100%', maxHeight: '100%' }} />
					</Grid>
					<Grid item xs={8}>
						<Grid container direction="column" spacing={2}>
							<Grid
								item
								sx={{
									borderBottom: '1px solid #B3B3B3',
									paddingBottom: '8px',
								}}
							>
								{item.brand}
							</Grid>
							<Grid item>
								{item.name}
							</Grid>
						</Grid>
					</Grid>
				</Grid>
				<Grid
					container
					justifyContent="space-between"
					alignItems="center"
					style={{ marginTop: '8px' }}
				>
					<Grid item>
						貨號： {item.id}
					</Grid>
					<Grid item sx={{ fontSize: '24px' }}>
						${item.price}
					</Grid>
				</Grid>
				{/* 垂直3 (高是1/3) */}
				<div style={{ marginTop: 'auto', alignSelf: 'flex-end', width: '100%' }}>
					<Button
						variant="contained"
						sx={{
							width: '100%',
							background: '#7BAA3C',
							color: '#FFFFFF',
							borderRadius: 0
						}}
					>
						加入購物車
					</Button>
				</div>
			</div>
		</Grid>
	);
};
export default Item;
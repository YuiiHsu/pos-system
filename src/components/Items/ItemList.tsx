import React from 'react';
import Item from './Item';
import { Product } from "../../types/cart";import 
{ Grid } from '@mui/material';
import { FixedSizeList, ListChildComponentProps } from 'react-window';

interface Item {
	id: string; brand: string; name: string; price: number, img: string 
}

interface ItemListProps {
	items: Array<Product>;
	addToCart: (selectedItem:Product ) => void; 
}

const ItemList: React.FC<ItemListProps> = ({ items, addToCart }) => {
	type RenderRowProps = ListChildComponentProps;
	
	return (
		<FixedSizeList
			height={500} 
			width="100%"
			itemCount={items.length}
			itemSize={200}
		>
			{({ index }: RenderRowProps) => (
				<Grid container spacing={2}>
				{items.slice(index * 4, index * 4 + 4).map((item) => (
					<Grid item xs={3} key={item.id}>
						<Item item={item} addToCart={addToCart} />
					</Grid>
				))}
			</Grid>
			)}
		</FixedSizeList>
	);
};

export default ItemList;





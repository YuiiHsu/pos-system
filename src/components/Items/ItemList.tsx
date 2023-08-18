import React from 'react';
import Item from './Item';
import { FixedSizeList, ListChildComponentProps } from 'react-window';
import { Product } from "../../types/cart";

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
			height={500} // 列表的高度
			width="100%" // 列表的寬度
			itemCount={items.length} // 資料的數量
			itemSize={200} // 每個項目的高度，根據你的實際需要調整
		>
			{({ index, style }: RenderRowProps) => (
				<div onClick={() => addToCart(items[index])}>
					<Item item={items[index]} />
				</div>
			)}
		</FixedSizeList>
	);
};

export default ItemList;





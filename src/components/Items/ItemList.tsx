import React from 'react';
import Item from './Item';
import style from './itemList.module.css';

interface ItemListProps {
	items: Array<{ id: string; brand: string; name: string; price: number, img: string }>;
}

const ItemList: React.FC<ItemListProps> = ({ items }) => {
	return (
		<div className={style.listContainer}>
			{items.map((item) => (
				<Item
					key={item.id}
					item={item} />
			))}
		</div>
	);
};

export default ItemList;





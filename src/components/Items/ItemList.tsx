import React from 'react';
import Item from './Item';
import { FixedSizeList, ListChildComponentProps } from 'react-window';
import { styled } from '@mui/system';

interface ItemListProps {
	items: Array<{ id: string; brand: string; name: string; price: number, img: string }>;
}

const ItemList: React.FC<ItemListProps> = ({ items }) => {
	type RenderRowProps = ListChildComponentProps;
	return (
<FixedSizeList
  height={500} // 列表的高度
  width="100%" // 列表的寬度
  itemCount={items.length} // 資料的數量
  itemSize={200} // 每個項目的高度，根據你的實際需要調整
>
  {({ index, style }: RenderRowProps) => (

      <Item item={items[index]} />
  )}
	</FixedSizeList>
	);
};

export default ItemList;





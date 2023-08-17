"use client";
import React, { useState, useEffect, useRef } from 'react';
import Cart from '@/components/Cart/Cart';
import Header from '@/components/Header/Header';
import ItemList from '@/components/Items/ItemList';
import CategoryButton from '@/components/Categories/CategoryButton';
import { Box } from '@mui/material';
import { Grid } from '@mui/material';
import { styled } from '@mui/system';
import faker from "faker";

export interface Category {
	id: number;
	name: string;
}

interface Product {
	category: number;
	brand: string;
	id: string;
	name: string;
	price: number;
	img: string;
}

const ShowCartButton = styled('button')({
	width: '125px',
	height: '65px',
	position: 'fixed',
	top: '20px',
	right: '20px',
	zIndex: 100,
	backgroundColor: '#7BAA3C',
	color: '#FFFFFF',
	border: '1px solid #7BAA3C',
	borderRadius: '5px'
});

function Pos() {
	const [showCart, setShowCart] = useState(false);
	const [selectedCategory, setSelectedCategory] = useState<number>(0)
	const [searchInput, setSearchInput] = useState('');
	const [totalItems, setTotalItems] = useState<Product[] | null>(null)
	const [items, setItems] = useState<Product[] | null>(null);
	// TODO: 可以改用 API 動態取得值，並且檢查如果商品列表有該ID的商品再顯示類別供選擇
	const categories = [
		{
			id: 0,
			name: "全部"
		}, {
			id: 1,
			name: "狗狗飼料"
		}, {
			id: 2,
			name: "貓咪零食"
		}, {
			id: 3,
			name: "寵物用品"
		}, {
			id: 4,
			name: "折扣優惠"
		}]

	/**
	 * TODO 回到首頁(當日結餘 紀錄 結帳人員 等等)
	 */
	const handleGoHome = () => {
	};

	/**
	 * 處理點擊到的類別資訊
	 * @param index 類別的id
	 */
	const handleCategoryClick = (index: number) => {
		setSelectedCategory(index);
		setSearchInput('');
	};

	/**
	 * 生成假資料
	 * @param count 資料筆數
	 * @returns 自動生成的假資料
	 */
	const generateFakeData = (count: number) => {
		const fakeData = [];

		for (let i = 0; i < count; i++) {
			const product: Product = {
				// 假設分類有五個
				category: faker.random.number(faker.random.number({ min: 1, max: 4 })),
				brand: faker.company.companyName(),
				id: faker.random.alphaNumeric(8),
				name: faker.commerce.productName(),
				price: faker.random.number({ min: 1, max: 1000 }),
				img: 'https://fakeimg.pl/300/'
			};

			fakeData.push(product);
		}

		setTotalItems(fakeData);
		setItems(fakeData);
		return;
	};

	if (!totalItems || totalItems.length < 1) {
		generateFakeData(10000);
	}

	/**
	 * 篩選搜尋的商品
	 * @param searchText 搜尋的文字
	 * @param totalItems 產品列表
	 * @returns 過濾過的商品列表
	 */
	const filteredItems = (searchText: string, category: number, totalItems: Product[] | null, currentItems: Product[] | null) => {
		if ((!totalItems || totalItems == null)) {
			return;
		}

		let filterData: Product[]|null=[];
		if( !searchText && category === 0){
			// 當前畫面的資料與所有資料一樣則不需要重新渲染
			if(currentItems === totalItems){
				return;
			}

			filterData = totalItems;
		}

		filterData = totalItems.filter(item => 
			item.id.toLowerCase().includes(searchText.toLowerCase()) && (item.category === 0 || item.category === category)
		);
		

		setItems(filterData);
	}

	useEffect(() => {
		filteredItems(searchInput, selectedCategory, totalItems, items)
	}, [searchInput, selectedCategory, totalItems])

	return (
		<Box sx={{ margin: '40px' }}>
			<Grid container alignItems="center" spacing={1}>
				{/* 回首頁 搜尋 */}
				<Grid item lg={12} marginBottom={5}>
					<Header onGoHome={handleGoHome} showCart={showCart} onSearchInputChange={setSearchInput} />
				</Grid>
				{/* 商品分類 */}
				<Grid item marginBottom={5}>
					<Grid container spacing={1} alignItems="center">
						<Grid item>
							<CategoryButton
								categories={categories}
								selectedCategory={selectedCategory}
								onClick={handleCategoryClick}
							/>
						</Grid>
					</Grid>
				</Grid>
				{/* 商品列表 */}
				{!items ? <></>
					: <ItemList items={items} />}
			</Grid>
			{/* 展開購物車 */}
			{showCart ?
				<Cart setShowCart={setShowCart} />
				: (
					<ShowCartButton onClick={() => { setShowCart(true) }}>
						展開購物車
					</ShowCartButton>
				)}
		</Box>
	);
}

export default Pos;
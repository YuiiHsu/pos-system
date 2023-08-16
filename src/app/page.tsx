"use client";
import React, { useState } from 'react';
import Header from '@/components/Header/Header';
import ItemList from '@/components/Items/ItemList';
import CategoryButton from '@/components/Categories/CategoryButton';
import style from './page.module.css';
import { Button, TextField } from '@mui/material';

import { Box } from '@mui/material';
import { Grid } from '@mui/material';

function Home() {
	const [showCart, setShowCart] = useState(false);
	const [selectedCategory, setSelectedCategory] = useState<number | null>(0);

	/**
	 * 回到首頁(當日結餘 紀錄 結帳人員 等等)
	 */
	const handleGoHome = () => {
		console.log('Go back to home page');
	};

	/**
	 * 處理點擊到的類別資訊
	 * @param index 
	 */
	const handleCategoryClick = (index: number) => {
		setSelectedCategory(index);
	};

	const items = [
		{ id: 'DV1292763', brand: '第一饗宴', name: '無穀低敏 雞肉藍莓全犬配方(小顆粒) (2.3公斤*2包)', price: 980, img: 'https://fakeimg.pl/300/' },
		{ id: 'HW2903117', brand: '瑞威', name: '室內犬低敏配方', price: 900, img: 'https://fakeimg.pl/300/' },
		{ id: 'DV1292763', brand: '第一饗宴', name: '無穀低敏 雞肉藍莓全犬配方(小顆粒) (2.3公斤*2包)', price: 980, img: 'https://fakeimg.pl/300/' },
		{ id: 'HW2903117', brand: '瑞威', name: '室內犬低敏配方', price: 900, img: 'https://fakeimg.pl/300/' },
		{ id: 'DV1292763', brand: '第一饗宴', name: '無穀低敏 雞肉藍莓全犬配方(小顆粒) (2.3公斤*2包)', price: 980, img: 'https://fakeimg.pl/300/' },
		{ id: 'HW2903117', brand: '瑞威', name: '室內犬低敏配方', price: 900, img: 'https://fakeimg.pl/300/' },
		{ id: 'DV1292763', brand: '第一饗宴', name: '無穀低敏 雞肉藍莓全犬配方(小顆粒) (2.3公斤*2包)', price: 980, img: 'https://fakeimg.pl/300/' },
		{ id: 'DV1292763', brand: '第一饗宴', name: '無穀低敏 雞肉藍莓全犬配方(小顆粒) (2.3公斤*2包)', price: 980, img: 'https://fakeimg.pl/300/' },
		{ id: 'HW2903117', brand: '瑞威', name: '室內犬低敏配方', price: 900, img: 'https://fakeimg.pl/300/' },
		{ id: 'DV1292763', brand: '第一饗宴', name: '無穀低敏 雞肉藍莓全犬配方(小顆粒) (2.3公斤*2包)', price: 980, img: 'https://fakeimg.pl/300/' },
		{ id: 'HW2903117', brand: '瑞威', name: '室內犬低敏配方', price: 900, img: 'https://fakeimg.pl/300/' },
		{ id: 'DV1292763', brand: '第一饗宴', name: '無穀低敏 雞肉藍莓全犬配方(小顆粒) (2.3公斤*2包)', price: 980, img: 'https://fakeimg.pl/300/' },
		{ id: 'HW2903117', brand: '瑞威', name: '室內犬低敏配方', price: 900, img: 'https://fakeimg.pl/300/' },
		{ id: 'DV1292763', brand: '第一饗宴', name: '無穀低敏 雞肉藍莓全犬配方(小顆粒) (2.3公斤*2包)', price: 980, img: 'https://fakeimg.pl/300/' },
		{ id: 'HW2903117', brand: '瑞威', name: '室內犬低敏配方', price: 900, img: 'https://fakeimg.pl/300/' },
	];
	const categories = ['Category 1', 'Category 2', 'Category 3', 'Category 4'];

	return (
		<Box sx={{ margin: '40px' }}>
			<Grid container alignItems="center" spacing={1}>
				{/* 回首頁 搜尋 */}
				<Grid item lg={12} marginBottom={5}>
					<Header onGoHome={handleGoHome} showCart={showCart} />
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
				<Grid item xs={12}>
					<ItemList items={items} />
				</Grid>
			</Grid>

			{/* 展開購物車 */}
			{!showCart && (
				<div
					style={{
						position: 'sticky',
						top: 0,
						right: 0,
						alignSelf: 'flex-start',
						zIndex: 100, // 設定一個 z-index 值，確保按鈕在其他內容之上
					}}
				>
					<Button
						variant="outlined"
						// onClick={onGoHome} 
						className={style.showCartButton}
					>
						展開購物車
					</Button>
				</div>
			)}
		</Box>
	);
}

export default Home;
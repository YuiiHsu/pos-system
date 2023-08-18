import React, { useState } from 'react';
import { Button, Grid, TextField } from '@mui/material';
import style from './header.module.css';
import { styled } from '@mui/system';

interface HeaderProps {
	onGoHome: () => void;
	showCart: boolean;
	onSearchInputChange: (input: string) => void;
}

const Header: React.FC<HeaderProps> = ({ onGoHome, showCart, onSearchInputChange }) => {
	const [searchInput, setSearchInput] = useState('');

	/**
	 * 處理 Search 欄位的輸入文字
	 */
	const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		setSearchInput(event.target.value);
	};

	/**
	 * 過濾商品
	 */
	const handleSearch = (event: React.MouseEvent<HTMLButtonElement>) => {
		// 需求：使用非同步的方式模擬從資料庫查詢商品資料的情況
		// try {
		//   const filteredProducts = await fetchProductsByKeyword(searchInput);
		//   onSearchInputChange(searchInput, filteredProducts);
		// } catch (error) {
		//   console.error("查询商品出错，请重试");
		// }
		onSearchInputChange(searchInput);
	}

	return (
		<Grid container spacing={2} alignItems="center" justifyContent="start" >
			{/* 回首頁按鈕 */}
			<Grid item>
				<button className={style.homeButton} onClick={onGoHome}>
					回首頁
				</button>
			</Grid>

			{/* 搜尋框 */}
			<Grid item>
				<TextField
					label="Search"
					variant="outlined"
					fullWidth
					onChange={handleSearchChange}
					value={searchInput}
					className={`${style.search} ${style.additionalClass}`}
				/>
			</Grid>
			<Grid item>
				<button className={style.showCartButton} onClick={handleSearch}>
					搜尋
				</button>
			</Grid>
		</Grid>
	);
};

export default Header;
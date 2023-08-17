import React, { useState } from 'react';
import { Button, Grid, TextField } from '@mui/material';
import style from './header.module.css';
import { styled } from '@mui/system';

const HomeButton = styled('button')({
	border: '1px solid  #003E33',
	width: '125px',
	height: '65px',
	backgroundColor: '#003E33',
	color: '#FFFFFF',
	borderRadius: '5px'
});

const Search = styled(TextField)({
	marginLeft: '50px',
	width: '900px',
	height: '65px'
});

const SearchButton = styled('button')({
	backgroundColor: '#FFFFFF',
	border: '3px solid #7BAA3C',
	width: '125px',
	height: '50px',
	borderRadius: '5px'
});


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
		onSearchInputChange(searchInput);
	}

	return (
		<Grid container spacing={2} alignItems="center" justifyContent="start" >
			{/* 回首頁按鈕 */}
			<Grid item>
				<HomeButton
					onClick={onGoHome}
				>
					回首頁
				</HomeButton>
			</Grid>

			{/* 搜尋框 */}
			<Grid item>
				<Search
					label="Search"
					variant="outlined"
					fullWidth
					onChange={handleSearchChange}
					value={searchInput}
					className={style.search}
				/>
			</Grid>
			<Grid item>
				<SearchButton onClick={handleSearch}>搜尋</SearchButton>
			</Grid>
		</Grid>
	);
};

export default Header;
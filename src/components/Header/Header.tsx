import React from 'react';
import { Button, Grid, TextField } from '@mui/material';
import style from './header.module.css';

interface HeaderProps {
	onGoHome: () => void;
	showCart: boolean;
}

const Header: React.FC<HeaderProps> = ({ onGoHome, showCart }) => {
	return (
		<Grid container spacing={2} alignItems="center" justifyContent="start" >
			{/* 回首頁按鈕 */}
			<Grid item>
				<Button
					variant="outlined"
					onClick={onGoHome}
					className={style.homeButton}
				>
					回首頁
				</Button>
			</Grid>

			{/* 搜尋框 */}
			<Grid item>
				<TextField
					label="Search"
					variant="outlined"
					fullWidth
					// onChange={handleSearch}
					className={style.search}
				/>
			</Grid>
		</Grid>
	);
};

export default Header;
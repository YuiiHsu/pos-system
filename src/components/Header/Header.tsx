import React from 'react';
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

interface HeaderProps {
	onGoHome: () => void;
	showCart: boolean;
}

const Header: React.FC<HeaderProps> = ({ onGoHome, showCart }) => {
	return (
		<Grid container spacing={2} alignItems="center" justifyContent="start" >
			{/* 回首頁按鈕 */}
			<Grid item>
				<HomeButton
					// variant="outlined"
					onClick={onGoHome}
					// className={style.homeButton}
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
					// onChange={handleSearch}
					className={style.search}
				/>
			</Grid>
		</Grid>
	);
};

export default Header;
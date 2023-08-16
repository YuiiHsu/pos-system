import React from 'react';
import { Button, Grid, TextField } from '@mui/material';
import style from './header.module.css';

interface HeaderProps {
	onGoHome: () => void;
	showCart: boolean;
}

const Header: React.FC<HeaderProps> = ({ onGoHome, showCart }) => {
	return (
		<Grid container spacing={2} alignItems="center" justifyContent="space-between" >
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

			{/* 展開購物車按鈕，根據 showCart 的值來動態顯示或隱藏 */}
			{/* {!showCart && (
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
          onClick={onGoHome} 
          className={style.showCartButton}
        >
          展開購物車
        </Button>
      </div>
    )}
		 */}
		</Grid>
	);
};

export default Header;
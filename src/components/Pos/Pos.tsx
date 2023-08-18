"use client";
import React, { useState, useEffect } from 'react';
import Cart from '@/components/Cart/Cart';
import Header from '@/components/Header/Header';
import ItemList from '@/components/Items/ItemList';
import CategoryButton from '@/components/Categories/CategoryButton';
import { SelectedProduct, Product } from "../../types/cart";
import { manageCart } from '@/utils/cartUtils';
import style from "./post.module.css"
import CartDetail from '../CartDetail/CartDetail';
import { generateFakeData } from "../../utils/fakeData";
import { Box } from '@mui/material';
import { Grid } from '@mui/material';

export interface Category {
	id: number;
	name: string;
}

enum CartAction {
	Add,
	AdjustQuantity,
	Clear,
}

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
	}]

function Pos() {
	const [showCart, setShowCart] = useState<boolean>(false);
	const [showBill, setShowBill] = useState<boolean>(false);
	const [selectedCategory, setSelectedCategory] = useState<number>(0)
	const [searchInput, setSearchInput] = useState('');
	const [totalItems, setTotalItems] = useState<Product[] | null>(null)
	const [items, setItems] = useState<Product[] | null>(null);
	const [cart, setCart] = useState<SelectedProduct[] | []>([]);

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
	const generateFakeDatas = (count: number) => {
		const fakeData = generateFakeData(count)
		setTotalItems(fakeData);
		setItems(fakeData);
		return;
	};

	if (!totalItems || totalItems.length < 1) {
		generateFakeDatas(10000);
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

		let filterData: Product[] | null = [];
		if (!searchText && category === 0) {
			// 當前畫面的資料與所有資料一樣則不需要重新渲染
			if (currentItems === totalItems) {
				return;
			}

			filterData = totalItems;
		}

		filterData = totalItems.filter(item =>
			item.id.toLowerCase().includes(searchText.toLowerCase()) && (item.category === 0 || item.category === category)
		);

		setItems(filterData);
	}


	/**
	 * 添加商品
	 * @param selectedItem
	 */
	const addToCart = (selectedItem: Product) => {
		setCart(manageCart(cart, CartAction.Add, selectedItem));
		// 需求：加入商品時，如果從資料庫找不到該商品，就顯示錯誤訊息，使用非同步的方式模擬從資料庫查詢商品資料的情況
		// if (selectedItem) {
		// 	fetchProductFromDatabase(selectedItem.id)
		// 		.then((product: SelectedProduct | null) => {
		// 			if (!product) {
		// 				setErrorMsg("商品不存在");
		// 				return;
		// 			};

		// 			setCart(manageCart(cart, CartAction.Add, product));
		// 		})
		// 		.catch(error => {
		// 			setErrorMsg("查询商品出错，请重试");
		// 		})
		// }
	};

	/**
	 * 調整購物車數量
	 * @param productId 
	 * @param newQuantity 
	 */
	const adjustCartItemQuantity = (productId: string, newQuantity: number) => {
		const newCount = newQuantity < 0 ? 0 : newQuantity;
		setCart(manageCart(cart, CartAction.AdjustQuantity, { productId, newCount }));
	};

	/**
	 * 清空購物車
	 */
	const clearCart = () => {
		setCart(manageCart(cart, CartAction.Clear));
	};

	/**
	 * 處理購物車詳情頁面開關
	 * @param isOpen 是否開啟
	 */
	const handleBillPage = (isOpen: boolean) => {
		setShowBill(isOpen)
	}

	/**
	 * 處理右側購物車頁面開關
	 * @param isOpen 是否開啟
	 */
	const handleCartPage = (isOpen: boolean) => {
		setShowCart(isOpen)
	}

	useEffect(() => {
		filteredItems(searchInput, selectedCategory, totalItems, items)
	}, [searchInput, selectedCategory, totalItems])

	useEffect(() => {
		const savedCart = localStorage.getItem('cart');
		if (savedCart) {
			setCart(JSON.parse(savedCart));
		}
	}, [])

	return (<>
		<Box sx={{ margin: '40px' }}>
			{
				!showBill ?
					<Grid container alignItems="center" spacing={1}>
						{/* 回首頁 搜尋 */}
						<Grid item lg={12} marginBottom={5}>
							<Header onGoHome={handleGoHome} showCart={showCart} onSearchInputChange={setSearchInput} />
						</Grid>
						{/* 商品分類 */}
						<Grid item marginBottom={5}>
							<CategoryButton
								categories={categories}
								selectedCategory={selectedCategory}
								onClick={handleCategoryClick}
							/>
						</Grid>
						{/* 商品列表 */}
						{!items ? <></>
							: <ItemList items={items} addToCart={addToCart} />}
					</Grid>
					: <CartDetail handleBillPage={handleBillPage} cart={cart} clearCart={clearCart} />
			}
			{/* 展開購物車 */}
			{!showBill && (showCart ?
				<Cart
					handleCartPage={handleCartPage}
					handleBillPage={handleBillPage}
					cart={cart} clearCart={clearCart}
					adjustCartItemQuantity={adjustCartItemQuantity} />
				: (
					<button
						className={style.showCartButton}
						onClick={() => { setShowCart(true) }}>
						展開購物車（{cart.length}）
					</button>
				))}
		</Box>
	</>
	);
}

export default Pos;
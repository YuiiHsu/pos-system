import React, { useState} from 'react';
import { Dialog, DialogActions, DialogContent, DialogTitle, TextField, Typography, Button } from '@mui/material';
import style from './paymentDialog.module.css';

interface changeType {
	recieve: number,
	change: number
}

interface PaymentDialogProps {
	open: boolean;
	onClose: () => void;
	handleCompleted: () => void;
	handleChange: (amountInfo: changeType) => void;
	totalPrice: number;
}

const PaymentDialog: React.FC<PaymentDialogProps> = (props: PaymentDialogProps) => {
	const { open, onClose, handleCompleted, handleChange, totalPrice } = props;
	const [inputValue, setInputValue] = useState('0');
	const [change, setChange] = useState<number>(0);
	function finishedOrder() {
		const changeInfo: changeType = {
			change: change,
			recieve: parseInt(inputValue, 10)
		}
		handleChange(changeInfo);
		handleCompleted()
		onClose()
	}

	/**
	 * 計算找零
	 * @param total 總共應收 
	 * @param recieve 總共收了
	 * @returns 應找零多少
	 */
	function calculateChange(total: number, recieve: number) {
		const recieveAmount = recieve ? recieve : 0;
		setChange(recieveAmount - total);
	}

	/**
	 * 處理輸入的金額，檢查僅能正整數
	 */
	function handleInputChange(event: React.ChangeEvent<HTMLInputElement>) {
		const { value } = event.target;
		// TODO: utils 開一個正則的 ts，正則相關驗證統一放那
		setInputValue(/^\d*$/.test(value) ? value.toString() : '0');
		calculateChange(totalPrice, parseInt(value, 10))
	}


	return (
		<Dialog open={open} onClose={onClose} >
			<DialogTitle className={style.paymentDialogTitle}>請輸入使用者付款金額</DialogTitle>
			<DialogContent className={style.paymentDialogContent}>
				<div className={style.changeSection}>
					<Typography variant="subtitle1">總計</Typography>
					<Typography variant="subtitle1">{totalPrice} 台幣</Typography>
				</div>
				<TextField
					label="使用者支付金額"
					value={inputValue}
					onChange={handleInputChange}
					inputProps={{
						maxLength: 10,
					}}
					className={style.paymentAmountInput}
					InputProps={{
						placeholder: '請輸入使用者給的金額，僅能輸入正整數喔！！', // 设置 placeholder 提示信息
					}}
				/>
				<div className={style.changeSection}>
					<Typography variant="subtitle1">應找零</Typography>
					{
						totalPrice === parseInt(inputValue, 10) ?
							<Typography variant="subtitle1">{change} 台幣</Typography>
							: <Typography className={style.warningText} variant="subtitle1">{change} 台幣</Typography>
					}
				</div>
			</DialogContent>
			<DialogActions className={style.paymentDialogActions}>
				<Button onClick={onClose} className={style.cancelButton} color="primary">
					取消
				</Button>
				<Button onClick={() => finishedOrder()} className={style.confirmDialogButton} color="primary">
					完成交易
				</Button>
			</DialogActions>
		</Dialog>
	);
};

export default PaymentDialog;

import React, { useState, useRef, useEffect } from 'react';
import { Dialog, DialogActions, DialogContent, DialogTitle, TextField, Typography, Button } from '@mui/material';
import { styled } from '@mui/material/styles';

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

const CustomDialog = styled(Dialog)(({ theme }) => ({
	'& .MuiPaper-root': {
		border: '3px solid #7BAA3C',
		borderRadius: '5px',
		width: '400px',
	},
}));

const CustomDialogTitle = styled(DialogTitle)(({ theme }) => ({
	textAlign: 'center',
}));

const CustomDialogContent = styled(DialogContent)(({ theme }) => ({
	display: 'flex',
	flexDirection: 'column',
	gap: theme.spacing(2),
	padding: theme.spacing(3),
}));

const PaymentAmount = styled(TextField)(({ theme }) => ({
	width: '100%',
}));

const ChangeSection = styled('div')(({ theme }) => ({
	display: 'flex',
	justifyContent: 'space-between',
	alignItems: 'center',
}));

const CustomDialogActions = styled(DialogActions)(({ theme }) => ({
	justifyContent: 'space-between',
	padding: theme.spacing(2),
}));

const CancelButton = styled(Button)(({ theme }) => ({
	borderRadius: '5px',
	width: '45%',
	backgroundColor: '#B3B3B3',
	color: '#FFFFFF'
}));

const ConfirmDialogButton = styled(Button)(({ theme }) => ({
	borderRadius: '5px',
	width: '45%',
	backgroundColor: '#7BAA3C',
	color: '#FFFFFF'
}));

const WarningText = styled(Typography)(({ theme }) => ({
	color: '#FF0000',
	fontSize: '32px'
}));

const PaymentDialog: React.FC<PaymentDialogProps> = (props: PaymentDialogProps) => {
	const { open, onClose, handleCompleted, handleChange, totalPrice } = props;
	const [inputValue, setInputValue] = useState('0');
	const [change, setChange] = useState<number>(0);
	function finishedOrder() {
		const changeInfo:changeType = {
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
		setInputValue(/^\d*$/.test(value) ? value.toString() : '0');
		calculateChange(totalPrice, parseInt(value, 10))
	}


	return (
		<CustomDialog open={open} onClose={onClose}>
			<CustomDialogTitle>請輸入使用者付款金額</CustomDialogTitle>
			<CustomDialogContent>
				<ChangeSection>
					<Typography variant="subtitle1">總計</Typography>
					<Typography variant="subtitle1">{totalPrice} 台幣</Typography>
				</ChangeSection>
				<PaymentAmount
					label="使用者支付金額"
					value={inputValue}
					onChange={handleInputChange}
					inputProps={{
						maxLength: 10, // 可根据需要调整最大长度
					}}
					InputProps={{
						placeholder: '請輸入使用者給的金額，僅能輸入正整數喔！！', // 设置 placeholder 提示信息
					}}
				/>
				<ChangeSection>
					<Typography variant="subtitle1">應找零</Typography>
					{
						totalPrice === parseInt(inputValue, 10) ?
							<Typography variant="subtitle1">{change} 台幣</Typography>
							: <WarningText variant="subtitle1">{change} 台幣</WarningText>
					}
				</ChangeSection>
			</CustomDialogContent>
			<CustomDialogActions>
				<CancelButton onClick={onClose} color="primary">取消</CancelButton>
				<ConfirmDialogButton onClick={() => finishedOrder()} color="primary">完成交易</ConfirmDialogButton>
			</CustomDialogActions>
		</CustomDialog>
	);
};

export default PaymentDialog;

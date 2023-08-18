import React, { useState } from 'react';
import PaymentDialog from '../Payment/PaymentDialog';
import { SelectedProduct } from "../../types/cart";
import { Card,Button, Paper, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';


const BillContainer = styled(Paper)(({ theme }) => ({
	display: 'flex',
	flexDirection: 'column',
	padding: theme.spacing(2),
	minHeight: '90vh',  
	position: 'relative', 
}));

const Section = styled('div')(({ theme }) => ({
	display: 'flex',
	justifyContent: 'space-between',
	alignItems: 'center',
	marginBottom: theme.spacing(2),
}));

const ClearButton = styled('button')({
	backgroundColor: '#F14545',
	color: '#FFFFFF',
	borderRadius: '5px',
	width: '125px',
	height: '65px',
	border: '1px solid #F14545',
	visibility:'hidden'
});

const HomeButton = styled('button')({
	border: '1px solid  #003E33',
	width: '125px',
	height: '65px',
	backgroundColor: '#003E33',
	color: '#FFFFFF',
	borderRadius: '5px'
});

const Fields = styled('div')(({ theme }) => ({
	display: 'flex',
	border: '3px solid #7BAA3C',
	borderRadius: '5px',
	padding: theme.spacing(1),
	marginBottom: theme.spacing(2),
	justifyContent: "space-between",
	color: '#2F2E2E'
}));

const Items = styled('div')(({ theme }) => ({
	display: 'flex',
	borderRadius: '5px',
	padding: theme.spacing(1),
	marginBottom: theme.spacing(2),
	justifyContent: "space-between",
	color: '#2F2E2E'
}));

const Item = styled(Typography)(({ theme }) => ({
	fontSize: '24px',
	width: '20%',
	textAlign: 'center',
}));

const TotalSection = styled('div')(({ theme }) => ({
	display: 'flex',
	justifyContent: 'space-between',
	alignItems: 'center',
	marginTop: 'auto', // Push the element to the bottom
	padding: theme.spacing(2),
	background: '#FFFFFF',
}));
const PrevButton = styled(Button)(({ theme }) => ({
	width: '20%',
	height: '65px',
	backgroundColor: '#B3B3B3',
	color: '#FFFFFF'
}));

const Total = styled(Typography)(({ theme }) => ({
	width: '30%',
	textAlign: 'center',
	fontSize: '24px',
}));

const NextButton = styled(Button)(({ theme }) => ({
	width: '20%',
	height: '65px',
	backgroundColor: '#7BAA3C',
	color: '#FFFFFF'
}));

const StyledCard = styled(Card)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'space-between',
  padding: theme.spacing(2),
	position: 'absolute', 
  bottom: '0',
	width: '100%'
}));

const LeftSection = styled('div')(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'flex-start',
}));

const CenterSection = styled('div')(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'flex-start',
}));

const RightSection = styled('div')(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'flex-end',
  justifyContent: 'space-between',
}));

const FinishedButton = styled('button')(({ theme }) => ({
	border: '1px solid  #7BAA3C',
	width: '125px',
	height: '65px',
	backgroundColor: '#7BAA3C',
	color: '#FFFFFF',
	borderRadius: '5px'
}));


interface BillProps {
	handleBillPage: (isOpen: boolean) => void;
	cart: SelectedProduct[] | [],
	clearCart: () => void;
}

interface changeType {
	recieve: number,
	change: number
}

const CartDetail: React.FC<BillProps> = (props: BillProps) => {
	const { handleBillPage, cart, clearCart } = props;
	const [open, setOpen] = useState<boolean>(false);
	const [isCompleted, setIsCompleted] = useState<boolean>(false);
	const [chargeInfo , setChargeInfo] =useState<changeType>({recieve: 0, change: 0})

	const handleDialog = (isOpen: boolean) => setOpen(isOpen);
	const handleCompleted = () => setIsCompleted(true);

	const cartItems: SelectedProduct[] = Array.isArray(cart) ? cart : [];
  const totalPrice: number = cartItems.reduce(
    (sum: number, product: SelectedProduct) => sum + product.price * product.count,
    0
  );

	/**
	 * 更新找零資訊
	 * @param amountInfo 收到的現金以及找零
	 */
	function handleChange(amountInfo: changeType){
		if(amountInfo) {
			setChargeInfo(amountInfo);
		}
	}

	/**
	 * 關閉及清空購物車
	 */
	function handleFinished () {
		handleBillPage(false);
		clearCart();
	}

	return (
		<BillContainer>
			<Section>
				<HomeButton onClick={() => { handleBillPage(false) }}>回商品列表</HomeButton>
				<Typography variant="h3">{isCompleted ? '交易明細' : '當前購物車'}</Typography>
				<ClearButton onClick={() => clearCart()}>清空</ClearButton>
			</Section>
			<Fields>
				<Item>品項</Item>
				<Item>商品名</Item>
				<Item>貨號</Item>
				<Item>價格</Item>
				<Item>數量</Item>
			</Fields>

			{cart.map((item) => {
				return <Items key={item.id}>
					<Item>{item.brand}</Item>
					<Item>{item.name}</Item>
					<Item>{item.id}</Item>
					<Item>{item.price}</Item>
					<Item>{item.count}</Item>
				</Items>
			})}
			{isCompleted ?
			<StyledCard>
      <LeftSection>
        <Typography variant="subtitle1">總計</Typography>
        <Typography variant="subtitle1">付款</Typography>
        <Typography variant="subtitle1">找零</Typography>
      </LeftSection>
      <CenterSection>
        <Typography variant="subtitle1">{totalPrice}</Typography>
        <Typography variant="subtitle1">${chargeInfo.recieve}</Typography>
        <Typography variant="subtitle1">${chargeInfo.change}</Typography>
      </CenterSection>
      <RightSection>
        <FinishedButton onClick={() => handleFinished()}>
          完成
        </FinishedButton>
      </RightSection>
    </StyledCard>
				: <TotalSection>
					<PrevButton onClick={() => handleBillPage(false)}>上一步</PrevButton>
					<Total>總計</Total>
					<Total>{totalPrice}</Total>
					<NextButton onClick={() => handleDialog(true)}>下一步</NextButton>
				</TotalSection>
			}
			<PaymentDialog 
			open={open} 
			onClose={() => handleDialog(false)} 
			handleCompleted={handleCompleted} 
			handleChange={handleChange} totalPrice={totalPrice}/>
		</BillContainer>
	);
};

export default CartDetail;

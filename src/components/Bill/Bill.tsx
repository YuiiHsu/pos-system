import React, { useState } from 'react';
import PaymentDialog from '../Payment/PaymentDialog';
import { Button, Paper, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import { useNavigate } from 'react-router-dom';


const BillContainer = styled(Paper)(({ theme }) => ({
	display: 'flex',
	flexDirection: 'column',
	padding: theme.spacing(2),
	height: '90vh',
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
	border: '1px solid #F14545'
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

interface BillProps {
}

const Bill: React.FC<BillProps> = ({ }) => {
	const [open, setOpen] = useState(false);
	const [isCompleted, setIsCompleted] = useState(false);
	const navigate = useNavigate();

	const handleDialog = (isOpen: boolean) => setOpen(isOpen);
	const handleCompleted = () => setIsCompleted(true);

	return (
		<BillContainer>
			{/* Section 1 */}
			<Section>
				<HomeButton onClick={() => { navigate('/') }}>回首頁</HomeButton>
				<Typography variant="h3">{isCompleted ? '交易明細' : '當前購物車'}</Typography>
				<ClearButton>清空</ClearButton>
			</Section>

			{/* Section 2 */}
			<Fields>
				<Item>品項</Item>
				<Item>商品名</Item>
				<Item>貨號</Item>
				<Item>價格</Item>
				<Item>數量</Item>
			</Fields>

			{/* Section 3 */}
			<Items>
				<Item>瑞威</Item>
				<Item>室內犬低敏配方</Item>
				<Item>DV1292763</Item>
				<Item>980</Item>
				<Item>1</Item>
			</Items>

			{/* Section 4 */}
			{isCompleted ?
				<div>
				</div>
				: <TotalSection>
					<PrevButton>上一步</PrevButton>
					<Total>總計</Total>
					{/* <TotalAmount>$980</TotalAmount> */}
					<NextButton onClick={() => handleDialog(true)}>下一步</NextButton>
				</TotalSection>
			}

			<PaymentDialog open={open} onClose={() => handleDialog(false)} handleCompleted={handleCompleted} />
		</BillContainer>
	);
};

export default Bill;

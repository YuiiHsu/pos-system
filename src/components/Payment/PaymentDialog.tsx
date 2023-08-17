import React from 'react';
import { Dialog, DialogActions, DialogContent, DialogTitle, TextField, Typography, Button } from '@mui/material';
import { styled } from '@mui/material/styles';

interface PaymentDialogProps {
  open: boolean;
  onClose: () => void;
	handleCompleted: () => void;
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

const PaymentDialog: React.FC<PaymentDialogProps> = ({ open, onClose, handleCompleted }) => {

	function finishedOrder () {
		handleCompleted()
		onClose()
	}

  return (
    <CustomDialog open={open} onClose={onClose}>
      <CustomDialogTitle>請輸入使用者付款金額</CustomDialogTitle>
      <CustomDialogContent>
        <PaymentAmount label="金額" variant="outlined" />
        <ChangeSection>
          <Typography variant="subtitle1">應找零</Typography>
          <Typography variant="subtitle1">100 台幣</Typography>
        </ChangeSection>
      </CustomDialogContent>
      <CustomDialogActions>
        <CancelButton onClick={onClose} color="primary">取消</CancelButton>
        <ConfirmDialogButton onClick={() => finishedOrder() } color="primary">完成交易</ConfirmDialogButton>
      </CustomDialogActions>
    </CustomDialog>
  );
};

export default PaymentDialog;

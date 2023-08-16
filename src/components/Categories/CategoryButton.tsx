import React from 'react';
import Button from '@mui/material/Button';
import style from './categoryButton.module.css';

interface CategoryButtonProps {
	categories: string[];
	selectedCategory: number | null;
	onClick: (index: number) => void;
}

const CategoryButton: React.FC<CategoryButtonProps> = ({ categories, selectedCategory, onClick }) => {
	return (
		<div className={style.categoryButtonContainer}>
			{categories.map((category, index) => (
				<Button
					key={index}
					variant="contained"
					onClick={() => onClick(index)}
					className={selectedCategory === index ? style.categoryButtonSelected : style.categoryButton}
				>
					{category}
				</Button>
			))}
		</div>
	);
};

export default CategoryButton;
import { Product } from '../types/cart';
import faker from "faker";

/**
	 * 生成假資料
	 * @param count 資料筆數
	 * @returns 自動生成的假資料
	 */
	export const generateFakeData = (count: number) => {
		const fakeData = [];

		for (let i = 0; i < count; i++) {
			const product: Product = {
				// 假設分類有3個
				category: faker.random.number(faker.random.number({ min: 1, max: 3 })),
				brand: faker.company.companyName(),
				id: faker.random.alphaNumeric(8),
				name: faker.commerce.productName(),
				price: faker.random.number({ min: 1, max: 1000 }),
				img: 'https://fakeimg.pl/300/'
			};

			fakeData.push(product);
		}
		return fakeData;
	};
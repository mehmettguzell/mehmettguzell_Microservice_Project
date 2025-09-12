import {fetcher} from '../lib/fetcher';
import {Product} from '../types/index';

const BASE = 'http://localhost:9000/api/product';

export const getAllProducts = () => fetcher<Product[]>(`${BASE}/all`, { cache: 'no-store' });

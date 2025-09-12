import {fetcher} from '../lib/fetcher';
import {Product} from '../types/index';

const BASE = '/api/products';

export const getAllProducts = () => fetcher<Product[]>(`${BASE}/all`, { cache: 'no-store' });

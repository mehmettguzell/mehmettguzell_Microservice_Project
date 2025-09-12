import {fetcher} from '../lib/fetcher';
import {Product} from '../types/index';

const BASE =
  process.env.NODE_ENV === 'test'
    ? 'http://localhost:9000/api/product'
    : '/api/product';

export const getAllProducts = () => fetcher<Product[]>(`${BASE}/all`, { cache: 'no-store' });

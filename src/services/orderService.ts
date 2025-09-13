import {fetcher} from '../lib/fetcher';
import {OrderRequest, OrderResponse, OrderStatus} from '../types/index';

const BASE =
  process.env.NODE_ENV === 'test'
    ? 'http://localhost:9000/api/order'
    : '/api/order';

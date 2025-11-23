import { useQuery } from '@tanstack/react-query';
import { getSavingsProducts } from './productApi';

export const useSavingsProducts = () => {
  return useQuery({
    queryKey: ['savings-products'],
    queryFn: getSavingsProducts,
  });
};

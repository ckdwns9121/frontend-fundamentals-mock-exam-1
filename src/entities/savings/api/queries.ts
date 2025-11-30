import { useSuspenseQuery } from '@tanstack/react-query';
import { getSavingsProducts } from './productApi';
import { withToast } from 'shared/lib/withToast';
import type { SavingsProduct } from '../model/types';

export const useSavingsProducts = <TData = SavingsProduct[]>(select?: (data: SavingsProduct[]) => TData) => {
  return useSuspenseQuery({
    queryKey: ['savings-products'],
    queryFn: withToast(getSavingsProducts),
    ...(select && { select }),
  });
};

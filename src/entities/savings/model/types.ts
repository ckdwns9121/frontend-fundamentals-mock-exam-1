export type SavingsProduct = {
  id: string; // 적금 상품 ID
  name: string;
  description: string; // 적금 상품 설명
  interestRate: number; // 적금 상품 이자율
  minAmount: number; // 적금 상품 최소 금액
  maxAmount: number; // 적금 상품 최대 금액
  period: number; // 적금 상품 기간
};

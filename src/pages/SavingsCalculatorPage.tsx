import { useMemo, useState } from 'react';
import { Border, NavigationBar, Spacing } from 'tosslib';
import { Tab } from '../shared/ui/Tab';
import { SavingsForm } from '../features/savings/ui/SavingsForm';
import { SavingsProductList } from '../features/savings/ui/SavingsProductList';
import { CalculationResult } from '../features/savings/ui/CalculationResult';
import { useSavingsProducts } from '../entities/savings/api';
import type { SavingsProduct } from '../entities/savings/model/types';

export function SavingsCalculatorPage() {
  const { data: products = [], isLoading, isError } = useSavingsProducts();
  const [targetAmount, setTargetAmount] = useState('');
  const [monthlyAmount, setMonthlyAmount] = useState('');
  const [period, setPeriod] = useState<number>(12);
  const [selectedProductId, setSelectedProductId] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<'products' | 'results'>('products');

  /**
   * 입력 조건에 맞는 상품 목록 필터링
   */
  const filteredProducts = useMemo(() => {
    if (!monthlyAmount || !period) {
      return products;
    }

    const monthlyAmountNum = Number(monthlyAmount.replace(/,/g, ''));

    if (isNaN(monthlyAmountNum) || monthlyAmountNum <= 0) {
      return products;
    }

    return products.filter((product: SavingsProduct) => {
      // 월 납입액 필터링: minMonthlyAmount < 월 납입액 < maxMonthlyAmount
      const isMonthlyAmountValid =
        monthlyAmountNum > product.minMonthlyAmount && monthlyAmountNum < product.maxMonthlyAmount;

      // 저축 기간 필터링: availableTerms === 저축 기간
      const isPeriodValid = product.availableTerms === period;

      return isMonthlyAmountValid && isPeriodValid;
    });
  }, [products, monthlyAmount, period]);

  /**
   * 선택된 상품
   */
  const selectedProduct = useMemo(() => {
    if (!selectedProductId) {
      return null;
    }
    return products.find(product => product.id === selectedProductId) || null;
  }, [products, selectedProductId]);

  /**
   * 추천 상품 목록 (연 이자율이 가장 높은 2개)
   */
  const recommendedProducts = useMemo(() => {
    return [...filteredProducts].sort((a, b) => b.annualRate - a.annualRate).slice(0, 2);
  }, [filteredProducts]);

  return (
    <>
      <NavigationBar title="적금 계산기" />

      <Spacing size={16} />

      <SavingsForm
        targetAmount={targetAmount}
        monthlyAmount={monthlyAmount}
        period={period}
        onTargetAmountChange={setTargetAmount}
        onMonthlyAmountChange={setMonthlyAmount}
        onPeriodChange={setPeriod}
      />

      <Spacing size={24} />
      <Border height={16} />
      <Spacing size={8} />

      <Tab value={activeTab} onChange={value => setActiveTab(value as 'products' | 'results')}>
        <Tab.Label value="products">적금 상품</Tab.Label>
        <Tab.Label value="results">계산 결과</Tab.Label>

        <Tab.Panel value="products">
          <SavingsProductList
            isLoading={isLoading}
            isError={isError}
            products={filteredProducts}
            selectedProductId={selectedProductId}
            onProductSelect={setSelectedProductId}
          />
        </Tab.Panel>

        <Tab.Panel value="results">
          <CalculationResult
            targetAmount={targetAmount}
            monthlyAmount={monthlyAmount}
            period={period}
            selectedProduct={selectedProduct}
            recommendedProducts={recommendedProducts}
            selectedProductId={selectedProductId}
            onProductSelect={setSelectedProductId}
          />
        </Tab.Panel>
      </Tab>
    </>
  );
}

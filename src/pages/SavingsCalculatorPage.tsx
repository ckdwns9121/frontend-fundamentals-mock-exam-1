import { useMemo, useState } from 'react';
import { Border, NavigationBar, Spacing } from 'tosslib';
import { SavingsForm } from '../features/savings/ui/SavingsForm';
import { SavingsProductList } from '../features/savings/ui/SavingsProductList';
import { CalculationResult } from '../features/savings/ui/CalculationResult';
import { filterProductsByConditions } from '../features/savings/lib/filters';
import { getRecommendedProducts } from '../features/savings/lib/recommendations';
import { findProductById } from '../features/savings/lib/products';
import { useSavingsProducts } from '../entities/savings/api';
import { Tab } from '../shared/ui/Tab';

export function SavingsCalculatorPage() {
  const { data: products = [], isLoading, isError } = useSavingsProducts();
  const [targetAmount, setTargetAmount] = useState('');
  const [monthlyAmount, setMonthlyAmount] = useState('');
  const [period, setPeriod] = useState<number>(12);
  const [selectedProductId, setSelectedProductId] = useState<string | null>(null);

  /**
   * 입력 조건에 맞는 상품 목록 필터링
   */
  const filteredProducts = useMemo(() => {
    return filterProductsByConditions(products, { monthlyAmount, period });
  }, [products, monthlyAmount, period]);

  /**
   * 선택된 상품
   */
  const selectedProduct = useMemo(() => {
    return findProductById(products, selectedProductId);
  }, [products, selectedProductId]);

  /**
   * 추천 상품 목록 (연 이자율이 가장 높은 2개)
   */
  const recommendedProducts = useMemo(() => {
    return getRecommendedProducts(filteredProducts, 2);
  }, [filteredProducts]);

  const tabs = [
    {
      id: 'products',
      label: '적금 상품',
      component: (
        <SavingsProductList
          isLoading={isLoading}
          isError={isError}
          products={filteredProducts}
          selectedProductId={selectedProductId}
          onProductSelect={setSelectedProductId}
        />
      ),
    },
    {
      id: 'results',
      label: '계산 결과',
      component: (
        <CalculationResult
          targetAmount={targetAmount}
          monthlyAmount={monthlyAmount}
          period={period}
          selectedProduct={selectedProduct}
          recommendedProducts={recommendedProducts}
          selectedProductId={selectedProductId}
          onProductSelect={setSelectedProductId}
        />
      ),
    },
    {
      id: 'form',
      label: '입력 조건',
      component: <div>hello</div>,
    },
  ] as const;

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

      <Tab defaultValue={tabs[0].id}>
        <Tab.List>
          {tabs.map(tab => (
            <Tab.Trigger key={tab.id} value={tab.id}>
              {tab.label}
            </Tab.Trigger>
          ))}
        </Tab.List>
        <Tab.Content>
          {tabs.map(tab => (
            <Tab.Panel key={tab.id} value={tab.id}>
              {tab.component}
            </Tab.Panel>
          ))}
        </Tab.Content>
      </Tab>
    </>
  );
}

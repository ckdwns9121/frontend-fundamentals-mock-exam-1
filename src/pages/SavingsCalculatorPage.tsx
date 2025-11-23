import { useMemo, useState } from 'react';
import { Border, ListRow, NavigationBar, Spacing, Tab } from 'tosslib';
import { SavingsProductItem } from '../entities/savings/ui/SavingsProductItem';
import { SavingsForm } from '../features/savings/ui/SavingsForm';
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

      <Tab onChange={value => setActiveTab(value as 'products' | 'results')}>
        <Tab.Item value="products" selected={activeTab === 'products'}>
          적금 상품
        </Tab.Item>
        <Tab.Item value="results" selected={activeTab === 'results'}>
          계산 결과
        </Tab.Item>
      </Tab>

      {activeTab === 'products' && (
        <>
          {isLoading && <ListRow contents={<ListRow.Texts type="1RowTypeA" top="로딩 중..." />} />}
          {isError && (
            <ListRow contents={<ListRow.Texts type="1RowTypeA" top="상품 목록을 불러오는 중 오류가 발생했습니다." />} />
          )}
          {!isLoading && !isError && filteredProducts.length === 0 && (
            <ListRow contents={<ListRow.Texts type="1RowTypeA" top="조건에 맞는 상품이 없습니다." />} />
          )}
          {filteredProducts.map(product => (
            <SavingsProductItem
              key={product.id}
              product={product}
              selected={selectedProductId === product.id}
              onClick={() => {
                setSelectedProductId(product.id);
              }}
            />
          ))}
        </>
      )}

      {activeTab === 'results' && (
        <CalculationResult
          targetAmount={targetAmount}
          monthlyAmount={monthlyAmount}
          period={period}
          selectedProduct={selectedProduct}
          recommendedProducts={recommendedProducts}
          selectedProductId={selectedProductId}
          onProductSelect={setSelectedProductId}
        />
      )}
    </>
  );
}

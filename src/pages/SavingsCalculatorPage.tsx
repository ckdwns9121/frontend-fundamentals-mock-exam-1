import { useMemo, useState, Suspense } from 'react';
import { Border, NavigationBar, Spacing, ListRow } from 'tosslib';
import { SavingsForm } from 'features/savings/ui/SavingsForm';
import { SavingsProductList } from 'features/savings/ui/SavingsProductList';
import { CalculationResult } from 'features/savings/ui/CalculationResult';
import { createProductFilter, filterProductsByConditions } from 'features/savings/lib/filters';
import { getRecommendedProducts } from 'features/savings/lib/recommendations';
import { findProductById } from 'features/savings/lib/products';
import { useSavingsProducts } from 'entities/savings/api';
import { Tab } from 'shared/ui/Tab';
import { ErrorBoundary } from 'shared/ui/ErrorBoundary';

interface Tab {
  id: string;
  label: string;
  component: React.ReactNode;
}

/**
 * 상품 데이터를 사용하는 내부 컴포넌트
 * @description useSuspenseQuery를 사용하므로 Suspense로 감싸져야 합니다.
 */
function SavingsCalculatorContent() {
  const { data: products = [] } = useSavingsProducts();
  const [targetAmount, setTargetAmount] = useState('');
  const [monthlyAmount, setMonthlyAmount] = useState('');
  const [period, setPeriod] = useState<number>(12);
  const [selectedProductId, setSelectedProductId] = useState<string | null>(null);

  /**
   * 필터링 함수 생성
   * @description 부모에서 필터링 로직을 계산하고, 자식 컴포넌트에 주입합니다.
   * 로직은 부모, 표현은 자식 패턴을 따릅니다.
   */
  const filterProducts = useMemo(() => createProductFilter({ monthlyAmount, period }), [monthlyAmount, period]);

  /**
   * 선택된 상품
   */
  const selectedProduct = useMemo(() => {
    return findProductById(products, selectedProductId);
  }, [products, selectedProductId]);

  /**
   * 필터링된 상품 목록 (추천 상품 계산용)
   */
  const filteredProducts = useMemo(() => {
    return filterProductsByConditions(products, { monthlyAmount, period });
  }, [products, monthlyAmount, period]);

  /**
   * 추천 상품 목록 (연 이자율이 가장 높은 2개)
   */
  const recommendedProducts = useMemo(() => {
    return getRecommendedProducts(filteredProducts, 2);
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
      <Spacing size={8} />
      <Border height={16} />
      <Spacing size={8} />

      <Tab defaultValue="products">
        <Tab.List>
          <Tab.Trigger value="products">적금 상품</Tab.Trigger>
          <Tab.Trigger value="results">계산 결과</Tab.Trigger>
        </Tab.List>
        <Tab.Content>
          <Tab.Panel value="products">
            <SavingsProductList
              filter={filterProducts}
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
        </Tab.Content>
      </Tab>
    </>
  );
}

/**
 * 적금 계산기 페이지
 * @description Suspense와 ErrorBoundary로 감싸서 로딩 및 에러 상태를 처리합니다.
 */
export function SavingsCalculatorPage() {
  return (
    <ErrorBoundary
      fallback={
        <ListRow contents={<ListRow.Texts type="1RowTypeA" top="데이터를 불러오는 중 오류가 발생했습니다." />} />
      }
    >
      <Suspense fallback={<ListRow contents={<ListRow.Texts type="1RowTypeA" top="로딩 중..." />} />}>
        <SavingsCalculatorContent />
      </Suspense>
    </ErrorBoundary>
  );
}

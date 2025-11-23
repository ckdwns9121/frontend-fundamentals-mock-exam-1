import { Border, colors, ListHeader, ListRow, NavigationBar, Spacing, Tab } from 'tosslib';
import { SavingsProductItem } from '../entities/savings/ui/SavingsProductItem';
import { SavingsForm } from '../features/savings/savings-form';
import type { SavingsProduct } from '../entities/savings/model/types';

// Mock 데이터 (나중에 API로 교체)
const mockProducts: SavingsProduct[] = [
  {
    id: '1',
    name: '기본 정기적금',
    description: '기본 정기적금 상품',
    interestRate: 3.2,
    minAmount: 100000,
    maxAmount: 500000,
    period: 12,
  },
  {
    id: '2',
    name: '고급 정기적금',
    description: '고급 정기적금 상품',
    interestRate: 2.8,
    minAmount: 50000,
    maxAmount: 1000000,
    period: 24,
  },
];

export function SavingsCalculatorPage() {
  const selectedProductId: string | null = null; // TODO: 상태 관리로 교체
  const targetAmount = ''; // TODO: 상태 관리로 교체
  const monthlyAmount = ''; // TODO: 상태 관리로 교체
  const period = 12; // TODO: 상태 관리로 교체

  return (
    <>
      <NavigationBar title="적금 계산기" />

      <Spacing size={16} />

      <SavingsForm
        targetAmount={targetAmount}
        monthlyAmount={monthlyAmount}
        period={period}
        onTargetAmountChange={() => {
          // TODO: 상태 업데이트 로직 구현
        }}
        onMonthlyAmountChange={() => {
          // TODO: 상태 업데이트 로직 구현
        }}
        onPeriodChange={() => {
          // TODO: 상태 업데이트 로직 구현
        }}
      />

      <Spacing size={24} />
      <Border height={16} />
      <Spacing size={8} />

      <Tab onChange={() => {}}>
        <Tab.Item value="products" selected={true}>
          적금 상품
        </Tab.Item>
        <Tab.Item value="results" selected={false}>
          계산 결과
        </Tab.Item>
      </Tab>

      {mockProducts.map(product => (
        <SavingsProductItem
          key={product.id}
          product={product}
          selected={selectedProductId === product.id}
          onClick={() => {
            // TODO: 상품 선택 로직 구현
          }}
        />
      ))}

      {/* 아래는 계산 결과 탭 내용이에요. 계산 결과 탭을 구현할 때 주석을 해제해주세요. */}
      <Spacing size={8} />

      <ListRow
        contents={
          <ListRow.Texts
            type="2RowTypeA"
            top="예상 수익 금액"
            topProps={{ color: colors.grey600 }}
            bottom={`1,000,000원`}
            bottomProps={{ fontWeight: 'bold', color: colors.blue600 }}
          />
        }
      />
      <ListRow
        contents={
          <ListRow.Texts
            type="2RowTypeA"
            top="목표 금액과의 차이"
            topProps={{ color: colors.grey600 }}
            bottom={`-500,000원`}
            bottomProps={{ fontWeight: 'bold', color: colors.blue600 }}
          />
        }
      />
      <ListRow
        contents={
          <ListRow.Texts
            type="2RowTypeA"
            top="추천 월 납입 금액"
            topProps={{ color: colors.grey600 }}
            bottom={`100,000원`}
            bottomProps={{ fontWeight: 'bold', color: colors.blue600 }}
          />
        }
      />

      <Spacing size={8} />
      <Border height={16} />
      <Spacing size={8} />

      <ListHeader title={<ListHeader.TitleParagraph fontWeight="bold">추천 상품 목록</ListHeader.TitleParagraph>} />
      <Spacing size={12} />

      {mockProducts.map(product => (
        <SavingsProductItem
          key={product.id}
          product={product}
          onClick={() => {
            // TODO: 상품 선택 로직 구현
          }}
        />
      ))}

      <Spacing size={40} />

      {/* 아래는 사용자가 적금 상품을 선택하지 않고 계산 결과 탭을 선택했을 때 출력해주세요. */}
      <ListRow contents={<ListRow.Texts type="1RowTypeA" top="상품을 선택해주세요." />} />
    </>
  );
}

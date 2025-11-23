import { SelectBottomSheet, Spacing, TextField } from 'tosslib';

interface SavingsFormProps {
  targetAmount?: string;
  monthlyAmount?: string;
  period?: number;
  onTargetAmountChange?: (value: string) => void;
  onMonthlyAmountChange?: (value: string) => void;
  onPeriodChange?: (value: number) => void;
}

/**
 * 적금 계산 입력 폼 컴포넌트
 * @description 목표 금액, 월 납입액, 저축 기간을 입력받는 폼입니다.
 */
export function SavingsForm({
  targetAmount = '',
  monthlyAmount = '',
  period = 12,
  onTargetAmountChange,
  onMonthlyAmountChange,
  onPeriodChange,
}: SavingsFormProps) {
  return (
    <>
      <TextField
        label="목표 금액"
        placeholder="목표 금액을 입력하세요"
        suffix="원"
        value={targetAmount}
        onChange={e => onTargetAmountChange?.(e.target.value)}
      />
      <Spacing size={16} />
      <TextField
        label="월 납입액"
        placeholder="희망 월 납입액을 입력하세요"
        suffix="원"
        value={monthlyAmount}
        onChange={e => onMonthlyAmountChange?.(e.target.value)}
      />
      <Spacing size={16} />
      <SelectBottomSheet
        label="저축 기간"
        title="저축 기간을 선택해주세요"
        value={period}
        onChange={value => onPeriodChange?.(value as number)}
      >
        <SelectBottomSheet.Option value={6}>6개월</SelectBottomSheet.Option>
        <SelectBottomSheet.Option value={12}>12개월</SelectBottomSheet.Option>
        <SelectBottomSheet.Option value={24}>24개월</SelectBottomSheet.Option>
      </SelectBottomSheet>
    </>
  );
}

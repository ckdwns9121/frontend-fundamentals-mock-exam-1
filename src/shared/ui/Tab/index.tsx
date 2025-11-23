import { createContext, useContext, useState, ReactNode, Children, isValidElement } from 'react';
import { css } from '@emotion/react';
import { colors } from 'tosslib';

interface TabContextValue {
  activeValue: string;
  onChange: (value: string) => void;
}

const TabContext = createContext<TabContextValue | null>(null);

function useTabContext() {
  const context = useContext(TabContext);
  if (!context) {
    throw new Error('Tab 컴포넌트는 Tab.Label과 Tab.Panel을 포함해야 합니다.');
  }
  return context;
}

interface TabProps {
  children: ReactNode;
  defaultValue?: string;
  value?: string;
  onChange?: (value: string) => void;
}

/**
 * Tab 컴포넌트 (메인 컨테이너)
 * @description Compound Component 패턴을 사용한 탭 컴포넌트입니다.
 * @example
 * ```tsx
 * <Tab defaultValue="tab1">
 *   <Tab.Label value="tab1">탭 1</Tab.Label>
 *   <Tab.Label value="tab2">탭 2</Tab.Label>
 *   <Tab.Panel value="tab1">탭 1 내용</Tab.Panel>
 *   <Tab.Panel value="tab2">탭 2 내용</Tab.Panel>
 * </Tab>
 * ```
 */
export function Tab({ children, defaultValue, value: controlledValue, onChange: controlledOnChange }: TabProps) {
  const [internalValue, setInternalValue] = useState(defaultValue || '');

  const isControlled = controlledValue !== undefined;
  const activeValue = isControlled ? controlledValue : internalValue;

  const handleChange = (newValue: string) => {
    if (!isControlled) {
      setInternalValue(newValue);
    }
    controlledOnChange?.(newValue);
  };

  // children을 분석해서 Tab.Label과 Tab.Panel을 분리
  const labels: ReactNode[] = [];
  const panels: ReactNode[] = [];

  Children.forEach(children, child => {
    if (isValidElement(child)) {
      if (child.type === TabLabel) {
        labels.push(child);
      } else if (child.type === TabPanel) {
        panels.push(child);
      }
    }
  });

  return (
    <TabContext.Provider value={{ activeValue, onChange: handleChange }}>
      <div
        css={css`
          width: 100%;
        `}
      >
        <div
          css={css`
            display: flex;
            border-bottom: 1px solid ${colors.grey200};
          `}
        >
          {labels}
        </div>
        {panels}
      </div>
    </TabContext.Provider>
  );
}

interface TabLabelProps {
  children: ReactNode;
  value: string;
  disabled?: boolean;
}

/**
 * Tab.Label 컴포넌트
 * @description 탭 라벨/버튼 컴포넌트입니다.
 */
function TabLabel({ children, value, disabled = false }: TabLabelProps) {
  const { activeValue, onChange } = useTabContext();
  const isActive = activeValue === value;

  return (
    <button
      type="button"
      disabled={disabled}
      onClick={() => !disabled && onChange(value)}
      css={css`
        padding: 12px 16px;
        border: none;
        background: transparent;
        border-bottom: 2px solid ${isActive ? colors.blue600 : 'transparent'};
        color: ${isActive ? colors.blue600 : colors.grey600};
        font-size: 16px;
        font-weight: ${isActive ? 'bold' : 'normal'};
        cursor: ${disabled ? 'not-allowed' : 'pointer'};
        transition: all 0.2s ease;
        opacity: ${disabled ? 0.5 : 1};

        &:hover:not(:disabled) {
          color: ${colors.blue600};
        }

        &:focus-visible {
          outline: 2px solid ${colors.blue600};
          outline-offset: -2px;
        }
      `}
    >
      {children}
    </button>
  );
}

interface TabPanelProps {
  children: ReactNode;
  value: string;
}

/**
 * Tab.Panel 컴포넌트
 * @description 탭 패널/내용 컴포넌트입니다.
 */
function TabPanel({ children, value }: TabPanelProps) {
  const { activeValue } = useTabContext();
  const isActive = activeValue === value;

  if (!isActive) {
    return null;
  }

  return (
    <div
      css={css`
        width: 100%;
        padding: 16px 0;
      `}
    >
      {children}
    </div>
  );
}

// Compound Component 패턴 적용
Tab.Label = TabLabel;
Tab.Panel = TabPanel;

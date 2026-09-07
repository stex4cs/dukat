'use client';

import { CURRENCIES, type CurrencyCode } from '@/lib/currencies';
import { Listbox } from './Listbox';

/** The currency listbox: the code is both the value and the label. */
export function CurrencySelect({
  value,
  onChange,
  label,
  options = CURRENCIES,
  size = 'lg',
  className,
}: {
  value: CurrencyCode;
  onChange: (value: CurrencyCode) => void;
  label: string;
  options?: readonly CurrencyCode[];
  size?: 'lg' | 'sm';
  className?: string;
}) {
  return (
    <Listbox
      value={value}
      onChange={onChange}
      options={options.map((code) => ({ value: code, label: code }))}
      label={label}
      size={size}
      className={className}
    />
  );
}

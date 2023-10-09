import { useRef } from 'react';
import { handleNegativeValue } from 'ahmad/utils/handlingNegative';
import { _renderCurrency } from 'ahmad/utils/number';

export const CurrencyInput = ({ value = 0, onChange, className, allowNegative = true, ...props }) => {
  const inputRef = useRef();

  const handleChange = (e) => {
    let rawText = e.target.value;
    let numberText = rawText.replace(/\D/g, '');
    let result = numberText;

    if (allowNegative) {
      result = handleNegativeValue(rawText, numberText);
    }

    onChange(Number(result));
  };

  return (
    <div>
      <input className={`${className}`} value={`${_renderCurrency(value)}`} onChange={handleChange} onClick={() => inputRef?.current?.click} onFocus={() => inputRef?.current?.focus} {...props} />

      <input ref={inputRef} hidden value={value} onChange={() => {}} />
    </div>
  );
};

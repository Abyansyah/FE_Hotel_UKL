import { useRef } from 'react';
import { handleNegativeValue } from 'ahmad/utils/handlingNegative';
import { _renderNumeric } from 'ahmad/utils/number';

export const NumericInput = ({ value = 0, onChange, className, allowNegative = true, ...props }) => {
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
      <input className={`${className}`} value={`${_renderNumeric(value)}`} onChange={handleChange} onClick={() => inputRef?.current?.click} onFocus={() => inputRef?.current?.focus} {...props} />

      <input ref={inputRef} hidden value={value} onChange={() => {}} />
    </div>
  );
};

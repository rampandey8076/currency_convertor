import React, { useId } from 'react';

function InputBox({
  label,
  amount,
  onAmountChange,
  onCurrencyChange,
  currencyOptions = [],
  selectCurrency = "usd",
  amountDisable = false,
  currencyDisable = false,
  className = "",
}) {
  const amountInputId = useId();

  return (
    <div className={`bg-white p-4 rounded-xl text-sm flex gap-2 shadow-sm ${className}`}>
      
      <div className="w-1/2">
        <label
          htmlFor={amountInputId}
          className="text-gray-400 text-xs font-medium mb-1 inline-block uppercase tracking-wider"
        >
          {label}
        </label>
        <input
          id={amountInputId}
          className="outline-none w-full bg-transparent py-1.5 text-gray-800 font-semibold text-lg [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
          type="number"
          placeholder="Amount"
          disabled={amountDisable}
          value={amount}
          onFocus={(e) => e.target.select()}
          onChange={(e) => onAmountChange && onAmountChange(Number(e.target.value))}
        />
      </div>

      <div className="w-1/2 flex flex-wrap justify-end text-right">
        <p className="text-gray-400 text-xs font-medium mb-1 w-full uppercase tracking-wider">
          Currency Type
        </p>
        <select
          className="rounded-lg px-2 py-1.5 bg-gray-100 cursor-pointer outline-none text-gray-700 font-medium text-sm hover:bg-gray-200 transition-colors duration-150"
          value={selectCurrency}
          onChange={(e) => onCurrencyChange && onCurrencyChange(e.target.value)}
          disabled={currencyDisable}
        >
          {currencyOptions.map((currency) => (
            <option key={currency} value={currency}>
              {currency.toUpperCase()}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}

export default InputBox;
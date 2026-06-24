import { useState } from "react";
import { InputBox } from "./components/index";
import useCurrencyInfo from "./hooks/useCurrencyInfo";

function App() {
  const [amount, setAmount] = useState(0);
  const [convertedAmount, setConvertedAmount] = useState(0);
  const [fromCurrency, setFromCurrency] = useState("usd");
  const [toCurrency, setToCurrency] = useState("inr");

  const { data: currencyInfo, loading, error } = useCurrencyInfo(fromCurrency);

  const currencyOptions = Object.keys(currencyInfo);

  const swap = () => {
    setFromCurrency(toCurrency);
    setToCurrency(fromCurrency);
    setAmount(convertedAmount);
    setConvertedAmount(amount);
  };

  const convert = () => {
    if (!currencyInfo[toCurrency]) return;
    setConvertedAmount(amount * currencyInfo[toCurrency]);
  };

  return (
    <div className="w-full min-h-screen flex items-center justify-center bg-cover bg-no-repeat bg-center"
      style={{
        backgroundImage: `url('https://images.unsplash.com/photo-1604156425963-9be03f86a428?w=1400')`,
      }}
    >
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" />

      <div className="relative z-10 w-full max-w-md mx-4">
        <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-6 shadow-2xl">

          <h1 className="text-white text-2xl font-bold text-center mb-1">
            💱 Currency Converter
          </h1>
          <p className="text-white/50 text-sm text-center mb-6">
            Real-time exchange rates
          </p>

          {error && (
            <div className="bg-red-500/20 border border-red-400 text-red-300 text-sm rounded-lg px-4 py-2 mb-4 text-center">
              ⚠️ {error}. Please try again.
            </div>
          )}

          {loading && (
            <div className="text-white/60 text-sm text-center mb-4 animate-pulse">
              Fetching rates...
            </div>
          )}

          <InputBox
            label="From"
            amount={amount}
            currencyOptions={currencyOptions}
            onAmountChange={(val) => setAmount(val)}
            onCurrencyChange={(val) => setFromCurrency(val)}
            selectCurrency={fromCurrency}
            className="mb-1 rounded-xl"
          />

          <div className="relative flex justify-center my-3">
            <button
              onClick={swap}
              className="bg-blue-600 hover:bg-blue-500 active:scale-95 text-white text-sm font-semibold px-5 py-2 rounded-full shadow-lg transition-all duration-200 flex items-center gap-2"
            >
              🔄 Swap
            </button>
          </div>

          <InputBox
            label="To"
            amount={parseFloat(convertedAmount.toFixed(4))}
            currencyOptions={currencyOptions}
            onCurrencyChange={(val) => setToCurrency(val)}
            selectCurrency={toCurrency}
            amountDisable={true}
            className="mb-6 rounded-xl"
          />

          <button
            onClick={convert}
            disabled={loading}
            className="w-full bg-blue-600 hover:bg-blue-500 disabled:opacity-50 disabled:cursor-not-allowed active:scale-95 text-white font-bold text-base py-3.5 rounded-xl transition-all duration-200 shadow-lg shadow-blue-500/30"
          >
            {loading ? "Loading rates..." : `Convert ${fromCurrency.toUpperCase()} → ${toCurrency.toUpperCase()}`}
          </button>

        </div>
      </div>
    </div>
  );
}

export default App;
import { SyntheticEvent, useState } from 'react';
import { SelectField } from './components/atom/select-field';
import { CurrencyCode, currencyConverter, SELECT_OPTION } from './lib/utils';
import { Input } from './components/atom/input';
// import { useGetMarket } from './lib/hook/useGetMarket';
import { useGetTickers } from './lib/hook/useGetTickers';

const options = SELECT_OPTION.map((opt) => ({ label: opt.toUpperCase(), value: opt }));

type EVENT = React.ChangeEvent<HTMLInputElement | HTMLSelectElement>;

interface FormData {
  from: CurrencyCode;
  to: CurrencyCode;
  amount: string;
}

type SOURCE = ['from', 'to'];

const App = () => {
  // const { data } = useGetMarket();
  const { data: tickers } = useGetTickers();

  // const options = (data?.data ?? []).map((data) => data);

  const [formNames, setFormNames] = useState<SOURCE>(['from', 'to']);
  const [value, setValue] = useState<number | string>('');
  const [formdata, setFormData] = useState<FormData>({
    to: 'ngn',
    from: 'usdt',
    amount: '0',
  });

  const mappedFormdata = {
    one: formdata[formNames[0]],
    two: formdata[formNames[1]],
  };

  const updateFormData = (event: EVENT) => {
    const { name, value } = event.target;

    setFormData((old) => ({ ...old, [name]: value }));
  };

  const safeNuberParser = (num: string) => {
    const number = Number(num);

    if (!isNaN(number)) return number;
    throw new Error('Invalid Number provided');
  };

  console.log(formdata[formNames[0]], formdata[formNames[1]]);

  const convertCurrency = async (event: SyntheticEvent) => {
    event.preventDefault();
    const { amount } = formdata;

    try {
      const parsedAmount = safeNuberParser(amount);

      const res = currencyConverter(
        parsedAmount,
        mappedFormdata.one,
        mappedFormdata.two,
        tickers?.data ?? {}
      );

      setValue(res);
    } catch (error) {
      if (error instanceof Error) {
        console.log(error.message);
      }

      console.log(error);
    }
  };

  return (
    <div>
      <form onSubmit={convertCurrency}>
        <div className="">
          <SelectField
            value={mappedFormdata.one}
            options={options}
            onChange={updateFormData}
            label="Select Currency A"
            name={formNames[0]}
          />
          <button
            type="button"
            onClick={() => {
              setFormNames((old) => [...old].reverse() as SOURCE);
            }}
          >
            Swap
          </button>
          <SelectField
            value={mappedFormdata.two}
            options={options}
            onChange={updateFormData}
            label="Select Currency B"
            name={formNames[1]}
          />
        </div>

        <div>
          <Input type="number" value={formdata.amount} onChange={updateFormData} name="amount" />
          <button type="submit">Convert</button>
        </div>
      </form>

      <div>{value}</div>
    </div>
  );
};

export default App;

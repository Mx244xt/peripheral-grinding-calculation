import { useEffect, useState } from "react";

type Props = {
  label: string;
  num: string;
  setValue: (e: string) => void;
  max?: number;
  min?: number;
  step?: number;
}

function Input({ label, num, setValue, max = 45, min = 0.001, step = 0.001 }: Props) {
  const [isChecked, setIsChecked] = useState<boolean>(false);
  const [val, setVal] = useState<string>(num);
  const [stock, setStock] = useState<string>(num);
  const [adjustment, setAdjustment] = useState<string>("0");
  const [validation, setValidation] = useState({
    isInvalid: false,
    invalidMsg: <p className="text-red-400">入力値が無効です。</p>,
    isIncalculable: false,
    incalculableMsg: <p className="text-red-400">計算できません。</p>,
    isNumSmall: false,
    numSmallMsg: <p className="text-red-400">入力値が小さ過ぎます。</p>,
    isNumBig: false,
    numBigMsg: <p className="text-red-400">入力値が大きい過ぎます。</p>,
  });

  useEffect(() => {
    validate(+stock + +adjustment);
    setValue(val);
  }, [stock, adjustment, isChecked, val])

  function handleInputChange(e: React.ChangeEvent<HTMLInputElement>) {
    if (+e.target.value < 0.001) {
      setStock("");
      return
    }
    if (e.target.value.length > 5) {
      return;
    }
    setStock(e.target.value);
    setVal((+e.target.value + +adjustment).toFixed(3));
  }

  function handleAdjChange(e: React.ChangeEvent<HTMLInputElement>) {
    if (+e.target.value < 0.001) {
      setAdjustment("");
      return
    }
    if (e.target.value.length > 5) {
      return;
    } setAdjustment(e.target.value);
    setVal((+e.target.value + +stock).toFixed(3));
  }

  function handleIsAdj() {
    setIsChecked(!isChecked)
    if (isChecked === true) {
      setVal(stock);
    } else {
      setVal((+stock + +adjustment).toFixed(3));
    }
  }

  function validate(e: number): void {
    if (e > max) {
      setValidation({ ...validation, isNumBig: true })
    } else {
      setValidation({ ...validation, isNumBig: false })
    }
    if (e < 0.001) {
      setValidation({ ...validation, isNumSmall: true })
    } else {
      setValidation({ ...validation, isNumSmall: false })
    }
  }

  return (
    <div className='flex flex-col items-start px-3 mt-1 sm:mt-3'>
      <div className="flex w-full justify-between">

        <label htmlFor={label} className='text-gray-700 dark:text-gray-200'>{label}</label>
        <label htmlFor={label} className='text-gray-700 dark:text-gray-200'>補正値入力:
          <input className="mx-3" type="checkbox" name="補正" id="adj" checked={isChecked} onChange={() => handleIsAdj()} />
        </label>
      </div>
      <div className="flex items-center w-full gap-2">
        <input
          className='block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring'
          id={label}
          type="number"
          value={stock}
          onChange={(e) => handleInputChange(e)}
          min={min}
          max={max}
          step={step}
        />
        {isChecked && <>
          =
          <input
            className='block w-full px-2 py-2 mt-2 text-sm text-gray-700 bg-white border border-gray-200 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring'
            id="adj"
            value={adjustment}
            type="number"
            max={max}
            min={min}
            step={step}
            onChange={(e) => handleAdjChange(e)}
          />
          <label className="w-fit">{"=" + num}</label>
        </>
        }
      </div>
      {validation.isNumBig && validation.numBigMsg}
      {validation.isNumSmall && validation.numSmallMsg}
    </div>
  )
}

export default Input
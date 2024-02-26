import { useState } from "react";

type Props = {
  label: string;
  items: Items;
  setValue: (e: string) => void;
  defaultValue?: string;
  optionSetValue?: (e: string) => void
}

type Items = {
  [key: string]: {
    value: string;
    value2?: string;
    corner?: string;
    firstSurface?: string;
  }
};


function Select({ label, items, setValue, defaultValue, optionSetValue }: Props) {
  const [isChecked, setIsChecked] = useState<boolean>(false);
  const [stock, setStock] = useState<string>("");
  const [adjustment, setAdjustment] = useState<string>("0");

  const SelectItems = Object.keys(items).map((item) => {
    return (
      <option value={item} key={item}>
        {items[item].value !== item && item + " : "}{items[item].value}
      </option>
    )
  })

  function handleChange(e: React.ChangeEvent<HTMLSelectElement>) {
    const item = items[e.target.value];
    if (typeof item.value2 === "string" && typeof item.corner === "string" && optionSetValue) {
      optionSetValue(JSON.stringify(item));
    }
    setValue(item.value);
    setStock(item.value);
  }

  function handleInputChange(e: React.ChangeEvent<HTMLInputElement>) {
    setAdjustment(e.target.value);
    setValue((+stock + +e.target.value).toFixed(3));
  }
  function handleAdjChange() {
    setIsChecked(!isChecked)
    if (isChecked === true) {
      setValue(stock);
    } else {
      setValue((+stock + +adjustment).toFixed(3));
    }
  }

  return (
    <div className='flex flex-col items-start px-3 mt-1 sm:mt-3'>
      <div className="flex w-full justify-between">
        <label htmlFor={label} className='text-gray-700 dark:text-gray-200'>{label}</label>
        <label htmlFor={label} className='text-gray-700 dark:text-gray-200'>補正値入力:
          <input className="mx-3" type="checkbox" name="補正" id="adj" checked={isChecked} onChange={() => handleAdjChange()} />
        </label>
      </div>
      <div className="flex items-center w-full gap-2">
        <select className={`block w-full sm:w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring`} onChange={e => handleChange(e)} defaultValue={defaultValue}>
          {SelectItems}
        </select>
        {isChecked && <>
          =
          <input
            className='block w-full px-2 py-2 mt-2 text-sm text-gray-700 bg-white border border-gray-200 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring'
            id="adj"
            value={adjustment}
            type="number"
            max={45}
            maxLength={5}
            min={0.001}
            step={0.001}
            onChange={(e) => handleInputChange(e)}
          />
          <label className="w-fit">{"=" + (+stock + +adjustment).toFixed(3)}</label>
        </>
        }
      </div>

    </div>
  )
}

export default Select
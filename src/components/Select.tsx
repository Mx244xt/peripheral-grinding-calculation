type Props = {
  label: string;
  items: Items[];
  setValue: (e: string) => void;
}

type Items = {
  id: number;
  value: string;
  symbol?: string;
  value2?: string;
  corner?: string;
};


function Select({ label, items, setValue }: Props) {

  const SelectItems = items.map((item: Items) => {
    return (
      <option value={item.value} key={item.id}>
        {item.symbol && item.symbol + " : "}{item.value}
      </option>
    );
  });

  function handleChange(e: React.ChangeEvent<HTMLSelectElement>) {
    console.log(e.target.value);
    setValue(e.target.value);
  }

  return (
    <div className='flex flex-col items-start px-3 mt-1 sm:mt-3'>
      <label htmlFor={label} className='text-gray-700 dark:text-gray-200'>{label}</label>
      <select className='block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring' onChange={e => handleChange(e)}>
        {SelectItems}
      </select>
    </div>
  )
}

export default Select
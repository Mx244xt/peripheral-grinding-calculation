type Props = {
  label: string;
  num: string;
  setNum: (e: string) => void;
  max?: number;
  min?: number;
  step?: number;
}

function Input({ label, num, setNum, max = 45, min = 0.001, step = 0.001 }: Props) {
  function input(e: React.ChangeEvent<HTMLInputElement>) {
    if (typeof e.target.value === 'string') {
      setNum(e.target.value);
    }
  }

  return (
    <div className='flex flex-col items-start px-3 mt-1 sm:mt-3'>
      <label htmlFor={label} className='text-gray-700 dark:text-gray-200'>{label}</label>
      <input
        className='block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring'
        id={label}
        type="number"
        value={num}
        onChange={(e) => input(e)}
        min={min}
        max={max}
        step={step}
      />
    </div>
  )
}

export default Input
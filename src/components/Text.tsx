type Props = {
  label: string;
  anser: string;
  description: string;
}

function Text({ label, anser, description }: Props) {

  return (
    <div className="flex flex-col items-start pl-3 pr-3 mt-1 sm:mt-3">
      <label htmlFor={label} className="mt-2 text-lg text-gray-700 dark:text-gray-200">{label}</label>
      <label className="block w-full px-4 py-2 mt-1 text-gray-500 bg-gray-200 dark:bg-gray-800 dark:text-gray-300">{anser != "NaN" ? anser + "mm" : "計算できません。"}</label>
      <label htmlFor={description} className="text-gray-700 dark:text-gray-200">{description}</label>
    </div>
  )
}

export default Text
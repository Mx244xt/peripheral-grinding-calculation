type Props = {
  label: string;
  anser: string;
  description: string;
}

function Text({ label, anser, description }: Props) {

  return (
    <div className="flex flex-col">
      <label htmlFor={label} className="text-gray-700 dark:text-gray-200">{label}</label>
      <label className="block w-full px-4 py-2 mt-2 text-gray-500 bg-gray-200 dark:bg-gray-800 dark:text-gray-300">{anser}mm</label>
      <label htmlFor={description} className="text-gray-700 dark:text-gray-200">{description}</label>
    </div>
  )
}

export default Text
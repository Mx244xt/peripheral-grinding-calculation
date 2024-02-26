import { useState } from "react";

function Header() {
  const [isHamburger, setIsHamburger] = useState<boolean>(true);

  return (
    <div className="flex justify-between items-center sticky top-0 z-10 p-5 w-full h-14 bg-white border-t-4 border-t-red-600 border-b-2 border-b-gray-100 dark:bg-black dark:border-t-cyan-300	">
      <div>Icon</div>
      <button className="w-8 h-8 cursor-pointer relative" onClick={() => setIsHamburger(!isHamburger)}>
        <span className={`disabled: bg-black dark:bg-white absolute left-0  w-8 h-1 rounded transition ${isHamburger ? " top-2" : "top-4 origin-center rotate-45 "}`}></span>
        <span className={`disabled: bg-black dark:bg-white absolute left-1 w-6 h-1 rounded transition ${isHamburger ? " top-4" : "top-4 origin-center opacity-0 "}`}></span>
        <span className={`disabled: bg-black dark:bg-white absolute left-0  w-8 h-1 rounded transition ${isHamburger ? " top-6" : "top-4 origin-center -rotate-45 "}`}></span>
      </button>
    </div>
  )
}

export default Header
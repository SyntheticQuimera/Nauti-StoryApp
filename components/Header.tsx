import React from "react";

const Header = () => {
  return (
    <header className='border-b fixed z-[101] bg-white w-full py-2 px-8'>
      <div className='flex items-center justify-between'>
        <div className='flex gap-10'>
          <a>
            <img src='/nautiLogo.svg' alt='Nauti Logo' className='w-36' />
          </a>
          <ul className='items-center hidden lg:flex justify-center gap-8 text-base font-semibold text-slate-800'>
            <li>Create a history</li>
            <li>How to use?</li>
            <li>Explore</li>
          </ul>
        </div>
        <button className='text-base font-semibold px-8 py-2 bg-yellow-200 rounded-full text-slate-800'>
          Log in
        </button>
      </div>
    </header>
  );
};

export default Header;

import React from "react";

const Header = () => {
  return (
    <header className='static z-[101] w-full border-b bg-white py-2 px-8'>
      <div className='flex items-center justify-between'>
        <div className='flex gap-10'>
          <a>
            <img src='/nautiLogo.svg' alt='Nauti Logo' className='w-36' />
          </a>
          {/* <ul className='hidden items-center justify-center gap-8 text-base font-semibold text-slate-800 lg:flex'>
            <li>Create a history</li>
            <li>How to use?</li>
            <li>Explore</li>
          </ul> */}
        </div>
        {/* <button className='rounded-full bg-yellow-200 px-8 py-2 text-base font-semibold text-slate-800'>
          Log in
        </button> */}
      </div>
    </header>
  );
};

export default Header;

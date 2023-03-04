import { useEffect, useState } from "react";

const LandingParallax = () => {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    let animationFrameId: number;

    const handleScroll = () => {
      cancelAnimationFrame(animationFrameId);
      animationFrameId = requestAnimationFrame(() => {
        setScrollY(window.scrollY);
      });
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  const parallaxStyle = (zIndex: number, speed: number) => ({
    transform: `translateY(${-scrollY * speed}px)`,
    zIndex,
  });
  return (
    <div className='w-full lg:scale-100 scale-[2] lg:top-0 top-64 relative h-screen  overflow-hidden flex justify-start items-start'>
      <img
        src='/landingPage/landingZ10.png'
        alt='Nauti Logo'
        className='absolute lg:-top-20 w-full'
        style={parallaxStyle(10, 0.1)}
      />
      <img
        src='/landingPage/landingZ20.svg'
        alt='Nauti Logo'
        className='absolute lg:-top-20 w-full'
        style={parallaxStyle(20, 0.4)}
      />
      <img
        src='/landingPage/landingZ30.svg'
        alt='Nauti Logo'
        className='absolute lg:-top-20 w-full'
        style={parallaxStyle(30, 0.6)}
      />
      <img
        src='/landingPage/landingZ40.svg'
        alt='Nauti Logo'
        className='absolute lg:-top-20 w-full'
        style={parallaxStyle(40, 0.66)}
      />
      <img
        src='/landingPage/landingZ50.svg'
        alt='Nauti Logo'
        className='absolute lg:-top-20 w-full'
        style={parallaxStyle(50, 0.72)}
      />
      <img
        src='/landingPage/landingZ60.svg'
        alt='Nauti Logo'
        className='absolute lg:-top-20 w-full'
        style={parallaxStyle(60, 0.8)}
      />
      <img
        src='/landingPage/landingZ70.svg'
        alt='Nauti Logo'
        className='absolute lg:-top-20 w-full'
        style={parallaxStyle(70, 0.9)}
      />
      <img
        src='/landingPage/landingZ80.svg'
        alt='Nauti Logo'
        className='absolute lg:-top-48 w-full'
        style={parallaxStyle(80, 1)}
      />
    </div>
  );
};

export default LandingParallax;

import { useState, useEffect } from "react";
import ModelForm from "./ModelForm";

const UploadForm = () => {
  const [imageSrc, setImageSrc] = useState();
  const [uploadData, setUploadData] = useState();
  const [tags, setTags] = useState<[]>([]);

  //   useEffect(() => {
  //     const run = async () => {
  //       const data = await fetch("/api/tags").then((r) => r.json());
  //       setTags(data.tags);
  //     };
  //     run();
  //   }, []);

  const handleOnChange = (changeEvent: any) => {
    const reader = new FileReader();

    reader.onload = (onLoadEvent: any) => {
      setImageSrc(onLoadEvent.target.result);
      setUploadData(undefined);
    };

    reader.readAsDataURL(changeEvent.target.files[0]);
  };

  const handleOnSubmit = async (event: any) => {
    event.preventDefault();

    const data = await fetch("/api/upload", {
      method: "POST",
      body: JSON.stringify({
        image: imageSrc,
      }),
    }).then((r) => r.json());
    setImageSrc(data.secure_url);
    setUploadData(data);
    setTags(data.tags);
  };

  return (
    <div className='gap-16 relative flex-col px-16 items-center justify-center text-center flex min-h-screen py-32 bg-[#06283d] w-full'>
      <h1 className='text-4xl md:text-6xl font-bold text-white'>
        Welcome let's create a story!
      </h1>
      <div className='md:w-[60%] flex flex-col gap-4 p-8 rounded-3xl bg-white drop-shadow-2xl justify-center items-center'>
        <form method='post' onChange={handleOnChange} onSubmit={handleOnSubmit}>
          {!imageSrc && (
            <label className='text-xl flex cursor-pointer min-w-max font-bold px-8 py-4 bg-yellow-200 rounded-full text-slate-800'>
              <p>Add a image!</p>
              <input className='h-0 w-0' type='file' name='file' />
            </label>
          )}
          {imageSrc && (
            <div className='flex justify-center items-center flex-col gap-4'>
              <img className='object-contain rounded-2xl' src={imageSrc} />
              {!uploadData && (
                <button className='text-xl flex cursor-pointer min-w-max font-bold px-8 py-4 bg-yellow-200 rounded-full text-slate-800'>
                  <p>Upload File</p>
                </button>
              )}
            </div>
          )}
        </form>

        {uploadData && Array.isArray(tags) && (
          <ul className='flex flex-wrap justify-center list-none p-0 m-0'>
            {tags.map((tag: any) => {
              return (
                <li
                  key={tag}
                  className='m-2 bg-slate-200 justify-center flex items-center font-semibold rounded-full text-xs px-3 py-2'>
                  <button>{tag}</button>
                </li>
              );
            })}
          </ul>
        )}
        {uploadData && <ModelForm tags={tags} />}
      </div>
    </div>
  );
};

export default UploadForm;

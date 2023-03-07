import { useState } from "react";
import ModelForm from "./ModelForm";
import { FiTrash2 } from "react-icons/fi";
import { SyncLoader } from "react-spinners";
import { RootState } from "../context/store";
import { useDispatch, useSelector } from "react-redux";
import { increment, restore, decrement } from "../context/features/stepsSlice";
import { updateTags } from "../context/features/tagsSlice";
import { steps } from "../utils/data";
import { restoreStory, updateStory } from "../context/features/storySlice";
import { RiDoubleQuotesL, RiDoubleQuotesR } from "react-icons/ri";

const UploadForm = () => {
  const [imageSrc, setImageSrc] = useState<string>("");
  const [isLoading, setIsLoading] = useState(false);
  const currentStep = useSelector((state: RootState) => state.step.value);
  const currentStory = useSelector((state: RootState) => state.story.value);

  const dispatch = useDispatch();

  const handleOnChange = (changeEvent: any) => {
    const reader = new FileReader();

    reader.onload = (onLoadEvent: any) => {
      setImageSrc(onLoadEvent.target.result);
    };

    reader.readAsDataURL(changeEvent.target.files[0]);
  };

  const handleOnSubmit = async (event: any) => {
    event.preventDefault();
    setIsLoading(true);
    const data = await fetch("/api/upload", {
      method: "POST",
      body: JSON.stringify({
        image: imageSrc,
      }),
    }).then((r) => r.json());
    setIsLoading(false);
    setImageSrc(data.secure_url);
    dispatch(updateTags(data.tags));
    dispatch(increment());
  };

  const handleOnChangeStory = (event: any) => {
    const value = event.target.value;
    dispatch(updateStory(value));
  };

  // const handleDownloadImage = () => {
  //   const link = document.createElement("a");
  //   link.download = "imagen.png";
  //   link.href = imageSrc;
  //   link.target = "_blank";
  //   link.click();
  // };
  
  const handleCopyToClipboard = () => {
    navigator.clipboard.writeText(currentStory);
  };
  return (
    <div className='relative flex min-h-screen w-full flex-col items-center justify-center gap-16 pt-16 text-center'>
      <div className='relative flex min-h-[400px] w-full flex-col items-center gap-8 rounded-3xl bg-white p-8 drop-shadow-2xl md:w-[60%]'>
        <div className='flex w-full justify-evenly self-start'>
          {steps.map((step) => (
            <div
              key={step.number}
              className={`flex h-14 w-14 items-center justify-center rounded-full text-lg font-bold ${
                currentStep >= step.number
                  ? "bg-yellow-200 text-slate-800"
                  : "bg-slate-200 text-slate-500"
              }`}>
              {step.number}
            </div>
          ))}
        </div>
        {isLoading ? (
          <SyncLoader color='rgb(30, 41, 59)' className='mt-[15%]' />
        ) : (
          <>
            {currentStep == 1 && (
              <form
                onChange={handleOnChange}
                method='post'
                onSubmit={handleOnSubmit}
                className='space-y-8'>
                {!imageSrc && (
                  <label className='mt-[50%] flex min-w-max cursor-pointer rounded-full bg-yellow-200 px-8 py-4 text-xl font-bold text-slate-800'>
                    <p>Add Image</p>
                    <input className='h-0 w-0' type='file' name='file' />
                  </label>
                )}
                {imageSrc && (
                  <>
                    <div className='relative'>
                      <div
                        onClick={() => {
                          setImageSrc("");
                          dispatch(restore());
                          dispatch(restoreStory());
                        }}
                        className='absolute right-4 bottom-4 cursor-pointer rounded-full bg-red-600 p-2 drop-shadow-lg'>
                        <FiTrash2 className='text-xl text-white' />
                      </div>
                      <img
                        className='w-full rounded-2xl object-contain'
                        src={imageSrc}
                      />
                    </div>
                    <div className='flex w-full items-end justify-end'>
                      <button className=' button-form w-fit'>
                        <p>Next</p>
                      </button>
                    </div>
                  </>
                )}
              </form>
            )}
            {currentStep == 2 && (
              <div className='flex w-full flex-col items-center justify-center space-y-8'>
                <div className='relative flex w-full'>
                  <div
                    onClick={() => {
                      setImageSrc("");
                      dispatch(restore());
                      dispatch(restoreStory());
                    }}
                    className='absolute right-4 bottom-4 cursor-pointer rounded-full bg-red-600 p-2 drop-shadow-lg'>
                    <FiTrash2 className='text-xl text-white' />
                  </div>
                  <img
                    className='w-full rounded-2xl object-contain'
                    src={imageSrc}
                  />
                </div>
                <ModelForm />
              </div>
            )}
            {currentStep == 3 && (
              <div>
                <div className='flex w-full flex-col items-end justify-center space-y-8'>
                  <div className='relative flex w-full'>
                    <div
                      onClick={() => {
                        setImageSrc("");
                        dispatch(restore());
                        dispatch(restoreStory());
                      }}
                      className='absolute right-4 bottom-4 cursor-pointer rounded-full bg-red-600 p-2 drop-shadow-lg'>
                      <FiTrash2 className='text-xl text-white' />
                    </div>
                    <img
                      className='w-full rounded-2xl object-contain'
                      src={imageSrc}
                    />
                  </div>
                  <textarea
                    className='textarea-form'
                    rows={Math.ceil(currentStory.length / 50)}
                    value={currentStory}
                    onChange={handleOnChangeStory}
                  />
                  <div className='flex w-full items-center justify-between'>
                    <button
                      onClick={() => dispatch(decrement())}
                      className=' button-form w-fit'>
                      <p>Back</p>
                    </button>
                    <button
                      onClick={() => dispatch(increment())}
                      className=' button-form w-fit'>
                      <p>Next</p>
                    </button>
                  </div>
                </div>
              </div>
            )}
            {currentStep == 4 && (
              <div className='flex w-full flex-col items-end justify-center space-y-8'>
                <div className='relative flex w-full'>
                  <img
                    className='w-full rounded-2xl object-contain'
                    src={imageSrc}
                  />
                </div>
                <div className='flex flex-col items-end gap-8 '>
                  <div className='relative flex w-full px-2 pt-8 pb-12'>
                    <RiDoubleQuotesL className='absolute top-0 -left-2 text-4xl text-slate-800' />
                    <p className='inline-block  whitespace-pre-line text-justify indent-8 text-base font-semibold leading-relaxed text-slate-800'>
                      {currentStory}
                    </p>
                    <RiDoubleQuotesR className='absolute bottom-0 -right-2 text-4xl text-slate-800' />
                  </div>
                </div>

                <div className='flex w-full items-center justify-between'>
                  {/* <button
                    onClick={handleDownloadImage}
                    className=' button-form w-fit'>
                    <p>Download Image</p>
                  </button> */}
                  <button
                    onClick={() => dispatch(decrement())}
                    className=' button-form w-fit'>
                    <p>Back</p>
                  </button>
                  <button
                    onClick={handleCopyToClipboard}
                    className=' button-form w-fit'>
                    <p>Copy to clipboard</p>
                  </button>
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default UploadForm;

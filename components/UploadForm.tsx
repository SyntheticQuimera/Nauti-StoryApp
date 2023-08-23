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
    <div className="relative flex min-h-screen w-full flex-col items-center justify-center gap-16 pt-16 text-center">
      <div className="relative flex min-h-[400px] w-full flex-col items-center gap-8 md:w-[60%]">
        <ul className="steps w-full">
          {steps.map((step) => (
            <li
              key={step.number}
              className={`step ${
                currentStep >= step.number ? "step-primary" : ""
              }`}
            ></li>
          ))}
        </ul>
        {isLoading ? (
          <SyncLoader color="#65c3c8" className="mt-[15%]" />
        ) : (
          <>
            {currentStep == 1 && (
              <form
                onChange={handleOnChange}
                method="post"
                onSubmit={handleOnSubmit}
                className="space-y-8"
              >
                {!imageSrc && (
                  <div className="flex flex-col items-center justify-center gap-6">
                    <p className="text-4xl font-bold">
                      Let&#39;s create a story
                    </p>
                    <p className="text-lg font-semibold">
                      Nauti work more effectively with pictures of places such
                      as streets, parks, and landscapes. max size 4mb.
                    </p>
                    <label className="btn-secondary rounded-box btn-lg btn">
                      <p>Add Image</p>
                      <input className="h-0 w-0" type="file" name="file" />
                    </label>
                  </div>
                )}
                {imageSrc && (
                  <>
                    <div className="relative">
                      <div
                        onClick={() => {
                          setImageSrc("");
                          dispatch(restore());
                          dispatch(restoreStory());
                        }}
                        className="btn-error btn-circle btn absolute right-4 bottom-4"
                      >
                        <FiTrash2 className="text-xl" />
                      </div>
                      <img
                        className="rounded-box w-full object-contain"
                        src={imageSrc}
                      />
                    </div>
                    <div className="flex w-full items-end justify-end">
                      <button className="btn-secondary rounded-box btn">
                        Next
                      </button>
                    </div>
                  </>
                )}
              </form>
            )}
            {currentStep == 2 && (
              <div className="flex w-full flex-col items-center justify-center space-y-8">
                <p className="text-lg font-bold">
                  Now, you can either add specifications to your story or let
                  Nauti handle the rest.
                </p>
                <div className="relative flex w-full">
                  <div
                    onClick={() => {
                      setImageSrc("");
                      dispatch(restore());
                      dispatch(restoreStory());
                    }}
                    className="btn-error btn-circle btn absolute right-4 bottom-4"
                  >
                    <FiTrash2 className="text-xl" />
                  </div>
                  <img
                    className="rounded-box w-full object-contain"
                    src={imageSrc}
                  />
                </div>
                <ModelForm />
              </div>
            )}
            {currentStep == 3 && (
              <div className="flex w-full flex-col items-end justify-center space-y-8">
                <p className="text-lg font-bold text-slate-800">
                  You can edit the content and improve it according to your
                  preferences.
                </p>
                <div className="relative flex w-full">
                  <div
                    onClick={() => {
                      setImageSrc("");
                      dispatch(restore());
                      dispatch(restoreStory());
                    }}
                    className="btn-error btn-circle btn absolute right-4 bottom-4"
                  >
                    <FiTrash2 className="text-xl" />
                  </div>
                  <img
                    className="rounded-box w-full object-contain"
                    src={imageSrc}
                  />
                </div>
                <div className="flex w-full overflow-hidden">
                  <textarea
                    className="textarea-bordered textarea rounded-box w-full"
                    rows={Math.ceil(currentStory.length / 100)}
                    value={currentStory}
                    onChange={handleOnChangeStory}
                  />
                </div>
                <div className="flex w-full items-center justify-between">
                  <button
                    onClick={() => dispatch(decrement())}
                    className="btn-outline rounded-box btn"
                  >
                    <p>Back</p>
                  </button>
                  <button
                    onClick={() => dispatch(increment())}
                    className="btn-secondary rounded-box btn"
                  >
                    <p>Next</p>
                  </button>
                </div>
              </div>
            )}
            {currentStep == 4 && (
              <div className="flex w-full flex-col items-end justify-center space-y-8">
                <div className="relative flex w-full">
                  <img
                    className="w-full rounded-2xl object-contain"
                    src={imageSrc}
                  />
                </div>
                <div className="flex flex-col items-end gap-8 ">
                  <div className="relative flex w-full px-2 pt-8 pb-12">
                    <RiDoubleQuotesL className="absolute top-0 -left-2 text-4xl text-neutral" />
                    <p className="inline-block  whitespace-pre-line text-justify indent-8 text-base font-semibold leading-relaxed">
                      {currentStory}
                    </p>
                    <RiDoubleQuotesR className="absolute bottom-0 -right-2 text-4xl text-neutral" />
                  </div>
                </div>

                <div className="flex w-full items-center justify-between">
                  {/* <button
                    onClick={handleDownloadImage}
                    className=' button-form w-fit'>
                    <p>Download Image</p>
                  </button> */}
                  <button
                    onClick={() => dispatch(decrement())}
                    className="btn-outline rounded-box btn"
                  >
                    <p>Back</p>
                  </button>
                  <button
                    onClick={handleCopyToClipboard}
                    className="btn-secondary rounded-box btn"
                  >
                    Copy to clipboard
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

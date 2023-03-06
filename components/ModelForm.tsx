import React, { useState } from "react";
import { Field, Form, Formik } from "formik";
import { ending, storyLength, subgenre, language } from "../utils/data";
import { RiDoubleQuotesL, RiDoubleQuotesR } from "react-icons/ri";
import { SyncLoader } from "react-spinners";
import { FiChevronDown, FiPlus, FiTrash2 } from "react-icons/fi";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../context/store";
import { restoreStory, updateStory } from "../context/features/storySlice";
import { decrement, increment } from "../context/features/stepsSlice";

interface FormValues {
  literarySubgenre: string;
  ending: string;
  storyLength: string;
  language: string;
  newCharacter: string;
  characters: [];
}
const ModelForm = () => {
  const [isLoading, setIsLoading] = useState(false);
  const currentStory = useSelector((state: RootState) => state.story.value);
  const currentTags = useSelector((state: RootState) => state.tags.value);

  const dispatch = useDispatch();

  const chatGPT = async (prompt: string) => {
    setIsLoading(true);
    const data = await fetch("/api/modelGPT", {
      method: "POST",
      body: JSON.stringify({
        prompt: prompt,
      }),
    }).then((r) => r.json());

    dispatch(updateStory(data.content));
    setIsLoading(false);
  };

  const initialValues: FormValues = {
    literarySubgenre: "",
    storyLength: "",
    ending: "",
    language: "",
    newCharacter: "",
    characters: [],
  };

  return (
    <div className='flex w-full flex-col gap-4'>
      <ul className='m-0 flex list-none flex-wrap justify-center p-0'>
        {currentTags.map((tag: any) => {
          return (
            <li
              key={tag}
              className='m-2 flex items-center justify-center rounded-full bg-slate-200 px-3 py-2 text-xs font-semibold'>
              <button>{tag}</button>
            </li>
          );
        })}
      </ul>
      {currentTags.length > 0 && (
        <Formik
          initialValues={initialValues}
          onSubmit={(values, actions) => {
            chatGPT(
              `in the scenario there is:${currentTags.join(", ")}
                  write literary work, 
                  ${
                    values.literarySubgenre.length > 1
                      ? "literary subgenre: " + values.literarySubgenre + ","
                      : ""
                  }
                  ${
                    values.characters.length > 1
                      ? "characters: " + values.characters + ","
                      : ""
                  }
                  ${
                    values.ending.length > 1
                      ? "kind of ending: " + values.ending + ","
                      : ""
                  } 
                  ${
                    values.storyLength.length > 1
                      ? "use an amount of " +
                        values.storyLength +
                        " letters and blank spaces,"
                      : "use an amount of of 2200 letters and blank spaces,"
                  }

                  ${
                    values.language.length > 1
                      ? "language: " + values.language
                      : ""
                  }
                  `
            );
            actions.setSubmitting(false);
          }}>
          {({ values, setFieldValue }) => (
            <Form className='flex w-full flex-col gap-6'>
              <div className='flex w-full flex-col gap-6 lg:flex-row'>
                <div className='field-container relative'>
                  <label className='label-form' htmlFor='literarySubgenre'>
                    Literary Subgenre
                  </label>
                  <Field
                    as='select'
                    className='input-form e cursor-pointer appearance-none '
                    id='literarySubgenre'
                    name='literarySubgenre'>
                    <option
                      className='text-lg font-semibold text-slate-400'
                      value=''>
                      --Please choose a subgenre--
                    </option>
                    {subgenre.map((subgenre) => (
                      <option
                        className='text-lg font-semibold text-slate-800'
                        key={subgenre}
                        value={subgenre}>
                        {subgenre}
                      </option>
                    ))}
                  </Field>
                  <FiChevronDown className='pointer-events-none absolute right-3 bottom-3 text-lg text-slate-800' />
                </div>
                <div className='field-container relative'>
                  <label className='label-form' htmlFor='storyLength'>
                    Story length
                  </label>
                  <Field
                    as='select'
                    className='input-form cursor-pointer appearance-none'
                    id='storyLength'
                    name='storyLength'>
                    <option
                      className='text-lg font-semibold text-slate-400'
                      value=''>
                      --Please choose a length--
                    </option>
                    {storyLength.map((length) => (
                      <option
                        className='text-lg font-semibold text-slate-800'
                        key={length.name}
                        value={length.value}>
                        {length.name}
                      </option>
                    ))}
                  </Field>
                  <FiChevronDown className='pointer-events-none absolute right-3 bottom-3 text-lg text-slate-800' />
                </div>
              </div>
              <div className='flex w-full flex-col gap-6 lg:flex-row'>
                <div className='field-container relative'>
                  <label className='label-form' htmlFor='ending'>
                    Kind of ending
                  </label>
                  <Field
                    as='select'
                    className='input-form cursor-pointer appearance-none'
                    id='ending'
                    name='ending'>
                    <option
                      className='text-lg font-semibold text-slate-400'
                      value=''>
                      --Please choose a ending--
                    </option>
                    {ending.map((ending) => (
                      <option
                        className='text-lg font-semibold text-slate-800'
                        key={ending}
                        value={ending}>
                        {ending}
                      </option>
                    ))}
                  </Field>
                  <FiChevronDown className='pointer-events-none absolute right-3 bottom-3 text-lg text-slate-800' />
                </div>

                <div className='field-container relative'>
                  <label className='label-form' htmlFor='language'>
                    Language
                  </label>
                  <Field
                    as='select'
                    className='input-form cursor-pointer appearance-none'
                    id='language'
                    name='language'>
                    <option
                      className='text-lg font-semibold text-slate-400'
                      value=''>
                      --Please choose a language--
                    </option>
                    {language.map((language) => (
                      <option
                        className='text-lg font-semibold text-slate-800'
                        key={language}
                        value={language}>
                        {language}
                      </option>
                    ))}
                  </Field>
                  <FiChevronDown className='pointer-events-none absolute right-3 bottom-3 text-lg text-slate-800' />
                </div>
              </div>

              {/* Characters */}
              <div className='flex items-center gap-4'>
                <div className='field-container'>
                  <label className='label-form' htmlFor='newCharacter'>
                    Characters:
                  </label>
                  <Field
                    className='input-form'
                    name='newCharacter'
                    type='text'
                    placeholder='Enter new character'
                  />
                </div>
                <button
                  className='mt-7 h-fit w-fit rounded-full bg-lime-500 p-3'
                  type='button'
                  onClick={() => {
                    setFieldValue("characters", [
                      ...values.characters,
                      values.newCharacter,
                    ]);
                    setFieldValue("newCharacter", "");
                  }}>
                  <FiPlus className='text-xl text-white' />
                </button>
              </div>
              <div className='field-container'>
                {values.characters.map((character, index) => (
                  <div
                    key={index}
                    className='flex items-center justify-around gap-4 px-6 py-3'>
                    <Field
                      className='w-full border-separate border-b-2 border-slate-800 p-2 text-lg font-semibold text-slate-800 outline-none'
                      name={`characters.${index}`}
                      type='text'
                      placeholder={`Enter character ${index + 1}`}
                    />
                    <button
                      className='h-fit w-fit rounded-full bg-red-600 p-2'
                      type='button'
                      onClick={() => {
                        const newCharacters = [...character];
                        newCharacters.splice(index, 1);
                        setFieldValue("characters", newCharacters);
                      }}>
                      <FiTrash2 className='text-lg text-white' />
                    </button>
                  </div>
                ))}
              </div>
              <button className='button-form w-full items-center justify-center'>
                {!currentStory ? (
                  <p>Create a story</p>
                ) : (
                  <p>Regenerate story</p>
                )}
              </button>
            </Form>
          )}
        </Formik>
      )}
      <div className='flex items-center justify-center'>
        {isLoading ? (
          <SyncLoader color='rgb(30, 41, 59)' className='my-[20%]' />
        ) : (
          <>
            {currentStory && (
              <div className='flex flex-col items-end gap-8 '>
                <div className='relative flex w-full px-2 pt-8 pb-12'>
                  <RiDoubleQuotesL className='absolute top-0 -left-2 text-4xl text-slate-800' />
                  <p className='inline-block  whitespace-pre-line text-justify indent-8 text-base font-semibold leading-relaxed text-slate-800'>
                    {currentStory}
                  </p>
                  <RiDoubleQuotesR className='absolute bottom-0 -right-2 text-4xl text-slate-800' />
                </div>
                <div className='flex w-full items-center justify-between'>
                  <button
                    onClick={() => {
                      dispatch(decrement());
                      dispatch(restoreStory());
                    }}
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
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default ModelForm;

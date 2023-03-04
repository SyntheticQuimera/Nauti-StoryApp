import React, { useState } from "react";
import { Field, Form, Formik, useFormik } from "formik";

interface Props {
  tags: [];
}
interface FormValues {
  literarySubgenre: string;
  characters: string;
  storyteller: string;
  tone: string;
}
const ModelForm = ({ tags }: Props) => {
  const [message, setMessage] = useState<string>("");

  const chatGPT = async (prompt: string) => {
    const data = await fetch("/api/modelGPT", {
      method: "POST",
      body: JSON.stringify({
        prompt: prompt,
      }),
    }).then((r) => r.json());
    setMessage(data.content);
  };

  const initialValues: FormValues = {
    literarySubgenre: "",
    characters: "",
    storyteller: "",
    tone: "",
  };

  return (
    <div className='flex flex-col w-full gap-4'>
      {tags.length > 0 && (
        <Formik
          initialValues={initialValues}
          onSubmit={(values, actions) => {
            console.log({ values, actions });
            alert(JSON.stringify(values, null, 2));
            chatGPT(
              `in the scenario there is:${tags.join(", ")}
                  write a story, literary subgenre: ${
                    values.literarySubgenre
                  }, characters: ${values.characters},
                  storyteller: ${values.storyteller}, tone: ${
                values.tone
              } minimum 3000 characters
                  `
            );
            actions.setSubmitting(false);
          }}>
          <Form className='flex flex-col w-full gap-6'>
            <div className='flex gap-6 w-full flex-col md:flex-row'>
              <div className='field-container '>
                <label className='label-form' htmlFor='literarySubgenre'>
                  Literary Subgenre
                </label>
                <Field
                  className='input-form'
                  id='literarySubgenre'
                  name='literarySubgenre'
                  placeholder='Literary Subgenre'
                />
              </div>
              <div className='field-container'>
                <label className='label-form' htmlFor='characters'>
                  Characters
                </label>
                <Field
                  className='input-form'
                  id='characters'
                  name='characters'
                  placeholder='Characters'
                />
              </div>
            </div>
            <div className='flex gap-6 w-full flex-col md:flex-row'>
              <div className='field-container'>
                <label className='label-form' htmlFor='storyteller'>
                  Storyteller
                </label>
                <Field
                  className='input-form'
                  id='storyteller'
                  name='storyteller'
                  placeholder='storyteller'
                />
              </div>
              <div className='field-container'>
                <label className='label-form' htmlFor='tone'>
                  tone
                </label>
                <Field
                  className='input-form'
                  id='tone'
                  name='tone'
                  placeholder='tone'
                />
              </div>
            </div>
            <button className='text-xl flex cursor-pointer w-full items-center justify-center font-bold px-8 py-4 bg-yellow-200 rounded-full text-slate-800'>
              <p>Create a story!</p>
            </button>
          </Form>
        </Formik>
      )}
      <>
        <p className='font-semibold indent-8 leading-relaxed text-justify whitespace-pre-line inline-block text-base text-slate-800'>
          {message}
        </p>
      </>
    </div>
  );
};

export default ModelForm;

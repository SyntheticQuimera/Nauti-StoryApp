import React, { useState } from "react";
import { Field, Form, Formik } from "formik";
import { ending, storyLength, subgenre, language } from "../utils/data";
import { RiDoubleQuotesL, RiDoubleQuotesR } from "react-icons/ri";
import { SyncLoader } from "react-spinners";
import { FiChevronDown, FiPlus, FiTrash2, FiX } from "react-icons/fi";
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

interface DynamicSelectProps {
  label: string;
  id: string;
  name: string;
  options: { value: string; name: string }[];
}

const DynamicSelect: React.FC<DynamicSelectProps> = ({
  label,
  id,
  name,
  options,
}) => {
  return (
    <div className="form-control w-full">
      <label className="label" htmlFor={id}>
        {label}
      </label>
      <Field
        as="select"
        className="select-bordered select w-full"
        id={id}
        name={name}
      >
        <option value="">--Random--</option>
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.name}
          </option>
        ))}
      </Field>
    </div>
  );
};

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
    <div className="flex w-full flex-col gap-4">
      <ul className="flex list-none flex-wrap gap-2">
        {currentTags.map((tag: any) => {
          return (
            <li key={tag} className="badge badge-outline">
              {tag}
            </li>
          );
        })}
      </ul>
      {currentTags.length > 0 && (
        <Formik
          initialValues={initialValues}
          onSubmit={(values, actions) => {
            const characterString = values.characters.join(", ");
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
                      ? "Cast: " + characterString + ","
                      : ""
                  }
                  ${
                    values.ending.length > 1
                      ? "kind of ending: " + values.ending + ","
                      : ""
                  } 
                  ${
                    values.storyLength.length > 1
                      ? "use an amount of " + values.storyLength + "characters"
                      : "use an amount of of 2200 characters and blank spaces,"
                  }

                  ${
                    values.language.length > 1
                      ? "language: " + values.language
                      : ""
                  }
                  `
            );
            actions.setSubmitting(false);
          }}
        >
          {({ values, setFieldValue }) => (
            <Form className="flex w-full flex-col gap-4">
              <div className="flex w-full flex-col gap-4 lg:flex-row">
                <DynamicSelect
                  label="Literary Subgenre"
                  id="literarySubgenre"
                  name="literarySubgenre"
                  options={subgenre.map((value) => ({ value, name: value }))}
                />
                <DynamicSelect
                  label="Story Length"
                  id="storyLength"
                  name="storyLength"
                  options={storyLength.map((option) => ({
                    value: option.value.toString(),
                    name: option.name,
                  }))}
                />
              </div>
              <div className="flex w-full flex-col gap-4 lg:flex-row">
                <DynamicSelect
                  label="Kind of Ending"
                  id="ending"
                  name="ending"
                  options={ending.map((value) => ({ value, name: value }))}
                />
                <DynamicSelect
                  label="Language"
                  id="language"
                  name="language"
                  options={language.map((value) => ({ value, name: value }))}
                />
              </div>

              {/* Characters */}
              <div className="form-control">
                <label className="label" htmlFor="newCharacter">
                  Characters:
                </label>
                <div className="join w-full">
                  <Field
                    className="input-bordered input join-item w-full"
                    name="newCharacter"
                    type="text"
                    placeholder="Enter new character"
                  />
                  <button
                    className="btn-success btn-circle join-item btn"
                    type="button"
                    onClick={() => {
                      setFieldValue("characters", [
                        ...values.characters,
                        values.newCharacter,
                      ]);
                      setFieldValue("newCharacter", "");
                    }}
                  >
                    <FiPlus className="text-xl" />
                  </button>
                </div>
              </div>
              <div className="form-control w-full">
                {values.characters.map((character, index) => (
                  <div key={index} className="join flex items-center pb-2">
                    <Field
                      className="input-bordered input join-item w-full"
                      name={`characters.${index}`}
                      type="text"
                      placeholder={`Enter character ${index + 1}`}
                    />
                    <button
                      className="btn-error btn-circle join-item btn"
                      type="button"
                      onClick={() => {
                        const newCharacters = values.characters.filter(
                          (_, i) => i !== index
                        );
                        setFieldValue("characters", newCharacters);
                      }}
                    >
                      <FiX className="text-lg" />
                    </button>
                  </div>
                ))}
              </div>
              <button
                type="submit"
                className="btn-secondary rounded-box btn w-full"
              >
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
      <div className="flex items-center justify-center">
        {isLoading ? (
          <SyncLoader color="#65c3c8" className="my-[20%]" />
        ) : (
          <>
            {currentStory && (
              <div className="flex flex-col items-end gap-8 ">
                <div className="relative flex w-full px-2 pt-8 pb-12">
                  <RiDoubleQuotesL className="absolute top-0 -left-2 text-4xl text-neutral" />
                  <p className="inline-block whitespace-pre-line text-justify indent-8 text-base font-semibold leading-relaxed">
                    {currentStory}
                  </p>
                  <RiDoubleQuotesR className="absolute bottom-0 -right-2 text-4xl text-neutral" />
                </div>
                <div className="flex w-full items-center justify-between">
                  <button
                    onClick={() => {
                      dispatch(decrement());
                      dispatch(restoreStory());
                    }}
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
          </>
        )}
      </div>
    </div>
  );
};

export default ModelForm;

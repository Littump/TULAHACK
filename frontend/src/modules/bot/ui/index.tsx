import { Form, Formik } from "formik";
import { useGetAnswer } from "@/modules/bot/api/useGetAnswer.ts";
import { useEffect, useState } from "react";
import TextInput from "@/ui/TextInput.tsx";

const Bot = () => {
  const { mutate, data, isError, isPending } = useGetAnswer();

  const [heading, setHeading] = useState<string>("");
  const [answer, setAnswer] = useState<string>("");
  useEffect(() => {
    if (!isPending && data && !isError) {
      writeMessage(data.data.text);
    }
  }, [data]);

  function writeMessage(text: string) {
    setAnswer("");
    const DELAY = 40;
    for (let i = 0; i < text.length; i++) {
      setTimeout(
        (function (char) {
          return function () {
            setAnswer((prev) => prev + char);
          };
        })(text[i]),
        i * DELAY,
      );
    }
  }

  const handleGetAnswer = (q: string) => {
    setHeading(q);
    mutate(q);
  };
  return (
    <Formik
      onSubmit={(values) => {
        handleGetAnswer(values.question);
      }}
      initialValues={{ question: "" }}
    >
      {() => {
        return (
          <Form className="flex flex-col gap-8 mt-10 fixed bottom-6 left-6 z-40">
            <div className="dropdown dropdown-top dropdown-right">
              <div
                tabIndex={0}
                role="button"
                className="w-20 h-20 btn bg-white rounded-full shadow-md"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-10 h-10"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M11.42 15.17 17.25 21A2.652 2.652 0 0 0 21 17.25l-5.877-5.877M11.42 15.17l2.496-3.03c.317-.384.74-.626 1.208-.766M11.42 15.17l-4.655 5.653a2.548 2.548 0 1 1-3.586-3.586l6.837-5.63m5.108-.233c.55-.164 1.163-.188 1.743-.14a4.5 4.5 0 0 0 4.486-6.336l-3.276 3.277a3.004 3.004 0 0 1-2.25-2.25l3.276-3.276a4.5 4.5 0 0 0-6.336 4.486c.091 1.076-.071 2.264-.904 2.95l-.102.085m-1.745 1.437L5.909 7.5H4.5L2.25 3.75l1.5-1.5L7.5 4.5v1.409l4.26 4.26m-1.745 1.437 1.745-1.437m6.615 8.206L15.75 15.75M4.867 19.125h.008v.008h-.008v-.008Z"
                  />
                </svg>
              </div>
              <div
                tabIndex={0}
                className="dropdown-content z-[1] card card-compact w-96 p-2 shadow bg-white "
              >
                <div className="card-body">
                  <h3 className="card-title text-primary">
                    Задайте свой вопрос нашему умному помощнику!
                  </h3>
                  <h4 className="text-lg font-bold pt-4 ">
                    {heading && heading + "?"}
                  </h4>
                  <p className=" text-lg">
                    {isPending ? <div className="loading"></div> : answer}
                  </p>
                  <TextInput
                    placeholder="Задайте свой вопрос"
                    name="question"
                    icon={
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="w-6 h-6"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M6 12 3.269 3.125A59.769 59.769 0 0 1 21.485 12 59.768 59.768 0 0 1 3.27 20.875L5.999 12Zm0 0h7.5"
                        />
                      </svg>
                    }
                    isError={false}
                  />
                </div>
              </div>
            </div>
          </Form>
        );
      }}
    </Formik>
  );
};

export default Bot;

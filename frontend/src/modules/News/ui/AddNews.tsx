import Modal from "@/ui/Modal.tsx";
import { useEffect, useState } from "react";
import { Form, Formik } from "formik";
import TextInput from "@/ui/TextInput.tsx";
import * as yup from "yup";

import { useAddNews } from "@/modules/News/api/useAddNews.ts";
import { LngLat } from "@yandex/ymaps3-types";
import SetLocation from "@/modules/News/ui/SetLocation.tsx";
import TextAreaInput from "@/ui/TextAreaInput.tsx";

const validationsSchema = yup.object().shape({
  title: yup.string().required("Введите достижение").min(3, "Неверно введёно"),
  text: yup.string().required("Введите описание").min(6, "Слишком короткое"),
  image: yup.string().required("Добавьте картинку"),
});
const Button = () => {
  return (
    <div className="flex gap-4 items-center mt-3 mb-8">
      <h2 className="text-2xl font-bold">Добавьте свою новость!</h2>
      <div className="bg-primary text-white rounded-full px-12 hover:bg-blue-600 btn">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-6 h-6 font-bold"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M12 4.5v15m7.5-7.5h-15"
          />
        </svg>
        Добавить
      </div>
    </div>
  );
};

interface IValues {
  title: string;
  text: string;
  image: string;
}

const initialValues: IValues = {
  title: "",
  text: "",
  image: "",
};

const AddNews = () => {
  const [markerIsError, setMarkerIsError] = useState<boolean>(false);
  const { mutate, isPending, isSuccess } = useAddNews();
  const [marker, setMarker] = useState<LngLat | undefined>();
  const [isModalOpen, setIsModalOpen] = useState(false);
  useEffect(() => {
    if (isSuccess) {
      setIsModalOpen(false);
    }
  }, [isSuccess]);
  const handleSetMarker = (point: LngLat) => {
    setMarker(point);
    setMarkerIsError(false);
  };
  return (
    <Modal
      isModalOpen={isModalOpen}
      setIsModalOpen={setIsModalOpen}
      heading={<Button />}
      className="w-[1000px] h-[540px] overflow-y-hidden"
    >
      <Formik
        validationSchema={validationsSchema}
        onSubmit={(values) => {
          if (marker) {
            mutate({
              ...values,
              latitude: +marker[1],
              longitude: +marker[0],
            });
          } else {
            setMarkerIsError(true);
          }
        }}
        initialValues={initialValues}
      >
        {({ setFieldValue, errors, touched }) => (
          <Form className="flex flex-col py-6">
            <h2 className="font-bold text-xl mb-4 mx-4">
              Добавьте мероприятие!
            </h2>

            <div className="flex gap-6">
              <div className="w-7/12">
                <SetLocation marker={marker} setMarker={handleSetMarker} />
              </div>
              <div>
                <span className=" font-semibold prose-sm">Картинка</span>
                <input
                  className={`w-full border rounded-full py-2 px-4 cursor-pointer my-1 ${
                    !!errors.image ? "border-red-500" : "border-primary "
                  }`}
                  name="image"
                  type="file"
                  onChange={(e) => {
                    setFieldValue(
                      "image",
                      e.currentTarget.files ? e.currentTarget.files[0] : "",
                    );
                  }}
                />

                <TextInput
                  label="Заголовок новости"
                  placeholder="Заголовок"
                  name="title"
                  isError={!!(errors.title && touched.title)}
                />
                <TextAreaInput
                  name="text"
                  isError={!!(errors.text && touched.text)}
                  label="Описание новости"
                  rows={4}
                ></TextAreaInput>

                <button type="submit" className="my-4 my-btn w-full">
                  {isPending ? (
                    <span className="loading"></span>
                  ) : (
                    "Опубликовать"
                  )}
                </button>
                {markerIsError && (
                  <span className="text-red-500">
                    Не забудьте выбрать место!
                  </span>
                )}
              </div>
            </div>
          </Form>
        )}
      </Formik>
    </Modal>
  );
};

export default AddNews;

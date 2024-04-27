import { useGetProfile } from "@/modules/Profile/api/useGetProfile.ts";
import { Form, Formik } from "formik";

import * as yup from "yup";
import UpdateMeDto from "@/modules/Profile/types/updateMe.dto.ts";
import { useUpdateMe } from "@/modules/Profile/api/useUpdateProfile.ts";
import { useEffect, useState } from "react";
import AlertComponent from "@/ui/AlertComponent.tsx";
import PhoneInput from "@/ui/PhoneInput.tsx";
import TextInput from "@/ui/TextInput.tsx";
import CheckboxComponent from "@/ui/CheckboxComponent.tsx";
import TextAreaInput from "@/ui/TextAreaInput.tsx";
import convertPhoneToReq from "@/helpers/convertPhoneToReq.ts";

const validationsSchema = yup.object().shape({
  username: yup.string().required("Введите телефон").min(4, "Слишком короткий"),
  name: yup
    .string()
    .required("Введите имя/ название компании")
    .min(4, "Слишком короткое"),
});

const Profile = () => {
  const [alertIsShowing, setAlertIsShowing] = useState(false);
  const { data, isPending } = useGetProfile();

  const { mutate, isPending: updateMePending, isError } = useUpdateMe();

  useEffect(() => {
    if (!updateMePending && isError) {
      setAlertIsShowing(true);
      setTimeout(() => setAlertIsShowing(false), 5000);
    }
  }, [data, isPending, isError]);
  if (!data || isPending) return <div className="loading"></div>;
  const { name, kind, username, description, context, address, ai_using } =
    data?.data;
  const initialValues: UpdateMeDto = {
    address,
    description,
    name,
    username: username.slice(1),
    ai_using,
    context,
  };
  return (
    <Formik
      validationSchema={validationsSchema}
      initialValues={initialValues}
      onSubmit={(values) =>
        mutate({ ...values, username: convertPhoneToReq(values.username) })
      }
    >
      {({ errors, touched, handleChange }) => (
        <>
          <Form className="flex gap-16 h-[78vh]">
            <div className="flex-col flex gap-9 w-6/12">
              <h2 className="text-2xl font-bold">Информация о вас</h2>
              <PhoneInput
                name="username"
                isError={!!(errors.username && touched.username)}
                error={errors.username}
                onChange={handleChange}
              />
              <TextInput
                name="name"
                isError={!!(errors.name && touched.name)}
                error={errors.name}
                placeholder="Имя/название компании"
              />{" "}
              <TextInput
                name="address"
                isError={!!(errors.address && touched.address)}
                error={errors.address}
                placeholder="Адрес (необязательно)"
              />
              <TextInput
                name="description"
                isError={!!(errors.description && touched.description)}
                error={errors.description}
                placeholder="Описание (необязательно)"
              />
              <button type="submit" className={`my-btn`}>
                {updateMePending ? (
                  <span className="loading"></span>
                ) : (
                  "Обновить"
                )}
              </button>
            </div>

            {kind === "company" && (
              <div className="w-6/12">
                <h2 className="text-2xl font-bold">
                  Для лучшей работы AI модели:
                </h2>
                <div className="flex flex-col gap-4 my-6">
                  <span>
                    <h4 className="text-lg font-semibold mb-4">
                      Использовать AI для автоответов на вопросы пользователей?
                    </h4>
                    <CheckboxComponent name="ai_using">
                      Использовать
                    </CheckboxComponent>
                  </span>
                  <span>
                    <h4 className="text-lg font-semibold ">
                      Улучшите точность ответов, расширив контекст AI модели?
                    </h4>
                    <TextAreaInput
                      name="context"
                      isError={false}
                      placeholder="Введите блок вопросов и ответов"
                      rows={4}
                    ></TextAreaInput>
                  </span>
                  <button type="submit" className={`my-btn mt-5`}>
                    {updateMePending ? (
                      <span className="loading"></span>
                    ) : (
                      "Улучшить"
                    )}
                  </button>
                </div>
              </div>
            )}
          </Form>
          {isError ? (
            <AlertComponent className={`alert-error`} active={alertIsShowing}>
              <>
                <h2 className="prose-md font-bold">
                  Не удалось создать аккаунт!
                </h2>
                <p className="prose-sm">{`Проверьте введённые данные ещё раз или попробуйте позже`}</p>
              </>
            </AlertComponent>
          ) : null}
        </>
      )}
    </Formik>
  );
};

export default Profile;

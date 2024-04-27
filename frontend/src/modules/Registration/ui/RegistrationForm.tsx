import { Form, Formik } from "formik";
import { NavLink, useNavigate } from "react-router-dom";
import TextInput from "@/ui/TextInput.tsx";
import * as yup from "yup";
import YupPassword from "yup-password";
import { useEffect, useState } from "react";
import AlertComponent from "@/ui/AlertComponent.tsx";
import PhoneInput from "@/ui/PhoneInput.tsx";
import { useRegistration } from "@/modules/Registration/api/useRegistration.ts";
import convertPhoneToReq from "@/helpers/convertPhoneToReq.ts";
import CheckboxComponent from "@/ui/CheckboxComponent.tsx";
YupPassword(yup);

const validationsSchema = yup.object().shape({
  username: yup.string().required("Введите телефон").min(4, "Слишком короткий"),
  email: yup
    .string()
    .required("Введите почту")
    .email("Некорректно введён адрес "),
  password: yup
    .string()
    .typeError("Должно быть строкой")
    .required("Обязательное поле")
    .min(8, "Слишком простой")
    .minNumbers(1, "Добавьте 1 цифру"),
});
const RegistrationForm = () => {
  const initialValues = {
    username: "",
    password: "",
    email: "",
    is_company: false,
  };
  const navigate = useNavigate();
  const { data, isSuccess, isError, isPending, mutate } = useRegistration();
  const [alertIsShowing, setAlertIsShowing] = useState(false);
  useEffect(() => {
    if (localStorage.getItem("token") !== null) navigate("/");
    if (!isPending && isSuccess) {
      navigate("/login");
    } else if (!isPending && isError) {
      setAlertIsShowing(true);
      setTimeout(() => setAlertIsShowing(false), 5000);
    }
  }, [data, isPending, isError]);

  return (
    <Formik
      validationSchema={validationsSchema}
      initialValues={initialValues}
      onSubmit={(values) =>
        mutate({
          ...values,
          username: convertPhoneToReq(values.username),
          kind: values.is_company ? "company" : "user",
        })
      }
    >
      {({ errors, touched, handleChange }) => (
        <Form className="py-10 px-6 bg-gray-50 rounded-xl">
          <h1 className="text-3xl font-semibold">Создайте аккаунт</h1>
          <CheckboxComponent name="is_company" className="mt-4">
            От лица компании
          </CheckboxComponent>
          <div className="flex flex-col gap-7 mt-6">
            <PhoneInput
              name="username"
              isError={!!(errors.username && touched.username)}
              error={errors.username}
              onChange={handleChange}
            />
            <TextInput
              name="email"
              isError={!!(errors.email && touched.email)}
              error={errors.email}
              placeholder="Почта"
            />
            <TextInput
              name="password"
              type="password"
              error={errors.password}
              isError={!!(errors.password && touched.password)}
              placeholder="пароль"
            />

            <button type="submit" className={`my-btn`}>
              {isPending ? <span className="loading"></span> : "Войти"}
            </button>
            <NavLink to="/login" className="mx-auto text-primary">
              Уже есть аккаунт?
            </NavLink>
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
          </div>
        </Form>
      )}
    </Formik>
  );
};

export default RegistrationForm;

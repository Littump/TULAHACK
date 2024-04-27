import { Form, Formik } from "formik";
import { NavLink, useNavigate } from "react-router-dom";
import TextInput from "@/ui/TextInput.tsx";
import loginDto from "@/modules/Login/types/login.dto.ts";
import * as yup from "yup";
import YupPassword from "yup-password";
import { useLogin } from "@/modules/Login/api/useLogin.ts";
import { useEffect, useState } from "react";
import AlertComponent from "@/ui/AlertComponent.tsx";
import PhoneInput from "@/ui/PhoneInput.tsx";
import convertPhoneToReq from "@/helpers/convertPhoneToReq.ts";
YupPassword(yup);

const validationsSchema = yup.object().shape({
  username: yup.string().required("Введите телефон").min(4, "Слишком короткий"),
  password: yup
    .string()
    .typeError("Должно быть строкой")
    .required("Обязательное поле")
    .min(8, "Слишком простой")
    .minNumbers(1, "Добавьте 1 цифру"),
});

const LoginForm = () => {
  const initialValues: loginDto = {
    username: "",
    password: "",
  };

  const navigate = useNavigate();
  const { data, isError, isPending, mutate } = useLogin();
  const [alertIsShowing, setAlertIsShowing] = useState(false);

  useEffect(() => {
    if (localStorage.getItem("token") !== null) navigate("/");
    if (!isPending && data) {
      localStorage.setItem("token", data?.data?.auth_token);
      navigate("/");
    } else if (!isPending && isError) {
      setAlertIsShowing(true);
      setTimeout(() => setAlertIsShowing(false), 5000);
    }
  }, [data, isPending, isError]);
  const handleSubmit = (values: loginDto) => {
    mutate({ ...values, username: convertPhoneToReq(values.username) });
  };
  return (
    <Formik
      validationSchema={validationsSchema}
      initialValues={initialValues}
      onSubmit={(values) => handleSubmit(values)}
    >
      {({ errors, touched, handleChange }) => (
        <Form className="py-10 px-6 bg-gray-50 rounded-xl">
          <h1 className="text-3xl font-semibold">Вход</h1>
          <div className="flex flex-col gap-6 mt-6">
            <PhoneInput
              name="username"
              isError={!!(errors.username && touched.username)}
              error={errors.username}
              onChange={handleChange}
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
            <NavLink to="/registration" className="mx-auto text-primary">
              Ещё нет аккаунта?
            </NavLink>
            {isError ? (
              <AlertComponent className={`alert-error`} active={alertIsShowing}>
                <>
                  <h2 className="prose-md font-bold">Не удалось войти!</h2>
                  <p className="prose-sm">{`Проверьте введённые данные ещё раз`}</p>
                </>
              </AlertComponent>
            ) : null}
          </div>
        </Form>
      )}
    </Formik>
  );
};

export default LoginForm;

import { Field } from "formik";
import MaskedInput from "react-text-mask";

type Props = {
  className?: string;
  name: string;
  isError: boolean;
  error?: string | null | undefined;
  onChange?: (str: string) => void;
};
const phoneNumberMask = [
  "+",
  "7",
  " ",
  "(",
  /[1-9]/,
  /\d/,
  /\d/,
  ")",
  " ",
  /\d/,
  /\d/,
  /\d/,
  "-",
  /\d/,
  /\d/,
  "-",
  /\d/,
  /\d/,
];
function PhoneInput({ name, isError, className, error, onChange }: Props) {
  return (
    <label className={`form-control relative ${className}`}>
      <Field name={name}>
        {
          // @ts-ignore
          ({ field }) => (
            <MaskedInput
              {...field}
              type="text"
              mask={phoneNumberMask}
              placeholder="Номер телефона"
              onChange={onChange}
              className={`input input-bordered input-primary rounded-full  text-md ${
                isError ? "border-red-500" : " "
              } w-full text-md`}
            />
          )
        }
      </Field>
      <span className=" prose-sm absolute -bottom-6 left-0 text-red-500 text-start">
        {isError && error ? error : ""}
        {isError}
      </span>
    </label>
  );
}

export default PhoneInput;

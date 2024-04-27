import { Field } from "formik";
import { ReactNode } from "react";

type Props = {
  label?: string;
  className?: string;
  name: string;
  isError: boolean;
  type?: string;
  autoComplete?: string;
  min?: string;
  error?: string | null | undefined;
  placeholder?: string;
  icon?: ReactNode;
  onClick?: () => void;
};

function TextInput({
  name,
  isError,
  label,
  placeholder,
  className,
  icon,
  error,
  ...props
}: Props) {
  return (
    <label className={`form-control relative ${className}`}>
      {label && (
        <div className="label">
          <span className="label-text font-semibold prose-sm">{label}</span>
        </div>
      )}
      <Field
        {...props}
        name={name}
        className={`input input-bordered input-primary rounded-full  text-md ${
          isError ? "border-red-500" : " "
        } w-full text-md`}
        placeholder={placeholder ? placeholder : label}
      />
      {icon && (
        <button
          type="submit"
          className="absolute right-4 top-3 hover:text-primary transition"
        >
          {icon}
        </button>
      )}
      <span className=" prose-sm absolute -bottom-6 left-0 text-red-500 text-start">
        {isError && error ? error : ""}
        {isError}
      </span>
    </label>
  );
}

export default TextInput;

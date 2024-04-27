import { Field } from "formik";

type Props = {
  label?: string;
  className?: string;
  name: string;
  isError: boolean;
  type?: string;
  autoComplete?: string;
  min?: string;
  onClick?: () => void;
  rows?: number;
  placeholder?: string;
};

function TextAreaInput({
  name,
  isError,
  label,
  placeholder,
  className,
  rows,
}: Props) {
  return (
    <label className={`form-control ${className}`}>
      <div className="label">
        <span className="label-text font-semibold prose-sm">{label}</span>
      </div>
      <Field
        component="textarea"
        name={name}
        rows={rows || 3}
        className={`textarea textarea-bordered textarea-primary text-lg overflow-y-scroll no-scroll rounded-3xl ${
          isError ? "border-red-500" : " "
        } w-full text-md`}
        placeholder={placeholder ? placeholder : label}
      />
    </label>
  );
}

export default TextAreaInput;

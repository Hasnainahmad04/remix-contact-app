import React from "react";

interface Props {
  label: string;
  type: string;
  name: string;
  placeholder: string;
  error?: string;
}

const InputField: React.FC<Props> = ({
  label,
  name,
  type = "text",
  placeholder,
  error,
  ...rest
}) => {
  return (
    <div className="my-2 ">
      <label htmlFor={name} className="text-gray-600">
        {label}
      </label>
      <input
        type={type}
        name={name}
        id={name}
        className="w-full p-2 focus:outline-none border mt-1 border-gray-400 rounded-lg placeholder:font-light"
        placeholder={placeholder}
        {...rest}
      />
      {error && (
        <span className="text-[14px] text-red-500 text-left line-clamp-1">
          {error}
        </span>
      )}
    </div>
  );
};

export default InputField;

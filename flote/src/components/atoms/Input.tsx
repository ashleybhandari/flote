import { useState } from "react";

type Props = {
  label: string;
  placeholder?: string;
  value?: string;
  icon?: string;
  onIconClick?: () => void;
  className?: string;
};

export default function Input({
  label,
  placeholder,
  value,
  icon,
  onIconClick,
  className,
}: Props) {
  const [inputValue, setInputValue] = useState(value ?? "");

  return (
    <div
      className={`flex flex-row w-72 px-2 py-1 rounded-t rounded-b-sm bg-surface-container border-b-2 border-outline-variant focus-within:border-primary ${className}`}
    >
      <label className="grow flex flex-col-reverse">
        <input
          className="peer py-[1px] bg-transparent border-none focus:outline-none"
          placeholder={placeholder}
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
        ></input>
        <div className="text-xs text-outline peer-focus:text-primary">
          {label}
        </div>
      </label>
      {icon && (
        <button
          className={`fa-solid fa-${icon} text-outline px-1`}
          onClick={onIconClick}
        ></button>
      )}
    </div>
  );
}

/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import { RxCross2 } from "react-icons/rx";
import { IoMdArrowDropdown } from "react-icons/io";
import { ControlProps } from "node_modules/react-select/dist/declarations/src";
import AsyncSelect from "react-select/async";

type OptionType = {
  label: string;
  value: string;
};

interface AsyncSelectFieldProps {
  placeholder?: string;
  value: OptionType | null;
  onChange: (value: OptionType | null) => void;
  loadOptions: (inputValue: string) => Promise<OptionType[]>;
  isClearable?: boolean;
  showClearButton?: boolean;
  customStyles?: any;
  customComponents?: any;
  placeholderClassname?: string;
  error?: boolean;
  placeholderFontSize?: string;
  disabled?: boolean;
  isLoading?: boolean;
}

const AsyncSelectField: React.FC<AsyncSelectFieldProps> = ({
  placeholder = "Select an option",
  placeholderClassname,
  value,
  onChange,
  loadOptions,
  isClearable = true,
  showClearButton = true,
  customStyles,
  customComponents,
  error,
  placeholderFontSize,
  disabled = false,
  isLoading = false,
}) => {
  const defaultStyles = {
    control: (base: React.CSSProperties, state: ControlProps<OptionType>) => ({
      ...base,
      minWidth: "150px",
      minHeight: "48px",
      paddingLeft: "6px",
      borderRadius: "8px",
      fontSize: "14px",
      height: "fit-content",
      textTransform: "capitalize",
      borderColor: error ? "#ef4444" : "#ebebeb",
      boxShadow: state.isFocused ? "0 0 0 1px #d1d5db" : "none",
      cursor: disabled ? "not-allowed" : "default",
      opacity: disabled ? 0.6 : 1,
      "&:hover": {
        borderColor: error ? "#ef4444" : "#ebebeb",
      },
    }),
    option: (base: React.CSSProperties, state: ControlProps<OptionType>) => ({
      ...base,
      fontSize: "14px",
      cursor: "pointer",
      margin: "0px 1px",
      borderRadius: "8px",
      height: "fit-content",
      textTransform: "capitalize",
      backgroundColor: state.isFocused ? "#e8f3ef" : "transparent",
      color: state.isFocused ? "#168a5c" : "black",
      "&:hover": {
        backgroundColor: "#e8f3ef",
        color: "#168a5c",
        opacity: 0.8,
      },
    }),
    placeholder: (base: React.CSSProperties) => ({
      ...base,
      height: "fit-content",
      fontSize: placeholderFontSize || "13px",
      color: placeholderClassname || "#6b7280",
      textTransform: "capitalize",
    }),
    menuPortal: (provided: React.CSSProperties) => ({
      ...provided,
      zIndex: 9999,
      pointerEvents: "auto",
    }),
    dropdownIndicator: (
      base: React.CSSProperties,
      state: ControlProps<OptionType>
    ) => ({
      ...base,
      color: state.isFocused ? "#3b82f6" : "#6b7280",
      marginRight: "8px",
      transform: state.selectProps.menuIsOpen
        ? "rotate(180deg)"
        : "rotate(0deg)",
      transition: "transform 0.2s ease",
    }),
    loadingIndicator: (base: React.CSSProperties) => ({
      ...base,
      color: "#3b82f6",
    }),
    menu: (base: React.CSSProperties) => ({
      ...base,
      borderRadius: "8px",
      padding: "0px 4px",
      boxShadow:
        "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
    }),
  };

  const DropdownIndicator = (props: any) => {
    return (
      <div
        {...props.innerProps}
        style={props.getStyles("dropdownIndicator", props)}
      >
        <IoMdArrowDropdown
          size={16}
          color={props.isFocused ? "#3b82f6" : "#6b7280"}
          style={{
            transform: props.selectProps.menuIsOpen
              ? "rotate(180deg)"
              : "rotate(0deg)",
            transition: "transform 0.2s ease",
          }}
        />
      </div>
    );
  };
  const defaultComponents = {
    IndicatorSeparator: () => null,
    ClearIndicator: () => null,
    DropdownIndicator: DropdownIndicator,
  };

  const mergedStyles = customStyles
    ? Object.keys(defaultStyles).reduce((acc: Record<string, any>, key) => {
        const styleKey = key;
        acc[styleKey] =
          customStyles[styleKey] ||
          defaultStyles[styleKey as keyof typeof defaultStyles];
        return acc;
      }, {} as Record<string, any>)
    : defaultStyles;

  return (
    <div className="relative w-full">
      <AsyncSelect
        menuPortalTarget={document.body}
        cacheOptions
        defaultOptions
        placeholder={placeholder}
        value={value}
        onChange={(newValue) => {
          if (!newValue || !Array.isArray(newValue)) {
            onChange(newValue as OptionType | null);
          }
        }}
        loadOptions={loadOptions}
        isClearable={isClearable}
        isDisabled={disabled}
        isLoading={isLoading}
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        //@ts-ignore
        styles={mergedStyles}
        components={customComponents || defaultComponents}
        noOptionsMessage={() => "No options found"}
        loadingMessage={() => "Loading..."}
      />

      {showClearButton && value && !disabled && (
        <button
          type="button"
          className="absolute right-11 top-[12px] cursor-pointer focus:outline-none  rounded-sm p-1 hover:bg-green-50 hover:text-green-500 transition-colors"
          onClick={() => onChange(null)}
          aria-label="Clear selection"
          tabIndex={-1}
        >
          <RxCross2 size={17} color="#6b7280" />
        </button>
      )}
    </div>
  );
};

export default AsyncSelectField;

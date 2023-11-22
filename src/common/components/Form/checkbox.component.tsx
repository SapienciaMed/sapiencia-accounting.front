import React, { useState, useEffect, ReactNode } from "react";
import { TriStateCheckbox } from "primereact/tristatecheckbox";
import { classNames } from "primereact/utils";

interface Attributes {
  value?: boolean | null;
  id?: string;
  className?: string | undefined;
  onChange?: (isChecked: boolean | null) => void;
  titleName?: string | ReactNode;
}

export const TriStateCheckboxComponent = (props: Attributes) => {
  const { id, value, onChange, className, titleName } = props;
  const [isChecked, setIsChecked] = useState<boolean | null>(value);

  useEffect(() => {
    setIsChecked(value);
  }, [value]);

  const handleCheckboxChange = () => {
    const newValue = isChecked === null ? true : !isChecked;
    setIsChecked(newValue);
    onChange && onChange(newValue);
  };

  return (
    <div className="p-13px">
      <TriStateCheckbox
        id={id}
        value={isChecked}
        onChange={handleCheckboxChange}
        className={className}
      />
      <label className="pl-8px"> {titleName} </label>
    </div>
  );
};

"use client";

import { useCountries } from "@/app/hooks/useCountries";
import Select from "react-select";

export type CountrySelectValue = {
  flag: string;
  label: string;
  latlng: number[];
  value: string;
  region: string;
};

interface Props {
  value?: CountrySelectValue;
  onChange: (value: CountrySelectValue) => void;
}

const CountrySelect: React.FC<Props> = ({ value, onChange }) => {
  const { getAll } = useCountries();

  return (
    <div>
      <Select
        placeholder="Anywhere"
        isClearable
        options={getAll()}
        value={value}
        onChange={(value) => onChange(value as CountrySelectValue)}
        classNames={{
          control: () => "p-3 border-2",
          input: () => "text-lg",
          option: () => "text-lg",
        }}
        theme={(theme) => ({
          ...theme,
          borderRadius: 6,
          colors: {
            ...theme.colors,
            primary: "black",
            primary25: "#ffe4e6",
          },
        })}
        formatOptionLabel={(option: any) => (
          <div className="flex  items-center gap-3 ">
            <div>{option.flag}</div>
            <div>
              {option.label},{" "}
              <span className="text-neutral-500 ml-1">{option.region}</span>
            </div>
          </div>
        )}
      />
    </div>
  );
};

export default CountrySelect;

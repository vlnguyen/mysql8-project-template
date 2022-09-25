import React, { HTMLInputTypeAttribute, useState } from "react";

export function useTextInput(
  type: HTMLInputTypeAttribute,
  label: string
): [string, JSX.Element] {
  const [value, setValue] = useState<string>("");
  const input = (
    <>
      <label>{label}: </label>
      <input
        type={type}
        value={value}
        autoComplete={label}
        onChange={(e) => setValue(e.target.value)}
        style={{
          fontSize: 24,
        }}
      />
    </>
  );
  return [value, input];
}

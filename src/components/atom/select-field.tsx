interface Options {
  label: string;
  value: string;
}

export interface SelectFieldProps extends React.ComponentProps<'select'> {
  name: string;
  id?: string;
  options: Options[];
  label: string;
}

export const SelectField = (props: SelectFieldProps) => {
  const { name, options, id, label, ...rest } = props;
  return (
    <label>
      <span>{label}</span>
      <select {...rest} name={name} id={id ?? name}>
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
    </label>
  );
};

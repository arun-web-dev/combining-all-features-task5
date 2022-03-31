export function InputElement(props) {
  const {
    name = "",
    maxLength = "20",
    type = "text",
    className = "pa2 input-reset ba bg-transparent  w-100",
    id = ``,
    onChange = "",
    placeholder = "",
    autoComplete = "off",
  } = props;
  return (
    <input
      name={name}
      maxLength={maxLength}
      type={type}
      className={className}
      id={id}
      value={props.value ? props.value : ""}
      onChange={onChange}
      placeholder={placeholder}
      autoComplete={autoComplete}
      required
    />
  );
}

export function InputElement(props) {
  return (
    <input
      name={props.name ? props.name : ""}
      maxLength={props.maxLength ? props.maxLength : "20"}
      type={props.type ? props.type : "text"}
      className={
        props.className
          ? props.className
          : "pa2 input-reset ba bg-transparent  w-100"
      }
      id={props.id ? props.id : ""}
      value={props.value ? props.value : ""}
      onChange={props.onChange ? props.onChange : ""}
      placeholder={props.placeholder ? props.placeholder : ""}
      autoComplete={props.autoComplete ? props.autoComplete : "off"}
      required
    />
  );
}

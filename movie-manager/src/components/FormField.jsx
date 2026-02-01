const FormField = ({
  id,
  label,
  type,
  value,
  ref,
  required,
  handleChange,
  checked,
}) => {
  return (
    <>
      <label htmlFor={id}>
        {label}
        {required && "*"}
      </label>
      <input
        id={id}
        type={type || "text"}
        value={value}
        ref={ref}
        onChange={handleChange}
        checked={checked}
      />
    </>
  );
};

export default FormField;

const Button = ({ id, type, label, handleClick, classes }) => {
  return (
    <button
      id={`${id}-button`}
      type={type}
      onClick={handleClick}
      className={classes}
    >
      {label}
    </button>
  );
};

export default Button;

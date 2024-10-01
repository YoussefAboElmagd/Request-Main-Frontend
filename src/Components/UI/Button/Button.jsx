const Button = ({
  type = "button",
  onClick,
  disabled,
  children,
  className,
}) => {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`Btn text-white font-jost py-3 px-32 rounded-xl capitalize border bg-linear_1 opacity-100  disabled:opacity-70 text-base font-medium text-left ${className}`}
    >
      {children}
    </button>
  );
};


export default Button;

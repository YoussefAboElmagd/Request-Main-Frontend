const Button = ({ type = "button", onClick, children, className }) => {
  return (
    <button
      type={type}
      onClick={onClick}
      className={`Btn text-white font-jost py-3 px-32 rounded-xl capitalize border bg-linear_1  text-base font-medium text-left ${className}`}
    >
      {children}
    </button>
  );
};


export default Button;

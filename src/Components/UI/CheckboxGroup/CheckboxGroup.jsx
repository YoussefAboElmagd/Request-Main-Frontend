const CheckboxGroup = ({ label, options, namePrefix }) => {
  return (
    <div className="checkbox-group flex items-center gap-4 my-4">
      <h6 className="font-bold text-base text-gray-dark">{label}</h6>
      <div className="inputs flex flex-wrap gap-4">
        {options.map((option) => (
          <div key={option.name} className="flex items-center gap-1">
            <input
              type="radio"
              name={`${namePrefix}[${option.name}]`}
              id={option.name}
              className="appearance-none w-3 h-3 border border-gray rounded-sm cursor-pointer checked:bg-purple checked:border-purple duration-500"
            />
            <label htmlFor={option.name} className="font-medium text-base">
              {option.label}
            </label>
          </div>
        ))}
      </div>
    </div>
  );
};
export default CheckboxGroup;

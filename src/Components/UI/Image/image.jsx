import avatar from "../../../assets/images/Avatar.jpg";
export const Image = ({ src, alt, className, width, height }) => {
  return (
    <img
      src={`${src}` || avatar}
      alt={alt}
      className={className}
      width={width}
      height={height}
    />
  );
};

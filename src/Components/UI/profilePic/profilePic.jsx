
const colors = [
  "#FFADAD",
  "#FFD6A5",
  "#CAFFBF",
  "#9BF6FF",
  "#A0C4FF",
  "#BDB2FF",
  "#FFC6FF",
];

const getRandomColor = () => {
  return colors[Math.floor(Math.random() * colors.length)];
};

const renderInitials = (name) => {
  const nameParts = name?.split(" ");
  const firstNameInitial = nameParts[0] ? nameParts[0][0].toUpperCase() : "";
  const lastNameInitial = nameParts[1] ? nameParts[1][0].toUpperCase() : "";
  return `${firstNameInitial}${lastNameInitial}`;
};

const ProfileAvatar = ({ name, profilePic }) =>
  profilePic ? (
    <img
      src={profilePic}
      alt="avatar"
      className="rounded-lg border w-9 h-9 object-cover"
    />
  ) : (
    <div
      className="user-profile-image flex items-center justify-center w-9 h-9 rounded-lg text-white font-bold"
      style={{ backgroundColor: getRandomColor() }}
    >
      {renderInitials(name)}
    </div>
  );

export default ProfileAvatar;

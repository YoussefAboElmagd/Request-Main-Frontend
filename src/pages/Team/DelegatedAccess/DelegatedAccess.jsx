import avatar from "../../../assets/images/avatar3.png";
import { FaPen } from "react-icons/fa";
import { MdDelete } from "react-icons/md";

const DelegatedAccess = () => {
  return (
    <div className="DelegatedAccess bg-white rounded-3xl m-2 px-4 py-2  relative overflow-x-auto">
      <table className="w-full text-sm text-center text-gray-500">
        <thead className="text-xs font-bold text-gray-dark uppercase border-b-2 border-gray">
          <tr>
            <th className="px-4 py-2 ">Name</th>
            <th className="px-4 py-2 ">Vocation</th>
            <th className="px-4 py-2 ">Email</th>
            <th className="px-4 py-2 ">Phone</th>
            <th className="px-4 py-2 ">Access</th>
            <th className="px-4 py-2 ">Action</th>
          </tr>
        </thead>
        <tbody>
          {/* Team name */}
          <tr>
            <td
              colSpan="6"
              className="text-left py-2 font-medium text-gray-dark"
            >
              Team Name (Project Name)
            </td>
          </tr>

          <tr className="bg-white shadow-lg rounded-xl">
            <td className="px-4 py-2  flex items-center gap-3">
              <img
                src={avatar}
                alt="avatar"
                className="rounded-lg border w-9 h-9 object-cover"
              />
              <span>Jane Doe</span>
            </td>
            <td className="px-4 py-2 ">User</td>
            <td
              className="px-4 py-2 "
              style={{
                color: "#5BA6FF",
              }}
            >
              janedoe@example.com
            </td>
            <td
              className="px-4 py-2 "
              style={{
                color: "#34C759",
              }}
            >
              123-456-7890
            </td>
            <td className="px-4 py-2 ">View architectural tasks</td>
            <td className="px-4 py-2   flex   gap-3">
              <button className="text-purple ">
                <FaPen className="w-4 h-4" />
              </button>
              <button className="text-red">
                <MdDelete className="w-4 h-4" />
              </button>
            </td>
          </tr>

          <tr className="bg-white rounded-lg">
            <td className="px-4 py-2  flex items-center gap-3">
              <img
                src={avatar}
                alt="avatar"
                className="rounded-lg border w-9 h-9 object-cover"
              />
              <span>Jane Doe</span>
            </td>
            <td className="px-4 py-2 ">User</td>
            <td className="px-4 py-2 ">janedoe@example.com</td>
            <td className="px-4 py-2 ">123-456-7890</td>
            <td className="px-4 py-2 ">User</td>
            <td className="px-4 py-2  flex justify-center gap-3">
              <button className="text-blue-500">
                <FaPen className="w-4 h-4" />
              </button>
              <button className="text-red-500">
                <MdDelete className="w-4 h-4" />
              </button>
            </td>
          </tr>

          <tr className="bg-white rounded-lg">
            <td className="px-4 py-2  flex items-center gap-3">
              <img
                src={avatar}
                alt="avatar"
                className="rounded-lg border w-9 h-9 object-cover"
              />
              <span>Jane Doe</span>
            </td>
            <td className="px-4 py-2 ">User</td>
            <td className="px-4 py-2 ">janedoe@example.com</td>
            <td className="px-4 py-2 ">123-456-7890</td>
            <td className="px-4 py-2 ">User</td>
            <td className="px-4 py-2  flex justify-center gap-3">
              <button className="text-blue-500">
                <FaPen className="w-4 h-4" />
              </button>
              <button className="text-red-500">
                <MdDelete className="w-4 h-4" />
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default DelegatedAccess;

import { useEffect, useState } from "react";
import axios from "../../axios";

function Dashboard() {
  const [userData, setUserData] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  useEffect(() => {
    const getUserData = async () => {
      const res = await axios.get("/admin/user-data");
      setUserData(res.data);
    };
    getUserData();
  }, []);

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
  };

  const filteredUserData = userData.filter(
    (user) =>
      user.username.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user._id.includes(searchQuery) ||
      user.createdAt.includes(searchQuery)
  );

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4 text-gray-700">Admin Dashboard</h1>
      <div className="mb-4">
        <input
          type="text"
          placeholder="Search users..."
          className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-300"
          onChange={handleSearch}
        />
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-200 shadow-sm rounded-lg">
          <thead className="bg-gray-100">
            <tr>
              <th className="py-2 px-4 border-b text-start text-gray-600">
                ID
              </th>
              <th className="py-2 px-4 border-b text-start text-gray-600">
                Name
              </th>
              <th className="py-2 px-4 border-b text-start text-gray-600">
                Email
              </th>
              <th className="py-2 px-4 border-b text-start text-gray-600">
                CreatedAt
              </th>
              <th className="py-2 px-4 border-b text-start text-gray-600">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {filteredUserData.map((user, index) => (
              <tr key={index} className="hover:bg-gray-50">
                <td className="py-2 px-4 border-b">{user._id}</td>
                <td className="py-2 px-4 border-b">{user.username}</td>
                <td className="py-2 px-4 border-b">{user.email}</td>
                <td className="py-2 px-4 border-b">
                  {new Date(user.createdAt).toISOString().split("T")[0]}
                </td>
                <td className="py-2 px-4 border-b">
                  <button className="mr-2 bg-blue-500 text-white py-1 px-3 rounded-md hover:bg-blue-600">
                    Edit
                  </button>
                  <button className="bg-red-500 text-white py-1 px-3 rounded-md hover:bg-red-600">
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
          <tfoot className="bg-gray-100">
            <tr>
              <td
                colSpan="5"
                className="py-2 px-4 border-b text-start font-bold text-gray-600"
              >
                Total Users: {userData.length}
              </td>
            </tr>
          </tfoot>
        </table>
      </div>
    </div>
  );
}

export default Dashboard;

import {getDetailsOfUser,getDetailsOfOperator,deleteUser,deleteOperator,createOperator} from '../../services/admin'
import React, { useState, useEffect } from 'react';
import {
  ClipboardDocumentListIcon,
  CheckCircleIcon,
  ClockIcon,
  ArrowPathIcon,
} from '@heroicons/react/24/solid';
import { useNavigate } from 'react-router-dom';




export default function Dashboardad() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const navigate = useNavigate();

  const [showForm, setShowForm] = useState(false);
const [formData, setFormData] = useState({
  operatorName: '',
  department: '',
  email: '',
  number: '',
});

useEffect(() => {
  fetchOperators();
}, []);

  const [entries, setEntries] = useState(10);
  const [users, setUsers] = useState([]);
  const [operators, setOperators] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [search, setSearch] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const userData = await getDetailsOfUser();
        const operatorData = await getDetailsOfOperator();
        setUsers(userData);
        setOperators(operatorData);
        setLoading(false);
      } catch (err) {
        setError('Failed to load data');
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const deleteuser=async(id)=>{
     const data= await deleteUser(id);
    if(data){
      navigate("/dashboardad", { state: { activeTab: "UserDB" } });
    }
  };
  const deleteoperator=async(id)=>{
     const data= await deleteOperator(id);
    if(data){
      navigate("/dashboardad", { state: { activeTab: "OperatorDB" } });
    }
  };
  const handleCreateOperator = async (e) => {
  e.preventDefault();
  try {
    console.log("aa gya");
    const res = await createOperator(formData);
    alert('Operator added successfully');
    setShowForm(false);
    setFormData({ operatorName: '', department: '', email: '', number: '' });
    
    fetchOperators();
    // Optionally refresh list: fetchOperators()
  } catch (err) {
    alert(err.response?.data?.message || 'Failed to add operator');
  }
};
const fetchOperators = async () => {
  try {
    const operatorData = await getDetailsOfOperator(); // your API function
    setOperators(operatorData); // update state
  } catch (err) {
    console.error("Failed to fetch operators");
  }
};

  
 
   const cards = [
  {
    title: 'Total Tickets',
    count: 12,
    color: 'bg-blue-500',
    icon: <ClipboardDocumentListIcon className="h-6 w-6 text-blue-600" />,
  },
  {
    title: 'Total Solved',
    count: 8,
    color: 'bg-green-500',
    icon: <CheckCircleIcon className="h-6 w-6 text-green-600" />,
  },
  {
    title: 'Total Awaiting Approval',
    count: 2,
    color: 'bg-red-500',
    icon: <ClockIcon className="h-6 w-6 text-red-600" />,
  },
  {
    title: 'Total In Progress',
    count: 2,
    color: 'bg-yellow-400',
    icon: <ArrowPathIcon className="h-6 w-6 text-yellow-600" />,
  },
];

  // 🔁 Fetch data from DB (mocked here)
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white text-gray-800 font-sans">
      {/* Topbar */}
      <header className="bg-blue-600 text-white py-4 px-6 flex justify-between items-center shadow">
        <h1 className="text-2xl font-bold text-white tracking-wide animate-pulse">Helpdesk</h1>
        <div className="space-x-4 text-sm">
          <span className="bg-green-400  text-black px-2 py-1 rounded-full">EN</span>
          <button title="Notifications" className='rounded-full bg-white p-1 hover:scale-150 hover:bg-gray-200 transition-all '>🔔</button>
          <button title="Profile" className='rounded-full bg-white p-1 hover:scale-150 hover:bg-gray-200 transition-all'>👤</button>
          <button title="Settings" className='rounded-full bg-white p-1 hover:scale-150 hover:bg-gray-200 transition-all'>⚙️</button>
        </div>
      </header>

      <div className="flex">
        {/* Sidebar */}
        <aside className="bg-gray-600 w-52 min-h-screen shadow-inner px-4 py-6 space-y-4">
          <nav className="flex flex-col space-y-3 font-medium text-gray-700">
            <button onClick={() => setActiveTab('dashboard')} className={`text-left  hover:ml-3 transition-all flex items-center gap-2 ${activeTab === 'dashboard' ? 'font-bold text-yellow-600' : 'text-white'}`}>
              📊 Dashboard
            </button>
            <button onClick={() => setActiveTab('UserDB')} className={`text-left hover:ml-3 transition-all flex items-center gap-2 ${activeTab === 'UserDB' ? 'font-bold text-yellow-600' : 'text-white'}`}>
              🎫  User DataBase
            </button>
            <button onClick={() => setActiveTab('OperatorDB')} className={`text-left hover:ml-3 transition-all flex items-center gap-2 ${activeTab === 'OperatorDB' ? 'font-bold text-yellow-600' : 'text-white'}`}>
                🎫 Operator DataBase 
            </button>
          </nav>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-8 ">
          {activeTab === 'dashboard' && (
            <>
              <h2 className="text-2xl font-semibold mb-8 text-center">Dashboard</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6" >
  {cards.map((card, index) => (
    <div
      key={index}
      className={`relative ${card.color} bg-opacity-90 backdrop-blur-lg shadow-xl rounded-2xl p-6 transform hover:scale-105 transition-all duration-300 group`}
    >
      <div className="absolute -top-4 -right-4 bg-white text-gray-700 rounded-full shadow-md p-2 group-hover:rotate-12 transition-transform duration-300">
        {card.icon}
      </div>
      <h3 className="text-sm font-semibold uppercase tracking-wider text-white/90 mb-2">
        {card.title}
      </h3>
      <p className="text-5xl font-bold text-white">{card.count}</p>
    </div>
  ))}
</div>
 <div className="p-4 bg-blue-100 max-w-4xl mx-auto mt-10 grid grid-cols-1 md:grid-cols-2 gap-6 items-center w-6xl ">
      {/* Left Graph Section */}
      <div className="bg-teal-400 rounded shadow flex items-center justify-center h-96  w-l">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="w-24 h-24 text-blue-900"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth="1.5"
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M4 18V10m4 8v-6m4 6v-9m4 9V6" />
        </svg>
      </div>

      {/* Right Stats Section */}
      <div className="space-y-4">
        <div className="bg-teal-400 rounded shadow flex justify-around py-6 ">
          {/* Technical Supports */}
          <div className="text-center">
            <img
              src="https://img.icons8.com/ios-filled/50/000000/technical-support.png"
              alt="tech support"
              className="mx-auto w-10"
            />
            <p className="text-lg font-semibold">{users.length}</p>
            <p className="text-sm">Total Users</p>
          </div>

          {/* Operation Team */}
          <div className="text-center">
            <img
              src="https://img.icons8.com/ios-filled/50/000000/technical-support--v1.png"
              alt="operation team"
              className="mx-auto w-10"
            />
            <p className="text-lg font-semibold">{operators.length}</p>
            <p className="text-sm">Operation Team</p>
          </div>
        </div>

        {/* Feedback Section */}
        <div className="bg-teal-400 rounded shadow text-center py-3">
          <p className="font-semibold mb-1">Customer Feedback</p>
          <div className="text-yellow-100 text-xl">
            ★ ★ ★ ★ ☆½
          </div>
        </div>
      </div>
    </div>
            </>
          )}

          {activeTab === 'UserDB' && (
  <>
    {error ? (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-red-600 text-lg font-semibold">{error}</p>
      </div>
    ) : loading ? (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-lg font-medium text-gray-500">Loading...</p>
      </div>
    ) : (
      <div className="min-h-screen bg-white text-gray-800 font-sans p-6">
        <h2 className="text-2xl font-semibold mb-4">Database</h2>

        {/* Header Labels */}
        <div className="flex mb-3 text-white text-center text-sm font-semibold rounded overflow-hidden">
          <span className="flex-1 px-2 py-1 bg-teal-500">User</span>
        </div>

        {/* Filter/Search Controls */}
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center space-x-1">
            <label>Show:</label>
            <select
              value={entries}
              onChange={(e) => setEntries(Number(e.target.value))}
              className="border p-1 rounded"
            >
              <option value={5}>5 entries</option>
              <option value={10}>10 entries</option>
              <option value={20}>20 entries</option>
            </select>
          </div>

          <div className="flex items-center border rounded px-2 py-0.5">
            <input
              type="text"
              placeholder="Search..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="border p-1 rounded"
            />
            <span className="ml-1">🔍</span>
          </div>
        </div>

        {/* Table */}
        <table className="w-full border border-collapse text-sm">
          <thead>
            <tr className="bg-gray-200">
              <th className="border p-2 text-left">#</th>
              <th className="border p-2 text-left">Staff ID</th>
              <th className="border p-2 text-left">Name</th>
              <th className="border p-2 text-left">Department</th>
              <th className="border p-2 text-left">Speciality</th>
              <th className="border p-2 text-left">Setting</th>
            </tr>
          </thead>
          <tbody>
            {users
              .filter((item) =>
                Object.values(item).some((val) =>
                  val?.toString().toLowerCase().includes(search.toLowerCase())
                )
              )
              .slice(0, entries)
              .map((item, index) => (
                <tr
                  key={item.id || index}
                  className={index % 2 ? 'bg-gray-100' : ''}
                >
                  <td className="border px-2 py-1">
                     {index + 1}
                  </td>
                  <td className="border px-2 py-1">{item._id || '-'}</td>
                  <td className="border px-2 py-1">{item.userName || '-'}</td>
                  <td className="border px-2 py-1">{item.department || '-'}</td>
                  <td className="border px-2 py-1">{item.email || '-'}</td>
                  <td className="border px-2 py-1 flex space-x-2">
                    <button
  className="text-xs text-red-500 m-auto"
  onClick={async () => {
    const confirmDelete = window.confirm("Are you sure you want to delete this user?");
    if (!confirmDelete) return;

    try {
      await deleteuser(item._id); // assuming item._id exists
      setUsers((prev) => prev.filter((users) => users._id !== item._id)); // update UI
    } catch (err) {
      alert(err.message); // show error
    }
  }}
>
  🗑️
</button>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>

        <div className="text-xs mt-2 text-gray-600">
          Showing 1 to {Math.min(entries, users.length)} of {users.length} entries
        </div>
      </div>
    )}
  </>
)}

          {activeTab === 'OperatorDB' && (
  <>
    {error ? (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-red-600 text-lg font-semibold">{error}</p>
      </div>
    ) : loading ? (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-lg font-medium text-gray-500">Loading...</p>
      </div>
    ) : (
      <div className="min-h-screen bg-white text-gray-800 font-sans p-6">
        <h2 className="text-2xl font-semibold mb-4">Database</h2>

        {/* Header Labels */}
        <div className="flex mb-3 text-white text-center text-sm font-semibold rounded overflow-hidden">
          <span className="flex-1 px-2 py-1 bg-teal-500">Operators</span>
        </div>

        {/* Filter/Search Controls */}
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center space-x-1">
            <label>Show:</label>
            <select
              value={entries}
              onChange={(e) => setEntries(Number(e.target.value))}
              className="border p-1 rounded"
            >
              <option value={5}>5 entries</option>
              <option value={10}>10 entries</option>
              <option value={20}>20 entries</option>
            </select>
          </div>
          <div>
            <button className='bg-green-400 p-1 rounded border hover:bg-green-500' onClick={() => setShowForm(true)}>
               + Add operator
            </button>
          </div>
          {showForm && (
  <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50">
    <div className="bg-white p-6 rounded shadow-md w-full max-w-md">
      <h2 className="text-xl font-semibold mb-4">Add Operator</h2>
      <form
        onSubmit={handleCreateOperator}
        className="space-y-4"
      >
        <input
          type="text"
          placeholder="Name"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, operatorName: e.target.value })}
          className="w-full border p-2 rounded"
          required
        />
        <input
          type="text"
          placeholder="Department"
          value={formData.department}
          onChange={(e) => setFormData({ ...formData, department: e.target.value })}
          className="w-full border p-2 rounded"
          required
        />
        <input
          type="email"
          placeholder="Email"
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          className="w-full border p-2 rounded"
          required
        />
        <input
          type="tel"
          placeholder="Phone Number"
          value={formData.number}
          onChange={(e) => setFormData({ ...formData, number: e.target.value })}
          className="w-full border p-2 rounded"
          required
        />
        <div className="flex justify-end space-x-2">
          <button
            type="button"
            className="px-4 py-2 bg-gray-300 rounded"
            onClick={() => setShowForm(false)}
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  </div>
)}

          <div className="flex items-center border rounded px-2 py-0.5">
            <input
              type="text"
              placeholder="Search..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="border p-1 rounded"
            />
            <span className="ml-1">🔍</span>
          </div>
        </div>

        {/* Table */}
        <table className="w-full border border-collapse text-sm">
          <thead>
            <tr className="bg-gray-200">
              <th className="border p-2 text-left">#</th>
              <th className="border p-2 text-left">Staff ID</th>
              <th className="border p-2 text-left">Name</th>
              <th className="border p-2 text-left">Department</th>
              <th className="border p-2 text-left">Setting</th>
            </tr>
          </thead>
          <tbody>
            {operators
              .filter((item) =>
                Object.values(item).some((val) =>
                  val?.toString().toLowerCase().includes(search.toLowerCase())
                )
              )
              .slice(0, entries)
              .map((item, index) => (
                <tr
                  key={item.id || index}
                  className={index % 2 ? 'bg-gray-100' : ''}
                >
                  <td className="border px-2 py-1">
                     {index + 1}
                  </td>
                  <td className="border px-2 py-1">{item._id || '-'}</td>
                  <td className="border px-2 py-1">{item.operatorName || '-'}</td>
                  <td className="border px-2 py-1">{item.department || '-'}</td>
                  <td className="border px-2 py-1">{item.email || '-'}</td>
                  <td className="border px-2 py-1 flex space-x-2">
                    <button
  className="text-xs text-red-500 m-auto"
  onClick={async () => {
    const confirmDelete = window.confirm("Are you sure you want to delete this user?");
    if (!confirmDelete) return;

    try {
      await deleteoperator(item._id); // assuming item._id exists
      setOperators((prev) => prev.filter((operators) => operators._id !== item._id)); // update UI
    } catch (err) {
      alert(err.message); // show error
    }
  }}
>
  🗑️
</button>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>

        <div className="text-xs mt-2 text-gray-600">
          Showing 1 to {Math.min(entries, operators.length)} of {operators.length} entries
        </div>
      </div>
    )}
  </>
)}
        </main>
      </div>

      {/* Footer */}
      <footer className="text-center text-sm text-black py-4 bg-blue-300 mt-auto">
        HelpDesk System Made with React
      </footer>
    </div>
  );
}

import React, { useState } from 'react';
import {
  ClipboardDocumentListIcon,
  CheckCircleIcon,
  ClockIcon,
  ArrowPathIcon,
} from '@heroicons/react/24/solid';

const teamMembers = [
  {
    name: "Operation Name 1",
    contact: "0123456789",
    department: "ABC",
    totalTickets: 5,
    solved: 2,
    pending: 1,
    inProgress: 2,
    rating: 4,
  },
  {
    name: "Operation Name 2",
    contact: "9876543210",
    department: "XYZ",
    totalTickets: 8,
    solved: 5,
    pending: 1,
    inProgress: 2,
    rating: 5,
  },
  {
    name: "Operation Name 3",
    contact: "0001112222",
    department: "DEF",
    totalTickets: 3,
    solved: 1,
    pending: 1,
    inProgress: 1,
    rating: 3,
  },
];


const TicketDetailsModal = ({ ticket, onClose }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState(ticket);

  if (!ticket) return null;


  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleUpdate = (e) => {
    e.preventDefault();
    // Submit formData here (e.g., API call)
    console.log("Updated Ticket:", formData);
    setIsEditing(false);
  };

  return (
    <div
      className="fixed inset-0 bg-black/30 backdrop-blur-sm flex items-center justify-center z-50"
      onClick={onClose}
    >
      <div
        className="bg-white w-full max-w-md p-6 rounded-xl shadow-lg"
        onClick={(e) => e.stopPropagation()}
      >
        <h2 className="text-xl font-semibold text-center mb-4">
          {isEditing ? "Update Ticket" : "Ticket Details"}
        </h2>

        {isEditing ? (
          <form onSubmit={handleUpdate} className="space-y-3 text-sm text-gray-700">
            <input
              type="text"
              name="name"
              value={formData.name || ""}
              onChange={handleChange}
              placeholder="Name"
              className="w-full px-3 py-2 border rounded"
            />
            <input
              type="text"
              name="dept"
              value={formData.dept || ""}
              onChange={handleChange}
              placeholder="Department"
              className="w-full px-3 py-2 border rounded"
            />
            <input
              type="text"
              name="subject"
              value={formData.subject}
              onChange={handleChange}
              placeholder="Title"
              className="w-full px-3 py-2 border rounded"
            />
            <textarea
              name="description"
              value={formData.description || ""}
              onChange={handleChange}
              placeholder="Description"
              className="w-full px-3 py-2 border rounded"
            />
            <input
              type="text"
              name="category"
              value={formData.category || ""}
              onChange={handleChange}
              placeholder="Category"
              className="w-full px-3 py-2 border rounded"
            />
            <select
              name="priority"
              value={formData.priority}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded"
            >
              <option value="High">High</option>
              <option value="Medium">Medium</option>
              <option value="Low">Low</option>
            </select>

            <div className="flex justify-between">
              <button
                type="submit"
                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition"
              >
                Save
              </button>
              <button
                type="button"
                onClick={() => setIsEditing(false)}
                className="bg-gray-400 text-white px-4 py-2 rounded hover:bg-gray-500 transition"
              >
                Cancel
              </button>
            </div>
          </form>
        ) : (
          <>
            <div className="space-y-1 text-sm text-gray-700">
              <p><strong>Ticket No:</strong> {ticket.id}</p>
              <p><strong>Date:</strong> {ticket.date}</p>
              <p><strong>Name:</strong> {ticket.name || "John Doe"}</p>
              <p><strong>Dept:</strong> {ticket.dept || "Support"}</p>
              <p><strong>Title:</strong> {ticket.subject}</p>
              <p><strong>Description:</strong> {ticket.description || "Detailed issue description here..."}</p>
              <p><strong>Category:</strong> {ticket.category || "General"}</p>
              <p><strong>Type:</strong> {ticket.type || "Issue"}</p>
              <p><strong>Priority:</strong> {ticket.priority || "High"}</p>
              <p><strong>Status:</strong> {ticket.status}</p>
              <p><strong>Attachment:</strong> {ticket.attachment || "No file"}</p>
            </div>

            <div className="mt-4 text-center space-x-4">
              <button
                onClick={() => setIsEditing(true)}
                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition"
              >
                Update
              </button>
              <button
                onClick={onClose}
                className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition"
              >
                Close
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default function Dashboardop() {
  const [activeTab, setActiveTab] = useState('dashboard');

  const [selectedTicket, setSelectedTicket] = useState(null);

  const [selected, setSelected] = useState(teamMembers[0]);

    const tickets = [
    { id: '1234', subject: 'Login issue', status: 'In Progress', category: 'Access Issue', date: '13/08/21', priority: 'high' },
    { id: '1124', subject: 'New ticket issue', status: 'On hold', category: 'Access Issue', date: '14/08/21', priority: 'medium' },
    { id: '1224', subject: 'New request', status: 'Closed', category: 'feedback', date: '13/08/21', priority: 'low' },
    { id: '1244', subject: 'Ticket submission', status: 'In Progress', category: 'ticketing', date: '14/08/21', priority: 'low' },
    { id: '1114', subject: 'Login issue', status: 'In Progress', category: 'Access Issue', date: '3/08/21', priority: 'medium' },
  ];

  const [ticketss, setTicketss] = useState(
    tickets.map(ticket => ({
      ...ticket,
      status: 'Pending',
      assignedTo: ''
    }))
  );

  const handleStatusChange = (id, newStatus) => {
    setTicketss(prev =>
      prev.map(ticket =>
        ticket.id === id ? { ...ticket, status: newStatus } : ticket
      )
    );
  };

  const handleAssign = (id, memberName) => {
    setTicketss(prev =>
      prev.map(ticket =>
        ticket.id === id ? { ...ticket, assignedTo: memberName } : ticket
      )
    );
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

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white text-gray-800 font-sans">
      {/* Topbar */}
      <header className="bg-blue-600 text-white py-4 px-6 flex justify-between items-center shadow">
        <h1 className="text-2xl font-bold text-white tracking-wide animate-pulse">Helpdesk</h1>
        <div className="space-x-4 text-sm">
          <span className="bg-green-400  text-black px-2 py-1 rounded-full">EN</span>
          <button title="Notifications" className='rounded-full bg-white p-1 hover:scale-150 hover:bg-gray-200 transition-all '>🔔</button>
          <button title="Profile" onClick={() => setActiveTab('user-profile')} className='rounded-full bg-white p-1 hover:scale-150 hover:bg-gray-200 transition-all'>👤</button>
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
            <button onClick={() => setActiveTab('ticket')} className={`text-left hover:ml-3 transition-all flex items-center gap-2 ${activeTab === 'ticket' ? 'font-bold text-yellow-600' : 'text-white'}`}>
              📝  Ticket Apporval
            </button>
            <button onClick={() => setActiveTab('my-tickets')} className={`text-left hover:ml-3 transition-all flex items-center gap-2 ${activeTab === 'my-tickets' ? 'font-bold text-yellow-600' : 'text-white'}`}>
                🎫 My Ticket
            </button>
            <button onClick={() => setActiveTab('performance')} className={`text-left hover:ml-3 transition-all flex items-center gap-2 ${activeTab === 'performance' ? 'font-bold text-yellow-600' : 'text-white'}`}>
                🎫 Performance
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
            <p className="text-lg font-semibold">3</p>
            <p className="text-sm">Technical Supports</p>
          </div>

          {/* Operation Team */}
          <div className="text-center">
            <img
              src="https://img.icons8.com/ios-filled/50/000000/technical-support--v1.png"
              alt="operation team"
              className="mx-auto w-10"
            />
            <p className="text-lg font-semibold">4</p>
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

          {activeTab === 'ticket' && (
            <>
               <div className="p-4">
      <h2 className="text-xl font-semibold mb-4">Ticket Approval</h2>

      <div className="overflow-x-auto">
        <table className="min-w-full bg-white shadow rounded-xl overflow-hidden">
          <thead className="bg-gray-200 text-gray-700">
            <tr>
              <th className="p-3 text-left">Ticket No.</th>
              <th className="p-3 text-left">Subject</th>
              <th className="p-3 text-left">Category</th>
              <th className="p-3 text-left">Priority</th>
              <th className="p-3 text-left">Date</th>
              <th className="p-3 text-left">Action</th>
              <th className="p-3 text-left">Assign to</th>
            </tr>
          </thead>
          <tbody className="text-gray-700">
            {ticketss.map(ticket => (
              <tr key={ticket.id} className="border-b hover:bg-gray-50">
                <td className="p-3 font-semibold text-blue-700">{ticket.id}</td>
                <td className="p-3">{ticket.subject}</td>
                <td className="p-3">{ticket.category}</td>
                <td className="p-3">
                  <select
                    value={ticket.status}
                    onChange={(e) => handleStatusChange(ticket.id, e.target.value)}
                    className="bg-white border border-gray-300 rounded px-2 py-1 text-sm focus:outline-none hover:bg-gray-100 transition duration-150"
                  >
                    <option value="High">High</option>
                    <option value="Medium">Medium</option>
                    <option value="Low">Low</option>
                  </select>
                </td>
                <td className="p-3">{ticket.date}</td>
                <td className="p-3">
                  <select
                    value={ticket.status}
                    onChange={(e) => handleStatusChange(ticket.id, e.target.value)}
                    className="bg-white border border-gray-300 rounded px-2 py-1 text-sm focus:outline-none hover:bg-gray-100 transition duration-150"
                  >
                    <option value="In Progress">In Progress</option>
                    <option value="Closed">Closed</option>
                    <option value="Pending">Pending</option>
                    <option value="On Hold">On Hold</option>
                  </select>
                </td>
                <td className="p-3">
                  <select
                    value={ticket.assignedTo}
                    onChange={(e) => handleAssign(ticket.id, e.target.value)}
                    className="border px-2 py-1 rounded text-sm"
                  >
                    <option value="">Assign</option>
                    {teamMembers.map(member => (
                      <option key={member.name} value={member.name}>
                        {member.name}
                      </option>
                    ))}
                  </select>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="text-sm text-gray-600 mt-4">
        Showing 1 to {ticketss.length} of {ticketss.length} entries
      </div>
    </div>
            </>
          )}
          {activeTab === 'my-tickets' && (
  <>
    <h2 className="text-2xl font-semibold text-center mb-8">List of Tickets</h2>

    {/* Search & Filter */}
    <div className="flex flex-wrap justify-between items-center mb-4">
      <div className="flex items-center space-x-2">
        <label htmlFor="entries" className="font-medium">Show:</label>
        <select id="entries" className="border rounded px-2 py-1 w-16 bg-yellow-200">
          <option>5</option>
          <option>10</option>
          <option>20</option>
        </select>
        <span className="text-sm text-gray-600">Entries</span>
      </div>

      <div className="flex items-center space-x-2">
        <input
          type="text"
          placeholder="Find ticket"
          className="border rounded px-3 py-1"
        />
        <button className="text-xl">🔍</button>
      </div>
    </div>

    {/* Ticket Table */}
    <div className="overflow-x-auto">
        <table className="min-w-full bg-white shadow rounded-xl overflow-hidden">
          <thead className="bg-gray-200 text-gray-700">
            <tr>
              <th className="text-left p-3">Ticket No.</th>
              <th className="text-left p-3">Subject</th>
              <th className="text-left p-3">Status</th>
              <th className="text-left p-3">Category</th>
              <th className="text-left p-3">Date</th>
              <th className="text-left p-3">Priority</th>
            </tr>
          </thead>
          <tbody className="text-gray-700">
            {tickets.map((ticket) => (
              <tr key={ticket.id} className="border-b hover:bg-gray-50">
                <td
                  className="p-3 text-blue-600 hover:underline cursor-pointer"
                  onClick={() => setSelectedTicket(ticket)}
                >
                  {ticket.id}
                </td>
                <td className="p-3">{ticket.subject}</td>
                <td className="p-3">
                  <span
                    className={`
                      px-3 py-1 rounded-full text-xs font-semibold
                      ${ticket.status === 'In Progress' ? 'bg-green-500 text-white' :
                        ticket.status === 'On hold' ? 'bg-blue-900 text-white' :
                        ticket.status === 'Closed' ? 'bg-gray-600 text-white' :
                        'bg-yellow-300'}
                    `}
                  >
                    {ticket.status}
                  </span>
                </td>
                <td className="p-3">{ticket.category}</td>
                <td className="p-3">{ticket.date}</td>
                <td className="p-3">{ticket.priority}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* ✅ Modal for Ticket Details */}
      <TicketDetailsModal
        ticket={selectedTicket}
        onClose={() => setSelectedTicket(null)}
      />

    <div className="text-sm text-gray-600 mt-4">Showing 1 to 5 of 5 entries</div>
    

  </>
)}
{/* User Profile */}
    {activeTab==='user-profile' && (
<>
<div className="min-h-screen p-8">
      <h2 className="text-3xl font-semibold mb-6  pb-2 text-center">User Profile</h2>

      <div className="border-2 border-blue-100 rounded-lg p-6 flex flex-col md:flex-col gap-5 justify-center items-start bg-blue-200">
        {/* Profile Card */}
        <div className="bg-white rounded-xl hover:shadow-2xl transition-all p-6 w-full md:w-1/3 relative m-auto">
          <button className="absolute top-4 right-4 text-gray-600 hover:text-black" onClick={() => setActiveTab('edit')}>
            ✏️
          </button>
          <div className="flex flex-col items-center">
            <div className="w-24 h-24 bg-gray-300 rounded-full flex items-center justify-center text-4xl text-black mb-4">
              👤
            </div>
            <div className="text-sm text-gray-800 space-y-1 text-center">
              <p><strong>Username</strong></p>
              <p>Contact Number</p>
              <p>Email</p>
              <p>Department</p>
            </div>
          </div>
        </div>

        {/* Feedback Card */}
        <div className="bg-white rounded-xl hover:shadow-2xl transition-all p-6 w-full md:w-1/3 m-auto">
          <h3 className="text-md font-semibold text-center mb-4">Give Your Feedback</h3>
          <textarea
            placeholder="[Lorem Ipsum]"
            className="w-full border border-gray-300 rounded p-2 mb-4 text-sm"
            rows={3}
          />
          <div className="flex justify-center mb-4 text-yellow-500">
            {Array.from({ length: 5 }).map((_, i) => (
              <span key={i} className="text-xl cursor-pointer">☆</span>
            ))}
          </div>
          <button className="w-full bg-teal-500 text-white py-2 rounded hover:bg-teal-600 transition">
            Submit Feedback
          </button>
        </div>
      </div>
    </div>
</>
    )}
    {activeTab==='edit' && (
        <>
        <div className="min-h-screen bg-white p-6">
            <h2 className="text-3xl font-semibold mb-6  pb-2 text-center"> Edit User Profile</h2>
      <div className="max-w-4xl mx-auto border border-gray-200 rounded shadow">
        {/* Header */}
        <div className="bg-blue-500 text-white px-4 py-2 rounded-t">
          <h2 className="font-semibold text-lg">Edit Account</h2>
        </div>

        {/* Form */}
        <form className="w-full grid grid-cols-1 sm:grid-cols-2">
          {/* Labels */}
          <div className="bg-gray-100 text-black flex flex-col text-sm">
            {[
              "Username",
              "Current Password",
              "New Password",
              "Confirm Password",
              "Email",
              "Real Name",
              "Access Level",
              "Project Access Level",
            ].map((label, idx) => (
              <label
                key={idx}
                className="px-4 py-2 border-b border-white flex items-center"
              >
                {label}
              </label>
            ))}
            <div className="px-4 py-4  m-auto ">
              <button
                type="submit"
                className="bg-blue-400 text-white px-4 py-2 rounded hover:bg-teal-500 transition"
              >
                Update User
              </button>
            </div>
          </div>

          {/* Inputs */}
          <div className="flex flex-col text-sm">
            {Array(8)
              .fill("")
              .map((_, i) => (
                <input
                  key={i}
                  type={i === 1 || i === 2 || i === 3 ? "password" : "text"}
                  className="px-3 py-2 border-b border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
              ))}
            
          </div>
        </form>
      </div>
    </div>
        </>
    )}
    {activeTab==='performance' && (
        <>
        <div className="max-w-5xl mx-auto p-6">
      <h2 className="text-xl font-semibold mb-4">Performance</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 ">
        {/* Left: Details */}
        <div className="md:col-span-2 mr-10 space-y-6 p-6 bg-white rounded-xl shadow-md">
  {/* Profile Header */}
  <div className="flex items-center gap-6">
    <div className="w-24 h-24 bg-gray-300 rounded-full flex justify-center items-center shadow">
      <img
        src="https://img.icons8.com/ios-filled/50/000000/user.png"
        alt="user"
        className="w-12 h-12"
      />
    </div>
    <h3 className="text-2xl font-bold text-gray-800">{selected.name}</h3>
  </div>

  {/* Contact Info */}
  <div className="bg-blue-50 rounded-lg p-4 text-base border border-blue-200 w-fit shadow-sm">
    <p className="mb-1"><span className="font-semibold">Contact No:</span> {selected.contact}</p>
    <p><span className="font-semibold">Department:</span> {selected.department}</p>
  </div>

  {/* Ticket Stats */}
  <div className="bg-gray-100 rounded-lg p-5 w-fit text-base shadow-sm border border-gray-200">
    <p className="font-semibold text-lg mb-2 text-gray-700">
      Total Ticket Handle: <span className="text-blue-600">{selected.totalTickets}</span>
    </p>
    <ul className="space-y-1 text-gray-700 ml-1">
      <li>✅ Ticket Solved: {selected.solved}</li>
      <li>🕗 Ticket Pending: {selected.pending}</li>
      <li>🚧 Ticket in progress: {selected.inProgress}</li>
    </ul>
    <p className="mt-3">
      <span className="font-semibold text-gray-700">Rating:</span>{" "}
      <span className="text-yellow-500 text-lg">
        {"★".repeat(selected.rating)}
        {"☆".repeat(5 - selected.rating)}
      </span>
    </p>
  </div>
</div>


        {/* Right: List */}
        <div className="space-y-4 ">
          {teamMembers.map((member, idx) => (
            <div
              key={idx}
              className="bg-white shadow rounded p-3 flex items-center gap-3 h-30 w-l"
            >
              <div className="w-10 h-10 bg-gray-300 rounded-full flex justify-center items-center ">
                <img
                  src="https://img.icons8.com/ios-filled/50/000000/user.png"
                  alt="user"
                  className="w-6"
                />
              </div>
              <div className="flex-1">
                <p className="font-medium text-sm">{member.name}</p>
                <button
                  onClick={() => setSelected(member)}
                  className="mt-1 text-xs bg-teal-400 text-white px-3 py-1 rounded hover:bg-teal-500 transition"
                >
                  View details
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
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

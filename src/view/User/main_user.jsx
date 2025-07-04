import React, { useState,useEffect } from 'react';
import {
  ClipboardDocumentListIcon,
  CheckCircleIcon,
  ClockIcon,
  ArrowPathIcon,
} from '@heroicons/react/24/solid';
import { createTicket,getTicket,getProfile } from '../../services/user';
import { Link } from 'react-router-dom';


const TicketDetailsModal = ({ ticket, onClose }) => {
  if (!ticket) return null;

  return (
    <div className="fixed inset-0 backdrop-blur-xs bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white w-full max-w-md p-6 rounded-xl shadow-lg">
        <h2 className="text-xl font-semibold text-center mb-4">Ticket Details</h2>
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
        <div className="mt-4 text-center">
          <button
            onClick={onClose}
            className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState('dashboard');

  const [selectedTicket, setSelectedTicket] = useState(null);

  const [formData, setFormData] = useState({
    date: '',
    name: '',
    department: '',
    subject: '',
    description: '',
    category: '',
  });

  const stars = Math.floor(Math.random() * 6);
  const userinfo=JSON.parse(localStorage.getItem("userinfo"));
  const token = userinfo?.token || null;
  const id=userinfo?.id;
  console.log("TOKEN VALUE:", token);

  const ticketDetails = async(e)=>{
    
    e.preventDefault();
    console.log("formData:", formData);
    try{
    const res = await createTicket(formData,token);
    alert('ticket added successfully');
    setFormData({ 
    date: '',
    name: '',
    department: '',
    subject: '',
    description: '',
    category: '', });
    console.log('lluu');

  } catch (err) {
    alert(err.response?.data?.message || 'Failed to add ticket');
  }

  };

    const [profile,setProfile]=useState([]);
    useEffect(() => {
      const fetchData = async () => {
        try {
          const profileData = await getProfile(id);
          console.log(profileData.data);
          setProfile(profileData.data);
        } catch (err) {
          setError('Failed to load data');
        }
      };
      fetchData();
    }, []);


  
    const [entries, setEntries] = useState(10);
    const [tkts, setTkts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
  
    useEffect(() => {
      const fetchData = async () => {
        try {
          const ticketData = await getTicket(id);
          console.log(ticketData);
          setTkts(ticketData.data.data);
          setLoading(false);
        } catch (err) {
          setError('Failed to load data');
          setLoading(false);
        }
      };
  
      fetchData();
    }, []);
    const { solved, hold, pro } = tkts.length
  ? tkts.reduce(
      (acc, ticket) => {
        if (ticket.status === "Closed") acc.solved++;
        else if (ticket.status === "Pending") acc.hold++;
        else if (ticket.status === "In Progress") acc.pro++;
        return acc;
      },
      { solved: 0, hold: 0, pro: 0 }
    )
  : { solved: 0, hold: 0, pro: 0 };
 const cards = [
  {
    title: 'Total Tickets',
    count: tkts.length,
    color: 'bg-blue-500',
    icon: <ClipboardDocumentListIcon className="h-6 w-6 text-blue-600" />,
  },
  {
    title: 'Total Solved',
    count: solved,
    color: 'bg-green-500',
    icon: <CheckCircleIcon className="h-6 w-6 text-green-600" />,
  },
  {
    title: 'Total Awaiting Approval',
    count: hold,
    color: 'bg-red-500',
    icon: <ClockIcon className="h-6 w-6 text-red-600" />,
  },
  {
    title: 'Total In Progress',
    count: pro,
    color: 'bg-yellow-400',
    icon: <ArrowPathIcon className="h-6 w-6 text-yellow-600" />,
  },
];

  return (
    <>
    {token && (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white text-gray-800 font-sans">
      {/* Topbar */}
      <header className="bg-blue-600 text-white py-4 px-6 flex justify-between items-center shadow">
        <Link to="/"><h1 className="text-2xl font-bold text-white tracking-wide animate-pulse">Helpdesk</h1></Link>
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
              📝 New Ticket
            </button>
            <button onClick={() => setActiveTab('my-tickets')} className={`text-left hover:ml-3 transition-all flex items-center gap-2 ${activeTab === 'my-tickets' ? 'font-bold text-yellow-600' : 'text-white'}`}>
  🎫 My Ticket
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

            </>
          )}

          {activeTab === 'ticket' && (
            <>
              <h2 className="text-2xl font-semibold text-center mb-8">Create New Ticket</h2>
              <form className="bg-white p-6 rounded-xl shadow-md grid grid-cols-1 md:grid-cols-2 gap-6" onSubmit={ticketDetails}>
                <div>
                  <label className="block mb-1 font-medium">Date</label>
                  <input type="date" className="w-full border rounded px-3 py-2 "
                  value={formData.date}
          onChange={(e) => setFormData({ ...formData, date: e.target.value })} />
                </div>
                <div>
                  <label className="block mb-1 font-medium">Name</label>
                  <input type="text" className="w-full border rounded px-3 py-2"
                  value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })} />
                </div>
                <div>
                  <label className="block mb-1 font-medium">Department</label>
                  <input type="text" className="w-full border rounded px-3 py-2"
                  value={formData.department}
          onChange={(e) => setFormData({ ...formData, department: e.target.value })} />
                </div>
                <div className="md:col-span-2">
                  <label className="block mb-1 font-medium">Subject</label>
                  <input type="text" className="w-full border rounded px-3 py-2"
                  value={formData.subject}
          onChange={(e) => setFormData({ ...formData, subject: e.target.value })} />
                </div>
                <div>
                  <label className="block mb-1 font-medium">Category</label>
                  <input type="text" className="w-full border rounded px-3 py-2"
                  value={formData.category}
          onChange={(e) => setFormData({ ...formData, category: e.target.value })} />
                </div>
                <div className="md:row-span-2">
                  <label className="block mb-1 font-medium">Description</label>
                  <textarea className="w-full border rounded px-3 py-2 h-full" rows="5" 
                  value={formData.description}
          onChange={(e) => setFormData({ ...formData, description: e.target.value })}/>
                </div>


                {/* Captcha & Submit */}
                <div className="md:col-span-2 flex items-center justify-between mt-6">
                  <button
                    type="submit"
                    className="bg-teal-500 text-white px-6 py-2 rounded hover:bg-teal-600 transition"
                  >
                    Submit
                  </button>
                </div>
              </form>
            </>
          )}
          {activeTab === 'my-tickets' && (
  <>
    <h2 className="text-2xl font-semibold text-center mb-8">List of Tickets</h2>

    {/* Search & Filter */}
    <div className="flex flex-wrap justify-between items-center mb-4">
      <div className="flex items-center space-x-2">
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
              <th className="text-left p-3 ">Subject</th>
              <th className="text-left p-3">Status</th>
              <th className="text-left p-3">Date</th>
              <th className="text-left p-3">Rate</th>
            </tr>
          </thead>
          <tbody className="text-gray-700">
            {tkts.map((ticket) => (
              <tr key={ticket.id} className="border-b hover:bg-gray-50">
                <td
                  className="p-3 text-blue-600 hover:underline cursor-pointer"
                  onClick={() => setSelectedTicket(ticket)}
                >
                  {ticket._id}
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
                <td className="p-3">{ticket.date.slice(0, 10)}</td>
                <td className="p-3 text-yellow-500">
                  {'★'.repeat(stars)}{'☆'.repeat(5 - stars)}
                </td>
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
              <p><strong>{profile.userName}</strong></p>
              
              <p>{profile.email}</p>
              <p>{profile.department}</p>
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

        </main>
      </div>

      {/* Footer */}
      <footer className="text-center text-sm text-black py-4 bg-blue-300 mt-auto">
        HelpDesk System Made with React
      </footer>
    </div>)}
    {!token && (
      <>
      <h1 className='text-red-500 text-5xl flex justify-center mt-80'> Login First</h1>
       <div className='text-center text-blue-700'><Link  to="/signin"> here</Link></div>
    </>
    )}
    
    </>
  );
}

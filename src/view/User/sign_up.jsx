import React, { useState } from 'react';
import { authApi2 } from '../../services/user';
import { useNavigate } from 'react-router-dom';




export default function AuthForm2() {

  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const [name, setName] = useState("");
  const [dept, setDept] = useState("");

  const navigate = useNavigate();

  const handlesignin= async (e)=>{
    
    e.preventDefault();
    console.log("hulahula");
    const body={userName:name,email,password:pass,department:dept}
    const data= await authApi2(body);
    if(data){
      navigate("/signin");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-100 to-white px-4">
      <div className="w-full max-w-md bg-white p-8 rounded-xl shadow-lg">
        <h2 className="text-2xl font-bold text-blue-600 mb-6 text-center">
          'Sign In to HelpDeskSystem' 
        </h2>
        <form onSubmit={handlesignin}>
          <div>
            <label className="block text-sm font-medium mb-1">Username</label>
            <input
              type="text"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 mb-3"
              onChange={(e)=>setName(e.target.value)}
              placeholder="xxyx"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Department</label>
            <input
              type="text"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 mb-3"
              onChange={(e)=>setDept(e.target.value)}
              placeholder="no"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Email</label>
            <input
              type="email"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 mb-3"
              onChange={(e)=>setEmail(e.target.value)}
              placeholder="you@example.com"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Password</label>
            <input
              type="password"
              onChange={(e)=>setPass(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 mb-3"
              placeholder="********"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700"
          >
            Sign In
          </button>
        </form>
          
    </div>
    </div>
  );
}

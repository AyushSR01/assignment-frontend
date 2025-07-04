import React, { useState } from 'react';
import { authApi } from '../../services/user';
import { useNavigate } from 'react-router-dom';



export default function AuthForm() {

  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");

  const navigate = useNavigate();

  const handlesignin= async (e)=>{
    e.preventDefault();
    console.log("bhaagagshgjlasgldasldhddjg");
    const body={email,password:pass}
    const data= await authApi(body);
    if(data){
      localStorage.setItem("userinfo",JSON.stringify(data.user));
      navigate("/dashboard");
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
        <Link to="/signup" className='text-blue-600'>Sign up</Link>
          
    </div>
    </div>
  );
}

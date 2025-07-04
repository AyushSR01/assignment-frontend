import axios from "axios";

const authApi = async (body) => {
  try {
    const url = `${import.meta.env.VITE_BACKEND_URL}/user/auth`;
    const res = await axios.post(url, body,{
  withCredentials: true
});
    return res.data;
  } catch (err) {
    // Enhanced error handling
    throw new Error(err?.response?.data?.message || err.message || "Authentication failed");
  }
};
const authApi2 = async (body) => {
  try {
    const url = `${import.meta.env.VITE_BACKEND_URL}/user/authup`;
    const res = await axios.post(url, body,{
  withCredentials: true
});
    return res.data;
  } catch (err) {
    // Enhanced error handling
    throw new Error(err?.response?.data?.message || err.message || "Signup failed");
  }
};


 const createTicket = async (body, token) => {
  const url = `${import.meta.env.VITE_BACKEND_URL}/user/creating-ticket`;

  try {
    const res = await axios.post(url, body,{
      headers:{
        Authorization:`Bearer ${token}`
      }
    },{
  withCredentials: true
});

    // Optionally log response for dev
    // console.log("✅ Ticket created:", res.data);

    return res.data;
  } catch (err) {
    // Log detailed error info for development
    console.error("❌ Ticket creation error:", err?.response?.data || err.message);

    // Optional: Customize user-facing error
    const message =
      err?.response?.data?.message ||
      err?.message ||
      'Failed to create ticket. Please try again later.';

    throw new Error(message);
  }
};

const getTicket=async(id)=>{
  const url = `${import.meta.env.VITE_BACKEND_URL}/user/getting-tickets/${id}`;
  try{
    const ticketData=await axios.get(url, {
  withCredentials: true
});
    return ticketData;
  }
  catch(err){
    const message =
      err?.response?.data?.message ||
      err?.message ||
      'Failed to get ticket. Please try again later.';

    throw new Error(message);
  }
};

const getProfile=async(id)=>{
  const url = `${import.meta.env.VITE_BACKEND_URL}/user/getting-user/${id}`;
  try{
    const proData=await axios.get(url,{
  withCredentials: true
});
    return proData;
  }
  catch(err){
    const message =
      err?.response?.data?.message ||
      err?.message ||
      'Failed to get profile. Please try again later.';

    throw new Error(message);
  }
};





export { authApi ,authApi2 ,createTicket,getTicket,getProfile };

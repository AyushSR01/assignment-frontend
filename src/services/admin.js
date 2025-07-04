import axios from "axios";

const getDetailsOfOperator = async () => {
  try {
    const url = `${import.meta.env.VITE_BACKEND_URL}/admin/getting-operator`;
    const res = await axios.get(url, { withCredentials: true });
    return res.data;
  } catch (err) {
    throw new Error(err?.response?.data?.message || err.message || "Fetching failed");
  }
};

const getDetailsOfUser = async () => {
  try {
    const url = `${import.meta.env.VITE_BACKEND_URL}/admin/getting-user`;
    const res = await axios.get(url, { withCredentials: true });
    return res.data;
  } catch (err) {
    throw new Error(err?.response?.data?.message || err.message || "Fetching failed");
  }
};

const deleteUser = async (id) => {
  try {
    const url = `${import.meta.env.VITE_BACKEND_URL}/admin/delete-adminuser/${id}`;
    const res = await axios.post(url, null, { withCredentials: true });
    return res.data;
  } catch (err) {
    throw new Error(err?.response?.data?.message || err.message || "Fetching failed");
  }
};

const deleteOperator = async (id) => {
  try {
    const url = `${import.meta.env.VITE_BACKEND_URL}/admin/delete-adminop/${id}`;
    const res = await axios.post(url, null, { withCredentials: true });
    return res.data;
  } catch (err) {
    throw new Error(err?.response?.data?.message || err.message || "Fetching failed");
  }
};

const createOperator = async (formData) => {
  try {
    const url = `${import.meta.env.VITE_BACKEND_URL}/admin/adding-op`;
    const res = await axios.post(url, formData, { withCredentials: true });
    return res.data;
  } catch (err) {
    throw new Error(err?.response?.data?.message || err.message || "Creation failed");
  }
};

export {
  getDetailsOfOperator,
  getDetailsOfUser,
  deleteUser,
  deleteOperator,
  createOperator
};

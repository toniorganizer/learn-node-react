import React, {useState, useEffect} from 'react'
import axios from 'axios';
import {jwtDecode} from "jwt-decode";
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {

    const [name, setName] = useState("");
    const [token, setToken] = useState("");
    const [users, setUser] = useState([]);
    const [expired, setExpired] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        refreshToken();
        getUser();
    }, []);

    const refreshToken = async () => {
        try {
            const response = await axios.get('http://localhost:5000/token');
            setToken(response.data.accessToken);
            const decoded = jwtDecode(response.data.accessToken);
            setName(decoded.name);
            setExpired(decoded.exp);
        } catch (error) {
            if(error.response){
              navigate('/');
            }
        }
    }

    const axiosJWT = axios.create();

    axiosJWT.interceptors.request.use(async(config) => {
      const currentDate = new Date();
      if(expired * 1000 < currentDate.getTime()){
        const response = await axios.get('http://localhost:5000/token');
        config.headers.Authorization = `Bearer ${response.data.accessToken}`;
        setToken(response.data.accessToken);
        const decoded = jwtDecode(response.data.accessToken);
        setName(decoded.name);
        setExpired(decoded.exp);
      }
      return config;
    }, (error) => {
      return Promise.reject(error);
    })

    const getUser = async () => {
      const response = await axiosJWT.get('http://localhost:5000/users', {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      setUser(response.data);
    }

  return (
    <div className="container mt-5">
      <h1>Selamat datang : {name}</h1>
      <button onClick={getUser} className="container button is-info">Data</button>
      <table className="table is-fullwidth is-striped is-narrow">
        <thead>
          <tr>
            <td>No.</td>
            <td>Nama</td>
            <td>Email</td>
          </tr>
        </thead>
        <tbody>
            {users.map((user, index) => (
            <tr key={user.id}>
                <td>{index + 1}</td>
                <td>{user.name}</td>
                <td>{user.email}</td>
            </tr>
            ))}
        </tbody>
      </table>
    </div>
  )
}

export default Dashboard

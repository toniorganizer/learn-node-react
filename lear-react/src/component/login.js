import React, {useState} from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';


const Login = () => {
    const [username, setUsername] = useState(""); 
    const [password, setPassword] = useState(""); 
    const [msg, setMsg] = useState(""); 
    const navigate = useNavigate();

    const Login = async (e) => {
        e.preventDefault();
        try {
            await axios.post('http://localhost:5000/login', {
                username: username,
                password: password
            });
            navigate('/dashboard');
        } catch (error) {
            if(error.response){
                setMsg(error.response.data.msg);
            }
        }
    }

  return (
    <section className="hero has-background-grey-light is-fullheight is-fullwidth">
      <div className="hero-body">
        <div className="container">
            <div className="columns is-centered">
                <div className="column is-4-desktop">
                    <form className="box" onSubmit={Login}>
                        <p className="has-text-centered">{msg}</p>
                        <div className="field">
                            <label className="label">Username</label>
                            <div className="controls">
                                <input type="text" className="input" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} />
                            </div>
                        </div>
                        <div className="field">
                            <label className="label">Password</label>
                            <div className="controls">
                                <input type="password" className="input" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
                            </div>
                        </div>
                        <div className="field">
                            <button className="button is-success is-fullwidth">Login</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
      </div>
    </section>
  )
}

export default Login

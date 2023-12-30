import React, {useState} from 'react'
import axios from 'axios';
import {useNavigate} from 'react-router-dom';

const Register = () => {
    const [username, setUsername] = useState(""); 
    const [name, setName] = useState(""); 
    const [email, setEmail] = useState(""); 
    const [password, setPassword] = useState(""); 
    const [confirmPassword, setConfirmPassword] = useState(""); 
    const [msg, setMsg] = useState(""); 
    const navigate = useNavigate();

    const Register = async (e) => {
        e.preventDefault();
        try {
            await axios.post('http://localhost:5000/users', {
                username: username,
                name: name,
                email: email,
                password: password,
                confirmPassword: confirmPassword
            });
            navigate('/');
        } catch (error) {
            if(error.response){
                setMsg(error.response.data.msg);
            }
        }
    }

    return (
    <div>
      <section class="hero is-success is-fullheight">
        <div class="hero-body">
          <div class="container">
          <div className="columns is-centered">
                <div className="column is-4-desktop">
                    <form className="box" onSubmit={Register}>
                    <p className="has-text-centered">{msg}</p>
                        <div className="field">
                            <label className="label">Username</label>
                            <div className="controls">
                                <input type="text" className="input" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} />
                            </div>
                        </div>
                        <div className="field">
                            <label className="label">Name</label>
                            <div className="controls">
                                <input type="text" className="input" placeholder="Nama" value={name} onChange={(e) => setName(e.target.value)} />
                            </div>
                        </div>
                        <div className="field">
                            <label className="label">Email</label>
                            <div className="controls">
                                <input type="email" className="input" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
                            </div>
                        </div>
                        <div className="field">
                            <label className="label">Password</label>
                            <div className="controls">
                                <input type="password" className="input" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
                            </div>
                        </div>
                        <div className="field">
                            <label className="label">Ulangi Password</label>
                            <div className="controls">
                                <input type="password" className="input" placeholder="Password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />
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
    </div>
  )
}

export default Register

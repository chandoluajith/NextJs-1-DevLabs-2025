import React, { useState } from "react";
import "./Login.css";

export default function Login() {
  const [form, setForm] = useState({
    Username: '',
    Email: '',
    Password: '',
    ConfirmPassword: ''
  });
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (form.Password !== form.ConfirmPassword) {
      setError('Passwords do not match!');
      return;
    }
    setError('');
    alert('Submitted');
  };

  return (
    <div className="login-container">
      <div className="form-container">
        <h1>Taskify</h1>
        <p className="subheading">Create a new account</p>
        <p className="log-link">
          <a href="#">Or sign in to your existing account</a>
        </p>
        <form onSubmit={handleSubmit}>
          <input type="text" name="Username" placeholder="Username" value={form.Username} onChange={handleChange} required />
          <input type="email" name="Email" placeholder="Email" value={form.Email} onChange={handleChange} required />
          <input type="password" name="Password" placeholder="Password" value={form.Password} onChange={handleChange} required />
          <input type="password" name="ConfirmPassword" placeholder="Confirm Password" value={form.ConfirmPassword} onChange={handleChange} required />
          {error && <p className="error">{error}</p>}
          <button type="submit">Sign Up</button>
        </form>
      </div>
    </div>
  );
}

import React, { useState } from "react";
import { Link, useNavigate} from "react-router-dom";

export default function Signup() {
    const navigate= useNavigate();
    const [credentials, setCredentials] = useState({name:"",email:"",password:"",geolocation:""})
    const handleSubmit = async (e)=>{
        e.preventDefault();    //synthetic event
        const response  = await fetch("http://localhost:5000/api/createuser",{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json' 
            },
            body:JSON.stringify({name: credentials.name, email:credentials.email, password: credentials.password, location:credentials.geolocation})
        })

        const json  = await response.json();
        console.log(json);
        navigate("/");

        if(!json.success){
            alert("Enter valid credentials");
        }
    }

    const onchange = async (e) =>{
        setCredentials({...credentials,[e.target.name]:e.target.value});
    }
  return (
   <>
    <div className="container">
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="name" className="form-label">Name</label>
          <input type="text" className="form-control" name='name' value={credentials.name} onChange={onchange}/>
        </div>
        <div className="mb-3">
          <label htmlFor="exampleInputEmail1" className="form-label">
            Email address
          </label>
          <input
            type="email"
            className="form-control"
            id="exampleInputEmail1"
            aria-describedby="emailHelp"
            name='email' value={credentials.email}
            onChange={onchange}
          />
          <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
        </div>
        <div className="mb-3">
          <label htmlFor="exampleInputPassword1" className="form-label">
            Password
          </label>
          <input
            type="password"
            className="form-control"
            id="exampleInputPassword1"
            name='password' value={credentials.password}
            onChange={onchange}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="exampleInputaddress" className="form-label">
            Address
          </label>
          <input
            type="text"
            className="form-control"
            name='geolocation' value={credentials.geolocation}
            onChange={onchange}
          />
        </div>

        <button type="submit" className="btn btn-success">
          Submit
        </button>
        <Link to="/login" className="m-3 btn btn-danger">Already an user</Link>
      </form>
      </div>
      </>
  );
}
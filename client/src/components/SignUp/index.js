import React from 'react';
import "./style.css";
import {Link} from 'react-router-dom';

const SignUp = (props)=> {
	return (
		<div className="container">
		<div className="sign-in-form">
			<Link to = "/" >Go to sign in</Link>
			<form className="form-signup">
			<h2 className="form-signup-heading">Sign Up</h2>
				<label>Name</label><br/>
				<input className="form-control" value = {props.name} onChange = {props.handleChange} name='name' type='text' placeholder = 'your name'/>
				<br />
				<label>Email</label><br/>
				<input className="form-control" value = {props.username} onChange = {props.handleChange} name='username' type='email' placeholder = 'example@email.com'/>
				<br />
				<label>Password</label><br/>
				<input className="form-control" name='password' type='password' value = {props.password} onChange = {props.handleChange} />
				<br />
				<button className="btn btn-lg btn-primary btn-block" type = 'submit' name = "/auth/signup" onClick = {props.handleSubmit}>Sign Up</button>
			</form>
			</div>
		</div>
	);
};

export default SignUp;
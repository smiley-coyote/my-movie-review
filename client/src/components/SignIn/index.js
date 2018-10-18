import React from 'react';
import "./style.css";
import {Link} from 'react-router-dom';

const SignIn = (props)=> {
	return (
		<div className="container">
			<div className="sign-in-form">
			<Link to = "/signup" >Go to sign up</Link>
			<form className="form-signin">
			<h2 className="form-signin-heading">Please Sign In</h2>
				<label>Email</label><br/>
				<input className="form-control" value = {props.username} onChange = {props.handleChange} name='username' type='email' placeholder = 'example@email.com'/>
				<br />
				<label>Password</label><br/>
				<input className="form-control" name='password' type='password' value = {props.password} onChange = {props.handleChange} />
				<br />
				<button className="btn btn-lg btn-primary btn-block" type = 'submit' name = "/auth/signin" onClick = {props.handleSubmit}>Sign In</button>
			</form>
			</div>
		</div>
	);
};

export default SignIn;
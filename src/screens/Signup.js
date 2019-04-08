import React, { Component } from "react";
import { connect } from "react-redux";
import { Input, Submit } from "../components";
import { signupUser } from "../actions";

class Signup extends Component {
  state = {
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    invalid: false,
    errorMessage: ""
  };

  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  onSubmit = e => {
    const { name, email, password } = this.state;

    e.preventDefault();

    if (this.validate()) this.props.signupUser(name, email, password);
  };

  validate = () => {
    const { name, email, password, confirmPassword, invalid } = this.state;

    if (!name) {
      this.setState({
        invalid: true,
        errorMessage: "Please fill in the name."
      });
      return false;
    } else if (!email) {
      this.setState({
        invalid: true,
        errorMessage: "Please fill in the email."
      });
      return false;
    } else if (!password) {
      this.setState({
        invalid: true,
        errorMessage: "Please enter your password."
      });
      return false;
    } else if (password.length < 6) {
      this.setState({
        invalid: true,
        errorMessage: "Password must have length greater than or equal to 6."
      });
      return false;
    } else if (password !== confirmPassword) {
      this.setState({ invalid: true, errorMessage: "Passwords do not match." });
      return false;
    }

    if (invalid) this.setState({ invalid: false, errorMessage: "" });

    return true;
  };

  render() {
    const {
      name,
      email,
      password,
      confirmPassword,
      invalid,
      errorMessage
    } = this.state;
    const { signup } = this.props;

    return (
      <div>
        <form onSubmit={this.onSubmit}>
          <Input
            name="name"
            type="text"
            placeholder="Full name"
            value={name}
            onChange={this.onChange}
          />
          <Input
            name="email"
            type="email"
            placeholder="Email"
            value={email}
            onChange={this.onChange}
          />
          <Input
            name="password"
            type="password"
            placeholder="Password"
            value={password}
            onChange={this.onChange}
          />
          <Input
            name="confirmPassword"
            type="password"
            placeholder="Confirm password"
            value={confirmPassword}
            onChange={this.onChange}
          />
          <Submit type="submit" />
        </form>
        {invalid && <p>{errorMessage}</p>}
        {signup.pending && (
          <p>{`Please confirm your email address at ${signup.email}.`}</p>
        )}
        {signup.error && <p>{signup.errorMessage}</p>}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  signup: state.signup
});

const mapDispatchToProps = { signupUser };

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Signup);

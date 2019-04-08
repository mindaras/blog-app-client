import React, { Component } from "react";
import { connect } from "react-redux";
import { Input, Submit } from "../components";
import { signinUser } from "../actions";

class Signin extends Component {
  state = {
    username: "",
    password: "",
    invalid: false,
    errorMessage: ""
  };

  componentDidUpdate() {
    if (this.props.signin.authorized) this.props.history.push("/");
  }

  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  onSubmit = e => {
    const { username, password } = this.state;

    e.preventDefault();

    if (this.validate()) this.props.signinUser(username, password);
  };

  validate = () => {
    const { username, password, invalid } = this.state;

    if (!username || !password) {
      this.setState({
        invalid: true,
        errorMessage: "Please fill in all of the fields."
      });
      return false;
    } else if (password.length < 6) {
      this.setState({
        invalid: true,
        errorMessage: "Password must have length greater than or equal to 6."
      });
      return false;
    }

    if (invalid) this.setState({ invalid: false, errorMessage: "" });

    return true;
  };

  render() {
    const { username, password, invalid, errorMessage } = this.state;
    const { signin } = this.props;

    return (
      <div>
        <form onSubmit={this.onSubmit}>
          <Input
            name="username"
            placeholder="Email"
            value={username}
            onChange={this.onChange}
          />
          <Input
            name="password"
            type="password"
            placeholder="Password"
            value={password}
            onChange={this.onChange}
          />
          <Submit type="submit" />
        </form>
        {invalid && <p>{errorMessage}</p>}
        {signin.error && <p>{signin.errorMessage}</p>}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  signin: state.signin
});

const mapDispatchToProps = { signinUser };

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Signin);

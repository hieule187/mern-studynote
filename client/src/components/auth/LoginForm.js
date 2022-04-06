import React, { useContext, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import usernameIcon from '../../assets/person-fill.svg';
import passwordIcon from '../../assets/lock-fill.svg';
import eyeIcon from '../../assets/eye-fill.svg';
import eyeSlashIcon from '../../assets/eye-slash-fill.svg';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../contexts/AuthContext';
import AlertMessage from '../layout/AlertMessage';

const LoginForm = () => {
  // Context
  const { loginUser } = useContext(AuthContext);

  // Local state
  const [loginForm, setLoginForm] = useState({
    username: '',
    password: '',
  });

  const [alert, setAlert] = useState(null);

  const [eyeIconToggle, setEyeIconToggle] = useState(false);

  const { username, password } = loginForm;

  const onChangeLoginForm = (event) =>
    setLoginForm({ ...loginForm, [event.target.name]: event.target.value });

  const login = async (event) => {
    event.preventDefault();

    try {
      const loginData = await loginUser(loginForm);
      if (!loginData.success) {
        setAlert({ type: 'danger', message: loginData.message });
        setTimeout(() => setAlert(null), 5000);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const toggleBtnShowPassword = () => {
    setEyeIconToggle((prevState) => !prevState);
  };

  return (
    <>
      <Form className="my-4" onSubmit={login}>
        <AlertMessage info={alert} />

        <InputGroup className="mb-3">
          <InputGroup.Text className="icon-input-border">
            <img className="no-select" src={usernameIcon} alt="username" />
          </InputGroup.Text>

          <Form.Control
            type="text"
            placeholder="Username"
            name="username"
            required
            value={username}
            onChange={onChangeLoginForm}
          />
        </InputGroup>

        <InputGroup className="mb-3">
          <InputGroup.Text className="icon-input-border">
            <img className="no-select" src={passwordIcon} alt="password" />
          </InputGroup.Text>

          <Form.Control
            type={eyeIconToggle ? 'text' : 'password'}
            placeholder="Password"
            name="password"
            required
            value={password}
            onChange={onChangeLoginForm}
          />

          <InputGroup.Text className="eye-icon" onClick={toggleBtnShowPassword}>
            {eyeIconToggle ? (
              <img className="no-select" src={eyeIcon} alt="eye" />
            ) : (
              <img className="no-select" src={eyeSlashIcon} alt="eyeSlash" />
            )}
          </InputGroup.Text>
        </InputGroup>

        <Button style={{ width: '100%' }} variant="info" type="submit">
          Login
        </Button>
      </Form>

      <p>
        Don't have an account?
        <Link to="/register">
          <Button variant="success" size="sm" className="ml-2">
            Register
          </Button>
        </Link>
      </p>
    </>
  );
};

export default LoginForm;

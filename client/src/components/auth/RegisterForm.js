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

const RegisterForm = () => {
  // Context
  const { registerUser } = useContext(AuthContext);

  // Local state
  const [registerForm, setRegisterForm] = useState({
    username: '',
    password: '',
    confirmPassword: '',
  });

  const [alert, setAlert] = useState(null);

  const [eyeIconToggle, setEyeIconToggle] = useState(false);

  const [eyeIconToggleConfirm, setEyeIconToggleConfirm] = useState(false);

  const { username, password, confirmPassword } = registerForm;

  const onChangeRegisterForm = (event) =>
    setRegisterForm({
      ...registerForm,
      [event.target.name]: event.target.value,
    });

  const register = async (event) => {
    event.preventDefault();

    if (password !== confirmPassword) {
      setAlert({ type: 'danger', message: 'Password do not match' });
      setTimeout(() => setAlert(null), 5000);
      return; // Dừng ngay không chạy tiếp đoạn dưới nữa
    }

    try {
      const registerData = await registerUser(registerForm);
      if (!registerData.success) {
        setAlert({ type: 'danger', message: registerData.message });
        setTimeout(() => setAlert(null), 5000);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const toggleBtnShowPassword = () => {
    setEyeIconToggle((prevState) => !prevState);
  };

  const toggleBtnShowConfirmPassword = () => {
    setEyeIconToggleConfirm((prevState) => !prevState);
  };

  return (
    <>
      <Form className="my-4" onSubmit={register}>
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
            onChange={onChangeRegisterForm}
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
            onChange={onChangeRegisterForm}
          />

          <InputGroup.Text className="eye-icon" onClick={toggleBtnShowPassword}>
            {eyeIconToggle ? (
              <img className="no-select" src={eyeIcon} alt="eye" />
            ) : (
              <img className="no-select" src={eyeSlashIcon} alt="eyeSlash" />
            )}
          </InputGroup.Text>
        </InputGroup>

        <InputGroup className="mb-3">
          <InputGroup.Text className="icon-input-border">
            <img className="no-select" src={passwordIcon} alt="password" />
          </InputGroup.Text>

          <Form.Control
            type={eyeIconToggleConfirm ? 'text' : 'password'}
            placeholder="Confirm Password"
            name="confirmPassword"
            required
            value={confirmPassword}
            onChange={onChangeRegisterForm}
          />

          <InputGroup.Text
            className="eye-icon"
            onClick={toggleBtnShowConfirmPassword}
          >
            {eyeIconToggleConfirm ? (
              <img className="no-select" src={eyeIcon} alt="eye" />
            ) : (
              <img className="no-select" src={eyeSlashIcon} alt="eyeSlash" />
            )}
          </InputGroup.Text>
        </InputGroup>

        <Button style={{ width: '100%' }} variant="success" type="submit">
          Register
        </Button>
      </Form>

      <p>
        Already have an account?
        <Link to="/login">
          <Button variant="info" size="sm" className="ml-2">
            Login
          </Button>
        </Link>
      </p>
    </>
  );
};

export default RegisterForm;

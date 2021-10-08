import React, {useState, useCallback, useEffect} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {useHistory} from 'react-router-dom';
import {Form, FloatingLabel, Button} from 'react-bootstrap';
import {loginUser, clearState, clearErrors, personalAccountSelector} from '../../store/slice';
import {AppRoute} from '../../const';

const Login = () => {
  const dispatch = useDispatch();
  const  history = useHistory();

  const {isFetching, isSuccess, isError, errors} = useSelector(personalAccountSelector);

  const [validated, setValidated] = useState(false);
  const [loginData, setLoginData] = useState({login: '', password: ''});

  useEffect(() => {
    return () => {
      dispatch(clearState());
    };
  }, [dispatch]);

  useEffect(() => {
    if (isError) {
      dispatch(clearState());
    }

    if (isSuccess) {
      dispatch(clearState());
      history.push(AppRoute.CONTACTS);
    }
  }, [dispatch, history, isError, isSuccess]);

  const handleChangeInput = useCallback(
    (evt) => {
      dispatch(clearErrors());
      setLoginData({...loginData, [evt.target.name]: evt.target.value});
    }, [dispatch, loginData]
    )

  const handleSubmit = useCallback(
    (event) => {
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();

    } else {
      event.preventDefault();
      dispatch(loginUser(loginData));
    }

    setValidated(true);
  }, [dispatch, loginData]
  )

  return (

    <Form className="login" noValidate validated={validated} onSubmit={handleSubmit}>
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <FloatingLabel controlId="floatingInput" label="Login" className="mb-3">
          <Form.Control required name="login" type="email" placeholder="name@example.com" isInvalid={errors.loginError} defaultValue={loginData.login} onChange={handleChangeInput}/>
          <Form.Control.Feedback type="invalid">{errors.loginError ? errors.loginError : "Please enter your email address."}</Form.Control.Feedback>
        </FloatingLabel>
        <FloatingLabel controlId="floatingPassword" label="Password">
          <Form.Control required name="password" type="password" placeholder="password" isInvalid={errors.passwordError} defaultValue={loginData.password} onChange={handleChangeInput}/>
          <Form.Control.Feedback type="invalid">{errors.passwordError ? errors.passwordError : "Please enter your password."}</Form.Control.Feedback>
        </FloatingLabel>
      </Form.Group>
      <div className="d-grid gap-2">
        <Button variant="primary" type="submit" size="lg" disabled={isFetching}>{isFetching ? 'Loading…' : 'Submit'}</Button>
      </div>
    </Form>
  );
};

export default Login;

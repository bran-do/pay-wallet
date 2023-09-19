import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { storeEmailAction } from '../redux/actions';

function Login() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [form, setForm] = useState({
    email: '',
    password: '',
  });
  const { email, password } = form;
  const [disableButton, setDisableButton] = useState(true);

  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = event.target;
    setForm({
      ...form,
      [name]: value,
    });
  }

  function validateEmail(emailSample: string) {
    return (/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(emailSample));
  }

  function validatePassword(passwordSample: string) {
    return passwordSample.length >= 6;
  }

  useEffect(() => {
    const validEmail = validateEmail(email);
    const validPassword = validatePassword(password);
    if (validEmail && validPassword) {
      setDisableButton(false);
    } else {
      setDisableButton(true);
    }
  }, [email, password]);

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    dispatch(storeEmailAction(email));
    navigate('/carteira');
  }

  return (
    <form onSubmit={ handleSubmit }>
      <input
        type="text"
        name="email"
        placeholder="E-mail"
        value={ email }
        onChange={ handleChange }
        data-testid="email-input"
      />
      <input
        type="password"
        name="password"
        placeholder="Senha"
        value={ password }
        onChange={ handleChange }
        data-testid="password-input"
      />
      <button
        type="submit"
        disabled={ disableButton }
      >
        Entrar
      </button>
    </form>
  );
}

export default Login;

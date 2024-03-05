import { useState } from "react";
import { thunkLogin } from "../../redux/session";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import "./LoginForm.css";

function LoginFormModal() {
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const { closeModal } = useModal();
  const [isSubmitted, setIsSubmitted] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitted(true);
    const serverResponse = await dispatch(
      thunkLogin({
        email,
        password,
      })
    );

    if (serverResponse) {
      setIsSubmitted(false);
      setErrors(serverResponse);
    } else {
      setIsSubmitted(false);
      closeModal();
    }
  };

  return (
    <div className="profile-dropdown-login" >
      <h1>Log In</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Email
          <input
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </label>
        {errors.email && <p>{errors.email}</p>}
        <label>
          Password
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </label>
        {errors.password && <p>{errors.password}</p>}
        <button type='submit' disabled={isSubmitted} onClick={() => {
            setEmail('demo@aa.io')
            setPassword('password')

          }}>
            Demo Login
          </button>
        <button type="submit" disabled={isSubmitted}>Log In</button>
      </form>
    </div>
  );
}

export default LoginFormModal;

import { useNavigate} from "react-router-dom";

function Login() {
  const navigate = useNavigate();

  return(
    <>
      <p>This is the Login Page</p>
      <form 
        onSubmit={(event) => {
          event.preventDefault();
          navigate('/');
        }}
      >
        <button>Submit</button>
      </form>
    </>
  )
}

export default Login;
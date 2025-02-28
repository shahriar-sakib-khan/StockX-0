import { useNavigate } from "react-router-dom";

function Initialization() {
  const navigate = useNavigate();

  const handleSubmit = () => {
    navigate("/inventory");
  }
  return (
    <>
      <h2>Initialization</h2>
      <button onClick={handleSubmit}>Done</button>
    </>
  )
}

export default Initialization;
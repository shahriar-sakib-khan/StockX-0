import { useNavigate } from "react-router-dom";
import styles from './Initialization.module.css';

function Initialization() {
  const navigate = useNavigate();

  const handleSubmit = () => {
    navigate("/inventory");
  }

  return (
    <>
      <h2>Initialization</h2>
      <div style={{display: "flex", justifyContent: "space-between"}}>
        <button onClick={() => navigate(-1)}>Go Back</button>
        <button onClick={handleSubmit}>Done</button>
      </div>
    </>
  )
}

export default Initialization;
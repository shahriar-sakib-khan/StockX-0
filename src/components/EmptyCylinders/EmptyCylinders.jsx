import { useOutletContext } from "react-router-dom";

function EmptyCylinders() {
  const { EmptyCylinders } = useOutletContext();

  return (
    <>
      <p>Retrieved Empty Cylinders</p>
    </>
  );
}

export default EmptyCylinders;

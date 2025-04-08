import { useOutletContext } from "react-router-dom";

function EmptyCylinders() {
  const { EmptyCylinders } = useOutletContext();

  const dummyEmptyList = {
    1: {
      "20mm": 5,
      "22mm": 2,
    },
    2: {
      "22mm": 10,
    },
  };

  return (
    <>
      <p>Retrieved Empty Cylinders</p>
    </>
  );
}

export default EmptyCylinders;

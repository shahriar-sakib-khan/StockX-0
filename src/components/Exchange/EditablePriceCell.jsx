import { useState } from "react";

const EditablePriceCell = ({ initialPrice, onPriceChange }) => {
  const [price, setPrice] = useState(initialPrice);
  const [isEditing, setIsEditing] = useState(false);

  const handleBlur = () => {
    setIsEditing(false);
    onPriceChange(price);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleBlur();
    } else if (e.key === "Escape") {
      setPrice(initialPrice);
      setIsEditing(false);
    }
  };

  return (
    <td role="cell" data-cell="Price: ">
      {isEditing ? (
        <input
          type="number"
          value={price}
          onChange={(e) => setPrice(parseFloat(e.target.value) || 0)}
          onBlur={handleBlur}
          onKeyDown={handleKeyDown}
          className="w-24 px-2 py-1 border rounded"
          autoFocus
        />
      ) : (
        <span
          onClick={() => setIsEditing(true)}
          className="cursor-pointer hover:underline"
        >
          Tk{price.toFixed(2)}
        </span>
      )}
    </td>
  );
};

export default EditablePriceCell;
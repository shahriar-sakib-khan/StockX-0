import { useLocation, useNavigate } from "react-router-dom";
import allBrands from "../../assets/list_of_brands";

const Receipts = () => {
  const { state } = useLocation();
  const deliveredItems = state?.deliveredItems || {};
  const receivedItems = state?.receivedItems || {};

  const navigate = useNavigate();

  // Function to calculate and render table rows
  const renderTableRows = (items) => {
    let finalTotal = 0;

    const rows = Object.entries(items).flatMap(([id, cylinderTypes]) => {
      const brand = allBrands.find((brand) => brand.id === parseInt(id));

      return Object.entries(cylinderTypes).map(([cylinderType, count]) => {
        const price = brand?.price || 0; // Assuming each brand has a `price` field
        const totalPrice = price * count;
        finalTotal += totalPrice;

        return (
          <tr key={`${id}-${cylinderType}`}>
            <td>{brand?.name || "Unknown"}</td>
            <td>{cylinderType}</td>
            <td>${price.toFixed(2)}</td>
            <td>{count}</td>
            <td>${totalPrice.toFixed(2)}</td>
          </tr>
        );
      });
    });

    // Add the final total row
    rows.push(
      <tr key="final-total" style={{ fontWeight: "bold", backgroundColor: "#f0f0f0" }}>
        <td colSpan="4" style={{ textAlign: "right" }}>Final Total:</td>
        <td>${finalTotal.toFixed(2)}</td>
      </tr>
    );

    return rows;
  };

  return (
    <div>
      <h2>Delivered Items</h2>
      <table border="1">
        <thead>
          <tr>
            <th>Brand</th>
            <th>Type</th>
            <th>Price per Cylinder</th>
            <th>Count</th>
            <th>Total Price</th>
          </tr>
        </thead>
        <tbody>{renderTableRows(deliveredItems)}</tbody>
      </table>

      <h2>Received Items</h2>
      <table border="1">
        <thead>
          <tr>
            <th>Brand</th>
            <th>Type</th>
            <th>Price per Cylinder</th>
            <th>Count</th>
            <th>Total Price</th>
          </tr>
        </thead>
        <tbody>{renderTableRows(receivedItems)}</tbody>
      </table>

      <button onClick={() => navigate(-1)}>Go Back</button>
    </div>
  );
};

export default Receipts;

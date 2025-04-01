

export const getCurrentStock = (id, productType, cylinderType, selectedBrands, regulators, stoves) => {
  let currentStock = 0;
  if (productType === "cylinder") {
    const brand = selectedBrands.find((brand) => brand.id === id);
    const cylinder = brand?.cylinders.find(
      (cylinder) => cylinder.type === cylinderType
    );
    currentStock = cylinder?.stock || 0;
  } else {
    const productList = productType === "regulator" ? regulators : productType === "stove" ? stoves : [];
    const product = productList.find((product) => product.id === id);
    currentStock = product?.stock || 0;
  }

  return currentStock;
};

export const handleItemAction = (id, productType, cylinderType, activeSection, deliveredItems, setDeliveredItems, receivedItems, setReceivedItems, updateStock, selectedBrands, regulators, stoves, action) => {
  if (!activeSection) return;

  const isCylinder = productType === "cylinder";
  let currentStock = getCurrentStock(id, productType, cylinderType, selectedBrands, regulators, stoves);

    // handle all state updates for delivered items
  if (activeSection === "delivered") {
    if (action == "add") {
      setDeliveredItems((prev) => ({
        ...prev,
        [productType]: {
          ...(prev[productType] || {}),
          [id]:
            productType === "cylinder"
              ? {
                  ...(prev[productType]?.[id] || {}),
                  [cylinderType]:
                    (prev[productType]?.[id]?.[cylinderType] || 0) + 1,
                }
              : (prev[productType]?.[id] || 0) + 1,
        },
      }));
      currentStock = Math.max(currentStock - 1, 0);
      updateStock(id, productType, cylinderType, currentStock);

    } else if (action === "decrement") {
      setDeliveredItems((prev) => {
        const updated = { ...prev };
        if (isCylinder) {
          if (updated[productType]?.[id]?.[cylinderType] > 1) {
            updated[productType][id][cylinderType] -= 1;
          } else {
            delete updated[productType][id][cylinderType];
            if (Object.keys(updated[productType][id] || {}).length === 0) {
              delete updated[productType][id];
            }
          }
        } else {
          if (updated[productType]?.[id] > 1) {
            updated[productType][id] -= 1;
          } else {
            delete updated[productType][id];
          }
        }
        currentStock += 1;
        updateStock(id, productType, cylinderType, currentStock);
  
        return updated;
      });
    } else if (action === "remove") {
      setDeliveredItems((prev) => {
        const updated = { ...prev };
        let removedCount = 0;
  
        if (isCylinder) {
          removedCount = updated[productType]?.[id]?.[cylinderType] || 0;
          delete updated[productType]?.[id]?.[cylinderType];
          if (Object.keys(updated[productType]?.[id] || {}).length === 0) {
            delete updated[productType][id];
          }
        } else {
          removedCount = updated[productType]?.[id] || 0;
          delete updated[productType][id];
        }
  
        currentStock += removedCount;
        updateStock(id, productType, cylinderType, currentStock);
  
        return updated;
      });
    }
  }

  // handle all state updates for received items
  if (activeSection === "received" && isCylinder) {
    if (action == "add") {
      setReceivedItems((prev) => ({
        ...prev,
        [id]: {
          ...(prev[id] || {}),
          [cylinderType]: (prev[id]?.[cylinderType] || 0) + 1,
        },
      }));
    } else if (action === "decrement") {
      setReceivedItems((prev) => {
        const updated = { ...prev }; // JSON.parse(JSON.stringify(prev))
  
        if (updated[id]?.[cylinderType] > 1) {
          updated[id][cylinderType] -= 1;
        } else {
          delete updated[id][cylinderType];
          if (Object.keys(updated[id] || {}).length === 0) {
            delete updated[id];
          }
        }

        return updated;
      });
    } else if (action === "remove") {
      setReceivedItems((prev) => {
        const updated = { ...prev };
        delete updated[id]?.[cylinderType];
        if (Object.keys(updated[id] || {}).length === 0) {
          delete updated[id];
        }
  
        return updated;
      });
    }
  }
}
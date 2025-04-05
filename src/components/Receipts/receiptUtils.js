export const updateDeliveredItems = (deliveredItems = [], selectedBrands = [], regulators = [], stoves = []) => {
  if (!deliveredItems) return {};

  if (!Array.isArray(selectedBrands) || !Array.isArray(regulators) || !Array.isArray(stoves)) {
    console.error("Expected arrays for selectedBrands, regulators, and stoves");
    return {};
  }

  const updatedDeliveredItems = {};

  for (const productType in deliveredItems) {
    updatedDeliveredItems[productType] = {};

    for (const brandId in deliveredItems[productType]) {
      if (productType === "cylinder") {
        const brand = selectedBrands.find(b => Number(b.id) === Number(brandId));
        const brandName = brand?.name || "Unknown";

        updatedDeliveredItems[productType][brandId] = {
          id: brandId,
          brandName,
        };

        for (const cylinderType in deliveredItems[productType][brandId]) {
          const quantity = deliveredItems[productType][brandId][cylinderType];

          const cylinder = brand?.cylinders?.find(c => c.type === cylinderType);
          const price = Number(cylinder.price) || 0;

          updatedDeliveredItems[productType][brandId][cylinderType] = {
            quantity, // Store the original count
            price,
            isDue: false,
          };
        }
      } else {
        const quantity = deliveredItems[productType][brandId];

        const productList = productType === "regulator" ? regulators : stoves;
        const product = productList.find(p => Number(p.id) === Number(brandId));
        const productName = product?.name || "";
        const price = Number(product?.price) || 0;

        updatedDeliveredItems[productType][brandId] = {
          productName,
          quantity, // Store the original count
          price,
          isDue: false,
        };
      }
    }
  }
  console.log(updatedDeliveredItems);
  return updatedDeliveredItems;
};

export const updateReceivedItems = (receivedItems = [], selectedBrands = []) => {
  if (!receivedItems) return {};

  if (!Array.isArray(selectedBrands)) {
    console.error("Expected arrays for selectedBrands, regulators, and stoves");
    return {};
  }

  const updatedReceivedItems = {};

  for (const brandId in receivedItems) {
    const brand = selectedBrands.find(b => Number(b.id) === Number(brandId));
    const brandName = brand?.name || "Unknown";
    
    updatedReceivedItems[brandId] = {
      id: brandId,
      brandName,
    };

    for (const cylinderType in receivedItems[brandId]) {
      const quantity = receivedItems[brandId][cylinderType];

      updatedReceivedItems[brandId][cylinderType] = {
        quantity, // Store the original count
        isDue: false,
      };
    }
  }
  console.log(updatedReceivedItems);
  return updatedReceivedItems;
};

//.................................................................................................

export const handleToggleIsDueDelivered = (productType, id, cylinderType, setDeliveredItems) => {
  setDeliveredItems((prev) => {
    const updated = JSON.parse(JSON.stringify(prev)); // Deep copy to avoid mutation

    if (cylinderType) {
      // Cylinder case (with cylinderType)
      if (updated[productType]?.[id]?.[cylinderType]) {
        updated[productType][id][cylinderType].isDue = !updated[productType][id][cylinderType].isDue;
      }
    } else {
      // Regulator & Stove case (without cylinderType)
      if (updated[productType]?.[id]) {
        updated[productType][id].isDue = !updated[productType][id].isDue;
      }
    }

    return updated;
  });
};

export const handleToggleIsDueReceived = (id, cylinderType, setReceivedItems) => {
  setReceivedItems((prev) => {
    const updated = JSON.parse(JSON.stringify(prev)); // Deep copy to avoid mutation

    if (updated[id] && updated[id][cylinderType]) {
      updated[id][cylinderType].isDue = !updated[id][cylinderType].isDue;
    }

    return updated;
  });
};

//....................................................................................

export const getFormattedDateTime = () => {
  const date = new Date();
  const day = date.getDate().toString().padStart(2, 0);
  const month = (date.getMonth() + 1).toString().padStart(2, 0);
  const year = date.getFullYear();

  const hour = (date.getHours() % 12 || 12).toString();
  const meridiem = date.getHours() >= 12 ? "PM" : "AM";
  const minute = date.getMinutes().toString().padStart(2, 0);

  return `${day}/${month}/${year} ${hour}:${minute} ${meridiem}`;
};

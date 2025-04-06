import { useCallback } from "react";

export const useUpdateStock = (setSelectedBrands, setRegulators, setStoves) => {
  return useCallback((id, productType, cylinderType, value) => {
    const newValue = parseFloat(value);

    if (productType === "cylinder") {
      setSelectedBrands((prevBrands) =>
        prevBrands.map((brand) =>
          brand.id === id
            ? {
                ...brand,
                cylinders: brand.cylinders.map((cylinder) =>
                  cylinder.type === cylinderType
                    ? { ...cylinder, stock: newValue }
                    : cylinder
                ),
              }
            : brand
        )
      );
    } else if (productType === "regulator") {
      setRegulators((prevRegulators) =>
        prevRegulators.map((regulator) =>
          regulator.id === id ? { ...regulator, stock: newValue } : regulator
        )
      );
    } else if (productType === "stove") {
      setStoves((prevStoves) =>
        prevStoves.map((stove) =>
          stove.id === id ? { ...stove, stock: newValue } : stove
        )
      );
    }
  }, [setSelectedBrands, setRegulators, setStoves]);
}
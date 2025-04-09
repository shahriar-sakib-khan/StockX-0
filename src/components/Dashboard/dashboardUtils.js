
export const getCylinderCount = (selectedBrands) => {
  let cylinderStockCount = 0;
  
  selectedBrands.forEach(brand => {
    brand.cylinders.forEach(cylinder => {
      cylinderStockCount += cylinder.stock;
    })
  });

  return cylinderStockCount;
}
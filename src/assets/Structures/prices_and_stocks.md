const cylinderPrice = prices?.cylinder?.[brand.id]?.[cylinder.type] ?? brand.price;
const cylinderStock = stockCount?.cylinder?.[brand.id]?.[cylinder.type] ?? brand.stock;

const regulatorPrice = prices?.regulator?.[regulator.id] ?? regulator.price;
const regulatorStock = stockCount?.regulator?.[regulator.id] ?? regulator.stock;

const stovePrice = prices?.stove?.[stove.id] ?? stove.price;
const stoveStock = stockCount?.stove?.[stove.id] ?? stove.stock;



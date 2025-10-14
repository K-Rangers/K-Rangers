import isOn from "./isOn";

export function filterByFeatures(items, features, dataType) {
  if (dataType === "attraction") {
    return features.size === 0
      ? items
      : items.filter((it) => [...features].every((k) => isOn(it[k])));
  }

  if (dataType === "accommodation") {
    return items; 
  }

  return items;
}

import { types as defaultTypes } from "../../data/typeData";

const STORAGE_KEY = "types";

function getAll() {
  const data = localStorage.getItem(STORAGE_KEY);
  if (!data) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(defaultTypes));
    return defaultTypes;
  }
  return JSON.parse(data);
}

export default {
  get: async () => ({ success: true, data: getAll() })
};
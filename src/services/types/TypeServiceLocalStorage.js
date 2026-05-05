import { types as defaultTypes } from "../../data/typeData";

const STORAGE_KEY = "types";

function formatName(value) {
  if (!value) return "";
  return value.charAt(0).toUpperCase() + value.slice(1).toLowerCase();
}

function normalizeType(type) {
  return {
    id: Number(type.id),
    name: formatName(type.name || ""),
    active: type.active ?? true,
  };
}

function getAllFromStorage() {
  const data = localStorage.getItem(STORAGE_KEY);

  if (!data) {
    const normalized = defaultTypes.map(normalizeType);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(normalized));
    return normalized;
  }

  try {
    const parsed = JSON.parse(data);
    return parsed.map(normalizeType);
  } catch (error) {
    const normalized = defaultTypes.map(normalizeType);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(normalized));
    return normalized;
  }
}

function saveToStorage(data) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
}

async function get() {
  return { success: true, data: getAllFromStorage() };
}

async function getById(id) {
  const types = getAllFromStorage();

  return {
    success: true,
    data: types.find((type) => type.id === Number(id)) || null,
  };
}

async function add(type) {
  const types = getAllFromStorage();

  const newId =
    types.length === 0
      ? 1
      : Math.max(...types.map((type) => type.id)) + 1;

  const newType = normalizeType({
    ...type,
    id: newId,
  });

  types.push(newType);
  saveToStorage(types);

  return { success: true, data: newType };
}

async function update(id, type) {
  const types = getAllFromStorage();

  const index = types.findIndex(
    (item) => item.id === Number(id)
  );

  if (index > -1) {
    types[index] = normalizeType({
      ...types[index],
      ...type,
      id: types[index].id,
    });

    saveToStorage(types);

    return { success: true, data: types[index] };
  }

  return { success: false };
}

async function remove(id) {
  let types = getAllFromStorage();

  types = types.filter(
    (type) => type.id !== Number(id)
  );

  saveToStorage(types);

  return { success: true };
}

export default {
  get,
  getById,
  add,
  update,
  remove,
};
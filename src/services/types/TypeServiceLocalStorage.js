import { types as defaultTypes } from "../../data/typeData";

const STORAGE_KEY = "types";

function normalize(types) {
  return types.map(t => ({
    id: t.id,
    name: t.name,
    active: t.active ?? true   // 🔥 FIX: fallback
  }));
}

function getAll() {
  const data = localStorage.getItem(STORAGE_KEY);

  if (!data) {
    const initial = normalize(defaultTypes);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(initial));
    return initial;
  }

  return normalize(JSON.parse(data));
}

function save(data) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
}

async function get() {
  return { success: true, data: getAll() };
}

async function getById(id) {
  const types = getAll();
  const type = types.find(x => x.id === Number(id));

  return { success: true, data: type };
}

async function create(type) {
  const types = getAll();

  const newType = {
    id: types.length > 0 ? Math.max(...types.map(t => t.id)) + 1 : 1,
    name: type.name,
    active: type.active ?? true
  };

  types.push(newType);
  save(types);

  return { success: true, data: newType };
}

async function update(id, updatedType) {
  const types = getAll();
  const index = types.findIndex(x => x.id === Number(id));

  if (index === -1) return { success: false };

  types[index] = {
    ...types[index],
    ...updatedType,
  };

  save(types);

  return { success: true, data: types[index] };
}

async function remove(id) {
  let types = getAll();
  types = types.filter(x => x.id !== Number(id));

  save(types);

  return { success: true };
}

export default {
  get,
  getById,
  create,
  update,
  remove
};
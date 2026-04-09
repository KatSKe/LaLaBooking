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

function save(data) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
}

// READ
async function get() {
  return { success: true, data: getAll() };
}

// READ BY ID
async function getById(id) {
  const types = getAll();
  const t = types.find(x => x.id === parseInt(id));
  return { success: true, data: t };
}

// CREATE
async function create(type) {
  const types = getAll();

  if (types.length === 0) {
    type.id = 1;
  } else {
    type.id = types[types.length - 1].id + 1;
  }

  types.push(type);
  save(types);

  return { success: true, data: type };
}

// UPDATE
async function update(id, type) {
  const types = getAll();
  const index = types.findIndex(x => x.id === parseInt(id));

  if (index > -1) {
    types[index] = { ...types[index], ...type };
    save(types);
    return { success: true, data: types[index] };
  }

  return { success: false };
}

// DELETE
async function remove(id) {
  let types = getAll();
  types = types.filter(x => x.id !== parseInt(id));
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
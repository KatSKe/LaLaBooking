import { types as defaultTypes } from "../../data/typeData";

let types = [...defaultTypes];

// READ ALL
async function get() {
  return { success: true, data: types };
}

// READ BY ID
async function getById(id) {
  const item = types.find(x => x.id === parseInt(id));
  return { success: true, data: item };
}

// CREATE
async function create(type) {
  const newType = { ...type };

  if (types.length === 0) {
    newType.id = 1;
  } else {
    newType.id = types[types.length - 1].id + 1;
  }

  types.push(newType);

  return { success: true, data: newType };
}

// UPDATE
async function update(id, type) {
  const index = types.findIndex(x => x.id === parseInt(id));

  if (index > -1) {
    types[index] = { ...types[index], ...type };
    return { success: true, data: types[index] };
  }

  return { success: false };
}

// DELETE
async function remove(id) {
  types = types.filter(x => x.id !== parseInt(id));
  return { success: true };
}

export default {
  get,
  getById,
  create,
  update,
  remove
};
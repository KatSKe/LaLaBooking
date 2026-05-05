import { types as defaultTypes } from "../../data/typeData";

let types = [...defaultTypes];

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

async function get() {
  return { success: true, data: types.map(normalizeType) };
}

async function getById(id) {
  return {
    success: true,
    data: types.find((type) => type.id === Number(id)) || null,
  };
}

async function add(type) {
  const newId =
    types.length === 0
      ? 1
      : types[types.length - 1].id + 1;

  const newType = normalizeType({
    ...type,
    id: newId,
  });

  types.push(newType);

  return { success: true, data: newType };
}

async function update(id, type) {
  const index = types.findIndex(
    (item) => item.id === Number(id)
  );

  if (index > -1) {
    types[index] = normalizeType({
      ...types[index],
      ...type,
      id: types[index].id,
    });

    return { success: true, data: types[index] };
  }

  return { success: false };
}

async function remove(id) {
  types = types.filter(
    (type) => type.id !== Number(id)
  );

  return { success: true };
}

export default {
  get,
  getById,
  add,
  update,
  remove,
};
import { users as defaultUsers } from "./UserDataUser";

let data = [...defaultUsers];

function normalizeUser(user) {
  return {
    id: Number(user.id),
    firstName: user.firstName || "",
    lastName: user.lastName || "",
    email: user.email || "",
    dateOfBirth: user.dateOfBirth || "",
    contactNumber: user.contactNumber || "",
    gender: user.gender || "",
    address: {
      street: user.address?.street || "",
      houseNumber: user.address?.houseNumber || "",
      postalCode: user.address?.postalCode || "",
      city: user.address?.city || "",
    },
  };
}

async function get() {
  return { success: true, data: data.map(normalizeUser) };
}

async function getById(id) {
  return {
    success: true,
    data: data.find((u) => u.id === Number(id)) || null,
  };
}

async function add(user) {
  const newId =
    data.length === 0
      ? 1
      : data[data.length - 1].id + 1;

  const newUser = normalizeUser({
    ...user,
    id: newId,
  });

  data.push(newUser);

  return { success: true, data: newUser };
}

async function update(id, user) {
  const index = data.findIndex((u) => u.id === Number(id));

  if (index > -1) {
    data[index] = normalizeUser({
      ...data[index],
      ...user,
      id: data[index].id,
    });

    return { success: true, data: data[index] };
  }

  return { success: false };
}

async function remove(id) {
  const index = data.findIndex((u) => u.id === Number(id));

  if (index > -1) {
    data.splice(index, 1);
    return { success: true };
  }

  return { success: false };
}

export default {
  get,
  add,
  getById,
  update,
  remove,
};
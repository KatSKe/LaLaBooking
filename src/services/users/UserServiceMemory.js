import { users } from "./UserDataUser";

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
  return { success: true, data: users.map(normalizeUser) };
}

async function getById(id) {
  return {
    success: true,
    data: users.find((u) => u.id === Number(id)) || null,
  };
}

async function add(user) {
  const newId =
    users.length === 0
      ? 1
      : users[users.length - 1].id + 1;

  const newUser = normalizeUser({
    ...user,
    id: newId,
  });

  users.push(newUser);

  return { success: true, data: newUser };
}

async function update(id, user) {
  const index = users.findIndex((u) => u.id === Number(id));

  if (index > -1) {
    users[index] = normalizeUser({
      ...users[index],
      ...user,
      id: users[index].id,
    });

    return { success: true, data: users[index] };
  }

  return { success: false };
}

async function remove(id) {
  const index = users.findIndex((u) => u.id === Number(id));

  if (index > -1) {
    users.splice(index, 1);
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
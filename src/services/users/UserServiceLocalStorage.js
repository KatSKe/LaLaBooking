import { users as defaultUsers } from "./UserDataUser.js";

const STORAGE_KEY = "users";

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

function getAllFromStorage() {
  const data = localStorage.getItem(STORAGE_KEY);

  if (!data) {
    const normalized = defaultUsers.map(normalizeUser);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(normalized));
    return normalized;
  }

  try {
    const parsed = JSON.parse(data);
    return parsed.map(normalizeUser);
  } catch {
    const normalized = defaultUsers.map(normalizeUser);
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
  const users = getAllFromStorage();
  return {
    success: true,
    data: users.find((u) => u.id === Number(id)) || null,
  };
}

async function add(user) {
  const users = getAllFromStorage();

  const newId =
    users.length === 0
      ? 1
      : Math.max(...users.map((u) => u.id)) + 1;

  const newUser = normalizeUser({
    ...user,
    id: newId,
  });

  users.push(newUser);
  saveToStorage(users);

  return { success: true, data: newUser };
}

async function update(id, user) {
  const users = getAllFromStorage();

  const index = users.findIndex((u) => u.id === Number(id));

  if (index > -1) {
    users[index] = normalizeUser({
      ...users[index],
      ...user,
      id: users[index].id,
    });

    saveToStorage(users);
    return { success: true, data: users[index] };
  }

  return { success: false };
}

async function remove(id) {
  let users = getAllFromStorage();
  users = users.filter((u) => u.id !== Number(id));
  saveToStorage(users);

  return { success: true };
}

export default {
  get,
  getById,
  add,
  update,
  remove,
};
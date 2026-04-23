import { users as defaultUsers } from "./UserDataUser.js";

const STORAGE_KEY = "users";

/**
 * Normalize user object to standard format
 */
function normalizeUser(user) {
  return {
    id: user.id,
    firstName: user.firstName || "",
    lastName: user.lastName || "",
    name: `${user.firstName || ""} ${user.lastName || ""}`.trim(),
  };
}

/**
 * Get all users from localStorage (with auto-fix)
 */
function getAllFromStorage() {
  const data = localStorage.getItem(STORAGE_KEY);

  if (!data) {
    const normalized = defaultUsers.map(normalizeUser);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(normalized));
    return normalized;
  }

  try {
    const parsed = JSON.parse(data);

    const normalized = parsed.map(normalizeUser);

    // overwrite with clean structure
    localStorage.setItem(STORAGE_KEY, JSON.stringify(normalized));

    return normalized;
  } catch (error) {
    const normalized = defaultUsers.map(normalizeUser);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(normalized));
    return normalized;
  }
}

/**
 * Save users to localStorage
 */
function saveToStorage(data) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
}

/**
 * READ
 */
async function get() {
  const users = getAllFromStorage();
  return { success: true, data: [...users] };
}

/**
 * READ BY ID
 */
async function getById(id) {
  const users = getAllFromStorage();
  const user = users.find((u) => String(u.id) === String(id));

  return { success: true, data: user || null };
}

/**
 * CREATE
 */
async function add(user) {
  const users = getAllFromStorage();

  const newId =
    users.length === 0
      ? 1
      : Math.max(...users.map((u) => Number(u.id))) + 1;

  const newUser = normalizeUser({
    ...user,
    id: newId,
  });

  users.push(newUser);
  saveToStorage(users);

  return { success: true, data: newUser };
}

/**
 * UPDATE
 */
async function update(id, user) {
  const users = getAllFromStorage();

  const index = users.findIndex(
    (u) => String(u.id) === String(id)
  );

  if (index > -1) {
    const updatedUser = normalizeUser({
      ...users[index],
      ...user,
      id: users[index].id,
    });

    users[index] = updatedUser;
    saveToStorage(users);

    return { success: true, data: updatedUser };
  }

  return { success: false, message: "User not found" };
}

/**
 * DELETE
 */
async function remove(id) {
  let users = getAllFromStorage();

  users = users.filter((u) => String(u.id) !== String(id));
  saveToStorage(users);

  return { success: true, message: "Deleted" };
}

export default {
  get,
  getById,
  add,
  update,
  remove,
};
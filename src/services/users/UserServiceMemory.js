import { users } from "./UserDataUser";

// 1/4 READ (CRUD)
async function get() {
  return { success: true, data: [...users] };
}

async function getById(id) {
  return {
    success: true,
    data: users.find(u => u.id === parseInt(id)),
  };
}

// 2/4 CREATE (CRUD)
async function add(user) {
  if (users.length === 0) {
    user.id = 1;
  } else {
    user.id = users[users.length - 1].id + 1;
  }

  users.push(user);

  return { success: true, data: user };
}

// 3/4 UPDATE (CRUD)
async function update(id, user) {
  const index = findIndex(id);

  if (index > -1) {
    users[index] = { ...users[index], ...user };
    return { success: true, data: users[index] };
  }

  return { success: false, message: "User not found" };
}

function findIndex(id) {
  return users.findIndex(u => u.id === parseInt(id));
}

// 4/4 DELETE (CRUD)
async function remove(id) {
  const index = findIndex(id);

  if (index > -1) {
    users.splice(index, 1);
    return { success: true, message: "Deleted" };
  }

  return { success: false, message: "User not found" };
}

export default {
  get,
  add,
  getById,
  update,
  remove,
};
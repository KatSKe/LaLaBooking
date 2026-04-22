import UserServiceLocalStorage from "./UserServiceLocalStorage";
import UserServiceMemory from "./UserServiceMemory";
import { DATA_SOURCE } from "../../constants";

let Service = null;

switch (DATA_SOURCE) {
  case "memory":
    Service = UserServiceMemory;
    break;

  case "localStorage":
    Service = UserServiceLocalStorage;
    break;

  default:
    console.warn("Unknown DATA_SOURCE:", DATA_SOURCE);
    Service = UserServiceLocalStorage;
}

const EmptyService = {
  get: async () => ({ success: false, data: [] }),
  getById: async () => ({ success: false, data: {} }),
  add: async () => ({ success: false }),
  update: async () => ({ success: false }),
  remove: async () => ({ success: false }),
};

// 🔥 USER NORMALIZATION (KEY FIX)
function normalizeUsers(response) {
  return {
    ...response,
    data: (response.data || []).map((u, index) => ({
      ...u,
      id: u.id ?? u.id ?? index, // 🔥 FIX FOR KEY PROBLEM
    })),
  };
}

const ActiveService = Service || EmptyService;

export default {
  get: async () => normalizeUsers(await ActiveService.get()),

  getById: async (id) =>
    await ActiveService.getById(id),

  add: async (users) =>
    await ActiveService.add(users),

  update: async (id, users) =>
    await ActiveService.update(id, users),

  remove: async (id) =>
    await ActiveService.remove(id),
};
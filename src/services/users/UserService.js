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
  getById: async () => ({ success: false, data: null }),
  add: async () => ({ success: false }),
  update: async () => ({ success: false }),
  remove: async () => ({ success: false }),
};

const ActiveService = Service || EmptyService;

export default {
  get: async () => await ActiveService.get(),

  getById: async (id) =>
    await ActiveService.getById(Number(id)),

  add: async (user) =>
    await ActiveService.add(user),

  update: async (id, user) =>
    await ActiveService.update(Number(id), user),

  remove: async (id) =>
    await ActiveService.remove(Number(id)),
};
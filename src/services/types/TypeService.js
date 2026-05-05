import TypeServiceLocalStorage from "./TypeServiceLocalStorage";
import TypeServiceMemory from "./TypeServiceMemory";
import { DATA_SOURCE } from "../../constants";

let Service = null;

switch (DATA_SOURCE) {
  case "memory":
    Service = TypeServiceMemory;
    break;

  case "localStorage":
    Service = TypeServiceLocalStorage;
    break;

  default:
    Service = TypeServiceLocalStorage;
}

const ActiveService = Service;

export default {
  get: async () => await ActiveService.get(),

  getById: async (id) =>
    await ActiveService.getById(Number(id)),

  add: async (type) =>
    await ActiveService.add(type),

  update: async (id, type) =>
    await ActiveService.update(Number(id), type),

  remove: async (id) =>
    await ActiveService.remove(Number(id)),
};
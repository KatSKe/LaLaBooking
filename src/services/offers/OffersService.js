import OfferServiceLocalStorage from "./OfferServiceLocalStorage";
import OfferServiceMemory from "./OfferServiceMemory";
import { DATA_SOURCE } from "../../constants";

let Service = null;

switch (DATA_SOURCE) {
  case "memory":
    Service = OfferServiceMemory;
    break;

  case "localStorage":
    Service = OfferServiceLocalStorage;
    break;

  default:
    Service = null;
}

const EmptyService = {
  get: async () => ({ success: false, data: [] }),
  getById: async () => ({ success: false, data: {} }),
  add: async () => console.error("OfferService not loaded"),
  update: async () => console.error("OfferService not loaded"),
  remove: async () => console.error("OfferService not loaded"),
};

const ActiveService = Service || EmptyService;

export default {
  get: () => ActiveService.get(),
  getById: (id) => ActiveService.getById(id),
  add: (offer) => ActiveService.add(offer),
  update: (id, offer) => ActiveService.update(id, offer),
  remove: (id) => ActiveService.remove(id),
};
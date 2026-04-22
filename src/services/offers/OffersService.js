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
    Service = OfferServiceLocalStorage; // fallback safety
}

export default {
  get: () => Service.get(),
  getById: (id) => Service.getById(id),

  // STANDARD API (ENGLISH ONLY)
  add: (offer) => Service.add(offer),
  update: (id, offer) => Service.update(id, offer),
  remove: (id) => Service.remove(id),
};
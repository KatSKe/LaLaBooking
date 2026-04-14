import BookingServiceLocalStorage from "./BookingServiceLocalStorage";
import BookingServiceMemory from "./BookingServiceMemory";
import { DATA_SOURCE } from "../../constants";

let Servis = null;

switch (DATA_SOURCE) {
  case "memorija":
    Servis = BookingServiceMemory;
    break;

  case "localStorage":
    Servis = BookingServiceLocalStorage;
    break;

  default:
    Servis = null;
}

const PrazanServis = {
  get: async () => ({ success: false, data: [] }),
  getById: async () => ({ success: false, data: {} }),
  dodaj: async () => console.error("BookingService not loaded"),
  promjeni: async () => console.error("BookingService not loaded"),
  obrisi: async () => console.error("BookingService not loaded"),
};

const AktivniServis = Servis || PrazanServis;

export default {
  get: () => AktivniServis.get(),
  getById: (id) => AktivniServis.getById(id),
  dodaj: (booking) => AktivniServis.dodaj(booking),
  promjeni: (id, booking) => AktivniServis.promjeni(id, booking),
  obrisi: (id) => AktivniServis.obrisi(id),
};
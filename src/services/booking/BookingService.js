import BookingServiceLocalStorage from "./BookingServiceLocalStorage";
import BookingServiceMemory from "./BookingServiceMemory";
import { DATA_SOURCE } from "../../constants";

function getService() {
  switch (DATA_SOURCE) {
    case "memorija":
      return BookingServiceMemory;

    case "localStorage":
      return BookingServiceLocalStorage;

    default:
      console.warn("⚠️ BookingService: DATA_SOURCE is not valid!");
      return null;
  }
}

const Servis = getService();

const fallbackService = {
  get: async () => ({
    success: false,
    data: [],
    message: "Service not initialized",
  }),

  getById: async () => ({
    success: false,
    data: null,
    message: "Service not initialized",
  }),

  dodaj: async () =>
    console.error("❌ BookingService not initialized (dodaj)"),

  promjeni: async () =>
    console.error("❌ BookingService not initialized (promjeni)"),

  obrisi: async () =>
    console.error("❌ BookingService not initialized (obrisi)"),
};

const ActiveService = Servis || fallbackService;

export default {
  get: () => ActiveService.get(),

  getById: (id) => ActiveService.getById(id),

  dodaj: (booking) => ActiveService.dodaj(booking),

  promjeni: (id, booking) => ActiveService.promjeni(id, booking),

  obrisi: (id) => ActiveService.obrisi(id),
};
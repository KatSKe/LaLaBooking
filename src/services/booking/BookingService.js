import BookingServiceLocalStorage from "./BookingServiceLocalStorage";
import BookingServiceMemory from "./BookingServiceMemory";
import { DATA_SOURCE } from "../../constants";

function getService() {
  switch (DATA_SOURCE) {
    case "memory":
      return BookingServiceMemory;

    case "localStorage":
      return BookingServiceLocalStorage;

    default:
      console.warn("⚠️ BookingService: DATA_SOURCE is not valid!");
      return null;
  }
}

const Service = getService();

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

  add: async () =>
    console.error("❌ BookingService not initialized (add)"),

  update: async () =>
    console.error("❌ BookingService not initialized (update)"),

  remove: async () =>
    console.error("❌ BookingService not initialized (remove)"),
};

const ActiveService = Service || fallbackService;

export default {
  get: () => ActiveService.get(),

  getById: (id) => ActiveService.getById(id),

  add: (booking) => ActiveService.add(booking),

  update: (id, booking) => ActiveService.update(id, booking),

  remove: (id) => ActiveService.remove(id),
};
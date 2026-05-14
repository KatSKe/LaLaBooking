import BookingServiceLocalStorage from "./BookingServiceLocalStorage";
import BookingServiceMemory from "./BookingServiceMemory";

import { DATA_SOURCE } from "../../constants";

function getService() {
  switch (DATA_SOURCE?.toLowerCase()) {
    case "memory":
      return BookingServiceMemory;

    case "localstorage":
      return BookingServiceLocalStorage;

    default:
      console.warn(
        "BookingService: DATA_SOURCE is not valid!"
      );

      return null;
  }
}

const activeService = getService();

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

  add: async () => ({
    success: false,
    message: "Service not initialized",
  }),

  update: async () => ({
    success: false,
    message: "Service not initialized",
  }),

  remove: async () => ({
    success: false,
    message: "Service not initialized",
  }),
};

const service = activeService || fallbackService;

export default {
  get: () => service.get(),

  getById: (id) => service.getById(id),

  add: (booking) => service.add(booking),

  update: (id, booking) =>
    service.update(id, booking),

  remove: (id) => service.remove(id),
};
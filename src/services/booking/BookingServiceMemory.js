import { bookings } from "./BookingData";

let podaci = [...bookings];

export default {
  get: async () => ({
    success: true,
    data: podaci,
  }),

  getById: async (id) => ({
    success: true,
    data: podaci.find((b) => b.id == id),
  }),

  dodaj: async (booking) => {
    booking.id = Date.now();

    podaci.push(booking);

    return { success: true };
  },

  promjeni: async (id, booking) => {
    const index = podaci.findIndex((b) => b.id == id);

    if (index !== -1) {
      podaci[index] = booking;
    }

    return { success: true };
  },

  obrisi: async (id) => {
    podaci = podaci.filter((b) => b.id != id);

    return { success: true };
  },
};
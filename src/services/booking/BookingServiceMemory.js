import { bookings } from "./BookingData";

let data = [...bookings];

export default {
  get: async () => ({
    success: true,
    data: data,
  }),

  getById: async (id) => ({
    success: true,
    data: data.find((b) => b.id == id),
  }),

  add: async (booking) => {
    const newBooking = { ...booking, id: Date.now() };

    data.push(newBooking);

    return { success: true, data: newBooking };
  },

  update: async (id, booking) => {
    const index = data.findIndex((b) => b.id == id);

    if (index !== -1) {
      data[index] = { ...data[index], ...booking, id: data[index].id };
    }

    return { success: true };
  },

  remove: async (id) => {
    data = data.filter((b) => b.id != id);

    return { success: true };
  },
};
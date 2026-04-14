const STORAGE_KEY = "bookings";

function getData() {
  const data = localStorage.getItem(STORAGE_KEY);
  return data ? JSON.parse(data) : [];
}

function saveData(data) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
}

export default {
  get: async () => ({
    success: true,
    data: getData(),
  }),

  getById: async (id) => ({
    success: true,
    data: getData().find((b) => b.id == id),
  }),

  dodaj: async (booking) => {
    const data = getData();

    booking.id = Date.now();

    data.push(booking);
    saveData(data);

    return { success: true };
  },

  promjeni: async (id, booking) => {
    const data = getData();
    const index = data.findIndex((b) => b.id == id);

    if (index !== -1) {
      data[index] = booking;
      saveData(data);
    }

    return { success: true };
  },

  obrisi: async (id) => {
    const data = getData().filter((b) => b.id != id);
    saveData(data);

    return { success: true };
  },
};
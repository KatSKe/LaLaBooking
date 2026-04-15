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
    data: getData().find((b) => String(b.id) === String(id)),
  }),

  dodaj: async (booking) => {
    const data = getData();

    const newBooking = {
      ...booking,
      id: Date.now(),
    };

    data.push(newBooking);
    saveData(data);

    return { success: true, data: newBooking };
  },

  promjeni: async (id, booking) => {
    const data = getData();
    const index = data.findIndex((b) => String(b.id) === String(id));

    if (index !== -1) {
      data[index] = {
        ...data[index],
        ...booking,
        id: data[index].id,
      };

      saveData(data);
      return { success: true, data: data[index] };
    }

    return { success: false, message: "Booking not found" };
  },

  obrisi: async (id) => {
    const data = getData().filter((b) => String(b.id) !== String(id));
    saveData(data);

    return { success: true };
  },
};
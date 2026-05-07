const STORAGE_KEY = "bookings";

function getUsers() {
  const data = localStorage.getItem("users");
  return data ? JSON.parse(data) : [];
}

function getOffers() {
  const data = localStorage.getItem("offers");
  return data ? JSON.parse(data) : [];
}

/**
 * FIXED: only for READ compatibility, NO overwriting storage
 */
function normalizeBooking(b) {
  const users = getUsers();
  const offers = getOffers();

  const userId = b.userId ?? (typeof b.user === "number" ? b.user : null);

  const offerId = b.offerId ?? (typeof b.offer === "number" ? b.offer : null);

  const foundUser = users.find((u) => String(u.id) === String(userId));
  const foundOffer = offers.find((o) => String(o.id) === String(offerId));

  return {
    ...b,

    userId: userId ?? b.userId,
    offerId: offerId ?? b.offerId,

    user: foundUser
      ? {
          id: foundUser.id,
          firstName: foundUser.firstName,
          lastName: foundUser.lastName,
        }
      : null,

    offer: foundOffer || null,
  };
}

function getData() {
  const data = localStorage.getItem(STORAGE_KEY);
  const parsed = data ? JSON.parse(data) : [];

  return parsed; // ❗ NO normalization write-back anymore
}

function saveData(data) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
}

export default {
  get: async () => ({
    success: true,
    data: getData().map(normalizeBooking),
  }),

  getById: async (id) => ({
    success: true,
    data: getData().map(normalizeBooking).find((b) => String(b.id) === String(id)),
  }),

  add: async (booking) => {
    const data = getData();

    const newBooking = {
      ...booking,
      id: Date.now(),
    };

    data.push(newBooking);
    saveData(data);

    return { success: true, data: newBooking };
  },

  update: async (id, booking) => {
    const data = getData();

    const index = data.findIndex((b) => String(b.id) === String(id));

    if (index === -1) {
      return { success: false, message: "Booking not found" };
    }

    data[index] = {
      ...data[index],
      ...booking,
      id: data[index].id,
    };

    saveData(data);

    return { success: true, data: data[index] };
  },

  remove: async (id) => {
    const data = getData().filter((b) => String(b.id) !== String(id));
    saveData(data);

    return { success: true };
  },
};
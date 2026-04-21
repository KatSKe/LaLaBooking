const STORAGE_KEY = "bookings";

/**
 * Get users from localStorage (for mapping)
 */
function getUsers() {
  const data = localStorage.getItem("users");
  return data ? JSON.parse(data) : [];
}

/**
 * Get offers from localStorage (for mapping)
 */
function getOffers() {
  const data = localStorage.getItem("offers");
  return data ? JSON.parse(data) : [];
}

/**
 * Normalize booking (AUTO FIX OLD DATA)
 */
function normalizeBooking(b) {
  const users = getUsers();
  const offers = getOffers();

  let userObject = b.user;

  // 🔥 ako je stari format (userId)
  if (!userObject && (b.userId || typeof b.user === "number")) {
    const userId = b.userId ?? b.user;

    const foundUser = users.find(
      (u) =>
        String(u.id) === String(userId) ||
        String(u.sifra) === String(userId)
    );

    if (foundUser) {
      userObject = {
        id: foundUser.id ?? foundUser.sifra,
        firstName: foundUser.firstName ?? foundUser.ime ?? "",
        lastName: foundUser.lastName ?? foundUser.prezime ?? "",
      };
    }
  }

  let offerObject = b.offer;

  // 🔥 ako je stari format (offerId)
  if (!offerObject || typeof offerObject !== "object") {
    const offerId = b.offer ?? b.offerId;

    const foundOffer = offers.find(
      (o) => String(o.sifra) === String(offerId)
    );

    if (foundOffer) {
      offerObject = {
        ...foundOffer,
      };
    }
  }

  return {
    ...b,
    user: userObject || null,
    offer: offerObject || null,
  };
}

/**
 * Get data with normalization
 */
function getData() {
  const data = localStorage.getItem(STORAGE_KEY);
  const parsed = data ? JSON.parse(data) : [];

  const normalized = parsed.map(normalizeBooking);

  // 🔥 overwrite clean data
  localStorage.setItem(STORAGE_KEY, JSON.stringify(normalized));

  return normalized;
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
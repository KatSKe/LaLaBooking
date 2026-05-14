import { bookings as defaultBookings } from "./BookingData";

const STORAGE_KEY = "bookings";

function getUsers() {
  const data = localStorage.getItem("users");

  return data ? JSON.parse(data) : [];
}

function getOffers() {
  const data = localStorage.getItem("offers");

  return data ? JSON.parse(data) : [];
}

function normalizeBooking(booking) {
  const users = getUsers();
  const offers = getOffers();

  const userId =
    booking.userId ??
    (typeof booking.user === "number"
      ? booking.user
      : null);

  const offerId =
    booking.offerId ??
    (typeof booking.offer === "number"
      ? booking.offer
      : null);

  const foundUser = users.find(
    (user) => String(user.id) === String(userId)
  );

  const foundOffer = offers.find(
    (offer) => String(offer.id) === String(offerId)
  );

  return {
    ...booking,

    userId,
    offerId,

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

  
    if (!data) {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(defaultBookings));
        return [...defaultBookings];
      }

  return JSON.parse(data);
}

function saveData(data) {
  localStorage.setItem(
    STORAGE_KEY,
    JSON.stringify(data)
  );
}

export default {
  get: async () => ({
    success: true,
    data: getData(),
  }),

  getById: async (id) => ({
    success: true,
    data: getData()
      .map(normalizeBooking)
      .find(
        (booking) =>
          String(booking.id) === String(id)
      ),
  }),

  add: async (booking) => {
    const data = getData();

    const newBooking = {
      ...booking,
      id: Date.now(),
    };

    data.push(newBooking);

    saveData(data);

    return {
      success: true,
      data: newBooking,
    };
  },

  update: async (id, booking) => {
    const data = getData();

    const index = data.findIndex(
      (item) => String(item.id) === String(id)
    );

    if (index === -1) {
      return {
        success: false,
        message: "Booking not found",
      };
    }

    data[index] = {
      ...data[index],
      ...booking,
      id: data[index].id,
    };

    saveData(data);

    return {
      success: true,
      data: data[index],
    };
  },

  remove: async (id) => {
    const filtered = getData().filter(
      (booking) =>
        String(booking.id) !== String(id)
    );

    saveData(filtered);

    return {
      success: true,
    };
  },
};
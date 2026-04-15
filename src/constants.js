export const APP_NAME = "LaLa Booking";

export const RouteNames = {
  HOME: "/",

  OFFERS: "/offers",
  OFFERS_CREATE: "/offers/new",
  OFFERS_EDIT: "/offers/:sifra",

  USERS: "/users",
  USERS_NEW: "/users/new",
  USERS_EDIT: "/users/:id",

  TYPES: "/types",
  TYPES_NEW: "/types/new",
  TYPES_EDIT: "/types/:id",

  BOOKINGS: "/bookings",
  BOOKINGS_CREATE: "/bookings/new",
  BOOKINGS_EDIT: "/bookings/:id",
};

// memory, localStorage, firebase
export const DATA_SOURCE = "localStorage";
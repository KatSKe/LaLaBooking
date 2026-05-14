import { offers as defaultOffers } from "./OffersData";

const STORAGE_KEY = "offers";

function getAllFromStorage() {
  const data = localStorage.getItem(STORAGE_KEY);

  // 🔥 IF NO DATA → INSERT DEFAULTS
  if (!data) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(defaultOffers));
    return [...defaultOffers];
  }

  return JSON.parse(data);
}

function saveToStorage(data) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
}

async function get() {
  const offers = getAllFromStorage();
  return { success: true, data: [...offers] };
}

async function getById(id) {
  const offers = getAllFromStorage();
  const offer = offers.find(o => o.id === parseInt(id));
  return { success: true, data: offer };
}

async function add(offer) {
  const offers = getAllFromStorage();

  if (offers.length === 0) {
    offer.id = 1;
  } else {
    const maxId = Math.max(...offers.map(o => o.id));
    offer.id = maxId + 1;
  }

  offers.push(offer);
  saveToStorage(offers);

  return { success: true, data: offer };
}

async function update(id, offer) {
  const offers = getAllFromStorage();
  const index = offers.findIndex(o => o.id === parseInt(id));

  if (index !== -1) {
    offers[index] = { ...offers[index], ...offer };
    saveToStorage(offers);
    return { success: true, data: offers[index] };
  }

  return { success: false, message: "Offer not found" };
}

async function remove(id) {
  let offers = getAllFromStorage();
  offers = offers.filter(o => o.id !== parseInt(id));
  saveToStorage(offers);

  return { success: true, message: "Deleted" };
}

export default {
  get,
  getById,
  add,
  update,
  remove,
};
import { offers } from "./OffersData";

// 1/4 READ (CRUD)
async function get() {
  return { success: true, data: [...offers] };
}

async function getById(id) {
  return {
    success: true,
    data: offers.find(o => o.id === parseInt(id)),
  };
}

// 2/4 CREATE (CRUD)
async function add(offer) {
  if (offers.length === 0) {
    offer.id = 1;
  } else {
    offer.id = offers[offers.length - 1].id + 1;
  }

  offers.push(offer);

  return { success: true, data: offer };
}

// 3/4 UPDATE (CRUD)
async function update(id, offer) {
  const index = findIndex(id);

  if (index > -1) {
    offers[index] = { ...offers[index], ...offer };
    return { success: true, data: offers[index] };
  }

  return { success: false, message: "Offer not found" };
}

function findIndex(id) {
  return offers.findIndex(o => o.id === parseInt(id));
}

// 4/4 DELETE (CRUD)
async function remove(id) {
  const index = findIndex(id);

  if (index > -1) {
    offers.splice(index, 1);
    return { success: true, message: "Deleted" };
  }

  return { success: false, message: "Offer not found" };
}

export default {
  get,
  add,
  getById,
  update,
  remove,
};
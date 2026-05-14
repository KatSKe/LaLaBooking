import { offers as defaultOffers } from "./OffersData";

let data = [...defaultOffers];

// 1/4 READ (CRUD)
async function get() {
  return { success: true, data: [...data] };
}

async function getById(id) {
  return {
    success: true,
    data: data.find(o => o.id === parseInt(id)),
  };
}

// 2/4 CREATE (CRUD)
async function add(offer) {
  const newOffer = {
    ...offer,
    id: data.length === 0 ? 1 : data[data.length - 1].id + 1,
  };

  data.push(newOffer);

  return { success: true, data: newOffer };
}

// 3/4 UPDATE (CRUD)
async function update(id, offer) {
  const index = findIndex(id);

  if (index > -1) {
    data[index] = { ...data[index], ...offer };
    return { success: true, data: data[index] };
  }

  return { success: false, message: "Offer not found" };
}

function findIndex(id) {
  return data.findIndex(o => o.id === parseInt(id));
}

// 4/4 DELETE (CRUD)
async function remove(id) {
  const index = findIndex(id);

  if (index > -1) {
    data.splice(index, 1);
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
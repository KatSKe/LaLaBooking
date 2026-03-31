import { offers } from "./OffersPodaci";

// 1/4 READ (CRUD)
async function get() {
  return { success: true, data: [...offers] };
}

async function getBySifra(sifra) {
  return {
    success: true,
    data: offers.find(o => o.sifra === parseInt(sifra)),
  };
}

// 2/4 CREATE (CRUD)
async function dodaj(offer) {
  if (offers.length === 0) {
    offer.sifra = 1;
  } else {
    offer.sifra = offers[offers.length - 1].sifra + 1;
  }

  offers.push(offer);

  return { success: true, data: offer };
}

// 3/4 UPDATE (CRUD)
async function promjeni(sifra, offer) {
  const index = nadiIndex(sifra);

  if (index > -1) {
    offers[index] = { ...offers[index], ...offer };
    return { success: true, data: offers[index] };
  }

  return { success: false, message: "Offer nije pronađen" };
}

function nadiIndex(sifra) {
  return offers.findIndex(o => o.sifra === parseInt(sifra));
}

// 4/4 DELETE (CRUD)
async function obrisi(sifra) {
  const index = nadiIndex(sifra);

  if (index > -1) {
    offers.splice(index, 1);
    return { success: true, message: "Obrisano" };
  }

  return { success: false, message: "Offer nije pronađen" };
}

export default {
  get,
  dodaj,
  getBySifra,
  promjeni,
  obrisi,
};
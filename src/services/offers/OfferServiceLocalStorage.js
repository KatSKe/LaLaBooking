import { offers as defaultOffers } from "./OffersPodaci";

const STORAGE_KEY = "offers";

function dohvatiSveIzStorage() {
  const podaci = localStorage.getItem(STORAGE_KEY);

  // 🔥 AKO NEMA PODATAKA → UBACI DEFAULT
  if (!podaci) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(defaultOffers));
    return defaultOffers;
  }

  return JSON.parse(podaci);
}

function spremiUStorage(podaci) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(podaci));
}

async function get() {
  const offers = dohvatiSveIzStorage();
  return { success: true, data: [...offers] };
}

async function getBySifra(sifra) {
  const offers = dohvatiSveIzStorage();
  const offer = offers.find(o => o.sifra === parseInt(sifra));
  return { success: true, data: offer };
}

async function dodaj(offer) {
  const offers = dohvatiSveIzStorage();

  if (offers.length === 0) {
    offer.sifra = 1;
  } else {
    const maxSifra = Math.max(...offers.map(o => o.sifra));
    offer.sifra = maxSifra + 1;
  }

  offers.push(offer);
  spremiUStorage(offers);

  return { success: true, data: offer };
}

async function promjeni(sifra, offer) {
  const offers = dohvatiSveIzStorage();
  const index = offers.findIndex(o => o.sifra === parseInt(sifra));

  if (index !== -1) {
    offers[index] = { ...offers[index], ...offer };
    spremiUStorage(offers);
  }

  return { success: true, data: offers[index] };
}

async function obrisi(sifra) {
  let offers = dohvatiSveIzStorage();
  offers = offers.filter(o => o.sifra !== parseInt(sifra));
  spremiUStorage(offers);

  return { success: true, message: "Obrisano" };
}

export default {
  get,
  getBySifra,
  dodaj,
  promjeni,
  obrisi,
};
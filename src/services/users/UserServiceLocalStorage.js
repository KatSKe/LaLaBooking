import { users as defaultUsers } from "./UserDataUser.js";

const STORAGE_KEY = "users";

function dohvatiSveIzStorage() {
  const podaci = localStorage.getItem(STORAGE_KEY);

  if (!podaci) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(defaultUsers));
    return defaultUsers;
  }

  try {
    return JSON.parse(podaci);
  } catch (e) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(defaultUsers));
    return defaultUsers;
  }
}

function spremiUStorage(podaci) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(podaci));
}

// 1/4 READ
async function get() {
  const korisnici = dohvatiSveIzStorage();
  return { success: true, data: [...korisnici] };
}

// 2/4 READ BY ID
async function getBySifra(sifra) {
  const korisnici = dohvatiSveIzStorage();
  const k = korisnici.find(x => x.sifra === parseInt(sifra));

  return { success: true, data: k };
}

// 3/4 CREATE
async function dodaj(k) {
  const korisnici = dohvatiSveIzStorage();

  if (korisnici.length === 0) {
    k.sifra = 1;
  } else {
    k.sifra = korisnici[korisnici.length - 1].sifra + 1;
  }

  korisnici.push(k);
  spremiUStorage(korisnici);

  return { success: true, data: k };
}

// 4/4 UPDATE
async function promjeni(sifra, k) {
  const korisnici = dohvatiSveIzStorage();
  const index = korisnici.findIndex(x => x.sifra === parseInt(sifra));

  if (index > -1) {
    korisnici[index] = { ...korisnici[index], ...k };
    spremiUStorage(korisnici);

    return { success: true, data: korisnici[index] };
  }

  return { success: false, message: "User not found" };
}

// 5/4 DELETE
async function obrisi(sifra) {
  let korisnici = dohvatiSveIzStorage();
  korisnici = korisnici.filter(x => x.sifra !== parseInt(sifra));
  spremiUStorage(korisnici);

  return { success: true, message: "Deleted" };
}

export default {
  get,
  getBySifra,
  dodaj,
  promjeni,
  obrisi,
};
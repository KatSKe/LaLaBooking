import { korisnik } from "./KorisnikPodaci";

// 1/4 READ (CRUD)
async function get() {
  return { success: true, data: [...korisnik] };
}

async function getBySifra(sifra) {
  return {
    success: true,
    data: korisnik.find(k => k.sifra === parseInt(sifra)),
  };
}

// 2/4 CREATE (CRUD)
async function dodaj(k) {
  if (korisnik.length === 0) {
    k.sifra = 1;
  } else {
    k.sifra = korisnik[korisnik.length - 1].sifra + 1;
  }

  korisnik.push(k);

  return { success: true, data: k };
}

// 3/4 UPDATE (CRUD)
async function promjeni(sifra, k) {
  const index = nadiIndex(sifra);

  if (index > -1) {
    korisnik[index] = { ...korisnik[index], ...k };
    return { success: true, data: korisnik[index] };
  }

  return { success: false, message: "Korisnik nije pronađen" };
}

function nadiIndex(sifra) {
  return korisnik.findIndex(k => k.sifra === parseInt(sifra));
}

// 4/4 DELETE (CRUD)
async function obrisi(sifra) {
  const index = nadiIndex(sifra);

  if (index > -1) {
    korisnik.splice(index, 1);
    return { success: true, message: "Obrisano" };
  }

  return { success: false, message: "Korisnik nije pronađen" };
}

export default {
  get,
  dodaj,
  getBySifra,
  promjeni,
  obrisi,
};
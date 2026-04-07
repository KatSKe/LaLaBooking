import { users } from "./UserDataUser";

// 1/4 READ (CRUD)
async function get() {
  return { success: true, data: [...users] };
}

async function getBySifra(sifra) {
  return {
    success: true,
    data: users.find(k => k.sifra === parseInt(sifra)),
  };
}

// 2/4 CREATE (CRUD)
async function dodaj(k) {
  if (users.length === 0) {
    k.sifra = 1;
  } else {
    k.sifra = users[users.length - 1].sifra + 1;
  }

  users.push(k);

  return { success: true, data: k };
}

// 3/4 UPDATE (CRUD)
async function promjeni(sifra, k) {
  const index = nadiIndex(sifra);

  if (index > -1) {
    users[index] = { ...users[index], ...k };
    return { success: true, data: users[index] };
  }

  return { success: false, message: "Korisnik nije pronađen" };
}

function nadiIndex(sifra) {
  return users.findIndex(k => k.sifra === parseInt(sifra));
}

// 4/4 DELETE (CRUD)
async function obrisi(sifra) {
  const index = nadiIndex(sifra);

  if (index > -1) {
    users.splice(index, 1);
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
import UserServiceLocalStorage from "./UserServiceLocalStorage";
import UserServiceMemory from "./UserServiceMemory";
import { DATA_SOURCE } from "../../constants";

let Servis = null;

switch (DATA_SOURCE) {
  case "memory":
    Servis = UserServiceMemory;
    break;

  case "localStorage":
    Servis = UserServiceLocalStorage;
    break;

  default:
    console.warn("Unknown DATA_SOURCE:", DATA_SOURCE);
    Servis = UserServiceLocalStorage;
}

const PrazanServis = {
  get: async () => ({ success: false, data: [] }),
  getBySifra: async () => ({ success: false, data: {} }),
  dodaj: async () => ({ success: false }),
  promjeni: async () => ({ success: false }),
  obrisi: async () => ({ success: false }),
};

// 🔥 NORMALIZACIJA USERA (KLJUČNO)
function normalizeUsers(response) {
  return {
    ...response,
    data: (response.data || []).map((u, index) => ({
      ...u,
      id: u.id ?? u.sifra ?? index, // 🔥 FIX ZA KEY PROBLEM
    })),
  };
}

const AktivniServis = Servis || PrazanServis;

export default {
  get: async () => normalizeUsers(await AktivniServis.get()),

  getBySifra: async (sifra) =>
    await AktivniServis.getBySifra(sifra),

  dodaj: async (users) =>
    await AktivniServis.dodaj(users),

  promjeni: async (sifra, users) =>
    await AktivniServis.promjeni(sifra, users),

  obrisi: async (sifra) =>
    await AktivniServis.obrisi(sifra),
};
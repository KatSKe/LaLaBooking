import UserServiceLocalStorage from "./UserServiceLocalStorage";
import UserServiceMemory from "./UserServiceMemory";
import { DATA_SOURCE } from "../../constants";

let Servis = null;

// DATA SOURCE SELECTION
switch (DATA_SOURCE) {
  case "memory":
    Servis = UserServiceMemory;
    break;

  case "localStorage":
    Servis = UserServiceLocalStorage;
    break;

  default:
    console.warn("Unknown DATA_SOURCE:", DATA_SOURCE);
    Servis = UserServiceLocalStorage; // safe fallback
}

// SAFE FALLBACK SERVICE
const PrazanServis = {
  get: async () => ({ success: false, data: [] }),
  getBySifra: async () => ({ success: false, data: {} }),
  dodaj: async () => ({ success: false, message: "UserService not loaded" }),
  promjeni: async () => ({ success: false, message: "UserService not loaded" }),
  obrisi: async () => ({ success: false, message: "UserService not loaded" }),
};

// ACTIVE SERVICE
const AktivniServis = Servis || PrazanServis;

export default {
  get: async () => await AktivniServis.get(),

  getBySifra: async (sifra) =>
    await AktivniServis.getBySifra(sifra),

  dodaj: async (users) =>
    await AktivniServis.dodaj(users),

  promjeni: async (sifra, users) =>
    await AktivniServis.promjeni(sifra, users),

  obrisi: async (sifra) =>
    await AktivniServis.obrisi(sifra),
};
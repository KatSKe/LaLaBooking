import UserServiceLocalStorage from "./UserServiceLocalStorage";
import UserServiceMemorija from "./UserServiceMemory";
import { DATA_SOURCE } from "../../constants";

let Servis = null;

// Odabir izvora podataka
switch (DATA_SOURCE) {
  case "memorija":
    Servis = UserServiceMemorija;
    break;

  case "localStorage":
    Servis = UserServiceLocalStorage;
    break;

  default:
    console.warn("Nepoznat DATA_SOURCE:", DATA_SOURCE);
    Servis = null;
}

// Fallback ako servis nije definiran
const PrazanServis = {
  get: async () => ({ success: false, data: [] }),
  getBySifra: async () => ({ success: false, data: {} }),
  dodaj: async () => ({ success: false, message: "UserService nije učitan" }),
  promjeni: async () => ({ success: false, message: "UserService nije učitan" }),
  obrisi: async () => ({ success: false, message: "UserService nije učitan" }),
};

// Aktivni servis
const AktivniServis = Servis || PrazanServis;

// Export API
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
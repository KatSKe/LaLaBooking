import KorisnikServiceLocalStorage from "./KorisnikServiceLocalStorage";
import KorisnikServiceMemorija from "./KorisnikServiceMemorija";
import { DATA_SOURCE } from "../../constants";

let Servis = null;

// Odabir izvora podataka
switch (DATA_SOURCE) {
  case "memorija":
    Servis = KorisnikServiceMemorija;
    break;

  case "localStorage":
    Servis = KorisnikServiceLocalStorage;
    break;

  default:
    console.warn("Nepoznat DATA_SOURCE:", DATA_SOURCE);
    Servis = null;
}

// Fallback ako servis nije definiran
const PrazanServis = {
  get: async () => ({ success: false, data: [] }),
  getBySifra: async () => ({ success: false, data: {} }),
  dodaj: async () => ({ success: false, message: "KorisnikService nije učitan" }),
  promjeni: async () => ({ success: false, message: "KorisnikService nije učitan" }),
  obrisi: async () => ({ success: false, message: "KorisnikService nije učitan" }),
};

// Aktivni servis
const AktivniServis = Servis || PrazanServis;

// Export API
export default {
  get: async () => await AktivniServis.get(),

  getBySifra: async (sifra) =>
    await AktivniServis.getBySifra(sifra),

  dodaj: async (korisnik) =>
    await AktivniServis.dodaj(korisnik),

  promjeni: async (sifra, korisnik) =>
    await AktivniServis.promjeni(sifra, korisnik),

  obrisi: async (sifra) =>
    await AktivniServis.obrisi(sifra),
};
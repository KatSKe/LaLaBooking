import OfferServiceLocalStorage from "./OfferServiceLocalStorage";
import OfferServiceMemorija from "./OfferServiceMemorija";
import { DATA_SOURCE } from "../../constants";

let Servis = null;

switch (DATA_SOURCE) {
  case "memorija":
    Servis = OfferServiceMemorija;
    break;

  case "localStorage":
    Servis = OfferServiceLocalStorage;
    break;

  default:
    Servis = null;
}

const PrazanServis = {
  get: async () => ({ success: false, data: [] }),
  getBySifra: async () => ({ success: false, data: {} }),
  dodaj: async () => console.error("OfferService nije učitan"),
  promjeni: async () => console.error("OfferService nije učitan"),
  obrisi: async () => console.error("OfferService nije učitan"),
};

const AktivniServis = Servis || PrazanServis;

export default {
  get: () => AktivniServis.get(),
  getBySifra: (sifra) => AktivniServis.getBySifra(sifra),
  dodaj: (offer) => AktivniServis.dodaj(offer),
  promjeni: (sifra, offer) => AktivniServis.promjeni(sifra, offer),
  obrisi: (sifra) => AktivniServis.obrisi(sifra),
};
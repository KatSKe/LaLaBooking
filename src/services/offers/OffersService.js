import { destinacije } from "./OffersPodaci";


async function get() {
  return {data: destinacije}
}

export default {
  get
};

import { HttpService } from "../HttpService"; // Tvoj axios klijent

async function get() {
  return await HttpService.get('/Smjer');
}

export default {
  get
};

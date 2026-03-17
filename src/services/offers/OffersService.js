import { destinacije } from "./OffersPodaci";


// 1/4 Read od CRUD
async function get(){
    return {data: destinacije}
}


export default{
    get
}
import TypeServiceMemory from "./TypeServiceMemory";

const service = TypeServiceMemory;

export default {
  get: service.get,
  getById: service.getById,
  create: service.create,
  update: service.update,
  remove: service.remove
};
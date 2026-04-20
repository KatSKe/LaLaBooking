function getUserName(b) {
  if (b.user && typeof b.user === "object") {
    const fn = b.user.firstName || "";
    const ln = b.user.lastName || "";
    return `${fn} ${ln}`.trim() || "Unknown user";
  }

  return "Unknown user";
}

function getOfferName(b) {
  if (b.offer && typeof b.offer === "object") {
    return b.offer.naziv || "Unknown offer";
  }

  return "Unknown offer";
}
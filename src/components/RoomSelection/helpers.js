export default function beds(totalBeds, occupiedBeds) {
  const beds = [];
  if (totalBeds === occupiedBeds) {
    for (let i = 0; i < totalBeds; i++) {
      beds.push("grey");
    }
    return beds;
  }
  for (let i = 0; i < totalBeds - occupiedBeds; i++) {
    beds.push("free");
  }
  for (let i = 0; i < occupiedBeds; i++) {
    beds.push("occupied");
  }
  return beds;
}

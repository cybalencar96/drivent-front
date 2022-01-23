export function availableTypes(roomsData) {
  let returnalString = "";
  const types = [];

  for(const room of roomsData) {
    if(types.indexOf(room.type.name) === -1) types.push(room.type.name);
  }

  for(let i = 0; i < types.length; i++) {
    if(i === (types.length - 1)) returnalString += types[i];
    else if(i === (types.length - 2)) returnalString += `${types[i]} e `;
    else returnalString += `${types[i]}, `;
  }
  return returnalString;
}

export function calculateAvailableVacancies(availableRooms) {
  const dictionary = {
    Single: 1,
    Double: 2,
    Triple: 3,
  };

  let counter = 0;

  for(const room of availableRooms) {
    counter += dictionary[room.type.name];
  }

  return counter;
}

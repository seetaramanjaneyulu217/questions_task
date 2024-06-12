type Trip = [string, string];

interface Shipment {
  pickUps: string[];
  dropOffs: string[];
}

const shipment: Shipment = {
  pickUps: ["A", "B"],
  dropOffs: ["C", "D"],
};

const checkTripsAreValidOrInvalid = (courseOfTrips: Trip[]): string => {
  let allPickupPoints: string[] = [];
  let allDropoffPoints: string[] = [];

  courseOfTrips.forEach((trip: Trip) => {
    allPickupPoints.push(trip[0]);
    allDropoffPoints.push(trip[1]);
  });

  for (let i = 0; i < allDropoffPoints.length; i++) {
    const dropOffPoint = allDropoffPoints[i];

    if (shipment.dropOffs.includes(dropOffPoint)) {
      continue;
    }

    if (allPickupPoints.includes(dropOffPoint)) {
      const pickUpIndex = allPickupPoints.indexOf(dropOffPoint);
      allPickupPoints.splice(pickUpIndex, 1);

      allDropoffPoints.fill("Visited", i);
    }
  }

  for (let dropOffPoint of allDropoffPoints) {
    if (
      shipment.dropOffs.includes(dropOffPoint) ||
      dropOffPoint === "Visited"
    ) {
      continue;
    } else {
      return "Invalid Trip";
    }
  }

  return "Valid trip";
};

const courseOfTrips: Trip[] = [
  ["A", "W"],
  ["B", "W"],
  ["W", "C"],
  ["W", "D"],
];

const courseOfTrips1: Trip[] = [
  ["A", "W1"],
  ["B", "W2"],
  ["W1", "W4"],
  ["W4", "C"],
  ["W2", "D"],
];

const courseOfTrips2: Trip[] = [
  ["A", "W1"],
  ["B", "W2"],
  ["W3", "C"],
  ["W4", "D"],
];

const answer: string = checkTripsAreValidOrInvalid(courseOfTrips);
const answer1: string = checkTripsAreValidOrInvalid(courseOfTrips1);
const answer2: string = checkTripsAreValidOrInvalid(courseOfTrips2);

console.log(answer);
console.log(answer1);
console.log(answer2);

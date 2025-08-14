let customerName = [
  "TOM",
  "Hawk",
  "Jon",
  "Chandler",
  "Monica",
  "Rachel",
  "Phoebe",
  "Gunther",
  "Ross",
  "Geller",
  "Joey",
  "Bing",
  "Tribbiani",
  "Janice",
  "Bong",
  "Perk",
  "Green",
  "Ken",
  "Adams",
];
let city = [
  "New York",
  "Los Angeles",
  "Chicago",
  "Houston",
  "Philadelphia",
  "Phoenix",
  "San Antonio",
  "Austin",
  "San Francisco",
  "Columbus",
  "Washington",
  "Portland",
  "Oklahoma",
  "Las Vegas",
  "Virginia",
  "St. Louis",
  "Birmingham",
];

export function generateData(numOfRows: number) {
  let result = [];
  let dt = 0;
  for (let i = 1; i < numOfRows + 1; i++) {
    dt++;
    let round;
    let toString = i.toString();
    if (toString.length === 1) {
      round = "0000" + i;
    } else if (toString.length === 2) {
      round = "000" + i;
    } else if (toString.length === 3) {
      round = "00" + i;
    } else if (toString.length === 4) {
      round = "0" + i;
    } else {
      round = toString;
    }
    result.push({
      ProductID: round,
      City: city[Math.round(Math.random() * city.length)] || city[0],
      Year: "FY " + (dt + 2013),
      CustomerName:
        customerName[Math.round(Math.random() * customerName.length)] ||
        customerName[0],
      Price: Math.round(Math.random() * 5000) + 5000,
      Sold: Math.round(Math.random() * 80) + 10,
    });
    if (dt > 5) {
      dt = 1;
    }
  }
  return result;
}

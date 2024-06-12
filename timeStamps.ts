interface UserDevices {
  id: number;
  userId: number;
  deviceId: string;
  logged_in: Date;
  logged_out: Date;
  lastSeenAt: Date;
}

const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

// Sample data
const data: UserDevices[] = [
  {
    id: 1,
    userId: 5,
    deviceId: "device1",
    logged_in: new Date("2024-01-03"),
    logged_out: new Date("2024-03-03"),
    lastSeenAt: new Date("2024-02-12"),
  },
  {
    id: 2,
    userId: 5,
    deviceId: "device2",
    logged_in: new Date("2024-01-01"),
    logged_out: new Date("2024-01-20"),
    lastSeenAt: new Date("2024-01-15"),
  },
  {
    id: 3,
    userId: 10,
    deviceId: "device3",
    logged_in: new Date("2024-02-12"),
    logged_out: new Date("2024-04-14"),
    lastSeenAt: new Date("2024-03-05"),
  },
];

// Logic to print the data in terms of month names
const getMonthNamesAndPrintThem = (data: Record<string, number[]>): Record<string, number> => {

  const result: Record<string, number> = {}

  Object.keys(data).forEach((month) => {
    const date = new Date(month + '-01');
    const monthNumber = date.getMonth();
    result[months[monthNumber]] = data[month].length;
  });

  return result
};

// Logic to find all the months between two dates
const calculateAllTheMonths = (logged_in: Date, logged_out: Date): string[] => {
  let allTheMonths: string[] = [];

  while (logged_in <= logged_out) {
    const month = logged_in.toISOString().slice(0, 7);
    allTheMonths.push(month);
    logged_in.setMonth(logged_in.getMonth() + 1);
  }

  return allTheMonths;
};

// Logic for finding monthly logged in users and monthly active users
const findMonthlyLoggedInUsersAndActiveUsers = (
  data: UserDevices[]
): {
  allLoggedInUsersForEachMonth: Record<string, number[]>;
  activeUsersPerMonth: Record<string, number[]>;
} => {
  const allLoggedInUsersForEachMonth: Record<string, number[]> = {};
  const activeUsersPerMonth: Record<string, number[]> = {};

  data.forEach((user: UserDevices) => {
    const alltheMonthsLoggedIn: string[] = calculateAllTheMonths(
      user.logged_in,
      user.logged_out
    );
    const lastSeenMonth: string = user.lastSeenAt.toISOString().slice(0, 7);

    alltheMonthsLoggedIn.forEach((month: string) => {
      if (!allLoggedInUsersForEachMonth[month]) {
        allLoggedInUsersForEachMonth[month] = [];
        allLoggedInUsersForEachMonth[month].push(user.userId);
      } else {
        allLoggedInUsersForEachMonth[month].push(user.userId);
      }
    });

    if (!activeUsersPerMonth[lastSeenMonth]) {
      activeUsersPerMonth[lastSeenMonth] = [];
      activeUsersPerMonth[lastSeenMonth].push(user.userId);
    } else {
      activeUsersPerMonth[lastSeenMonth].push(user.userId);
    }
  });

  return { allLoggedInUsersForEachMonth, activeUsersPerMonth };
};

const result: {
  allLoggedInUsersForEachMonth: Record<string, number[]>;
  activeUsersPerMonth: Record<string, number[]>;
} = findMonthlyLoggedInUsersAndActiveUsers(data);

const noOfLoggedInUsersPerMonth: Record<string, number> = getMonthNamesAndPrintThem(result.allLoggedInUsersForEachMonth);
console.log(noOfLoggedInUsersPerMonth);


const noOfActiveUsersPerMonth: Record<string, number> = getMonthNamesAndPrintThem(result.activeUsersPerMonth);
console.log(noOfActiveUsersPerMonth);
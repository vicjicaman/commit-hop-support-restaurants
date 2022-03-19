const FragmentFull = `id,
name,
description,
ST_Y(location::geometry) as latitude,
ST_X(location::geometry) as longitude,
owner,
images,
"supportedEmployees",
"preparedMeals",
"receivedDonations",
"createdAt",
"updatedAt"`;

export type Owner = {
  name: string;
  image: string;
};

export type Restaurant = {
  id: number;
  name: string;
  description: string;
  latitude: number;
  longitude: number;
  images: string[];
  owner: Owner;
  supportedEmployees: number;
  preparedMeals: number;
  receivedDonations: number;
  createdAt: Date;
  updatedAt: Date;
};

const constructor = (inp: any): Restaurant => {
  if (!inp) {
    return inp;
  }

  const {
    id,
    name,
    description,
    latitude,
    longitude,
    owner,
    images,
    supportedEmployees,
    preparedMeals,
    receivedDonations,
    createdAt,
    updatedAt,
  } = inp;

  return {
    id,
    name,
    description,
    latitude,
    longitude,
    owner,
    images,
    supportedEmployees,
    preparedMeals,
    receivedDonations: receivedDonations / 100,
    createdAt,
    updatedAt,
  };
};

const makeRestaurantService = ({ db }: any) => {
  return {
    list: async (): Restaurant[] => {
      const rows = await db.query(`SELECT ${FragmentFull} from restaurants`);
      return rows.map(constructor);
    },
  };
};

export default makeRestaurantService;

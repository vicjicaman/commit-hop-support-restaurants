import pg from "utils/db";

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

const constructor = ({
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
}: any): Restaurant => ({
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
});

export const list = async (): Promise<Restaurant[]> => {
  const res = await pg.query(`SELECT ${FragmentFull} from restaurants`);
  return res.rows.map(constructor);
};

export const find = async ({
  latitude,
  longitude,
}: any): Promise<Restaurant[]> => {
  const res = await pg.query(
    `SELECT ${FragmentFull} from restaurants ORDER BY ST_Distance(restaurants.location,  ST_SetSRID(ST_POINT($1, $2), 4326) ) asc limit 3 `,
    [longitude, latitude]
  );
  return res.rows.map(constructor);
};

export const get = async (id: number): Promise<Restaurant> => {
  const res = await pg.query(
    `SELECT ${FragmentFull} from restaurants where id = $1`,
    [id]
  );
  return res.rows.map(constructor)[0] || null;
};

export const create = async (inp: any) => {
  const text = `INSERT INTO restaurants(id, "userId", name, description, "supportedEmployees", "preparedMeals", "receivedDonations", owner, images, location)
  VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, ST_SetSRID(ST_POINT($10, $11), 4326) ) RETURNING *`;
  const values = [
    inp.id,
    inp.userId,
    inp.name,
    inp.description,
    inp.supportedEmployees,
    inp.preparedMeals,
    inp.receivedDonations,
    JSON.stringify(inp.owner),
    JSON.stringify(inp.images),
    inp.longitude,
    inp.latitude,
  ];

  try {
    const res = await pg.query(text, values);
    return res.rows.map(constructor)[0] || null;
  } catch (err) {
    console.log(err.stack);
    throw err;
  }
};

export const remove = async (id: number) => {
  const text = `DELETE FROM restaurants WHERE id = $1`;
  const values = [id];

  try {
    const res = await pg.query(text, values);
    return res;
  } catch (err) {
    console.log(err.stack);
    throw err;
  }
};

import {
  IRestaurant,
  IRestaurantCreateInput,
  IRestaurantUpdateInput,
} from "interfaces/restaurants";

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

const serialize = (inp: any): any[] => {
  return [];
};

const deserialize = (inp: any): IRestaurant => {
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

class RestaurantData {
  db: any;
  searchDriver: any;
  RestaurantFactory: any;

  constructor(opts: any) {
    this.db = opts.db;
    this.searchDriver = opts.search;
    this.RestaurantFactory = opts.RestaurantFactory;
  }

  async list(): Promise<IRestaurant[]> {
    const res = await this.db.query(`SELECT ${FragmentFull} from restaurants`);
    return res.rows.map((row: any) =>
      this.RestaurantFactory.create(deserialize(row))
    );
  }

  async find({ latitude, longitude }: any): Promise<IRestaurant[]> {
    const res = await this.db.query(
      `SELECT ${FragmentFull} from restaurants ORDER BY ST_Distance(restaurants.location,  ST_SetSRID(ST_POINT($1, $2), 4326) ) asc limit 3 `,
      [longitude, latitude]
    );
    return res.rows.map((row: any) =>
      this.RestaurantFactory.create(deserialize(row))
    );
  }

  async search(term: string): Promise<IRestaurant[]> {
    const res = await this.searchDriver.query("restaurants", {
      size: 50,
      query: {
        multi_match: {
          fields: ["name", "description"],
          query: term,
          type: "phrase_prefix",
        },
      },
    });

    return res.map((row: any) =>
      this.RestaurantFactory.create(deserialize(row))
    );
  }

  async get(id: number): Promise<IRestaurant> {
    const res = await this.db.query(
      `SELECT ${FragmentFull} from restaurants where id = $1`,
      [id]
    );
    return res.rows[0]
      ? this.RestaurantFactory.create(deserialize(res.rows[0]))
      : null;
  }

  async create(input: IRestaurantCreateInput) {
    const text = `INSERT INTO restaurants(id, "userId", name, description, "supportedEmployees", "preparedMeals", "receivedDonations", owner, images, location)
    VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, ST_SetSRID(ST_POINT($10, $11), 4326) ) RETURNING ${FragmentFull}`;
    const values = serialize(input);

    try {
      const res = await this.db.query(text, values);
      return this.RestaurantFactory.create(deserialize(res.rows[0]));
    } catch (err) {
      console.log(err.stack);
      throw err;
    }
  }

  async remove(id: number) {
    const text = `DELETE FROM restaurants WHERE id = $1`;

    try {
      const res = await this.db.query(text, [id]);
      return res;
    } catch (err) {
      console.log(err.stack);
      throw err;
    }
  }
}

export default RestaurantData;

/*
db: awilix.asClass(Database).classic(),
connectionString: awilix.asValue(DATABASE_URL),
timeout: awilix.asValue(1000),
*/

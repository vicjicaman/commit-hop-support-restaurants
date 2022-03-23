import {
  IRestaurant,
  IRestaurantCreateInput,
  IRestaurantUpdateInput,
} from "interfaces/restaurants";

const SEARCH_INDEX = "restaurants";

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

const serialize = (inp: any): any => {
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
    owner: JSON.stringify(owner),
    images: JSON.stringify(images),
    supportedEmployees,
    preparedMeals,
    receivedDonations: parseInt(receivedDonations) * 100,
    createdAt,
    updatedAt,
  };
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
  dataDriver: any;
  searchDriver: any;
  RestaurantFactory: any;

  constructor(opts: any) {
    this.dataDriver = opts.db;
    this.searchDriver = opts.search;
    this.RestaurantFactory = opts.RestaurantFactory;
  }

  async init() {
    const settings = {
      settings: {
        index: {
          number_of_shards: 4,
          number_of_replicas: 1,
        },
      },
    };

    const response = await this.searchDriver.driver().indices.create({
      index: SEARCH_INDEX,
      body: settings,
    });
  }

  async list(): Promise<IRestaurant[]> {
    const res = await this.dataDriver.query(
      `SELECT ${FragmentFull} from restaurants order by "receivedDonations" asc`
    );
    return res.rows.map((row: any) =>
      this.RestaurantFactory.create(deserialize(row))
    );
  }

  async find({ latitude, longitude }: any): Promise<IRestaurant[]> {
    const res = await this.dataDriver.query(
      `SELECT ${FragmentFull} from restaurants ORDER BY ST_Distance(restaurants.location,  ST_SetSRID(ST_POINT($1, $2), 4326) ) asc limit 3 `,
      [longitude, latitude]
    );
    return res.rows.map((row: any) =>
      this.RestaurantFactory.create(deserialize(row))
    );
  }

  async search(term: string): Promise<IRestaurant[]> {
    const res = await this.searchDriver.query(SEARCH_INDEX, {
      size: 50,
      query: {
        multi_match: {
          fields: ["name", "description"],
          query: term,
          type: "phrase_prefix",
        },
      },
    });

    return res.map((row: any) => this.RestaurantFactory.create(row));
  }

  async get(id: number): Promise<IRestaurant> {
    const res = await this.dataDriver.query(
      `SELECT ${FragmentFull} from restaurants where id = $1`,
      [id]
    );
    return res.rows[0]
      ? this.RestaurantFactory.create(deserialize(res.rows[0]))
      : null;
  }

  async create(input: IRestaurantCreateInput) {
    const text = `INSERT INTO restaurants(id, "userId", name, description, "supportedEmployees", "preparedMeals", "receivedDonations", owner, images, location)
    VALUES ( nextval('restaurant_sequence'),  $1, $2, $3, $4, $5, $6, $7, $8, ST_SetSRID(ST_POINT($9, $10), 4326) ) RETURNING ${FragmentFull}`;

    const {
      name,
      description,
      supportedEmployees,
      receivedDonations,
      preparedMeals,
      owner,
      latitude,
      longitude,
      images,
    } = serialize(input);

    const values = [
      1,
      name,
      description,
      supportedEmployees,
      preparedMeals,
      receivedDonations,
      owner,
      images,
      longitude,
      latitude,
    ];

    try {
      const res = await this.dataDriver.query(text, values);
      const robj = this.RestaurantFactory.create(deserialize(res.rows[0]));

      await this.searchDriver.index(SEARCH_INDEX, robj.id, robj);

      return robj;
    } catch (err) {
      console.log(err.stack);
      throw err;
    }
  }

  async update(id: number, input: IRestaurantUpdateInput) {
    const text = `UPDATE restaurants SET
     name = $2, description = $3, "supportedEmployees" = $4, "preparedMeals" = $5, "receivedDonations" = $6, images = $7, location = ST_SetSRID(ST_POINT($8, $9), 4326)
      WHERE id = $1 RETURNING ${FragmentFull}`;

    const {
      name,
      description,
      supportedEmployees,
      receivedDonations,
      preparedMeals,
      latitude,
      longitude,
      images,
    } = serialize(input);

    const values = [
      id,
      name,
      description,
      supportedEmployees,
      preparedMeals,
      receivedDonations,
      images,
      longitude,
      latitude,
    ];

    try {
      const res = await this.dataDriver.query(text, values);
      const robj = this.RestaurantFactory.create(deserialize(res.rows[0]));

      await this.searchDriver.index(SEARCH_INDEX, id, robj);

      return robj;
    } catch (err) {
      console.log(err.stack);
      throw err;
    }
  }

  async remove(id: number) {
    try {
      await this.searchDriver.remove(SEARCH_INDEX, id);
    } catch (err) {
      console.log(err.stack);
    }

    const text = `DELETE FROM restaurants WHERE id = $1`;

    try {
      const res = await this.dataDriver.query(text, [id]);
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

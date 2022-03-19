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

const makeRestaurantService = ({ db }: any) => {
  return {
    list: () => {
      return db.query(`SELECT ${FragmentFull} from restaurants`);
    },
  };
};

export default makeRestaurantService;

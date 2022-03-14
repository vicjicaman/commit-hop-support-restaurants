/* eslint-disable camelcase */

exports.shorthands = undefined;

exports.up = (pgm) => {
  pgm.createTable("users", {
    id: "id",
    name: { type: "varchar(1000)", notNull: true },
    createdAt: {
      type: "timestamp",
      notNull: true,
      default: pgm.func("current_timestamp"),
    },
  });

  pgm.createTable("restaurants", {
    id: "id",
    userId: {
      type: "integer",
      notNull: true,
      references: '"users"',
      onDelete: "cascade",
    },

    name: { type: "varchar(1000)", notNull: true },
    description: { type: "text", notNull: true },

    supportedEmployees: { type: "integer", notNull: true },
    preparedMeals: { type: "integer", notNull: true },
    receivedDonations: { type: "bigint", notNull: true },

    owner: { type: "json", notNull: true },
    location: { type: "GEOGRAPHY(Point)" },

    images: { type: "json", notNull: true },

    createdAt: {
      type: "timestamp",
      notNull: true,
      default: pgm.func("current_timestamp"),
    },
    updatedAt: {
      type: "timestamp",
      notNull: true,
      default: pgm.func("current_timestamp"),
    },
  });
  pgm.createIndex("restaurants", "userId");
};

exports.down = (pgm) => {};

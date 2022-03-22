/* eslint-disable camelcase */

exports.shorthands = undefined;

exports.up = (pgm) => {
  pgm.createSequence("restaurant_sequence", {
    ifNotExists: true,
    type: "bigint",
    start: 25,
    increment: 1,
  });
};

exports.down = (pgm) => {
  pgm.dropSequence("restaurant_sequence", { ifExists: true });
};

import pg from "utils/db";

export const list = async (): any[] => {
  const res = await pg.query("SELECT NOW()");
  return [];
};

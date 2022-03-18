import driver from "utils/search";

const INDEX = "restaurants";

export const search = async (term: string): Promise<any[]> => {
  var query = {
    size: 50,
    query: {
      multi_match: {
        fields: ["name", "description"],
        query: term,
        type: "phrase_prefix",
      },
    },
  };

  var response = await driver.search({
    index: INDEX,
    body: query,
  });

  return response.body.hits.hits.map(({ _source }) => _source);
};

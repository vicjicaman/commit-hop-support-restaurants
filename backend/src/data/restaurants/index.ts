import pg from "utils/db";

export const list = async (): Promise<any[]> => {
  const res = await pg.query("SELECT NOW()");
  return [
    {
      id: "r1",
      name: "BOSKO Restauracja & Delikatesy",
      description: `ul.Władycze 1
Przemyśl, 37-700`,
      supportedEmployees: 5,
      preparedMeals: 1000,
      receivedDonations: 30000,
      owner: {
        name: "Chef Bosko",
        image:
          "https://dl.airtable.com/.attachmentThumbnails/cc8e019500ec3583360da8b844b1169b/04040ff7",
      },
      images: [
        "https://dl.airtable.com/.attachmentThumbnails/5a2b9fc7795a569c36dbe602fff8554a/daba761d",
      ],
      latitude: 49.781862616145666,
      longitude: 22.77360414628525,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  ];
};

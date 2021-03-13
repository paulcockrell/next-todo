import { table, minifyRecord } from "./utils/Airtable";
import OwnsRecord from "./middleware/OwnsRecord";
import { NextApiRequest, NextApiResponse } from "next";
import { ITodo } from "../../types";

export default OwnsRecord(async (req: NextApiRequest, res: NextApiResponse) => {
  const { id } = req.body;

  try {
    const deletedRecords: ITodo[] = await table.destroy([id]);

    res.statusCode = 200;
    res.json(minifyRecord(deletedRecords[0]));
  } catch (err) {
    console.error(err);
    res.statusCode = 500;
    res.json({ msg: "Something went wrong" });
  }
});

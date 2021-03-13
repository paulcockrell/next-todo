import { table, minifyRecord } from "./utils/Airtable";
import OwnsRecord from "./middleware/OwnsRecord";
import { NextApiRequest, NextApiResponse } from "next";
import { ITodo } from "../../types";

export default OwnsRecord(async (req: NextApiRequest, res: NextApiResponse) => {
  const { id, fields } = req.body;

  try {
    const updatedRecords: ITodo[] = await table.update([{ id, fields }]);

    res.statusCode = 200;
    res.json(minifyRecord(updatedRecords[0]));
  } catch (err) {
    console.error(err);
    res.statusCode = 500;
    res.json({ msg: "Something went wrong" });
  }
});

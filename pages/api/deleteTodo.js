import { table, minifyRecord } from "./utils/Airtable";
import OwnsRecord from "./middleware/OwnsRecord";

export default OwnsRecord(async (req, res) => {
  const { id } = req.body;

  try {
    const deletedRecords = await table.destroy([id]);

    res.statusCode = 200;
    res.json(minifyRecord(deletedRecords[0]));
  } catch (err) {
    console.error(err);
    res.statusCode = 500;
    res.json({ msg: "Something went wrong" });
  }
});

import { table } from "./utils/Airtable";
import { withApiAuthRequired, getSession } from "@auth0/nextjs-auth0";
import { NextApiRequest, NextApiResponse } from "next";
import { ITodo } from "../../types";

export default withApiAuthRequired(
  async (req: NextApiRequest, res: NextApiResponse) => {
    const { user } = getSession(req, res);
    const { description } = req.body;

    try {
      const createdRecords: ITodo[] = await table.create([
        { fields: { description, userId: user.sub } },
      ]);
      const createdRecord: ITodo = {
        id: createdRecords[0].id,
        fields: createdRecords[0].fields,
      };

      res.statusCode = 200;
      res.json(createdRecord);
    } catch (err) {
      console.error(err);
      res.statusCode = 500;
      res.json({ msg: "Something went wrong" });
    }
  }
);

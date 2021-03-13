import { table } from "../utils/Airtable";
import { withApiAuthRequired, getSession } from "@auth0/nextjs-auth0";
import { NextApiRequest, NextApiResponse } from "next";
import { IRecord } from "../../../types";

type Data = {
  record: IRecord;
};

type Handler = (req: NextApiRequest, res: NextApiResponse) => void;

const ownsRecord = (handler: Handler) =>
  withApiAuthRequired(
    async (req: NextApiRequest & Data, res: NextApiResponse) => {
      const { user } = getSession(req, res);
      const { id } = req.body;

      try {
        const existingRecord: IRecord = await table.find(id);

        if (user.sub !== existingRecord?.fields.userId) {
          res.statusCode = 404;
          return res.json({ msg: "Record not found" });
        }

        req.record = existingRecord;

        return handler(req, res);
      } catch (err) {
        console.error(err);
        res.statusCode = 500;
        return res.json({ msg: "Something went wrong" });
      }
    }
  );

export default ownsRecord;

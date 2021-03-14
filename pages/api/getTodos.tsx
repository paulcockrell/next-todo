import { table, minifyRecords } from "./utils/Airtable";
import { withApiAuthRequired, getSession } from "@auth0/nextjs-auth0";
import { NextApiRequest, NextApiResponse } from "next";
import { IRecord } from "../../types";

export default withApiAuthRequired(
  async (req: NextApiRequest, res: NextApiResponse) => {
    const { user } = getSession(req, res);

    try {
      /*
      const {
        allTodos: { data },
      } = await graphQLClient.request(
        gql`
          {
            allTodos {
              data {
                _id
                description
                completed
                userId
              }
            }
          }
        `
      );
       */

      const records: IRecord[] = await table
        .select({
          filterByFormula: `userId = ${user.sub}`,
        })
        .firstPage();
      const minifiedRecords = minifyRecords(records);

      res.statusCode = 200;
      res.json(minifiedRecords);
    } catch (err) {
      console.error(err);
      res.statusCode = 500;
      res.json({ msg: "Something went wrong" });
    }
  }
);

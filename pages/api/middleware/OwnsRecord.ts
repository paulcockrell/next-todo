import { withApiAuthRequired, getSession } from "@auth0/nextjs-auth0";
import { NextApiRequest, NextApiResponse } from "next";
import { gql } from "graphql-request";
import { graphQLClient } from "../../../utils/graphql-client";
import { ITodo } from "../../../types/index";

type Data = {
  record: ITodo;
};

type Handler = (req: NextApiRequest, res: NextApiResponse) => void;

const ownsRecord = (handler: Handler) =>
  withApiAuthRequired(
    async (req: NextApiRequest & Data, res: NextApiResponse) => {
      const { user } = getSession(req, res);
      const { _id } = req.body;
      const query = gql`
        query FindATodoByID($id: ID!) {
          findTodoByID(id: $id) {
            description
            completed
            userId
          }
        }
      `;
      const variables = {
        id: _id,
      };

      const { findTodoByID } = await graphQLClient.request(query, variables);

      try {
        if (user.sub !== findTodoByID?.userId) {
          res.statusCode = 404;
          return res.json({ msg: "Record not found" });
        }

        req.record = findTodoByID;

        return handler(req, res);
      } catch (err) {
        console.error(err);
        res.statusCode = 500;
        return res.json({ msg: "Something went wrong" });
      }
    }
  );

export default ownsRecord;

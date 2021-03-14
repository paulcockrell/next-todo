import { withApiAuthRequired, getSession } from "@auth0/nextjs-auth0";
import { NextApiRequest, NextApiResponse } from "next";
import { gql } from "graphql-request";
import { graphQLClient } from "../../utils/graphql-client";

export default withApiAuthRequired(
  async (req: NextApiRequest, res: NextApiResponse) => {
    const { user } = getSession(req, res);
    const query = gql`
      query GetUserTodos($userId: String!) {
        allTodos(userId: $userId) {
          data {
            description
            completed
            userId
            _id
          }
        }
      }
    `;
    const variables = {
      userId: user.sub,
    };

    try {
      const { allTodos } = await graphQLClient.request(query, variables);

      res.statusCode = 200;
      res.json(allTodos);
    } catch (err) {
      console.error(err);
      res.statusCode = 500;
      res.json({ msg: "Something went wrong" });
    }
  }
);

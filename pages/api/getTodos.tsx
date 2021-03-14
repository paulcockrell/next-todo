import { withApiAuthRequired, getSession } from "@auth0/nextjs-auth0";
import { NextApiRequest, NextApiResponse } from "next";
import { gql } from "graphql-request";
import { graphQLClient } from "../../utils/graphql-client";

export default withApiAuthRequired(
  async (req: NextApiRequest, res: NextApiResponse) => {
    const { user } = getSession(req, res);
    const { size, cursor } = req.body;
    const query = gql`
      query GetUserTodos($userId: String!, $size: Int!, $cursor: String!) {
        allTodos(userId: $userId, _size: $size, _cursor: $cursor) {
          data {
            description
            completed
            userId
            _id
          }
          before
          after
        }
      }
    `;
    const variables = {
      userId: user.sub,
      size: size,
      cursor: cursor,
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

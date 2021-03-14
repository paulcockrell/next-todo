import { withApiAuthRequired, getSession } from "@auth0/nextjs-auth0";
import { NextApiRequest, NextApiResponse } from "next";
import { gql } from "graphql-request";
import { graphQLClient } from "../../utils/graphql-client";

export default withApiAuthRequired(
  async (req: NextApiRequest, res: NextApiResponse) => {
    const { user } = getSession(req, res);
    const { description } = req.body;

    try {
      const query = gql`
        mutation CreateATodo($description: String!, $userId: String!) {
          createTodo(
            data: {
              description: $description
              completed: false
              userId: $userId
            }
          ) {
            _id
            description
            completed
            userId
          }
        }
      `;

      const variables = {
        description: description,
        userId: user.sub,
        completed: false,
      };

      const { createTodo } = await graphQLClient.request(query, variables);

      res.statusCode = 200;
      res.json(createTodo);
    } catch (err) {
      console.error(err);
      res.statusCode = 500;
      res.json({ msg: "Something went wrong" });
    }
  }
);

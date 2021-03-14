import { getSession } from "@auth0/nextjs-auth0";
import { NextApiRequest, NextApiResponse } from "next";
import { gql } from "graphql-request";
import { graphQLClient } from "../../utils/graphql-client";
import OwnsRecord from "./middleware/OwnsRecord";

export default OwnsRecord(async (req: NextApiRequest, res: NextApiResponse) => {
  const { user } = getSession(req, res);
  const { _id, description, completed } = req.body;
  const query = gql`
    mutation UpdateTodo(
      $id: ID!
      $description: String!
      $completed: Boolean!
      $userId: String!
    ) {
      updateTodo(
        id: $id
        data: {
          description: $description
          completed: $completed
          userId: $userId
        }
      ) {
        description
        completed
        userId
      }
    }
  `;
  const variables = {
    id: _id,
    description: description,
    completed: completed,
    userId: user.sub,
  };

  try {
    const { updateTodo } = await graphQLClient.request(query, variables);

    res.statusCode = 200;
    res.json(updateTodo);
  } catch (err) {
    console.error(err);
    res.statusCode = 500;
    res.json({ msg: "Something went wrong" });
  }
});

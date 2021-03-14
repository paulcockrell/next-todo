import OwnsRecord from "./middleware/OwnsRecord";
import { NextApiRequest, NextApiResponse } from "next";
import { gql } from "graphql-request";
import { graphQLClient } from "../../utils/graphql-client";

export default OwnsRecord(async (req: NextApiRequest, res: NextApiResponse) => {
  const { _id } = req.body;
  const query = gql`
    mutation DeleteATodo($id: ID!) {
      deleteTodo(id: $id) {
        _id
      }
    }
  `;
  const variables = {
    id: _id,
  };

  try {
    const { deleteTodo } = await graphQLClient.request(query, variables);

    res.statusCode = 200;
    res.json(deleteTodo);
  } catch (err) {
    console.error(err);
    res.statusCode = 500;
    res.json({ msg: "Something went wrong" });
  }
});

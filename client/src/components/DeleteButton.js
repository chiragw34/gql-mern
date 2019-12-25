import React, { useState } from "react";
import gql from "graphql-tag";
import { useMutation } from "@apollo/react-hooks";
import { Icon, Confirm } from "semantic-ui-react";

import { FETCH_POSTS_QUERY } from "../util/graphql";

function DeleteButton({ postId, callback }) {
  const [confirmOpen, setConfirmOpen] = useState(false);

  const [deletePost] = useMutation(DELETE_POST_MUTATION, {
    update(proxy) {
      setConfirmOpen(false);
      const data = proxy.readQuery({
        query: FETCH_POSTS_QUERY
      });
      console.log(data.getPosts)
      data.getPosts = data.getPosts.filter(p => p.id !== postId);
console.log(data);
      proxy.writeQuery({ query: FETCH_POSTS_QUERY, data });
      console.log(data.getPosts);
      if (callback) callback();
    },
    variables: {
      postId
    }
  });

  return (
    <>
      <Icon
        name="trash"
        color="red"
        onClick={() => setConfirmOpen(true)}
        style={{ float: "right", fontSize: "1.3rem", marginTop: 7 }}
      />
      <Confirm
        open={confirmOpen}
        onCancel={() => setConfirmOpen(false)}
        onConfirm={deletePost}
      />
    </>
  );
}

const DELETE_POST_MUTATION = gql`
  mutation deletePost($postId: ID!) {
    deletePost(postId: $postId)
  }
`;

export default DeleteButton;

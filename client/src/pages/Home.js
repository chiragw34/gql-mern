import React from "react";
import { Grid } from "semantic-ui-react";
import { useQuery } from "@apollo/react-hooks";
import gql from "graphql-tag";

import PostCard from "../components/PostCard";

function Home() {
  let posts = ''
  const FETCH_POSTS_QUERY = gql`
    {
      getPosts {
        id
        body
        createdAt
        username
        likeCount
        likes {
          username
        }
        commentCount
        comments {
          id
          username
          body
          createdAt
        }
      }
    }
  `;

  const {
    loading,
    data
  } = useQuery(FETCH_POSTS_QUERY);

  if(data){
    posts = {data: data.getPosts }
  }

  return (
    <div>
      <Grid columns={3}>
        <Grid.Row className='page-title'>
          <h1>Recent Posts</h1>
        </Grid.Row>
        <Grid.Row>
          {loading ? (
            <h1>LOADING POSTS...</h1>
          ) : (
            posts.data &&
            posts.data.map(post => (
              <Grid.Column key={post.id} style={{marginBottom:20}}>
                <PostCard post={post} />
              </Grid.Column>
            ))
          )}
        </Grid.Row>
      </Grid>
    </div>
  );
}

export default Home;

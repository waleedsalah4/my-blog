import Head from 'next/head';
import AllPosts from '../../components/posts/all-posts'
import { getAllPosts } from '../../lib/posts-util';


function AllPostsPage(props) {
  return (
    <>
      <Head>
        <title>All Posts</title>
        <meta name='description' content="A list of all programing-related tutorials and posts!" />
      </Head>
      <AllPosts posts={props.posts}  />
    </>
  )
}


export function getStaticProps() {
  const allPosts = getAllPosts();
  return {
    props: {
      posts: allPosts
    },
    // revalidate: 600
  }
}

export default AllPostsPage
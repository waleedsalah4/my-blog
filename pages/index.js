import Head from "next/head";
import Hero from "../components/home-page/hero";
import FeaturedPosts from "../components/home-page/featured-posts";

import { getFeaturedPosts } from '../lib/posts-util'


export default function HomePage(props) {
  return (
    <>
      <Head>
        <title>Waleed' Blog</title>
        <meta name='description' content="I post about programming and web development" />
      </Head>
      <Hero />
      <FeaturedPosts posts={props.posts} />
    </>
  )
}


export function getStaticProps() {
  const featuredPosts = getFeaturedPosts();
  return {
    props: {
      posts: featuredPosts
    },
    // revalidate: 6000
  }
}
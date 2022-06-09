import type { NextPage } from "next";
import { FC } from "react";
import Main from "../components/Main";
import Head from "next/head";
import Image from "next/image";
import Header from "../components/Header";
import { sanityClient, urlFor } from "../sanity";
import { Post } from "../typings";
import Link from "next/link";

interface Props {
  posts: Post[];
}
const Home: NextPage = ({ posts }: any) => {
  return (
    <div>
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header />
      <Main />
      <div className="max-w-7xl m-auto mt-4  grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 md:py-6 p-4 md:gap-3 lg:gap-6">
        {posts.map((post: Post) => {
          return (
            <Link key={post._id} href={`/post/${post.slug.current}`}>
              <div className="group cursor-pointer border rounded-lg overflow-hidden">
                <img
                  className="h-50 w-full object-cover group-hover:scale-105 transition-transform duration-200 ease-in-out"
                  src={urlFor(post.mainImage).url()!}
                />
                <div className="flex justify-between items-center p-4 gap-3 md:gap-6 ">
                  <div>
                    <p className="text-lg font-bold">{post.title}</p>
                    <p className="text-sm">
                      {post.description} by {post.author.name}
                    </p>
                  </div>

                  <img
                    src={urlFor(post.author.image).url()!}
                    className="w-12 h-12 rounded-full"
                  />
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default Home;

export async function getServerSideProps() {
  const query = `*[_type == 'post'] {
    _id, 
    description,
    title,
    author->{
    name,image,slug
  },
  slug,mainImage
  } `;
  const posts = await sanityClient.fetch(query);
  return {
    props: { posts }, // will be passed to the page component as props
  };
}

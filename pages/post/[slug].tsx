import React from "react";
import Header from "../../components/Header";
import { sanityClient, urlFor } from "../../sanity";
import { Post } from "../../typings";
import PortableText from "react-portable-text";
import { useForm, SubmitHandler, UseFormHandleSubmit } from "react-hook-form";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

interface Props {
  post: Post;
}
type Inputs = {
  _id: string;
  name: string;
  email: string;
  comment: string;
};

export default function Slug({ post }: Props) {
  console.log(post);
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<Inputs>();
  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    const response = await fetch("/api/comments", {
      method: "POST", // *GET, POST, PUT, DELETE, etc.

      body: JSON.stringify(data),
    });
    const respData = await response.json();
    const { success, message } = respData;
    if (success) {
      toast(message, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
    if (!success) {
      toast.warn(message, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
  };
  return (
    <main>
      <ToastContainer />
      <Header />
      <img
        src={urlFor(post.mainImage).url()!}
        alt=""
        className="w-full h-40 object-cover"
      />
      <article className="max-w-3xl m-auto  p-5">
        <h1 className="text-3xl mt-10 mb-3">{post.title}</h1>
        <h2 className="text-xl font-light text-gray-500 mb">
          {post.description}
        </h2>

        <div className="flex space-x-2 items-center mt-3">
          <img
            src={urlFor(post.author.image).url()!}
            className="w-10 h-10 rounded-full"
          />
          <p className="font-extralight text-gray-500 text-sm">
            Blog post by{" "}
            <span className="text-green-500 font-semibold">
              {post.author.name}
            </span>{" "}
            Published at {new Date(post._createdAt).toLocaleString()}
          </p>
        </div>
        <div>
          <PortableText
            // Pass in block content straight from Sanity.io
            content={post.body}
            // Optionally override marks, decorators, blocks, etc. in a flat
            // structure without doing any gymnastics
            dataset={process.env.NEXT_PUBLIC_SANITY_DATASET}
            projectId={process.env.NEXT_PUBLIC_SANITY_PROJECT_ID}
            serializers={{
              h1: (props: any) => <h1 className="text-2xl mb-3" {...props} />,

              li: ({ children }: any) => (
                <li className="special-list-item">{children}</li>
              ),
            }}
          />
        </div>
      </article>
      <div className="CommentSection max-w-3xl m-auto p-5">
        <hr className=" my-5 m-auto border border-yellow-500" />
        <h3 className="text-yellow-500">Enjoyed this article!</h3>
        <h3 className="text-3xl my-4">Leave a comment below!</h3>
        <hr className=" my-5 m-auto border " />
        <form onSubmit={handleSubmit(onSubmit)}>
          <input
            {...register("_id")}
            type={"hidden"}
            name="_id"
            value={post._id}
          />

          <label className="block">
            <span className="block text-gray-700 text-sm font-bold my-2">
              Name
            </span>
            <input
              type="text"
              placeholder="Type your Name"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              {...register("name", { required: true })}
            />
          </label>
          <label className="block">
            <span className="block text-gray-700 text-sm font-bold my-2">
              Email
            </span>
            <input
              type="email"
              placeholder="Type your email"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              {...register("email", { required: true })}
            />
          </label>
          <label className="block">
            <span className="block text-gray-700 text-sm font-bold my-2">
              Comment
            </span>
            <textarea
              placeholder="Comment here"
              rows={8}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              {...register("comment", { required: true })}
            />
          </label>
          <div>
            {errors.name && (
              <p className="text-red-500">- The Name Field is required.</p>
            )}
            {errors.email && (
              <p className="text-red-500">- The Name Field is email.</p>
            )}
            {errors.comment && (
              <p className="text-red-500">- The Name Field is comment.</p>
            )}
          </div>
          <button className="bg-yellow-500 text-white w-full my-4 py-1 hover:bg-yellow-600">
            Submit
          </button>
        </form>
        <div className="p-10 my-5 shadow-yellow-500 shadow-sm">
          <h1 className="text-4xl ">Comments</h1>
          <hr />
          <div>
            {post.comments.map((comment) => {
              return (
                <p key={comment._id} className="mt-3 text-lg">
                  <span className="text-yellow-500 ">{comment.name}</span> :{" "}
                  {comment.comment}
                </p>
              );
            })}
          </div>
        </div>
      </div>
    </main>
  );
}

export async function getStaticPaths() {
  const query = `*[_type == 'post' ]{
    _id, 
   
  slug{
    current
  },
  
  } `;
  const posts = await sanityClient.fetch(query);

  const paths = posts.map((post: Post) => {
    return {
      params: {
        slug: post.slug.current,
      },
    };
  });

  return {
    paths,
    fallback: "blocking", // false or 'blocking'
  };
}

export async function getStaticProps({ params }: any) {
  const query = `*[_type == 'post' && slug.current == $slug][0]{
    _createdAt,
    _id,
    description,
    title,
    author->{
    name,image,slug
  },
  slug,
  mainImage,
  body,  
  "comments":
    *[_type == "comment" && post._ref == ^._id&& approved == true]
  
  } `;
  const post = await sanityClient.fetch(query, {
    slug: params.slug,
  });
  console.log(post);
  if (!post) {
    return {
      notFound: true,
    };
  }
  return {
    props: { post },
    revalidate: 60,
  };
}

import { Url } from "url";

export interface Post {
  _createdAt: string;
  _id: string;
  title: string;
  author: {
    name: string;
    image: string;
  };
  description: string;
  slug: {
    current: string;
  };
  mainImage: {
    url: string;
  };
  comments: Comment[];
  body: [object];
}
export interface Comment {
  _createdAt: string;
  _id: string;
  _type: string;
  _rev: string;
  _updateAt: string;

  approved: boolean;
  comment: string;
  email: string;
  name: string;
  post: {
    _ref: string;
    _type: string;
  };
}

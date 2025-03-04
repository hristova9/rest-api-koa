export interface Post {
  title: string;
  description: string;
}

export interface CreatedPost extends Post {
  id: string;
  ownerId: string;
}

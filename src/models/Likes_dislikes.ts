export class Likes_Dislikes {
    constructor(
        userId: string,
        postId: string,
        like: number
    ) {}
}

export interface LikesDislikesDB {
  user_id: string;
  post_id: string;
  like: number;
}
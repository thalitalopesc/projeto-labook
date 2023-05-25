export class Likes_Dislikes {
    constructor(
        private user_Id: string,
        private post_Id: string,
        private like: number
    ) {}

    public getUserId(): string {
        return this.user_Id
    }
    
    public setUserId(value: string): void {
        this.user_Id = value
    }

    public getPostId(): string {
        return this.post_Id
    }

    public setPostId(value: string): void {
        this.post_Id = value
    }

    public getLike(): number {
        return this.like
    }

    public setLike(value: number): void {
        this.like = value
    }
}
export class Posts {
    constructor(
        private id: string,
        private creator_id: string,
        private content: string,
        private likes: number,
        private dislikes: number,
        private created_at: string,
        private updated_at: string
    ) {}

    public getId(): string {
        return this.id
    }
    
    public setId(value: string): void {
        this.id = value
    }

    public getCreatorId(): string {
        return this.creator_id
    }

    public setCreatorId(value: string): void {
        this.creator_id = value
    }

    public getContent(): string {
        return this.content
    }

    public setContent(value: string): void {
        this.content = value
    }

    public getLikes(): number {
        return this.likes
    }

    public setLikes(value: number): void {
        this.likes = value
    }

    public getDislikes(): number {
        return this.dislikes
    }

    public setDislikes(value: number): void {
        this.dislikes = value
    }

    public getCreatedAt(): string {
        return this.created_at
    }

    public setCreatedAt(value: string): void {
        this.created_at = value
    }

    public getUpdatedAt(): string {
        return this.updated_at
    }

    public setUpdateddAt(value: string): void {
        this.updated_at = value
    }
}
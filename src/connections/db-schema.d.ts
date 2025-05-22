import { ColumnType, Generated, Insertable, objectColumnType, Selectable, Updateable } from 'kysely';

export interface DatabaseSchema {
    users: UsersTable;
    posts: PostsTable;
    comments: CommentsTable;
    hashtags: HashtagsTable;
    likes: LikesTable;
    bookmarks: BookmarksTable;
    followers: FollowersTable;
}

export interface UsersTable {
    id: Generated<string>;
    first_name: string;
    last_name: string | null;
    username: string;
    password: string;
    last_name: string | null;
    last_name: string | null;
    phone: string | null;
    email: string | null;
    image_uri: string | null;
    followers_count: number;
    status: number;
    created_at: Generated<Date>;
    updated_at: Generated<Date>;
}
export type User = Selectable<UsersTable>;
export type NewUser = Insertable<UsersTable>;
export type UserUpdate = Updateable<UsersTable>;


export interface PostsTable {
    id: Generated<string>;
    user_id: number;
    content: ContentJSON; 
    hashtags: string;
    parent_post_id: number | null;
    is_repost: boolean;
    retweet_count: number;
    like_count: number;
    comment_count: number;
    visibility: number;
    status: number;
    created_at: Generated<Date>;
    updated_at: Generated<Date>;
}
export type Post = Selectable<PostsTable>;
export type NewPost = Insertable<PostsTable>;
export type PostUpdate = Updateable<PostsTable>;


export interface CommentsTable {
    id: Generated<string>;
    user_id: number;
    post_id: number;
    content: object; 
    hashtags: string;
    parent_comment_id: number | null;
    like_count: number;
    status: number;
    created_at: Generated<Date>;
    updated_at: Generated<Date>;
}
export type Comment = Selectable<CommentsTable>;
export type NewComment = Insertable<CommentsTable>;
export type CommentUpdate = Updateable<CommentsTable>;


export interface HashtagsTable {
    id: Generated<string>;
    value: string;
    post_id: number;
    status: number;
    created_at: Generated<Date>;
    updated_at: Generated<Date>;
}
export type Hashtag = Selectable<HashtagsTable>;
export type NewHashtag = Insertable<HashtagsTable>;
export type HashtagUpdate = Updateable<HashtagsTable>;


export interface LikesTable {
    id: Generated<string>;
    user_id: number;
    post_id: number;
    status: number;
    created_at: Generated<Date>;
    updated_at: Generated<Date>;
}
export type Like = Selectable<LikesTable>;
export type NewLike = Insertable<LikesTable>;
export type LikeUpdate = Updateable<LikesTable>;


export interface BookmarksTable {
    id: Generated<string>;
    user_id: number;
    post_id: number;
    status: number;
    created_at: Generated<Date>;
    updated_at: Generated<Date>;
}
export type Bookmark = Selectable<BookmarksTable>;
export type NewBookmark = Insertable<BookmarksTable>;
export type BookmarkUpdate = Updateable<BookmarksTable>;


export interface FollowersTable {
    id: Generated<string>;
    followed_user: number;
    followed_by: number;
    status: number;
    created_at: Generated<Date>;
    updated_at: Generated<Date>;
}
export type Follower = Selectable<FollowersTable>;
export type NewFollower = Insertable<FollowersTable>;
export type FollowerUpdate = Updateable<FollowersTable>;
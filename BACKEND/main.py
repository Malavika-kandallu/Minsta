from fastapi import FastAPI
from pydantic import BaseModel
from fastapi.middleware.cors import CORSMiddleware
from services import AuthService, PostService, UserService

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class UserIn(BaseModel):
    username: str
    password: str

class PostIn(BaseModel):
    username: str
    content: str

class FollowIn(BaseModel):
    follower: str
    following: str

@app.post("/auth/signup")
def signup(user: UserIn):
    return AuthService.signup(user.username, user.password)

@app.post("/auth/login")
def login(user: UserIn):
    return AuthService.login(user.username, user.password)

@app.post("/api/posts")
def create_post(post: PostIn):
    return PostService.create_post(post.username, post.content)

@app.get("/api/posts")
def get_posts():
    return PostService.get_all_posts()

@app.get("/api/feed/{username}")
def get_feed(username: str):
    return PostService.get_user_feed(username)

@app.post("/api/follow")
def follow_user(data: FollowIn):
    return UserService.follow_user(data.follower, data.following)

@app.post("/api/unfollow")
def unfollow_user(data: FollowIn):
    return UserService.unfollow_user(data.follower, data.following)

@app.get("/api/users/search")
def search_users(q: str, currentUser: str):
    return UserService.search_users(q, currentUser)


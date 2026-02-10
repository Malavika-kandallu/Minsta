from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from database import users, posts
from auth_utils import hash_password, verify_password, create_token
from fastapi.middleware.cors import CORSMiddleware
from datetime import datetime


app = FastAPI()

# ✅ CORS must come here
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

@app.post("/auth/signup")
def signup(user: UserIn):
    if users.find_one({"username": user.username}):
        raise HTTPException(status_code=400, detail="User already exists")

    users.insert_one({
        "username": user.username,
        "password": hash_password(user.password)
    })

    return {"message": "Signup successful"}


@app.post("/auth/login")
def login(user: UserIn):
    db_user = users.find_one({"username": user.username})

    if not db_user or not verify_password(user.password, db_user["password"]):
        raise HTTPException(status_code=401, detail="Invalid credentials")

    token = create_token(user.username)
    return {"token": token}

@app.post("/api/posts")
def create_post(post: PostIn):

    new_post = {
        "username": post.username,
        "content": post.content,
        "createdAt": datetime.utcnow()
    }

    posts.insert_one(new_post)

    return {"message": "Post created"}


# ✅ OUTSIDE previous function
@app.get("/api/posts")
def get_posts():

    all_posts = []

    for post in posts.find().sort("createdAt", -1):
        post["_id"] = str(post["_id"])
        all_posts.append(post)

    return all_posts


@app.post("/api/follow")
def follow_user(data: dict):

    follower = data["follower"]
    following = data["following"]

    if follower == following:
        raise HTTPException(400, "You cannot follow yourself")

    users.update_one(
        {"username": follower},
        {"$addToSet": {"following": following}}
    )

    users.update_one(
        {"username": following},
        {"$addToSet": {"followers": follower}}
    )

    return {"message": f"{follower} followed {following}"}

@app.post("/api/unfollow")
def unfollow_user(data: dict):

    follower = data["follower"]
    following = data["following"]

    users.update_one(
        {"username": follower},
        {"$pull": {"following": following}}
    )

    users.update_one(
        {"username": following},
        {"$pull": {"followers": follower}}
    )

    return {"message": "Unfollowed"}


@app.get("/api/feed/{username}")
def get_feed(username: str):

    user = users.find_one({"username": username})

    if not user:
        raise HTTPException(404, "User not found")

    following_list = user.get("following", [])

    feed_posts = list(
        posts.find(
            {"username": {"$in": following_list}}
        ).sort("createdAt", -1)
    )

    for post in feed_posts:
        post["_id"] = str(post["_id"])

    return feed_posts

@app.get("/api/users/search")
def search_users(q: str, currentUser: str):

    results = list(
        users.find(
            {"username": {"$regex": q, "$options": "i"}},
            {"_id": 0, "password": 0}
        )
    )

    current = users.find_one({"username": currentUser})

    following = current.get("following", [])

    # Add flag
    for user in results:
        user["isFollowing"] = user["username"] in following

    return results


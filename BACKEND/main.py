from fastapi import FastAPI, HTTPException
from models import User, Post
from database import users, posts
from auth import hash_password, verify_password, create_token

app = FastAPI()

@app.post("/register")
def register(user: User):
    if users.find_one({"username": user.username}):
        raise HTTPException(400, "User exists")

    users.insert_one({
        "username": user.username,
        "password": hash_password(user.password)
    })
    return {"message": "User registered"}

@app.post("/login")
def login(user: User):
    db_user = users.find_one({"username": user.username})
    if not db_user or not verify_password(user.password, db_user["password"]):
        raise HTTPException(401, "Invalid credentials")

    token = create_token({"username": user.username})
    return {"token": token}

@app.post("/posts")
def create_post(post: Post):
    posts.insert_one(post.dict())
    return {"message": "Post created"}

@app.get("/posts")
def get_posts():
    return list(posts.find({}, {"_id": 0}))

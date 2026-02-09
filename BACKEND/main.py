from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from database import users   # 👈 THIS LINE IS REQUIRED
from auth_utils import hash_password, verify_password, create_token
from fastapi.middleware.cors import CORSMiddleware


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

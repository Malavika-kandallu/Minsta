from pydantic import BaseModel
from datetime import datetime

class User(BaseModel):
    username: str
    password: str

class Post(BaseModel):
    content: str
    username: str
    created_at: datetime = datetime.utcnow()

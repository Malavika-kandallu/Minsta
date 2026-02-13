from passlib.context import CryptContext
from jose import jwt
from datetime import datetime, timedelta

SECRET_KEY = "SUPER_SECRET_KEY"
ALGORITHM = "HS256"

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

def hash_password(password: str):
    return pwd_context.hash(password)

def verify_password(password: str, hashed: str) -> bool:
    return pwd_context.verify(password, hashed)

def create_token(data: dict) -> str:
    if isinstance(data, str):
        data = {"sub": data}
    if "exp" not in data:
        data["exp"] = datetime.utcnow() + timedelta(hours=2)
    return jwt.encode(data, SECRET_KEY, algorithm=ALGORITHM)

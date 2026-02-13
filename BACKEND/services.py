from typing import List, Dict
from fastapi import HTTPException
from repositories import UserRepository, PostRepository
from auth_utils import hash_password, verify_password, create_token

class AuthService:
    @staticmethod
    def signup(username: str, password: str) -> Dict:
        if UserRepository.find_by_username(username):
            raise HTTPException(status_code=400, detail="User already exists")
        
        hashed_pwd = hash_password(password)
        UserRepository.create_user(username, hashed_pwd)
        return {"message": "Signup successful"}
    
    @staticmethod
    def login(username: str, password: str) -> Dict:
        user = UserRepository.find_by_username(username)
        
        if not user or not verify_password(password, user["password"]):
            raise HTTPException(status_code=401, detail="Invalid credentials")
        
        token = create_token({"username": username})
        return {"token": token}

class PostService:
    @staticmethod
    def create_post(username: str, content: str) -> Dict:
        PostRepository.create_post(username, content)
        return {"message": "Post created"}
    
    @staticmethod
    def get_all_posts() -> List[Dict]:
        return PostRepository.get_all_posts()
    
    @staticmethod
    def get_user_feed(username: str) -> List[Dict]:
        user = UserRepository.find_by_username(username)
        if not user:
            raise HTTPException(404, "User not found")
        
        following_list = user.get("following", [])
        return PostRepository.get_feed_posts(following_list)

class UserService:
    @staticmethod
    def follow_user(follower: str, following: str) -> Dict:
        if follower == following:
            raise HTTPException(400, "You cannot follow yourself")
        
        UserRepository.add_following(follower, following)
        return {"message": f"{follower} followed {following}"}
    
    @staticmethod
    def unfollow_user(follower: str, following: str) -> Dict:
        UserRepository.remove_following(follower, following)
        return {"message": "Unfollowed"}
    
    @staticmethod
    def search_users(query: str, current_user: str) -> List[Dict]:
        results = UserRepository.search_users(query)
        current = UserRepository.find_by_username(current_user)
        following = current.get("following", []) if current else []
        
        for user in results:
            user["isFollowing"] = user["username"] in following
        
        return results

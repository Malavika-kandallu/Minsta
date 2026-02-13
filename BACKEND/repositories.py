from typing import List, Optional, Dict
from database import users, posts
from datetime import datetime

class UserRepository:
    @staticmethod
    def find_by_username(username: str) -> Optional[Dict]:
        return users.find_one({"username": username})
    
    @staticmethod
    def create_user(username: str, hashed_password: str) -> None:
        users.insert_one({
            "username": username,
            "password": hashed_password,
            "following": [],
            "followers": []
        })
    
    @staticmethod
    def add_following(follower: str, following: str) -> None:
        users.update_one(
            {"username": follower},
            {"$addToSet": {"following": following}}
        )
        users.update_one(
            {"username": following},
            {"$addToSet": {"followers": follower}}
        )
    
    @staticmethod
    def remove_following(follower: str, following: str) -> None:
        users.update_one(
            {"username": follower},
            {"$pull": {"following": following}}
        )
        users.update_one(
            {"username": following},
            {"$pull": {"followers": follower}}
        )
    
    @staticmethod
    def search_users(query: str) -> List[Dict]:
        return list(users.find(
            {"username": {"$regex": query, "$options": "i"}},
            {"_id": 0, "password": 0}
        ))

class PostRepository:
    @staticmethod
    def create_post(username: str, content: str) -> None:
        posts.insert_one({
            "username": username,
            "content": content,
            "createdAt": datetime.utcnow()
        })
    
    @staticmethod
    def get_all_posts() -> List[Dict]:
        all_posts = []
        for post in posts.find().sort("createdAt", -1):
            post["_id"] = str(post["_id"])
            all_posts.append(post)
        return all_posts
    
    @staticmethod
    def get_feed_posts(following_list: List[str]) -> List[Dict]:
        feed_posts = list(
            posts.find(
                {"username": {"$in": following_list}}
            ).sort("createdAt", -1)
        )
        for post in feed_posts:
            post["_id"] = str(post["_id"])
        return feed_posts

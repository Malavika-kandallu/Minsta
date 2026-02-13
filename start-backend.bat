@echo off
echo Starting Minsta Backend...
cd BACKEND
uvicorn main:app --reload --host 0.0.0.0 --port 8000

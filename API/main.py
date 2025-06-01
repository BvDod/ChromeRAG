from fastapi import FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware

from pydantic import BaseModel

app = FastAPI()

app.add_middleware(
  CORSMiddleware,
  allow_origins = ["*"], allow_methods = ["*"], allow_headers = ["*"]
)

class AuthDetails(BaseModel):
  username: str
  password: str

user_db = {
    "Brent": "password",
}

pinecone_key = "-"

@app.post("/auth/")
async def root(auth_details: AuthDetails):
    """ Endpoint to authenticate user credentials """

    if auth_details.username in user_db and user_db[auth_details.username] == auth_details.password:
        return {"status": "success", "message": "Valid credentials"}
    else:
        return {"status": "failure", "message": "Invalid credentials"}

@app.post("/submit/")
async def create_item(request: Request):
    json_data = await request.json()
    print(json_data)
    return {"status": "sucess"}
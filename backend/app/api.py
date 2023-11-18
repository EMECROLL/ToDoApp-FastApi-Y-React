from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

# Define the CORS origins
origins = [
    "http://localhost:3000",
    "localhost:3000"
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"]
)

#Get route for testing
@app.get("/", tags=["root"])
async def read_root() -> dict:
    return {"message": "Welcome to FastAPI!"}

todos = [
    {
        "id":"1",
        "item":"Minecraft"
    },
    {
        "id":"2",
        "item":"GTA"
    },
    {
        "id":"3",
        "item":"Fortnite"
    },
    {
        "id":"4",
        "item":"Rainbow Six"
    }
]

#Get todos route
@app.get("/todo", tags=["todos"])
async def get_todos() -> dict:
    return {"data": todos}
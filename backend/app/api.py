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

#Post todos route
@app.post("/todo", tags=["todos"])
async def add_todo(todo:dict) -> dict:
    todos.append(todo)
    return {"data":{"Todo has been added!"}}

#Put todos route
@app.put("/todo/{id}", tags=["todos"])
async def update_todo(id:int, body:dict) -> dict:
    for todo in todos:
        if int(todo["id"]) == id:
            todo["item"] = body["item"]
            return {"data":f"Todo with id {id} has been updated!"}
    return {
        "data":f"Todo with this {id} number has not benn found!"
    }

#Delete todos route
@app.delete("/todo/{id}", tags=["todos"])
async def delete_todo(id:int) -> dict:
    for todo in todos:
        if int(todo["id"]) == id:todos.remove(todo)
        return{
            "data":f"Todo with id {id} has been deleted!"
        }
    return{
        "data":f"Todo with id {id} has not been found!"
    }
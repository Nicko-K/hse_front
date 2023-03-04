"""
A mockup API for testing all frontend
Created by @SophieSilver
"""

from fastapi import FastAPI
from pydantic import BaseModel
import uvicorn
from http import HTTPStatus


class Task(BaseModel):
    id: int | None
    name: str
    description: str
    is_done: bool


app = FastAPI()
# The "database" with all tasks
db: dict[int, Task] = {}
# keeping a counter of tasks to assign ids to them
task_count = 0


@app.get("/api")
def index():
    return []


@app.get("/api/tasks")
async def tasks():
    return list(db.values())
    
    
@app.post("/api/tasks", status_code=HTTPStatus.CREATED)
async def create_task(task: Task):
    # bad practice but don't care
    global task_count
    created_task = task.copy(update={"id": task_count})
    task_count += 1
    
    db[created_task.id] = created_task # type: ignore
    
    return created_task


@app.put("/api/tasks/{id_}")
async def update_task(id_: int, new_task: Task):
    updated_task = new_task.copy(update={"id": id_})
    db[id_] = updated_task
    
    return updated_task


@app.delete("/api/tasks/{id_}", status_code=HTTPStatus.NO_CONTENT)
async def delete_task(id_: int):
    del db[id_]

if __name__ == "__main__":
    uvicorn.run("app:app", host="localhost", port=8000, reload=True)
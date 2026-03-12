from pydantic import BaseModel

class GenerateRequest(BaseModel):
    topic: str
    slide_count: int = 8
    theme: str = "dark"
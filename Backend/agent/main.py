from fastapi import FastAPI
from pydantic import BaseModel
from google.adk.sessions import Session
from agent import code_research_agent

app = FastAPI()

class ChatRequest(BaseModel):
    sessionId: str 
    message: str

class ChatResponse(BaseModel):
    sessionId: str
    response: str

sessions = {}

@app.post("/chat", response_model=ChatResponse)
def chat(request: ChatRequest):
    if request.sessionId not in sessions:
        sessions[request.sessionId] = Session()

    session = sessions[request.sessionId]

    result = code_research_agent.run(
        input=request.message,
        session=session,
    )

    return ChatResponse(
        sessionId= request.sessionId,
        response= result.output_text
    )

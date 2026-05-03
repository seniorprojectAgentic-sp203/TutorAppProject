from fastapi import FastAPI
from google.cloud import firestore
from agent import code_parallel_agent
import datetime

app = FastAPI()
db = firestore.Client()
tutorId = "tutor-bot"

@app.post("/run")
async def run_agent(payload: dict):
    session_id = payload["sessionId"]
    user_message = payload["message"]

    response = code_parallel_agent.run(user_message)
    timestamp = datetime.datetime.now()
    timestamp = timestamp.strftime("%a" + ", %d " + "%B" + " %Y " + "%X " + "%p " +"UTC %z")

    session_ref = db.collection("sessions").document(session_id)
    session_ref.update({
        "messages": firestore.ArrayUnion([{
            "text": response,
            "senderId": tutorId,
             "createdAt": timestamp
        }])
    })

    return {"status": "success"}
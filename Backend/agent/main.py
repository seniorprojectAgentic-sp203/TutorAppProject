from fastapi import FastAPI
from google.cloud import firestore
from google.adk.runners import LocalRunner
from agent import root_agent
import datetime

app = FastAPI()
db = firestore.Client()
tutorId = "tutor-bot"

runner = LocalRunner(root_agent)

@app.post("/run")
async def run_agent(payload: dict):
    session_id = payload["sessionId"]
    user_message = payload["message"]

    result = runner.run(input=user_message)

    if isinstance(result, dict):
       response = (
           result.get("research_output")
           or result.get("file_output")
           or str(result)
       )
    else:
        response = str(result)

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

    return {"status": "ok"}
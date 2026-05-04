import * as functions from 'firebase-functions';
import fetch from 'node-fetch';
 
export const messageChange = functions.firestore
        .document("sessions/{sessionId}")
        .onUpdate(async(change, context) => {
            const before = change.before.data();
            const after = change.after.data();

            if(!after.messages || after.messages.length <= before.messages.length){
                return null;
            }

            const lastMessage = after.messages.at(-1);

            if(lastMessage.role !== "user"){
                return null;
            }

            await fetch("https://tutorapp-287595569448.us-central1.run.app/run",{
                method: "POST",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify({
                    sessionId: context.params.sessionId,
                    message: lastMessage.text
                })
            });
            return null;
        });
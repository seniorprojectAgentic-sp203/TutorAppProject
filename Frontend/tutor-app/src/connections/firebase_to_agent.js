import * as functions from 'firebase-functions';
import fetch from 'node-fetch';
 
export const messageChange = functions.firestore
        .document("sessions/{sessionId}")
        .onUpdate(async(change, context) => {
            const start = change.start.data();
            const end = change.end.data();

            if(!end.messages || end.messages.length <= start.messages.length){
                return null;
            }

            const lastMessage = end.messages.at(-1);

            if(lastMessage.senderId !== user.currentUser.id ){
                return null;
            }

            await fetch("https:// /run",{
                method: "POST",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify({
                    sessionId: context.params.sessionId,
                    message: lastMessage.text
                })
            });
            return null;
        });
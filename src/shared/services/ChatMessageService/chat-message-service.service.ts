import { Injectable } from '@angular/core';
import { Database, onValue, push, ref, set } from '@angular/fire/database';
import { Observable } from 'rxjs';
import { ChatMessage } from 'src/core/models/chat-message';

@Injectable({
  providedIn: 'root',
})
export class ChatMessageServiceService {
  private messagesRef = ref(this.database, 'messages');

  constructor(private database: Database) {}

  sendTestMessage(): void {
    let newDate: string;
    newDate = new Date().toDateString();
    const newMessageRef = push(this.messagesRef);
    set(newMessageRef, {
      user: 'Welcome',
      timestamp: newDate ,
      content: 'Chat works! Start chatting',
    })
      .then(() => console.log('Message sent to Firebase Database'))
      .catch((error) => console.error('Error sending the message:', error));
  }

  addMessage(msg: ChatMessage): void {
    const newMessageRef = push(this.messagesRef);
    set(newMessageRef, msg);
  }

  getMessages(): Observable<ChatMessage[]> {
    const messageRef = ref(this.database, 'messages');

    return new Observable<ChatMessage[]>((subscriber) => {
      onValue(messageRef, (snapshot) =>{
        const data: ChatMessage = snapshot.val();
        const messages = this.convertFirebaseObjectToArray(data);
        subscriber.next(messages);
      }, (error) => {
        subscriber.error(error);
      });
    });

  }

  convertFirebaseObjectToArray(data: ChatMessage): ChatMessage[]{
    if(!data) return [];
    return Object.values(data).map((item: ChatMessage) => ({
      user: item.user || 'Unknown',
      content: item.content || '',
      timestamp: item.timestamp || '',
    }));
  }


}

import { Component, OnInit, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { IonButton } from '@ionic/angular/standalone';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { User } from 'firebase/auth';
import { ChatMessage } from 'src/core/models/chat-message';
import { AuthService } from 'src/shared/services/AuthService/auth.service';
import { ChatMessageServiceService } from 'src/shared/services/ChatMessageService/chat-message-service.service';

@UntilDestroy()
@Component({
  selector: 'chat-message-input',
  templateUrl: './message-input.component.html',
  styleUrls: ['./message-input.component.scss'],
  imports: [IonButton, FormsModule],
})
export class MessageInputComponent implements OnInit {
  private readonly auth = inject(AuthService);
  private readonly chatService = inject(ChatMessageServiceService);
  user!: User;
  messageInput: string = '';

  constructor() {}

  ngOnInit() {
    this.auth.userData$.pipe(untilDestroyed(this)).subscribe((user) => {
      if (user) {
        this.user = user;
      }
      console.log('Authenticated user:', user);
    });
  }

  convertToChatMessage(user: User | null, content: string): ChatMessage {
    const username: string = user?.displayName ?? 'Unknown user';
    const newDate = new Date().toDateString();
    return {
      user: username,
      content: this.messageInput,
      timestamp: newDate,
    };
  }

  sendMessage(): void {
    const message = this.messageInput.trim();
    if (!message) {
      return;
    }
    const newChatMessage = this.convertToChatMessage(
      this.user,
      this.messageInput,
    );
    this.chatService.addMessage(newChatMessage);
    this.messageInput = '';
  }
}

import { Component, OnInit, inject } from '@angular/core';
import { Router } from '@angular/router';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { User } from 'firebase/auth';
import { Geolocation } from '@capacitor/geolocation';
import { ChatMessage } from 'src/core/models/chat-message';
import { Position } from 'src/core/models/position';
import { AuthService } from 'src/shared/services/AuthService/auth.service';
import { ChatMessageServiceService } from 'src/shared/services/ChatMessageService/chat-message-service.service';
import { InfiniteScrollCustomEvent } from 'src/core/models/infinite-scroll-custom-event';
import { IonInfiniteScroll, IonList, IonInfiniteScrollContent, IonItem } from '@ionic/angular/standalone';

@UntilDestroy()
@Component({
  selector: 'chat-message-list',
  templateUrl: './message-list.component.html',
  styleUrls: ['./message-list.component.scss'],
  imports: [IonInfiniteScroll, IonList, IonInfiniteScrollContent, IonItem],
})
export class MessageListComponent  implements OnInit {
    private readonly auth = inject(AuthService);
    private readonly chatService = inject(ChatMessageServiceService);
    private readonly router = inject(Router);
    private pageSize: number = 10;
    private currentPage: number = 1;
    messages: ChatMessage[] = [];
    displayedMessages: ChatMessage[] = [];
    position: Position = { latitude: 0, longitude: 0 };
    user!: User;

  constructor() { }

  ngOnInit() {
        this.auth.userData$.pipe(untilDestroyed(this)).subscribe((user) => {
          if (user) {
            this.user = user;
          }
          console.log('Authenticated user:', user);
        });
        this.getChatMessages();
        this.getCurrentPosition();
  }

  getChatMessages(): void {
    this.chatService.getMessages().pipe(untilDestroyed(this)).subscribe({
      next: (messages: ChatMessage[]) => {
        this.messages = messages.reverse() || [];
        this.displayedMessages = this.messages.slice(
          0,
          this.currentPage * this.pageSize,
        );
      },
      error: (error) => {
        console.error('Got an error when obtaining the messages: ', error);
      },
    });
  }

    loadMoreMessages(event: InfiniteScrollCustomEvent) {
      setTimeout(() => {
        this.currentPage++;
        this.displayedMessages = this.messages.slice(
          0,
          this.currentPage * this.pageSize,
        );
        event.target.complete();
        if (this.displayedMessages.length >= this.messages.length) {
          event.target.disabled = true;
        }
      }, 500);
    }

  getCurrentPosition = async () => {
    const coordinates = await Geolocation.getCurrentPosition();
    this.position = {
      latitude: parseFloat(coordinates.coords.latitude.toFixed(4)),
      longitude: parseFloat(coordinates.coords.longitude.toFixed(4)),
    };

    console.log('Current position:', this.position);
  };
}

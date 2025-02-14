import { CommonModule } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { User } from '@angular/fire/auth';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import {
  IonContent
} from '@ionic/angular/standalone';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { ChatMessage } from 'src/core/models/chat-message';
import { AuthService } from 'src/shared/services/AuthService/auth.service';
import { ChatMessageServiceService } from 'src/shared/services/ChatMessageService/chat-message-service.service';
import { HeaderComponent } from './header/header.component';
import { MessageInputComponent } from './message-input/message-input.component';
import { MessageListComponent } from "./message-list/message-list.component";



@UntilDestroy()
@Component({
  selector: 'app-chat',
  standalone: true,
  imports: [
    IonContent,
    ReactiveFormsModule,
    CommonModule,
    FormsModule,
    HeaderComponent,
    MessageListComponent,
    MessageInputComponent,
],
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss'],
})
export class ChatComponent {
}

import { Route } from '@angular/router';
import { ChatSmartComponent } from './components/smart/chat/chat.smart-component';

export const CHAT_ROUTES: Route[] = [
  {
    path: '',
    component: ChatSmartComponent,
  },
];

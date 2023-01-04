import { Route } from '@angular/router';
import { ShellSmartComponent } from './components/smart/shell/shell.smart-component';

export const CLIENT_FEAT_SHELL_ROUTES: Route[] = [
  {
    path: '',
    component: ShellSmartComponent,
    children: [
      {
        path: '',
        redirectTo: 'chat',
        pathMatch: 'full',
      },
      {
        path: 'chat',
        loadChildren: () =>
          import('@angular-image-generation/chat/feat-chat').then(
            (m) => m.CHAT_ROUTES,
          ),
      },
      {
        path: 'image',
        loadChildren: () =>
          import('@angular-image-generation/image/feat-image').then(
            (m) => m.IMAGE_ROUTES,
          ),
      },
      {
        path: 'moderation',
        loadChildren: () =>
          import('@angular-image-generation/moderation/feat-moderation').then(
            (m) => m.MODERATION_ROUTES,
          ),
      },
    ],
  },
];

import { trigger, transition, style, query, animate } from '@angular/animations';

export const slideInAnimation =
  trigger('routeAnimations', [
    transition('* => ShopPage', [
      query(':enter', style({ marginLeft: '-200%' })),
      query(':leave', animate('300ms ease-out', style({ marginLeft: '100%' })), { optional: true })
    ]),
    transition('CreationListPage => ScenarioListPage', [
      query(':enter', style({ marginLeft: '-200%' })),
      query(':leave', animate('300ms ease-out', style({ marginLeft: '100%' })))
    ]),
    transition('* => CreationListPage', [
      query(':leave', animate('300ms ease-out', style({ marginLeft: '-100%' })), { optional: true })
    ]),
    transition('ShopPage => ScenarioListPage', [
      query(':leave', animate('300ms ease-out', style({ marginLeft: '-100%' })))
    ])
  ]);

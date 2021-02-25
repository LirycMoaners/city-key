import { Component } from '@angular/core';
import { ActivatedRoute, Router, RouterOutlet, Routes } from '@angular/router';
import { slideInAnimation } from './home-animation';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  animations: [slideInAnimation]
})
export class HomeComponent {
  public routes: Routes;
  private posX = 0;
  private width = 0;

  constructor(
    private readonly router: Router,
    private readonly activatedRoute: ActivatedRoute
  ) {
    if (!!this.activatedRoute.routeConfig && !!this.activatedRoute.routeConfig.children) {
      this.routes = [ ...this.activatedRoute.routeConfig.children ];
      this.routes.splice(0, 1);
    } else {
      this.routes = [];
    }
  }

  /**
   * Return state for router animation
   * @param outlet The home router outlet
   */
  public prepareRoute(outlet: RouterOutlet): boolean {
    return outlet && outlet.activatedRouteData && outlet.activatedRouteData.animation;
  }

  /**
   * Navigate to the url in parameter
   * @param url Url to navigate to
   */
  public navigateTo(url: string): void {
    this.router.navigate(['home/' + url]);
  }

  /**
   * Start swiping the current component in the container in parameter
   * @param event The start touch event
   * @param element The container element
   */
  public startPageSwipe(event: TouchEvent, element: HTMLDivElement): void {
    this.posX = event.touches[0].pageX;
    this.width = element.clientWidth;
  }

  /**
   * Move the component inside the container in paramater
   * @param event The current touch event
   * @param element The container element
   */
  public swipePage(event: TouchEvent, element: HTMLDivElement): void {
    const diff = (event.touches[0].pageX - this.posX) * 100 / this.width ;
    (element.children.item(1) as HTMLDivElement).style.marginLeft = diff + '%';
  }

  /**
   * End swiping the current component in the container in parameter
   * @param event The end touch event
   * @param element The container element
   */
  public endPageSwipe(event: TouchEvent, element: HTMLDivElement): void {
    const diff = (event.changedTouches[0].pageX - this.posX) * 100 / this.width ;
    this.posX = 0;

    if (Math.abs(diff) > 40) {
      const currentRouteIndex = this.routes.findIndex(route => {
        const urlFragment: string[] = this.router.url.split('/');
        return route.path === urlFragment[urlFragment.length - 1];
      });
      let newRouteIndex: number;

      if (diff > 0) {
        newRouteIndex = currentRouteIndex - 1 >= 0 ? currentRouteIndex - 1 : this.routes.length - 1;
      } else {
        newRouteIndex = currentRouteIndex + 1 < this.routes.length ? currentRouteIndex + 1 : 0;
      }

      const path = this.routes[newRouteIndex].path;
      if (path !== undefined) {
        this.navigateTo(path);
      }
    } else {
      (element.children.item(1) as HTMLDivElement).style.marginLeft = '0';
    }
  }

}

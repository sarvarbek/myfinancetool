import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { AppRoutes } from './app.routes';
import { AutoRefinanceComponent } from './components/auto-refinance/auto-refinance.component';
import { MainNavigationComponent } from './components/main-navigation/main-navigation.component';
import { HomePageComponent } from './components/home-page/home-page.component';
import { PercentDifferenceDirective } from './directives/percent-difference.directive';
import { TakeHomePayComponent } from './components/take-home-pay/take-home-pay.component';

@NgModule({
  declarations: [
    AppComponent,
    AutoRefinanceComponent,
    MainNavigationComponent,
    HomePageComponent,
    PercentDifferenceDirective,
    TakeHomePayComponent
  ],
  imports: [
    BrowserModule,
   	FormsModule,
    RouterModule.forRoot(AppRoutes)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

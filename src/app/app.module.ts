import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
// import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { AppRoutes } from './app.routes';
import { AutoRefinanceComponent } from './components/auto-refinance/auto-refinance.component';
import { MainNavigationComponent } from './components/main-navigation/main-navigation.component';
import { HomePageComponent } from './components/home-page/home-page.component';
import { TrendChartComponent } from './components/charts/trend-chart/trend-chart.component';

@NgModule({
  declarations: [
    AppComponent,
    AutoRefinanceComponent,
    MainNavigationComponent,
    HomePageComponent,
    TrendChartComponent
  ],
  imports: [
    BrowserModule,
   	FormsModule,
    // HttpModule
    RouterModule.forRoot(AppRoutes)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

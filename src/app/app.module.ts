import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
// import { FormsModule } from '@angular/forms';
// import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { AutoRefinanceComponent } from './components/auto-refinance/auto-refinance.component';
import { AppRoutes } from './app.routes';

@NgModule({
  declarations: [
    AppComponent,
    AutoRefinanceComponent
  ],
  imports: [
    BrowserModule,
    // FormsModule,
    // HttpModule
    RouterModule.forRoot(AppRoutes)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

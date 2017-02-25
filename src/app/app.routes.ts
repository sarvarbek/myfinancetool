import { AutoRefinanceComponent } from './components/auto-refinance/auto-refinance.component';
import { HomePageComponent } from './components/home-page/home-page.component';
import { TakeHomePayComponent } from './components/take-home-pay/take-home-pay.component';

export const AppRoutes = [
	{ path: '', component: HomePageComponent },
	{ path: 'auto-refinance', component: AutoRefinanceComponent },
	{ path: 'take-home-pay', component: TakeHomePayComponent }
]; 
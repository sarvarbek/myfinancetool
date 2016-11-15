import { AutoRefinanceComponent } from './components/auto-refinance/auto-refinance.component';
import { HomePageComponent } from './components/home-page/home-page.component';

export const AppRoutes = [
	{ path: '', component: HomePageComponent },
	{ path: 'auto-refinance', component: AutoRefinanceComponent }
]; 
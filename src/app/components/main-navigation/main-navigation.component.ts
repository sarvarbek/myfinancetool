import { Component } from '@angular/core';

@Component({
  selector: 'app-main-navigation',
  templateUrl: './main-navigation.component.html',
  styleUrls: ['./main-navigation.component.scss']
})
export class MainNavigationComponent {
	
	navigationLinks : Dictionary;

	constructor() {
		this.navigationLinks = {
			'/': 'Home',
		  	'/auto-refinance': 'Refinance Calculator'
		  	// '/tax-calculator': 'Tax Calculator',
		  	// '/savings-calculator': 'Savings Calculator'
		}
	  	
  	}

  	links() : Array<string> {
		return Object.keys(this.navigationLinks);
	}
}

interface Dictionary {
    [ index: string ]: string
}

import { Component } from '@angular/core';

@Component({
  selector: 'app-main-navigation',
  templateUrl: './main-navigation.component.html',
  styleUrls: ['./main-navigation.component.scss']
})

export class MainNavigationComponent {
	
	private navigationLinks : Dictionary;

	constructor() {
		this.navigationLinks = {
			'/': 'Home',
		  	'/auto-refinance': 'Auto Refinance Calculator',
		  	'/take-home-pay': 'Take Home Pay Calculator'
		  	// '/tax-calculator': 'Tax Calculator',
		  	// '/savings-calculator': 'Savings Calculator'
		}
	  	
  	}

  	// Used by the template to get the links
  	private links() : Array<string> {
		return Object.keys(this.navigationLinks);
	}
}

interface Dictionary {
    [ index: string ]: string
}

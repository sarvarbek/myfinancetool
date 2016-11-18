import { Component, OnInit } from '@angular/core';

export class autoLoan {
	id: number;
	label: string;
	balance: number;
	apr: number;
	term: number;

	constructor() {
		this.id = Number(Math.random().toString().substr(2, 9)),
        this.label = 'Untitled',
		this.balance = 25000,
		this.apr = 3,
		this.term = 60
    }
}

@Component({
	selector: 'app-auto-refinance',
	templateUrl: './auto-refinance.component.html',
	styleUrls: ['./auto-refinance.component.scss']
})

export class AutoRefinanceComponent {

	private currentAutoLoan: autoLoan = new autoLoan();
	private comparisonLoans: autoLoan[] = [];
	
	constructor() { }

	ngOnInit() {
	}

	private addComparisonLoan() {
		// Set the balance the same as current loan
		let newAutoLoan = new autoLoan();
		newAutoLoan.balance = this.currentAutoLoan.balance;

		this.comparisonLoans.push(newAutoLoan);
	};

	private removeComparisonLoan(id) {
		let removedLoanIndex = this.comparisonLoans.map(function (x) { return x.id; }).indexOf(id);

		if (removedLoanIndex > -1) {
			this.comparisonLoans.splice(removedLoanIndex, 1);
		}
	};

	private monthlyPayment( balance: number, apr: number, term: number ) : number {
		let interest = (apr > 0) ? Number(apr) / 12 / 100 : 0;

		return (apr > 0 && term > 0) ? balance * (interest * Math.pow(1 + interest, term)) / (Math.pow(1 + interest, term) - 1) : (apr > 0) ? balance + balance * (interest / 100) : (term > 0) ? balance / term : balance;
	};

	private totalInterest( balance: number, apr: number, term: number ) : number {
		let monthlyRate = this.monthlyPayment(balance, apr, term);

		return (term > 0) ? monthlyRate * term - balance : (apr > 0) ? balance * (apr / 100) : 0;
	};

	private totalCost( balance: number, apr: number, term: number ) : number {
		let	interest = this.totalInterest(balance, apr, term);

		return balance + interest;
	};
}


import { Component } from '@angular/core';

export class autoLoan {
	balance: number;
	apr: number;
	term: number;
}

@Component({
  selector: 'app-auto-refinance',
  templateUrl: './auto-refinance.component.html',
  styleUrls: ['./auto-refinance.component.scss']
})

export class AutoRefinanceComponent {

	currentAutoLoan: autoLoan = {
		balance: 25000,
		apr: 3,
		term: 60
	};

	//let comparisonLoans: autoLoan[] = [];

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


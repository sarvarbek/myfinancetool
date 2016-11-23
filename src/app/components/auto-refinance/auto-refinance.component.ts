import { Component, OnInit, AfterViewInit } from '@angular/core';
import { TrendChartConfig } from '../charts/trend-chart/trend-chart-config';

export class autoLoan {
	public id: number;
	public label: string;
	public balance: number;
	public apr: number;
	public term: number;

	constructor () {
		this.id = Number(Math.random().toString().substr(2, 9)),
        this.label = 'Untitled Loan',
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

export class AutoRefinanceComponent implements OnInit, AfterViewInit {

	private trendChartConfig: Array<TrendChartConfig>;
	private currentAutoLoan: autoLoan;
	private comparisonLoans: autoLoan[] = [];
	
	constructor() {}

	ngOnInit() {
		// initialize the current loan
		this.currentAutoLoan = new autoLoan();
	}

	ngAfterViewInit() {
		//this.getStats();
	}

	private generateAmortizationSchedule() {
		let balance = this.currentAutoLoan.balance;
		let apr = this.currentAutoLoan.apr;
		let term = this.currentAutoLoan.term;
		let monthlyPayment = this.calcMonthlyPayment(this.currentAutoLoan);
		let amortizationTable = [];

		// Set starting date as December 1, 2015
		let date = new Date('2015-12-1');

		for (let i = 0; i < term; i++) {
			let monthlyRate = Number(apr) / 12 / 100;

			let interestForMonth = balance * monthlyRate;
			let principalForMonth = monthlyPayment - interestForMonth;

			// Add 1 month to date
			date.setMonth(date.getMonth() + 1);

			let chartDate = date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate();

			amortizationTable.push({
				"date": chartDate,
				"principal": balance,
				"interest": interestForMonth
			});

			balance -= principalForMonth;
		}

		return amortizationTable;
	};

	private getStats() {
		let stats = this.generateAmortizationSchedule();

		let loanPrincipalArea: TrendChartConfig = {
          settings: {
            fill: '#02a59d',
            interpolation: 'monotone'
          }, dataset: stats.map(data => {
            return { x: new Date(data.date), y: data.principal };
          })
        };

        let loanInterestArea: TrendChartConfig = {
          settings: {
            fill: 'rgba(195, 0, 47, 1)',
            interpolation: 'monotone'
          }, dataset: stats.map(data => {
            return { x: new Date(data.date), y: data.interest };
          })
        };

        // to finish we append our AreaChartConfigs into an array of configs 
        this.trendChartConfig = new Array<TrendChartConfig>();
        this.trendChartConfig.push(loanPrincipalArea);
        this.trendChartConfig.push(loanInterestArea);
	}

	private addComparisonLoan() {
		// Set the balance the same as current loan
		let newAutoLoan = new autoLoan();
		newAutoLoan.balance = this.currentAutoLoan.balance;

		this.comparisonLoans.push(newAutoLoan);
	};

	private removeComparisonLoan( id ) {
		let removedLoanIndex = this.comparisonLoans.map(function (x) { return x.id; }).indexOf(id);

		if (removedLoanIndex > -1) {
			this.comparisonLoans.splice(removedLoanIndex, 1);
		}
	};

	private calcMonthlyPayment( loan ) : number {
		let balance = loan.balance;
		let apr = loan.apr;
		let term = loan.term;
		let monthlyInterest = (apr > 0) ? Number(apr) / 12 / 100 : 0;

		return (apr > 0 && term > 0) ? balance * (monthlyInterest * Math.pow(1 + monthlyInterest, term)) / (Math.pow(1 + monthlyInterest, term) - 1) : (apr > 0) ? balance + balance * (monthlyInterest / 100) : (term > 0) ? balance / term : balance;
	};

	private calcTotalInterest( loan ) : number {
		let balance = loan.balance;
		let apr = loan.apr;
		let term = loan.term;
		let monthlyRate = this.calcMonthlyPayment(loan);

		return (term > 0) ? monthlyRate * term - balance : (apr > 0) ? balance * (apr / 100) : 0;
	};

	private calcTotalCost( loan ) : number {
		let balance = loan.balance;
		let	interest = this.calcTotalInterest(loan);

		return balance + interest;
	};
}


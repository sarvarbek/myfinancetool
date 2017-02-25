import { Component, OnInit } from '@angular/core';

export class wage {
	public id: number;
	public label: string;
	public salary: number;
	public contributions: number;
	public otherDeductions: number;
	public afterTaxDeductions: number;
	public state: string;
	public filingType: string;

	constructor () {
		this.id = Number(Math.random().toString().substr(2, 9)),
        this.label = 'Untitled Wage',
		this.salary = 55000,
		this.contributions = 3,
		this.otherDeductions = 0,
		this.afterTaxDeductions = 0,
		this.state = 'VA',
		this.filingType = 'single'
    }
}

@Component({
  selector: 'app-take-home-pay',
  templateUrl: './take-home-pay.component.html',
  styleUrls: ['./take-home-pay.component.scss']
})

export class TakeHomePayComponent implements OnInit {

	private currentWage: wage;
	private comparisonWages: wage[] = [];

	ngOnInit() {
		// initialize the current wage
		this.currentWage = new wage();
	}

	private federalTaxBracket2017 = [
		{
			'label': 'Single',
			'key': 'single',
			'bracket': [
				{
					rate: 10,
					from: 0,
					to: 9325
				},
				{
					rate: 15,
					from: 9326,
					to: 37950
				},
				{
					rate: 25,
					from: 37951,
					to: 91900
				},
				{
					rate: 28,
					from: 91901,
					to: 191650
				},
				{
					rate: 33,
					from: 191651,
					to: 416700
				},
				{
					rate: 35,
					from: 416701,
					to: 418400
				},
				{
					rate: 39.6,
					from: 418401,
					to: 0
				}
			],
			'deduction': 6350
		},
		{
			'label': 'Married',
			'key': 'married', 
			'bracket': [
				{
					rate: 10,
					from: 0,
					to: 18650
				},
				{
					rate: 15,
					from: 18651,
					to: 75900
				},
				{
					rate: 25,
					from: 75901,
					to: 153100
				},
				{
					rate: 28,
					from: 153101,
					to: 233350
				},
				{
					rate: 33,
					from: 233351,
					to: 416700
				},
				{
					rate: 35,
					from: 416701,
					to: 470700
				},
				{
					rate: 39.6,
					from: 470701,
					to: 0
				}
			],
			'deduction': 12700
		},
		{
			'label': 'Married Filing Separate',
			'key': 'married_separate', 
			'bracket': [
				{
					rate: 10,
					from: 0,
					to: 9325
				},
				{
					rate: 15,
					from: 9326,
					to: 37950
				},
				{
					rate: 25,
					from: 37951,
					to: 76550
				},
				{
					rate: 28,
					from: 76551,
					to: 116675
				},
				{
					rate: 33,
					from: 116676,
					to: 208350
				},
				{
					rate: 35,
					from: 208351,
					to: 235350
				},
				{
					rate: 39.6,
					from: 235351,
					to: 0
				}
			],
			'deduction': 6350
		},
		{
			'label': 'Head of Household',
			'key': 'head_household', 
			'bracket': [
				{
					rate: 10,
					from: 0,
					to: 13350
				},
				{
					rate: 15,
					from: 13351,
					to: 50800
				},
				{
					rate: 25,
					from: 50801,
					to: 131200
				},
				{
					rate: 28,
					from: 131201,
					to: 212500
				},
				{
					rate: 33,
					from: 212501,
					to: 416700
				},
				{
					rate: 35,
					from: 416701,
					to: 444550
				},
				{
					rate: 39.6,
					from: 444551,
					to: 0
				}
			],
			'deduction': 9350
		}
	]

	private getTaxableIncome(wage) {
		let taxableIncome = this.getTakeHomeIncome(wage);

		// - standard deduction
		taxableIncome -= this.getStandardDeduction(wage.filingType);

		return taxableIncome;
	}

	private getTakeHomeIncome(wage) {
		// salary - deductions - contributions
		const getTakeHomeIncome = wage.salary - (wage.otherDeductions * 12) - (wage.salary * (wage.contributions / 100));

		return getTakeHomeIncome;
	}

	private getFederalTaxAmount(wage) {
		const brackets = this.getTaxBracketByFilingType(wage.filingType);
		const salary = this.getTaxableIncome(wage);
		let taxAmount = 0;

		for (let x = 0; x < brackets.length; x ++) {

			const bracket = brackets[x];

			if (salary > bracket.from) {

				const bracketAmount = (salary > bracket.to && bracket.to !== 0) ? bracket.to : salary - bracket.from;

				taxAmount += bracketAmount * (bracket.rate / 100);
			} else {
				break;
			}
		}

		return taxAmount;
	}

	private getStandardDeduction(filingType) {
		return this.getBracketsByKey(filingType)['deduction'];
	}

	private getMonthlyPay(wage) {
		const takeHomePay = this.getTakeHomeIncome(wage);

		return ((takeHomePay - this.getFederalTaxAmount(wage)) / 12) - wage.afterTaxDeductions;
	}

	private getBiWeeklyPay(wage) {
		const takeHomePay = this.getTakeHomeIncome(wage);

		return ((takeHomePay - this.getFederalTaxAmount(wage)) / 26) - (wage.afterTaxDeductions / 2);
	}

	private getSavingsRate(wage) {
		return wage.salary * (wage.contributions / 100);
	}

	private getTaxBracketByFilingType(filingType) {
		return this.getBracketsByKey(filingType)['bracket'];
	}

  	private getBracketsByKey(key) {
		return this.federalTaxBracket2017.filter(function(x) { 
			if (x.key === key) return true
		})[0];
	}

	private getBracketKeys() : Array<string> {
		return this.federalTaxBracket2017.map(function (x) { return x.key });
	}

	private addComparisonWage() {
		let newWage = new wage();

		newWage.salary = this.currentWage.salary;
		newWage.contributions = this.currentWage.contributions;
		newWage.otherDeductions = this.currentWage.otherDeductions;
		newWage.afterTaxDeductions = this.currentWage.afterTaxDeductions;
		newWage.state = this.currentWage.state;
		newWage.filingType = this.currentWage.filingType;

		this.comparisonWages.push(newWage);
	};

	private removeComparisonWage( id ) {
		const removedWageIndex = this.comparisonWages.map(function (x) { return x.id }).indexOf(id);

		if (removedWageIndex > -1) {
			this.comparisonWages.splice(removedWageIndex, 1);
		}
	};


}

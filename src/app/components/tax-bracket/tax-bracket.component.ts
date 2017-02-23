import { Component, OnInit } from '@angular/core';

export class taxRate {
	public rate: number;
	public from: number;
	public to: number;

	constructor (rate: number, from: number, to: number) {
		this.rate = rate,
		this.from = from,
		this.to = to
    }
}

@Component({
  selector: 'app-tax-bracket',
  templateUrl: './tax-bracket.component.html',
  styleUrls: ['./tax-bracket.component.scss']
})
export class TaxBracketComponent implements OnInit {


// single
// married
// married_separate
// household_head

// 10
// 15
// 25
// 28
// 33
// 35
// 39.6

	private federalTaxBracket = [
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
			]
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
			]
		}
	]


	//private new taxRate(10, 0, 9275);

	constructor() { }

	ngOnInit() {
	}

	private getBracketsByKey(key) {
		return this.federalTaxBracket.filter(function(x) { 
			if (x.key === key) 
				return true
		});
	}

	private getBracketKeys() : Array<string> {
		return this.federalTaxBracket.map(function (x) { return x.key });
	}

	private getBracketLength() : Array<number> {
		// to be used in template
		// must be an array
		let bracketLength = [];

		for (let x = 0; x < this.getBracketsByKey('single').length; x ++) {
			bracketLength.push(x);
		}

		return bracketLength;
	}

}

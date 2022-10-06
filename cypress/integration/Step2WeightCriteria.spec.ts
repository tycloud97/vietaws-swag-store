/// <reference types="cypress" />
/* eslint-disable no-undef*/

context('Step 2 Weight Criteria', () => {
	beforeEach(() => {
		cy.setInitialState();
		cy.visit('/');
		cy.getTestElement(`Step2Button`).click();
	});

	//TODO Test API call on slider change after cypress issue is solved
	// Code is in commit 0955a32C
	// https://github.com/cypress-io/cypress/issues/1570

	it('shows and hides info', () => {
		cy
			.getTestElement(`WeightCriteriaInfoButton`)
			.click()

			.getTestElement('infoText')
			.contains('Weight Criteria')

			.getTestElement('infoCloseButton')
			.click()

			.getTestElement('infoText')
			.should('have.length', 0);
	});

	it('shows title', () => {
		cy.contains('Weight Criteria');
	});

	it('moves slider', () => {
		let criteriaLeft = '';
		let criteriaRight = '';

		cy
			.get(`[data-testid="textSlider0CriteriaLeft"]`)
			.invoke('text')
			.then(text => {
				criteriaLeft = text;
			})

			.get(`[data-testid="textSlider0CriteriaRight"]`)
			.invoke('text')
			.then(text => {
				criteriaRight = text;
			})

			.getTestElement(`slider0`)
			.trigger('mousedown', 'left')
			.getTestElement(`infoTextSlider0`)
			.trigger('mouseup', {force: true})
			.contains(`${criteriaLeft} is way more important than ${criteriaRight}`)

			.getTestElement(`slider0`)
			.trigger('mousedown', 75, 10)
			.getTestElement(`infoTextSlider0`)
			.trigger('mouseup', {force: true})
			.contains(`${criteriaLeft} is more important than ${criteriaRight}`)

			.getTestElement(`slider0`)
			.trigger('mousedown', 150, 10)
			.getTestElement(`infoTextSlider0`)
			.trigger('mouseup', {force: true})
			.contains(`${criteriaLeft} is a little more important than ${criteriaRight}`)

			.getTestElement(`slider0`)
			.trigger('mousedown', 'center')
			.getTestElement(`infoTextSlider0`)
			.trigger('mouseup', {force: true})
			.contains(`${criteriaLeft} is as important as ${criteriaRight}`)

			.getTestElement(`slider0`)
			.trigger('mousedown', 200, 10)
			.getTestElement(`infoTextSlider0`)
			.trigger('mouseup', {force: true})
			.contains(`${criteriaRight} is a little more important than ${criteriaLeft}`)

			.getTestElement(`slider0`)
			.trigger('mousedown', 260, 10)
			.getTestElement(`infoTextSlider0`)
			.trigger('mouseup', {force: true})
			.contains(`${criteriaRight} is more important than ${criteriaLeft}`)

			.getTestElement(`slider0`)
			.trigger('mousedown', 'right')
			.getTestElement(`infoTextSlider0`)
			.trigger('mouseup', {force: true})
			.contains(`${criteriaRight} is way more important than ${criteriaLeft}`);
	});

	it('shows sliders', () => {
		cy.getTestElementStartingWith(`slider`).should('have.length', 6);
	});
});

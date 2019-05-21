import HomePage from '../pages/HomePage';
import TemplatesPage from '../pages/TemplatesPage';

Cypress.on("uncaught:exception", function(){

    return false;

});

describe('Templates Page Tests', function() {

    let templates;

    beforeEach(function () {

	cy.server();
	cy.route("GET","https://www.wix.com/website/templates/api/search**").as("getTemplatesCall");

	cy.fixture("template").as("template");

	const homePage = new HomePage();

	homePage.visit();
	homePage.header
	.getNavItem('Templates')
	.should('have.prop', 'href', 'https://www.wix.com/website/templates')
	.and('have.prop','target','_blank')

	templates = new TemplatesPage();
	templates.visit();

    })

    it('Search exact template', function() {

	templates
	.getSearchField()
	.should('exist')
	.type(this.template.exact.searchString)
	.should('have.value',this.template.exact.searchString);

	cy.wait("@getTemplatesCall");

	templates
	.getSearchResults()
	.should('exist')
	.each(function($el, index, $list) {
	    const regex = new RegExp(this.template.exact.searchString, "i");
	    cy.wrap($el).contains(regex);

	})

// templates
// .getSearchResults()
// .contains('li', "Country Singer").find('[data-hook="view"]').click();
    })

    it('Search non-exact template', function() {

	templates
	.getSearchField()
	.should('exist')
	.type(this.template.nonExact.searchString)
	.should('have.value',this.template.nonExact.searchString);

	cy.wait("@getTemplatesCall");

	templates
	.getSearchResults()
	.should('exist')
	.each(function($el, index, $list) {
	    const regex = new RegExp(this.template.nonExact.searchString, "i");
	    cy.wrap($el).contains(regex);

	})
    })

    it('Empty search results', function() {

	templates
	.getSearchField()
	.should('exist')
	.type(this.template.empty.searchString)
	.should('have.value',this.template.empty.searchString);

	cy.wait("@getTemplatesCall");

	templates
	.getSearchResultsTitle().should("contain.text", "No results for '"+this.template.empty.searchString+"'");

    })

})
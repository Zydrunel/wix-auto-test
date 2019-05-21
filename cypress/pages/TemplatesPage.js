import Header from '../components/Header';

class TemplatesPage {

    constructor(){
	this.header = new Header();
    }

    visit(){
	cy.visit('website/templates/');
    }

    getSideBar() {
	return cy.get('[data-hook="sideBar"]');
    }

    getSearchField() {
	return this.getSideBar()
	.find('[data-hook="searchInput"]');
    }
    
    getMainContent() {
	return cy.get('main');
    }
    
    getSearchResultsContainer() {
	return this.getMainContent()
	.find('[data-hook="templates"]');
    }
    
    getSearchResults() {
	return this.getSearchResultsContainer().find('[data-hook="template"]');
    }
    
    getSearchResultsTitle() {
	return this.getMainContent().find('[data-hook="title"]');
    }
    
}

export default TemplatesPage;
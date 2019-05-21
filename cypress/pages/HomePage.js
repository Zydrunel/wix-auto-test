import Header from '../components/Header';

class HomePage {
    
    constructor(){
	
	this.header = new Header();
    }

    visit(){
	
	cy.visit('/');
    }
}

export default HomePage;

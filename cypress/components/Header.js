class Header {
    getPageHeader() {
	return cy.get('header');
    }

    getNavItem(item) {
	return this.getPageHeader().contains(item);
    }

}

export default Header;

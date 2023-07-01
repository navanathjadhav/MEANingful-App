describe('Login E2E Test', () => {
  beforeEach(() => {
    // Perform any setup or visit the target page before each test
    cy.visit('http://localhost:4200/auth/login');
  });

  it('should display the correct page title', () => {
    // Assert that the page title is correct
    cy.title().should('eq', 'meaningful-client');
  });

  it('should display a specific element on the page', () => {
    // Assert that a specific element is visible on the page
    cy.get('p').should('be.visible');
  });

  it('should interact with a login form & redirect to dashboard', () => {
    // Type text into an input field
    cy.get('input[formcontrolname="email"]').type('navanathjadhav@test.com');
    cy.get('input[formcontrolname="password"]').type('Demo');

    // Click a button to submit the form
    cy.get('button[type="submit"]').click();

    // Assert that a What's Added h2 is displayed
    cy.get('h2').should('be.visible');
  });

  // Add more tests as needed...
});

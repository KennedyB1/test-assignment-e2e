describe('Check if elements exist on start page', () => {
  it('should contain input field', () => {
    cy.visit('http://localhost:1234');
    cy.get('input#searchText').should('exist');
  });
  it('should contain button with the text "Sök"', () => {
    cy.visit('http://localhost:1234');
    cy.get('#search').contains('Sök').should('exist');
  })
});

describe('Check if movie exist and if poster is correct', () => {

  it('should be able to type in inputfield and click serch button', () => {
    cy.visit('http://localhost:1234');
    cy.get('input#searchText').type('They Call Us Misfits').should('have.value', 'They Call Us Misfits');
    cy.get('#search').click();
  })
  it('should check if movie was found', () => {
    cy.visit('http://localhost:1234');
    cy.get('input#searchText').type('They Call Us Misfits').should('have.value', 'They Call Us Misfits');
    cy.get('#search').click();
    cy.get('#movie-container').should('contain', 'They Call Us Misfits');
  })
  it('should check if img is correct', () => {
    cy.visit('http://localhost:1234');
    cy.get('input#searchText').type('They Call Us Misfits').should('have.value', 'They Call Us Misfits');
    cy.get('#search').click();
    cy.get('#movie-container').should('contain', 'They Call Us Misfits');
    cy.get('img[src="https://m.media-amazon.com/images/M/MV5BZGI2YjQwNmQtMjBlYS00MDgyLWEzOWItNDY0NWYwMzliZjEwXkEyXkFqcGdeQXVyMjUyNDk2ODc@._V1_SX300.jpg"]').should('exist');
  })

});

describe('should get error message', () => {

  it('should print an error message when serching for invalid movie', () => {
    cy.visit('http://localhost:1234');
    cy.get('input#searchText').type('123321').should('have.value', '123321');
    cy.get('#search').click();
    cy.get('p').contains('Inga sökresultat att visa').should('exist');
  })
});

describe('check Mock-movie', () => {

  it('should serch for a "custom" mock-movie from moviedata.json', () => {
    cy.visit('http://localhost:1234');
    cy.intercept('GET', 'http://omdbapi.com/?apikey=416ed51a&s=*', { fixture: "moviedata" });
    cy.get('input#searchText').type('They Call Us Misfits');
    cy.get('#search').click();
    cy.get('h3').contains('They Call Us Misfits Mock').should('exist');
    cy.get('img[src="https://m.media-amazon.com/images/M/MV5BZDM0OWU4OWUtYzFhZi00ZDA1LWEzYTMtMTgxYjUwMzVmN2VjXkEyXkFqcGdeQXVyNzQxNDExNTU@._V1_SX300.jpg"]').should('exist');
  })
});

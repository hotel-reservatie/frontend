describe('Login user', () => {
  const wrongUser = {
    email: 'johndoe@gmail.com',
    password: 'johndoe123',
  }

  const correctUser = {
    email: 'docent@howest.be',
    password: 'P@ssw0rd',
  }

  const login = (email, password) => {}

  it('should navigate to the login page', () => {
    cy.visit('http://localhost:3001/')
    cy.get('a[href*="login"]').click()
    cy.url().should('include', '/login')
  })

  it('should login with wrong credentials', () => {
    cy.get('input[type=email').type(wrongUser.email)
    cy.get('input[type=password]').type(wrongUser.password)

    cy.get('button').contains('Log in').click()
  })

  it('should show a message that the email is not in use', () => {
    cy.get('div').contains('This email address is not in use!')
  })

  it('should clear the previous inputs', () => {
    cy.get('input[type=email').clear()
    cy.get('input[type=password]').clear()
  })

  it('should now login with correct credentials', () => {
    cy.get('input[type=email').type(correctUser.email)
    cy.get('input[type=password]').type(correctUser.password)

    cy.get('button').contains('Log in').click()

    cy.location('pathname').should('eq', '/')
  })
})

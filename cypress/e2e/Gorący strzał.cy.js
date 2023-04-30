describe("template spec", () => {
    it("passes", () => {
      cy.viewport(1280, 720);
      cy.visit("https://www.x-kom.pl");
      //Zweryfikuj widoczność modala do akceptacji zgód na profilowanie
      cy.get(".modal.modal--after-open")
        .should("be.visible")
        .and("contain", "Dostosowujemy się do Ciebie");
  
      //Zaakceptuj modal, klikając w przycisk "w porządku"
      cy.get(".sc-1p1bjrl-9").click();
      //Zweryfikuj widoczność widgetu Gorącego Strzału
      cy.get('#hotShot').should('be.visible');
      
       //jesli wyprzedane
  cy.get('.sc-1bb6kqq-11.eawDqC')
  .invoke('text')
  .then((text) => {
    console.log(`text`, text);
    if (text === 'Wyprzedano') {
      cy.get('#hotShot').click();
      cy.get('.sc-1h16fat-0.sc-153gokr-0.dMrHJf.sc-ikk4le-9.cMOIyV').click();
      return;
    }else{
//  Zweryfikuj na widgecie GS'a, cenę oraz @czas
cy.get('.sc-1bb6kqq-4.beOjbI')
.should(($el) => {
  const text = $el.text()
  expect(text).not.to.be.empty
})

cy.get('.sc-ntliq5-1.dheNBB').should('exist');
//sprawdzanie minut
cy.get('.sc-ntliq5-4.ciZKFP')
.eq(1)
.invoke('text')
.then((text) => {
const numberValue = Number(text);
if (numberValue > 0) {
  cy.get('#hotShot').click();
  cy.get('[data-name="addToBasketButton"]').first().should('be.enabled');
} else {
  //sprawdzamy sekundy
  cy.get('.sc-ntliq5-4.ciZKFP').invoke('text').then((text) => {
    const numberValue2 = Number(text);
    if (numberValue2 > 0) {
      cy.get('#hotShot').click();
      cy.get('[data-name="addToBasketButton"]').first().should('be.enabled');
    }
  });
}
});
    }
  });
    


    });
  });
  
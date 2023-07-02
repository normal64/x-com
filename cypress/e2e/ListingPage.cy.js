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
    //Dodaj pierwszy dostępny produkt do koszyka za pomocą ikony dodawania do koszyka
    cy.get(".sc-1h16fat-0.sc-13hctwf-0.llTAgR").first().click();
    //Wybierz podkategorię w drzewie kategorii

    cy.get(".sc-1h16fat-0.sc-16n31g-3.kQMduO").eq(4).click();
    //Przejdź na kartę produktową, pierwszego produktu z listingu

    cy.get(".sc-1yu46qn-3.hGZyfc").eq(0).click();

    //Wróć do listingu
    cy.go("back");

    //Kliknij w prawą strzałkę dla paginacji górnej
    cy.get(".sc-1h16fat-0.dNrrmO.sc-11oikyw-3.fWowUI")
      .eq(0)
      .click({ force: true });
    //Wybierz filtr Producent
    cy.get(".sc-3qnozx-1.kqTafb")
      .eq(2)
      .invoke("text")
      .then((text) => {
        const trimmedText = Cypress.$.trim(text);
        cy.log("Element Text:", trimmedText);
      });
    cy.get(".sc-3qnozx-1.kqTafb").eq(2).click();

    cy.get(".sc-1n7ydz7-12.hoHRjW").click();
  });
});

describe("template spec", () => {
  it("passes", () => {
    cy.visit("https://www.x-kom.pl");
    //Zweryfikuj widoczność modala do akceptacji zgód na profilowanie
    cy.get(".modal.modal--after-open")
      .should("be.visible")
      .and("contain", "Dostosowujemy się do Ciebie");

    //Zaakceptuj modal, klikając w przycisk "w porządku"
    cy.get(".sc-1p1bjrl-9").click();
    //Dodaj pierwszy dostępny produkt do koszyka za pomocą ikony dodawania do koszyka

    //nazwa produkta
    cy.get(".sc-1s1zksu-0.iTOxKU.sc-ecmwfg-3.imtbYJ")
      .find(".sc-1h16fat-0.dNrrmO")
      .invoke("attr", "title")
      .then((title) => {
        cy.wrap(title).as("title");
        Cypress.env("myTitle", title);
      });

    cy.get(".sc-1s1zksu-0.iTOxKU.sc-ecmwfg-3.imtbYJ")
      .first()
      .invoke("show")

      .find('[data-name="addToBasketButton"]')
      .first()
      .click({ force: true });
    //Kliknij przycisk "Przejdź do koszyka"
    cy.get(".sc-1h16fat-0.sc-153gokr-0.dMrHJf.sc-1v4lzt5-11.dQxHSV").click({
      waitForAnimations: false,
    });
    //Zweryfikuj zawartość koszyka cookies are clean so only 1 item should be present
    cy.get('[data-name="basketProductList"]')
      .find("li")
      .should("have.length.at.least", 1);

    cy.get('[data-name="basketProductList"]')
      .find(".sc-160wg4d-12.jTgJzw")
      .invoke("text")
      .then((text) => {
        cy.wrap(text).as("nameOfItem");
      });
    cy.get("@nameOfItem").then((name) => {
      expect(name).to.equal(Cypress.env("myTitle"));
    });

    //Rozwiń dropdown z liczbą określającą ilość sztuk produktu
    cy.url().then((url) => {
      if (url.includes("koszyk")) {
        cy.get(".Select.has-value")
          .click()
          //Wybierz 2 sztuki
          .contains("2")
          .click();
      }
    });

    //     //Kliknij w przycisk "Przejdź do dostawy"
    cy.get(".sc-15ih3hi-0.sc-pvj85d-4.cnUgwg").first().click();

    //     //  Kliknij w przycisk "Kontynuuj bez logowania"
    cy.url().then((url) => {
      if (url.includes("logowanie-lub-rejestracja")) {
        cy.get(".sc-15ih3hi-0.sc-zfvjto-6.fsfqvv")
          .first()
          .click({ force: true });
      }
    });

    //W sekcji "Dostawa" wybierz opcję "Kurier"

    //W sekcji "Kupujesz jako" wybierz opcję "Osoba prywatna"
    //Uzupełnij sekcję "Adres dostawy" poprawnymi danymi

    cy.get(".sc-3ncbnj-3.gDqYcJ.sc-1k5v2vw-1.fxbLSm")
      .eq(0)
      .type("Denis Poplavskii");
    cy.get(".sc-3ncbnj-3.gDqYcJ.sc-1k5v2vw-1.fxbLSm")
      .eq(1)
      .type("Automation learners");
    cy.get(".sc-3ncbnj-3.gDqYcJ.sc-1k5v2vw-1.fxbLSm").eq(2).type("10043");
    cy.get(".sc-3ncbnj-3.gDqYcJ.sc-1k5v2vw-1.fxbLSm").eq(3).type("Ikskomowa");
    cy.get(".sc-3ncbnj-3.gDqYcJ.sc-1k5v2vw-1.fxbLSm").eq(4).type("+481454523");
    cy.get(".sc-3ncbnj-3.gDqYcJ.sc-1k5v2vw-1.fxbLSm")
      .eq(5)
      .type("proceedWithMyCandidature@pl.com");

    cy.get(".sc-116iin7-0.gvmmDx.sc-nhgagy-2.bhAxwF").eq(8).click();
    cy.get(".sc-3qnozx-3.ejgVFR").eq(3).click({ force: true });

    //Kliknij w przycisk "Przejdź do podsumowania"
    cy.get(".sc-15ih3hi-0.sc-pvj85d-4.cnUgwg").click();
  });
});

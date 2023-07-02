describe("Fixtures use", () => {
  it("collects categories present in Laptops & PC", () => {
    cy.viewport(1280, 720);
    cy.visit("https://www.x-kom.pl");
    //Zweryfikuj widoczność modala do akceptacji zgód na profilowanie
    cy.get(".sc-an0bcv-3", { timeout: 10000 })
      .should("be.visible")
      .and("contain", "Dostosowujemy się do Ciebie")
      .then(() => {
        // Perform actions after the modal appears
        cy.get(".sc-1p1bjrl-9").click();
      });
    cy.get(":nth-child(1) > .sc-13hctwf-0 > .sc-13hctwf-5").click();

    const categoryNames = [];
    const spanNames = [];

    cy.get(".sc-4wflom-0")
      .scrollIntoView()
      .then(() => {
        cy.get('.sc-4wflom-0 [class^="sc-m"]')
          .each(($element) => {
            const elementText = $element.text().trim();
            if ($element.is("span")) {
              spanNames.push(elementText);
            } else {
              categoryNames.push(elementText);
            }
          })
          .then(() => {
            // categoryNames will contain an array of category names
            // spanNames will contain an array of span names
            cy.log("spanNames", spanNames);
            // Update the fixture with the spanNames array
            cy.fixture("gettinginfo").then((data) => {
              data["laptops-pc"] = spanNames;
              cy.writeFile("path/to/gettinginfo.json", data);
            });
          });
      });
  });
});

describe("Blog app", function () {
  const port = 3000;
  beforeEach(function () {
    cy.request("POST", `http://localhost:${port}/api/testing/reset`);
  });

  it("Login form is shown", function () {
    cy.visit(`http://localhost:${port}/`);

    cy.contains("log in to application");
  });

  describe("Login", function () {
    it("succeeds with correct credentials", function () {
      cy.visit(`http://localhost:${port}`);

      cy.get("#username").type("mluukkai");
      cy.get("#password").type("salainen");
      cy.get("#login-button").click();

      cy.contains("mluukkai-salainen logged in ");
    });

    it("fails with wrong credentials", function () {
      cy.visit(`http://localhost:${port}`);

      cy.get("#username").type("mluukkai");
      cy.get("#password").type("wrong password");
      cy.get("#login-button").click();

      cy.contains("Wrong credentials");
      cy.get("#notification").and("have.css", "color", "rgb(255, 0, 0)");
    });
  });

  describe("When logged in", function () {
    beforeEach(function () {
      cy.login({ username: "mluukkai", password: "salainen" });
    });

    it("A blog can be created", function () {
      cy.get("#toggle-visibliy-btn").click();

      const blog = {
        title: "Computing Machinery and Intelligence",
        author: "Alan Turing",
        url: "https://www.csee.umbc.edu/courses/471/papers/turing.pdf",
      };

      cy.get('input[placeholder="the title of blog"]').type(blog.title);
      cy.get('input[placeholder="the author of blog"]').type(blog.author);
      cy.get('input[placeholder="the url of blog"]').type(blog.url);

      cy.get("#create-blog").click();

      cy.contains(`new blog ${blog.title} just successfully added!`);
      cy.contains(blog.title);
    });

    describe("When a blog created", function () {
      const blog = {
        title: "Computing Machinery and Intelligence",
        author: "Alan Turing",
        url: "https://www.csee.umbc.edu/courses/471/papers/turing.pdf",
      };
      beforeEach(function () {
        cy.get("#toggle-visibliy-btn").click();
        cy.createBlog({
          title: blog.title,
          author: blog.author,
          url: blog.author,
        });
      });

      it("A user can like a blog", function () {
        cy.get("#show-contents-btn0").click();

        cy.contains("likes 0");
        cy.get("#like-blog-btn0").click();
        cy.contains("likes 1");
      });

      it("A user who created a blog can delete it", function () {
        cy.get("#show-contents-btn0").click();

        cy.get("#remove-blog-btn0").click();
        cy.on("window:confirm", () => true);

        cy.get(blog.title).should("not.exist");
      });

      it("Only the creator of blog can delete it not anyone else", function () {
        cy.get("#remove-blog-btn1").should("not.exist");
        cy.get("#remove-blog-btn2").should("not.exist");
      });

      it("The shown blogs are ordered according to number of likes, so the most likes are on top", function () {
        cy.createBlog({
          title: "annotated bibliography",
          author: "Judea Pearl",
          url: "http://amturing.acm.org/bib/pearl_2658896.cfm",
        });

        cy.get("#show-contents-btn0").click();
        cy.get("#like-blog-btn0").click().click(); // 2 times

        cy.get("#show-contents-btn1").click();
        cy.get("#like-blog-btn1").click().click().click(); // 3 times

        cy.reload();

        cy.get("#show-contents-btn0").click();
        cy.get("#show-contents-btn1").click();

        cy.get("#blog0").within(() => {
          cy.get("div")
            .eq(2)
            .window(() => {
              cy.get("div")
                .eq(2)
                .within(() => {
                  cy.contains("#number-of-likes1", "likes 3");
                });
            });
        });

        cy.get("#blog1").within(() => {
          cy.get("div")
            .eq(2)
            .window(() => {
              cy.get("div")
                .eq(2)
                .within(() => {
                  cy.contains("#number-of-likes1", "likes 2");
                });
            });
        });
      });
    });
  });
});

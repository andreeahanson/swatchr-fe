## Description

Swatchr is an app designed for people interested in creating color schemes for renovated homes, websites, party themes, decorations and much more. 

On page load, the app generates a scheme of 5 colors. The user can generate another one by clicking "Generate scheme" at the top of the page. The user can also lock a favorite color, that will persist, while the other colors will change again, once "Generate scheme" is clicked again. A color can be locked or unlocked by clicking on the "lock"/"unlock" symbol at the bottom of each color.

On the right side of the page, the user will notice an arrow pointing to the left, which renders an initial menu, where they can select a project (if they have any) or they can create a project, by clicking the "+Add Project" button, and by filling out the input that appears on click. Once the project has been created, the user can save their favorite palette to that particular project, by clicking on "Save Palette", and by filling out the input that is generated.

After creating one or several projects, the user can view them in the list of projects at the top of the sidebar, and can select one by clicking on the menu. Once a project has been selected, the sidebar will display the name of the project and the list of palettes included in that project, with their names and a preview of their colors. 

This project is intended to solidify our RESTful API design skills and get us familiarized with the patterns associated with building a single app across multiple repositories. Connected to this repository is another repository, meant to build the back-end of this project. The back-end repository, with it's dedicated README can be found here: https://github.com/rumizen/swatchr-be.git. 

## Installation

```
git clone https://github.com/andreeahanson/swatchr-fe.git
```
Once you have cloned the repo, install the library dependencies. Run:

```
npm install
```
To view the app in action, run the following command in your terminal:

```
npm start
```
Then, go to http://localhost:3000/ in your browser to see the code running in the browser.

## Screenshots

## Learning goals

The primary learning goals for this project are:
- connecting Back End & Front End repositories using CORS
- multiple environments:
- testing
- making use of automatic continuous integration with TravisCI
- deployment with Heroku

The second focus for this project is developing professional-level workflow habits. This includes:
- using a PR template
- conducting actual code reviews in your PRs
- detailed agile workflow using a kanban system or GH issues
- keeping track of MVP features and nice-to-have features
- agreeing to a commit message template
- exploring git rebase and squashing highly semantic, specific, professional documentation (README, API documentation, etc)

## Team members

[Steve Rumizen](https://github.com/rumizen)

[Andreea Hanson](https://github.com/andreeahanson)





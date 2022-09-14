# Student Notes App
This is a CRUD app built to help keep track of students' progress, lessons notes, plans etc. I built the app entirely for myself, when teaching it's very important to have a clear, easy and quick way to keep notes that are accessible from anywhere and also secured. This app solves those problems and was a great deal of fun to develop. The app is fully personalisable, requiring sign in with Google Oauth2. All notes are saved permanently in a MongoDB database, and viewable only if made 'public'. Otherwise are entirely private.

**Link to project:** http://student-notes-app.herokuapp.com/


## How It's Made:

**Tech used:** HTML, CSS + MaterializeCSS, JavaScript (Node.js), Handlebars, MongoDB (Mongoose)

This was a project built using OAuth2 authentication for access via a Google account. The whole project was built following the principles of MVC. The style was streamlined using the MaterializeCSS framework, which enabled quick and sleek styling of this MVP.

## Optimizations

There's room for improvement across the app:
####Styling: can be improved, especially on the index screen it can be made more responsive, currently the cards can become distorted at certain screen sizes
####Authentication: other ways for users to be authenticated could be added, Microsoft etc. Also a more complex system for public and private files could be set up, so perhaps students could log in and only see the files that their teacher has written and marked for them, so the notes could be more specific and serve a purpose beyond the teacher keeping notes.


## Lessons Learned:

Building this app I worked a lot with technologies that I know, but with which I'm constantly deepening my undestanding and breadth of use. In this project I used mongoose schemas more than I had in previous projects, which served the project well and certainly made things simpler and cleaner.

I used passport for the auth which made the process very quick and simple, but at the same time presented me with many more things to learn. I look forward to working with it more in the future after this project.

This was also the first time I'd used MaterializeCSS as a framework and I liked it, it has a clean simple look and many useful features which I will continue to explore in future. 

I really enjoyed the project, espeically implementing the MVC paradigm, which made things so much cleaner and easier to debug as well as setting things up to be more maintainable in the future. I'll definitely be continuing to implement it in the future.
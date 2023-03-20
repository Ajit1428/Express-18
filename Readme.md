### Project Setup
    1. Express Framework
    2. Directory structure
        a. MVC Pattern
            i. Model, view and controller 


### Directory structure (Separation of Concern)
    1. /src -> To hold the logic
            a. /Middleware
            b. /Controller
            c. /Model
            d. /Service  

    2. /config -> All the static configuration of a server
    3. /public -> All the files which is used by the public
        /uploads -> ALl the uploads of the data
    4. /routes -> To store all the route files
    5. /views (optional) -> if required to store views/html files
    6. /node_modules -> To store all the packages

### Routes (/routes)
    1. To listen to any requests and call the actions
    2. Convention: All the route files should have a ```.route.js``` extension

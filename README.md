### About The Project
<a href="https://github.com/othneildrew/Best-README-Template">
    <img src="https://cryptologos.cc/logos/near-protocol-near-logo.png" alt="Logo" width="100" height="80">
  </a><br/><br/>
This is online learning community platform which integrated <strong>NEAR Protocol</strong> backend source code

### Spreedsheet Docs: 
#### https://docs.google.com/spreadsheets/d/189WgYr-YKnKUu9F3gJ-RB_SlilE-7bT0Gev90oDWVmc/edit?usp=sharing

### Folder Strcuture
```sh
    src
    │   server.js            # App entry point <br/>
    └───routes               # Express route controllers for all the endpoints of the app <br/>
    └───helpers              # All helpers are here <br/>
    └───middlewares          # Express middleware is here to check authenticate and authorize and others stuffs <br/>
    └───models               # Database models <br/>
    └───migrations           # Database migrations <br/>
    └─── seeders             # Database seeders <br/>
    └───services             # All the business logic is here <br/>
    └───schema               # All the validations are here <br/>
    uploads                  # Storage for videos and profile pictures will change it to AWS S3 <br/>
    logs                     # logs store here by there date "MM-DD-YYY.logs" <br/>
    .env                     # Environment variable <br/>
    .env.example             # Example Environment variables <br/>
    .eslintrc.json           # Eslint configuration <br/>
    .gitignore               # Files that are ignored by GIT <br/>
    .prettierrc              # Prelitter configuration <br/>
    package.json             # Packages list <br/>
    .sequelizerc             # Sequelize configurations <br/>
```

### Prerequisites

* Install npm latest verison
  ```sh
  npm install npm@latest -g
  ```

### Built With

* [Near Protocol](https://near.org/)
* [NodeJs](https://nodejs.org/en/)
* [ExpressJs](https://expressjs.com/)
* [Postgresql](https://www.postgresql.org/)

### Installation

Below are the instructions that help you to setuping up your the project

1. Clone the repo
   ```sh
   git clone https://github.com/probiruk/olcp-backend.git
   ```
2. Install NPM packages
   ```sh
   npm install
   ```
3. Copy the example enviroment variables and create your
   ```sh
   cp .env.example .env
   ```
4. Enter your enviroment variables in `.env`
5. Finally start your app
   * <strong>production</strong>
     ```sh
      npm start
     ```
   * <strong>dev(it'll restart the server if the code updated)</strong>
     ```sh
      npm start:dev
      ```
## Contact

Your Name - [Biruk Erjamo](https://t.me/probiruk) - probiruk@gmaill.com

Live Link: [https://olcp-backend.herokuapp.com/](https://olcp-backend.herokuapp.com/)

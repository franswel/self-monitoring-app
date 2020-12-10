# self-monitoring-app
Self Monitoring App

## About The Application

This application was done as the course project for the course CS-C3170 in Aalto University. The main purpose of the application is to monitor, track and summarize
the routines of the user. The application can be accessed from [a link]() or run locally on localhost:7777. 

## How to run locally

### Prerequisites

* Deno
* Database

### Installation

1. Clone the repo
   ```sh
   git clone https://github.com/your_username_/Project-Name.git
   ```
2. Optionally extract from zip
   
### Necessary CREATE TABLE statements

1. Table for users 
  ```sql
  CREATE TABLE app_users (
    id SERIAL PRIMARY KEY,
    email VARCHAR(320) NOT NULL,
    password CHAR(60) NOT NULL
  );
  
  CREATE UNIQUE INDEX ON app_users((lower(email)));
  ```
2. Table for morning reporting  
  ```sql
  CREATE TABLE morning (
    id SERIAL PRIMARY KEY,
    date DATE,
    sleep_duration NUMERIC(100, 2),
    sleep_quality INTEGER,
    mood INTEGER,
    user_id INTEGER REFERENCES app_users(id)
  );
  ```
3. Table for evening reporting
  ```sql
  CREATE TABLE evening (
    id SERIAL PRIMARY KEY,
    date DATE,
    sport_hours NUMERIC(100, 2),
    study_hours NUMERIC(100, 2),
    eating_regularity INTEGER,
    eating_quality INTEGER,
    mood INTEGER,
    user_id INTEGER REFERENCES app_users(id)
  );
  ```
## Running the application

Run app.js:
   ```sh
   deno run --allow-net --allow-read --allow-env --allow-write --unstable app.js
   ```

### Functionality

When opened, the application shows its user the frontpage. There are links for reporting daily data and summaries but the user can't access these without
first logging in. Clicking any of the links without an active session will redirect the user to the login page. In the login page there is a link to the registration page in case the user does not have an account made. 
  After authentication the user will be redirected back to the frontpage, where now is a trend of users daily mood if any data has been submitted. Also now the buttons for reporting daily data and summaries are available, as well as a logout option. In the reporting page the user can choose between entering morning/ evening data. Also there are messages showing if current days data has already been submitted. In the summary page the user is greeted with the weekly and monthly averages of
users data. In addition there are search options for singular weeks/months data. If no data is present in the searched week/month, there will be a message indicating that no data is available.

In addition API endpoints /api/summary and /api/summary/:year/:month/:day are available to all users without the need to authenticate



## License

Distributed under the MIT License. See `LICENSE` for more information.


## Creators

 Frans Welin  - frans.welin@aalto.fi  

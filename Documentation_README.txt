# Self Monitoring Application

## About The Application

This application was done as the course project for the course CS-C3170 in Aalto University. The main purpose of the application is to monitor, 
track and summarize the routines of the user. The application was built using Deno. Programming languages are HTML and js.

Github link: [https://github.com/franswel/self-monitoring-app]

## Accessing the Application

The application is deployed to [https://routine-monitor.herokuapp.com/] but it can also be run locally using your own database and Deno.

### Installation

1. Install Deno from [https://deno.land/]

2. Create necessary tables in your own database with these CREATE TABLE statements
   ```sql
   CREATE TABLE app_users (
      id SERIAL PRIMARY KEY,
      email VARCHAR(320) NOT NULL,
      password CHAR(60) NOT NULL
   );
   CREATE UNIQUE INDEX ON app_users((lower(email)));
   
   CREATE TABLE morning (
      id SERIAL PRIMARY KEY,
      date DATE,
      sleep_duration NUMERIC(100, 2),
      sleep_quality INTEGER,
      mood INTEGER,
      user_id INTEGER REFERENCES app_users(id)
   );
   
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
3. Clone the repo, optionally extract from zip
   ```sh
   git clone https://github.com/franswel/self-monitoring-app.git
   ```
4. Input your own database parameters in the file config/config.js
   ```
   config.database = new Pool({
      hostname: "your-database-hostname",
      database: "your-database",
      user: "your-database-user",
      password: "your-database-password",
      port: 5432
   }, CONCURRENT_CONNECTIONS);
   ```
5. Start the server from the root of the file with
   ```
   deno run --allow-net --allow-read --allow-env --allow-write --unstable app.js
   ```
   
## Running tests

1. Run tests from the /tests folder with: (replace values with your own)
   Also change the testfile name in the command depending on the testfile you want to run. 
   Some test don't work as expected as these were done using a local test database.
   ```
   PGHOST='your-host' PGDATABASE='your-database' PGPASSWORD='your-password' deno test --allow-env --allow-read --allow-net --unstable controller_tests.js
   ```

### Functionality

When opened, the application shows its user the frontpage. There are links for reporting daily data and summaries but the user can't access these without
first logging in. Clicking any of the links without an active session will redirect the user to the login page. In the login page there is a link to the 
registration page in case the user does not have an account made. 

After authentication the user will be redirected back to the frontpage, where now is a trend of users daily mood if any data has been submitted. 
Also now the buttons for reporting daily data and summaries are available, as well as a logout option. 
  
In the reporting page the user can choose between entering morning/ evening data. Also there are messages showing if current days data has already been submitted. 
In the summary page the user is greeted with the weekly and monthly averages of users data. 

In addition there are search options for singular weeks/months data. If no data is present in the searched week/month, 
there will be a message indicating that no data is available.
 
In addition API endpoints /api/summary and /api/summary/:year/:month/:day are available to all users without the need to authenticate


## License

Distributed under the MIT License. See `LICENSE` for more information.


## Creators

 Frans Welin  - frans.welin@aalto.fi  
# self-monitoring-app
Self Monitoring App

## About The Application


This application was done as the course project for the course CS-C3170 in Aalto University. The main purpose of the application is to monitor, track and summarize
the routines of the user.

## Getting Started

### Prerequisites

* Deno
* Database

### Necessary CREATE TABLE statements

  ```sql
  CREATE TABLE app_users (
  id SERIAL PRIMARY KEY,
  email VARCHAR(320) NOT NULL,
  password CHAR(60) NOT NULL
);

  ```

 
## License

Distributed under the MIT License. See `LICENSE` for more information.




## Creators

 Frans Welin  - frans.welin@aalto.fi  

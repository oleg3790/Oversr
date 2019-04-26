## Overview
Sample web application for managing inventory.

This application contains 3 models of data; designers, styles, and sample inventory. A sample inventory record belongs to a style, where a style will belong to a specific designer.

## Architecture
This is an MVC application, built with .NET Core and React.js (and Bootstrap as CSS framework). An ORM is used for the database model (Entity Framework Core). 

## Setup 
1. Clone this repo
2. Add a `secrets.json` file with 2 values: `defaultConnection` (DB connection string) and `authSecret` (secret used to generate JWT auth token)
3. The `authSecret` should be 16 > characters as the keysize should be > 128 bits
4. Once the `defaultConnection` string is added with a valid DB connection string is added, open VS package manager and run `Update-Database` to recreate the DB

Currently this application does not have the ability to add a new user, therefore this will have to be done manually. You can use the method `PasswordHash.GenerateAuthElements()` to generate a dummy hash and salt to test out login. Alternatively, you can use the below insert to add the user `USER: test, PW: 12345` as a test user to the DB

```sql
  insert into users (FirstName, LastName, Username, PasswordHash, PasswordSalt)
  values ('User', 'One', 'Test', 'e5EGRpeFruRg1P8fwg8CedRVnx4UFW2hIbFPth7qqH4=', 'cz4EDFflH7WOkOE1fOi39w==');
```

5. Run the app

## Contributing
To contribute, look for tickets in `Issues` tab of this repo

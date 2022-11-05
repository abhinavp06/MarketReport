## Description

A simple microservice which takes in an excel file containing the price history of a stock in the following format:

| Date         | Price     | Open   | High    | Low    |
| :-----:      | :---:     | :---:  | :---:   | :---:  |
| Apr 11, 2022 | 2610.2    | 2600   | 2638.55 | 2583   |
| Apr 12, 2022 | 2561.05   | 2587   | 2602.6  | 2555.4 |

It generates an excel file with the format:

| Date         | Price     | Open   | High    | Low    | Buy     | Sell    |  Profit | Total Profit |
| :-----:      | :---:     | :---:  | :---:   | :---:  | :---:   | :---:   | :---:   |   :---:      |
| Apr 11, 2022 | 2610.2    | 2600   | 2638.55 | 2583   | 2630.25 |         |         |              |
| Apr 12, 2022 | 2561.05   | 2587   | 2602.6  | 2555.4 |         | 2554.88 | -75.37  | -75.37       |

Check out the hosted microservice [here](https://abhinavp06-marketreportgenerator.cyclic.app/documentation)

## Installation

```bash
$ npm install
```

## ENV Variables

The application uses the following env variables:
  **PORT**= The desired port number  
  **NODE_ENV**= The node environment  
  **SWAGGER_DOC_STRING**= The swagger documentation can have a custom string appended to the base localhost url. Example: http://localhost:3010/documentation   
  **TEMP_FILES_BASE_PATH**= The folder where the temporary generated files are stored  
  **NODEMAILER_FROM_EMAIL**= The google account with which you want to send emails  
  **NODEMAILER_FROM_PASSWORD**= The password for that google account  
  **OWNER_EMAIL**= While sending the email to the requested email address, the service also BCCs the email content to this owner email address  
  **CYCLIC_BASE_URL**= Base URL for the hosted microservice  

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

#debug mode
$ npm run start:debug

# production mode
$ npm run start:prod

# reset (delete dist, node_modules, package-lock.json and reinstall packages)
$ npm run reset
```

The swagger documentation can be found on: http://localhost:PORT/SWAGGER_DOC_STRING

## Workflow

As of now there is only 1 API in this microservice. It takes in 3 parameters:
  - **Comparison difference**: This is the amount of days with which the current day's price will be checked with.
  - **File**: The excel file with the described format above.
  - **Email**: The email address to which you want the generated file to be sent to.

There are certain validations for the file like it's extension type (only accepts xlsx) and if the user has even input a file or not.

After these validations have passed, the file is stored in a /tmp folder using the **[fs](https://nodejs.org/api/fs.html)** library.

To avoid concurrency in the file names, I have appended a date string w/ the file name (although one can use uuid as well).

Then the **[xlsx](https://www.npmjs.com/package/xlsx)** library is used to read this excel file, extract the data and convert it to a JSON object. Then the file is deleted.

Later on, the operations and main logic are applied to this JSON object and a new excel file is generated with the result.

It is stored in the /tmp folder and deleted after successfully sending an email.

I have also set up a cron job to delete the files in the /tmp directory incase there was an error while trying to delete the files during the normal flow.

## Why store the files in a /tmp folder?
The usecase was pretty small (only one user was going to use this microservice). Will look into different file storage options to scale with.

## Stay in touch

**LinkedIn:**  [Abhinav Parashar](https://www.linkedin.com/in/abhinavp06/)


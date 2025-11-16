## Application Architecture

The architecture of Jarvis consists of several microservices that handle different functionalities. or a detailed overview, please refere to the [architecture document](docs/architecture.md) abd the component diagram below:

![Component Diagram](docs/component_diagram.png)

This modular design allows for easier maintenance and scalability as the application grows.

## Email Processing

### Fetching Emails
To fetch emails, send a GET request to `\fetch-emails` with the user's email and password in the request body. This will return the emails for the user's inbox.

### Sending Emails
To send emails, you can use the `sendEmail` function form the email processing module. Provide the necessary SMTP configuration and email details such as suchject, body, ect.

### Generating Email Responses
To generate a response for an email, send a POST request to `/generate-response` with the email content in the request body. This will return a draft response based on the input email content.
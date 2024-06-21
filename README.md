VivaAutobus Web Application
Project Overview

The VivaAutobus Web Application is designed to enhance the user experience for customers of VivaAutobus, a leading bus travel company. This application enables users to conveniently book tickets, access real-time travel information, and manage their trips directly from their mobile devices.
Features

    User Authentication: Secure user login and registration using JSON Web Tokens (JWT).
    Ticket Booking: Easily browse available bus routes and book tickets.
    QR Code Generation: Generate QR codes for boarding directly from the app.
    Real-Time Travel Information: View real-time updates on bus schedules and trip status.
    Ticket Management: View and manage booked tickets, including the ability to cancel bookings.

Technologies Used

    Frontend: React, JavaScript, Vite
    Backend: Node.js, Express
    Authentication: JSON Web Tokens (JWT)
    Version Control: Git, GitHub

Installation
Prerequisites

    Node.js
    npm or yarn

Setup

    Clone the repository:
    ```bash
      git clone https://github.com/yourusername/vivaautobus.git
  ```
Navigate to the project directory:
```bash
      cd vivaautobus
```
Install dependencies:
```bash
      npm install
      # or
      yarn install
```
Running the Application
    Start the backend server:
```bash
npm run server
# or
yarn server
```
Start the frontend development server:

```bash
    npm start
    # or
    yarn start
```
Usage

Once the servers are running, you can access the application by navigating to http://localhost:3000 in your web browser. From there, you can register or log in, book tickets, and manage your travel plans.
Project Structure

/vivaautobus
│   README.md
│   package.json
│   ...
├───/backend
│   ├───server.js
│   ├───routes
│   └───models
├───/frontend
│   ├───src
│   ├───public
│   └───package.json

Contributing
Contributions are welcome! Please fork this repository and submit pull requests wi

Contact
For any questions or feedback, please contact Angel.edoc23@gmail.com

#For .env file
```bash
  #SERVER
  SERVER_PORT='4000'

  #JWT
  SECRET_JWT='secret'

  #DB CONFIGURATION
  HOST='localhost'
  DB_USER='root'
  DB_PASSWORD='contraMySQL'
  DATABASE='VivaAutobus'
  DB_PORT='8080'

  #PAYPAL CONFIGURATION
  PAYPAL=#
  PAYPAL_SECRET=#
```

# Foodi

A Food Delivery app created with the MERN stack

## Links

### Project Demo - https://foodi-client-seven.vercel.app/

### Project Overview Video - https://youtu.be/tkVPpXab15U

## Frontend

The frontend of this project is created with ReactJS.<br />

To start the frontend : <br />

`cd client`<br />

`npm install`<br />

`npm run dev`<br />

Also .env file has to be created. <br />

.env content :

```
VITE_API_KEY= from the firebase
VITE_AUTH_DOMAIN= from the firebase
VITE_PROJECT_ID= from the firebase
VITE_STORAGE_BUCKET= from the firebase
VITE_MESSAGING_SENDER_ID= from the firebase
VITE_APP_ID= from the firebase

VITE_IMGBB_KEY= from the imgbb
```

### Screenshots

#### Home Page :

![HomeScreen1](OverviewImages/Homepage1.PNG)
![HomeScreen2](OverviewImages/Homepage2.PNG)
![HomeScreen3](OverviewImages/Homepage3.PNG)
![HomeScreen4](OverviewImages/Homepage4.PNG)
![HomeScreen5](OverviewImages/Homepage5.PNG)

#### Signup Page:

![Signup](OverviewImages/Signup.PNG)

#### Login Page:

![Login](OverviewImages/Login.PNG)

#### Menu Page:

![Menu1](OverviewImages/Menu1.PNG)
![Menu2](OverviewImages/Menu2.PNG)
![Menu3](OverviewImages/Menu3.PNG)

#### Cart Page:

![Cart](OverviewImages/Cart.PNG)

#### Dashboard Page:

![Dashboard](OverviewImages/Dashboard.PNG)

#### Users Page:

![Users](OverviewImages/Users.PNG)

#### Manage Items Page:

![ManageItems](OverviewImages/ManageItems.PNG)

#### Add To Menu Page:

![AddMenu](OverviewImages/AddMenu.PNG)

#### Update Profile Page:

![UpdateProfile](OverviewImages/UpdateProfile.PNG)

#### Popups

![Success](OverviewImages/Success.PNG)

![AreYouSure](OverviewImages/AreYouSure.PNG)

## Backend

The backend of this project is created with ExpressJS. MongoDB is used for the database. <br />
To start the backend: <br />

`cd server`<br />

`npm install`<br />

`npm run dev`<br />

Also .env file has to be created. <br />

.env content :

```
PORT= your port
MONGO_USERNAME= from MongoDB
MONGO_PASSWORD= from MongoDB

ACCESS_TOKEN_SECRET= The Secret Key For Your Access Token
```

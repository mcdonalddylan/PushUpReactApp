# PushUpReactApp

## Project Description

A React web application to HEAVILY motivate you to do push-ups while you work. There are a few mobile apps which do something similar, but not only do they not provide many accessibility options (colorblind mode for example) but they are not nearly as straight-forward as this web app is. This app is for people like myself who work in front of a computer for hours a day and know that they need to keep their back in shape. You could use just any alarm you want to get the same effect as this app, the difference is that with my app you can track you data and see yourself improve over time. Maybe it's just me, but being able to actually view your progress in this way can be very motivating. 

## Technologies Used

* React (TypeScript)
* AWS RDS
* Spring Boot
* Spring Data
* Spring ORM
* Spring MVC
* Docker
* Jenkins
* Maven

## Features

* Create an account to track your push-up data
* Choose how many minutes go by before the alarm starts
* View your previous push-up data

To-do list:
* Add leaderboards

## Getting Started
   
### Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

### Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).


## Usage

This application will sound an alarm after a given time interval (in minutes). Stopping the alarm will trigger a 5 second countdown to allow time for the user to get on the floor. Once the user is done with their push-ups they can click on the "I'm done" button to record the number of pushups they just did. By submitting that information, the alarm timer resets and you're back to the countdown module. To exit the countdown you can click anywhere outside of the countdown module. The user can then looks at their latest push-up data by clicking the "view data" button.

## License

This project uses the following license: [<CC BY-NC-ND 4.0>](<https://creativecommons.org/licenses/by-nc-nd/4.0/>).

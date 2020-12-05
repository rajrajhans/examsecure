<p align="center">
  <a href="https://ty52.rajrajhans.com">
    <img alt="ExamSecure" src="http://assets.rajrajhans.com/examsecure_logo.png" width="150"/>
  </a>
</p>

<h1 align="center">
  ExamSecure
</h1>


<h4 align="center">
  Automated Virtual Proctoring System 
</h4>

ExamSecure uses the candidate's camera to detect Electronic objects like Mobile Phones, Earphones, and other signs of malpractice like  Multiple Persons in the candidate's camera frame and automatically logs them out. 

It uses the [AWS Rekognition](https://aws.amazon.com/rekognition/) API for Object and Person Detection.

Note: ExamSecure is currently a Work In Progress. It is deployed [here](https://ty52.rajrajhans.com) but only authorized test candidates are given access. If you want to test it, please follow these steps to run ExamSecure locally.

### Running ExamSecure Locally

Note: Running this project will require you to set up and configure 
the required AWS resources.

1. Clone the project.
2. Run `npm install` to install all required dependencies.
3. Configure AWS and put required details in `public/settings.js`.
4. Run `npm start`.

The project should run now. In case of any error, make sure your AWS configuration is correct. A CloudFormation Template which you can directly deploy on one click will be added soon. 

### Screenshots

Following is a sneak peek of how the interface looks.

| Log In                              | Allow Camera Permissions                             | Pre-Exam Instructions                            |
| ------------------------------------ | ------------------------------------ | ------------------------------------ |
| ![](https://assets.rajrajhans.com/examsecure_ss1.png) | ![](https://assets.rajrajhans.com/examsecure_ss2.png) | ![](https://assets.rajrajhans.com/examsecure_ss3.png) |

| Exam Interface                              | Mobile Detected                             | Force Logout                             |
| ------------------------------------ | ------------------------------------ | ------------------------------------ |
| ![](https://assets.rajrajhans.com/examsecure_ss4.png) | ![](https://assets.rajrajhans.com/examsecure_ss5.png) | ![](https://assets.rajrajhans.com/examsecure_ss5.png) |

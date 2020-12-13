<p align="center">
  <a href="https://examsecure.rajrajhans.com">
    <img alt="ExamSecure" src="http://assets.rajrajhans.com/examsecure_logo.png" width="150"/>
  </a>
</p>

<h1 align="center">
  ExamSecure
</h1>


<h4 align="center">
  Automated Virtual Proctoring System 
</h4>

ExamSecure is a platform for conducting secure remote examinations and deter candidates from resorting to malpractice. 

ExamSecure uses the following techniques to prevent cheating by the candidates -

1. In the exam environment, ExamSecure completely locks down the candidate's browser, triggering a warning if the candidate tries to switch tabs, open a new window, exit full screen mode or click anywhere else except the Exam screen. 

2. Furthermore, ExamSecure uses the candidate's camera feed to perform advanced image analysis in real time to determine if there are multiple people in the candidate's frame, or if there is no one in the candidate's frame. 

3. At the start of the exam, the candidate's face features are saved and if the detected face during the examination do not match the initial face, it triggers an Impersonation Warning. 

4. Using Head Pose estimation, ExamSecure is able to detect the direction in which the candidate is facing and triggers a warning if the candidate is staring away from the screen for long periods of time. 

5. ExamSecure is also able to detect Electronic objects like Mobile Phones, Earphones in the candidate's camera frame and trigger a warning. 

It uses the [AWS Rekognition](https://aws.amazon.com/rekognition/) API for Object Detection, Person Detection, and Face Analysis.

Note: ExamSecure is currently a Work In Progress. It is deployed [here](https://examsecure.rajrajhans.com) but only authorized test candidates are given access. If you want to test it, please follow [these steps](https://github.com/rajrajhans/examsecure#running-examsecure-locally) to run ExamSecure locally.


### Screenshots

Following is a sneak peek of how the interface looks.

| Home,  Log In                              | Allow Camera Permissions                             |
| ------------------------------------ | ------------------------------------ |
| ![](/docs/examsecure_screenrecord.gif) | ![](https://assets.rajrajhans.com/examsecure/examsecure_2.png) |

| Pre-Exam Instructions                              | Exam Interface                             |
| ------------------------------------ | ------------------------------------ |
| ![](https://assets.rajrajhans.com/examsecure/examsecure_3.png) | ![](https://assets.rajrajhans.com/examsecure/examsecure_4.png) |

| Mobile Detected                             | Force Logout                             |
| ------------------------------------ | ------------------------------------ |
| ![](https://assets.rajrajhans.com/examsecure/examsecure_5.png) | ![](https://assets.rajrajhans.com/examsecure/examsecure_6.png) |


### Running ExamSecure Locally

Note: Running this project will require you to set up and configure 
the required AWS resources.

1. Clone the project.
2. Run `npm install` to install all required dependencies.
3. Configure AWS and put required details in `public/settings.js`.
4. Run `npm start`.

The project should run now. In case of any error, make sure your AWS configuration is correct. 

### AWS Configuration

This project uses many AWS services - S3, CloudFront, Rekognition, Lambda, Cognito, DynamoDB, API Gateway, and CodePipeline. To make the configuration process easy, a CloudFormation stack template is provided. All you need to deploy that template and CloudFormation will take care of the rest!

- First, you need to make a S3 bucket which contains the build files of the React app. Follow [this documentation by AWS](https://docs.aws.amazon.com/AmazonS3/latest/user-guide/create-bucket.html) for more details.
    - To get the build files, run `npm run build`. Build files will be `/build`
    
- Now that you have the S3 bucket details, you need to create a CloudFormation stack which will manage all the resources we need. I have provided the stack template at `cloudformation/template.yaml` in this repository. Follow the steps given [this documentation by AWS](https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/cfn-console-create-stack.html) to deploy this template. During the creation of stack, it will ask you for S3 Bucket URL. You have to provide the URL got in the prior step. 
- Once the Stack Creation process is complete, create a file `settings.js` in your public folder and paste the details from the Clouformation console output in the  following format - 

```javascript
window.rekognitionSettings = {
    "apiGateway": "YOUR_API_GATEWAY",
    "cognitoIdentityPool": "YOUR_COGNITO_IDENTITY_POOL",
    "cognitoUserPoolId": "YOUR_COGNITO_POOLID",
    "cognitoUserPoolClientId": "YOUR_COGNITO_POOL_CLIENDID",
    "region": "YOUR_AWS_REGION"
};
```   

### Related Blog Posts
- [Automate Deployment of React apps to AWS S3 using a CD Pipeline](https://rajrajhans.com/2020/08/automate-deployment-react-app-aws/)

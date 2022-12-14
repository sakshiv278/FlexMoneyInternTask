# Yoga Classes Registration Form
The form is build on MERN stack with React for the frontend and MongoDB as database. MERN Stack is one of the most popular stacks for building web applications.

![Screenshot (33)](https://user-images.githubusercontent.com/66488392/207627407-23002b26-af9e-4aa2-bbca-953c349a9c75.png)

## Front-end development

The front-end component uses React js as its main framework which handles user interactions and renders it.
Various input fields are taken to accept users data and validation is done.
### Assumptions for validation:
- Users name must contain atleast 5 characters
- Basic E-mail validation
- Users age must be between 18-65 years
- Batch selection is required


![Screenshot (34)](https://user-images.githubusercontent.com/66488392/207628640-74058c73-b135-4912-abe5-de9a444fcd3b.png)

## Back-end development

On successful validation of persons data the data is sent to the api and Payment is completed usong the mock function named CompletePayment().
The data is then sent to the MongoDB database using the Express server. MongoDB Atlas is used as a cloud database service.
On successful user registration a pop-up is shown which is implemented using Sweetalert2.

![Screenshot (35)](https://user-images.githubusercontent.com/66488392/207630295-94871a38-34d9-4ae3-b096-8ac3dc9b0413.png)

The data is sent to the MongoDB database collection.

![data](https://user-images.githubusercontent.com/66488392/207631371-e386dda6-18d8-4bb7-a266-2c71e44a4f33.PNG)

## Hosting and Deployment
The app is hosted on Render. Render is a cloud for developers to host and run applications.

###Entity- Relationship diagram
The Entity-Relationship model that can be used as reference is given.
![erdform](https://user-images.githubusercontent.com/66488392/207634135-b13d0e42-a20d-41b7-9aaf-8249a8c95927.PNG)


### Backend for the Internship Drive 2022 at BITS Pilani, Hyderabad Campus

#### Local Development

1. Install MongoDB Community Server for your OS from the MongoDB website.
2. Create a .env file based on .env.sample
3. Start the MongoDB server or use your Atlas Database. Atlas URI take precedence over the local server's URI. Modify `config.js` to change this preference. If you change this preference, change it to default before committing your changes. If the Atlas URI isn't specified, the local URI is used by default.
4. Install dependencies with `yarn`
5. Start development server with `yarn dev`

### Notes

1. An important design related decison: Now each route has an entry in the database with it's corresponding scopes. The array of scopes in the routes collection will be the shortest it can be and mostly contain the only highest level of authorisation needed and hence be small. The user might have multiple permissions and we check that the array routes.doc.scopes is a subarray of user.doc.accessScopes which guarantees that the user has a specific permission.

## **Routes**

### **Authentication**

1. POST register
2. POST login
3. POST verifyEmail
4. POST authorize

### **Company**

1. POST getCompany
2. POST addCompany

### **Payments**

1. POST createOrder
2. POST verifyPaymentWebhook
3. POST getPaymentSatus
4. POST saveOrder

### **Routes**

1. POST add

### **Users**

1. GET :id
2. GET admin/:id

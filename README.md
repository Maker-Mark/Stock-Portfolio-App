### Stock Portfolio App is a fullstack application for buying and tracking your stock portfolio. Deployed [here](https://oscar-stock-app.herokuapp.com/)!
 - Build with MongoDB, Express.js, React.js, Node.js 

### Features
---
   - Logging in / Logging out
      - JSON Web-tokens allow authenticated, timed sessions
   - Registering
      - New users can register and will be stored in the MongoDB database
         - Emails are checked for uniqueness 
    - Home 
	    - Displays your current cash balance, portfolio value and dynamic, real-time stock fluctuations for the day!
	    - The  buy form allows you to select a ticker symbol and quantity to purchase stocks.
		    - If you don't have enough cash, a notification is displayed
		- Search
			- The search box allows you to look up stocks via ticker or company name!
	- Transactions
		- The transaction page displays all your stock transactions, displaying the ticker symbol, quantity , price paid, and purchase date/time.
   

### Challenges 
---
   Alpha Advantage API
    - API keys are limited to 5 calls per 60 seconds.
    - As a result, a few api keys are used for different routes, and calls are randomized to prevent hitting the limit frequently. 
    
### Homepage
---
![enter image description here](https://i.imgur.com/JB4kHYl.png)


### View Your Transactions in One Place
---
![enter image description here](https://i.imgur.com/aGoLIH9.png)

### Logging In
---
![enter image description here](https://i.imgur.com/8n7OVA1.png)
### Register
---
![enter image description here](https://i.imgur.com/vlPQvhV.png)



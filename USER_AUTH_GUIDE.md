# User Authentication Flow - Complete Guide

## 🎉 Authentication is Working!

Your users can now sign in with Google and get a unique user ID.

## How it Works

### Frontend (React)
1. User clicks "Sign in with Google"
2. Cognito handles OAuth flow with Google
3. User is redirected back with JWT token
4. Token contains:
   ```json
   {
     "sub": "6408b498-60a1-703b-752f-d3bc8b2f760e",  // ← Unique user ID
     "email": "iamgautamr@gmail.com",
     "name": "gautam ramesh"
   }
   ```
5. AuthContext extracts and stores this data in `user` object

### Making API Calls from Frontend

Use the new `api.js` utility:

```javascript
import { portfolioAPI } from '../utils/api';

// Get user's portfolio (automatically includes JWT token)
const portfolio = await portfolioAPI.getPortfolio();

// Get user's trades
const trades = await portfolioAPI.getTrades();

// Execute a trade
await portfolioAPI.executeTrade({
  symbol: 'AAPL',
  action: 'buy',
  quantity: 10
});
```

The `api.js` utility automatically:
- Gets the JWT token from Cognito
- Adds `Authorization: Bearer <token>` header
- Sends request to your Lambda

### Backend (Lambda + Flask)

**Lambda Handler** (`lambda_handler.py`):
1. API Gateway validates JWT token via Cognito Authorizer
2. Extracts `sub` claim (user ID) from token
3. Passes it to Flask via `X-User-Id` header

**Flask API** (`trading_api.py`):

```python
from flask import request

@app.route('/api/portfolio', methods=['GET'])
def get_portfolio():
    # Get user_id from header (set by Lambda)
    user_id = request.headers.get('X-User-Id')
    
    if not user_id:
        return jsonify({'error': 'Unauthorized'}), 401
    
    # Query DynamoDB for this user's portfolio
    portfolio = portfolio_table.get_item(
        Key={'user_id': user_id}
    )
    
    return jsonify(portfolio)

@app.route('/api/trades', methods=['GET'])
def get_trades():
    user_id = request.headers.get('X-User-Id')
    
    if not user_id:
        return jsonify({'error': 'Unauthorized'}), 401
    
    # Query trades for this user
    trades = trades_table.query(
        KeyConditionExpression=Key('user_id').eq(user_id)
    )
    
    return jsonify(trades['Items'])

@app.route('/api/trade', methods=['POST'])
def execute_trade():
    user_id = request.headers.get('X-User-Id')
    
    if not user_id:
        return jsonify({'error': 'Unauthorized'}), 401
    
    data = request.json
    
    # Create trade record with user_id
    trade = {
        'user_id': user_id,  # ← User's unique ID from JWT
        'trade_id': str(uuid.uuid4()),
        'symbol': data['symbol'],
        'action': data['action'],
        'quantity': data['quantity'],
        'timestamp': datetime.now().isoformat()
    }
    
    # Save to DynamoDB
    trades_table.put_item(Item=trade)
    
    return jsonify({'success': True, 'trade': trade})
```

## DynamoDB Schema

Your tables should use `user_id` as the partition key:

**surge-portfolio table:**
```
user_id (String, Partition Key) - e.g., "6408b498-60a1-703b-752f-d3bc8b2f760e"
portfolio_data (Map) - { "AAPL": 100, "GOOGL": 50, ... }
total_value (Number)
last_updated (String)
```

**surge-trades table:**
```
user_id (String, Partition Key) - e.g., "6408b498-60a1-703b-752f-d3bc8b2f760e"
trade_id (String, Sort Key) - e.g., "abc123..."
symbol (String)
action (String) - "buy" or "sell"
quantity (Number)
price (Number)
timestamp (String)
```

## Testing

### 1. Check User ID in Console
After logging in, open browser console:
```
✅ User authenticated: {
  userId: '6408b498-60a1-703b-752f-d3bc8b2f760e',
  email: 'iamgautamr@gmail.com',
  name: 'gautam ramesh'
}
```

### 2. Test API Call
```javascript
import { portfolioAPI } from './utils/api';

// This will automatically include your JWT token
const result = await portfolioAPI.getPortfolio();
console.log(result);
```

### 3. Check Lambda Logs
In CloudWatch, you should see:
```
Authenticated user: 6408b498-60a1-703b-752f-d3bc8b2f760e
```

## Example: Update PortfolioPage Component

```javascript
import React, { useState, useEffect } from 'react';
import { portfolioAPI } from '../utils/api';
import { useAuth } from '../contexts/AuthContext';

const PortfolioPage = () => {
  const { user } = useAuth();
  const [portfolio, setPortfolio] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadPortfolio();
  }, []);

  const loadPortfolio = async () => {
    try {
      setLoading(true);
      const data = await portfolioAPI.getPortfolio();
      setPortfolio(data);
    } catch (error) {
      console.error('Error loading portfolio:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <div>Loading your portfolio...</div>;

  return (
    <div>
      <h1>Welcome, {user.name}!</h1>
      <p>Your User ID: {user.userId}</p>
      {/* Display portfolio data */}
    </div>
  );
};
```

## Security Notes

✅ **user_id is trustworthy** - It comes from the validated JWT token, not from the client
✅ **Can't be spoofed** - API Gateway validates the JWT signature
✅ **Never changes** - The `sub` claim is stable for the user's lifetime
✅ **Unique per user** - Guaranteed to be unique across all users

## Next Steps

1. **Update your Flask endpoints** to use `request.headers.get('X-User-Id')`
2. **Query DynamoDB with user_id** to get user-specific data
3. **Test with your actual user ID**: `6408b498-60a1-703b-752f-d3bc8b2f760e`
4. **Deploy the updated Lambda** with `./deploy.sh`

You're all set! 🚀 Each user now has their own personalized portfolio and trade history.

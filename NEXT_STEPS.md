# Next Steps - Surge Trading Platform

## ✅ Completed: Frontend Authentication UI

Your frontend now has complete authentication UI with protected routes! Here's what's been implemented:

### 1. Protected Routes System
- **PrivateRoute Component**: Automatically redirects unauthenticated users to `/login`
- **Protected Pages**:
  - `/portfolio` - Portfolio tracking
  - `/recommendations` - Today's trading recommendations  
  - `/performance` - Historical performance

### 2. Authentication UI Components
- **AuthBanner**: Landing page banner that encourages sign-in (now visible on homepage!)
- **LoginPage**: Beautiful login page with Google Sign-In button
- **Navigation**: Shows user info when logged in, sign in/out buttons
- **Loading States**: Smooth loading spinner during auth checks

### 3. Authentication Context
- Global auth state management via React Context
- Functions: `signInWithGoogle()`, `signOut()`, `getToken()`
- User object includes: `userId`, `email`, `name`, `token`

---

## 🚀 Required Setup Steps

### Step 1: Install AWS Amplify (5 minutes)

```bash
cd /Users/gautamramesh/Documents/projects/trading/strategies_2025/website/surge-trading-platform
npm install aws-amplify @aws-amplify/ui-react
```

### Step 2: Get Google OAuth Credentials (15 minutes)

Follow the guide in `GOOGLE_OAUTH_SETUP.md`:

1. Go to [Google Cloud Console](https://console.cloud.google.com)
2. Create a new project: "Surge Trading Platform"
3. Enable **Google+ API**
4. Configure OAuth consent screen
5. Create OAuth 2.0 credentials
6. You'll receive:
   - **Client ID**: `XXXXXXXXX.apps.googleusercontent.com`
   - **Client Secret**: `GOCSPX-XXXXXXXXXXXXXXXXX`

**Important**: Add these authorized redirect URIs:
- `http://localhost:3000/`
- `https://pluggedtogit.github.io/surge-trading-platform/`
- `https://surge-trading-XXXX.auth.us-east-1.amazoncognito.com/oauth2/idpresponse` *(will update after deployment)*

### Step 3: Update SAM Template (2 minutes)

Edit `backend/template.yaml` lines 91-102:

```yaml
GoogleIdentityProvider:
  Type: AWS::Cognito::UserPoolIdentityProvider
  Properties:
    ProviderName: Google
    ProviderType: Google
    UserPoolId: !Ref SurgeUserPool
    AttributeMapping:
      email: email
      name: name
    ProviderDetails:
      client_id: "YOUR_GOOGLE_CLIENT_ID_HERE"           # ← Add your Client ID
      client_secret: "YOUR_GOOGLE_CLIENT_SECRET_HERE"   # ← Add your Client Secret
      authorize_scopes: "profile email openid"
```

### Step 4: Deploy Backend to AWS (10 minutes)

```bash
cd /Users/gautamramesh/Documents/projects/trading/strategies_2025/website/surge-trading-platform/backend

# If AWS not configured yet:
./configure-aws.sh

# Deploy everything (Cognito, Lambda, API Gateway, DynamoDB)
./deploy.sh
```

**Watch for these outputs** (save them!):
- `UserPoolId`: `us-east-1_XXXXXXXXX`
- `UserPoolClientId`: `XXXXXXXXXXXXXXXXXXXX`
- `UserPoolDomain`: `surge-trading-XXXX.auth.us-east-1.amazoncognito.com`
- `ApiUrl`: `https://xyz.execute-api.us-east-1.amazonaws.com/prod`

### Step 5: Configure Frontend (5 minutes)

Edit `src/aws-config.js` with the CloudFormation outputs:

```javascript
const awsConfig = {
  Auth: {
    region: 'us-east-1',
    userPoolId: 'us-east-1_XXXXXXXXX',              // ← From CloudFormation
    userPoolWebClientId: 'XXXXXXXXXXXXXXXXXXXX',     // ← From CloudFormation
    oauth: {
      domain: 'surge-trading-XXXX.auth.us-east-1.amazoncognito.com',  // ← From CloudFormation
      scope: ['email', 'openid', 'profile'],
      redirectSignIn: 'https://pluggedtogit.github.io/surge-trading-platform/',
      redirectSignOut: 'https://pluggedtogit.github.io/surge-trading-platform/',
      responseType: 'code'
    }
  },
  API: {
    endpoints: [{
      name: 'SurgeAPI',
      endpoint: 'https://xyz.execute-api.us-east-1.amazonaws.com/prod'  // ← From CloudFormation
    }]
  }
};
```

### Step 6: Update Google OAuth Redirect URIs (2 minutes)

Go back to Google Cloud Console → Your OAuth Client → Add the Cognito domain:

```
https://surge-trading-XXXX.auth.us-east-1.amazoncognito.com/oauth2/idpresponse
```

### Step 7: Deploy Frontend (2 minutes)

```bash
cd /Users/gautamramesh/Documents/projects/trading/strategies_2025/website/surge-trading-platform
npm run deploy
```

---

## 🧪 Testing Your Authentication

### Test Flow:

1. **Visit Homepage**: `https://pluggedtogit.github.io/surge-trading-platform/`
   - Should see AuthBanner: "🔐 Sign in to access personalized features"
   - Navigation shows "🔐 Sign In" button

2. **Click Portfolio** (or any protected page)
   - Should redirect to `/login` page

3. **Click "Sign in with Google"**
   - Opens Google OAuth consent screen
   - Select your Google account
   - Grant permissions

4. **After Google Authentication**:
   - Redirects back to your app
   - AuthBanner changes to: "✅ Welcome back, [Your Name]!"
   - Navigation shows: "👤 [Your Name] | 🚪 Sign Out"

5. **Click Portfolio Again**
   - Now works! Shows your portfolio data
   - API calls include your JWT token
   - Backend knows your userId

6. **Click Sign Out**
   - Clears authentication
   - Redirects to homepage
   - AuthBanner returns to "Sign in" state

---

## 🔒 How Authentication Works

### User Flow:
```
User visits /portfolio
  → PrivateRoute checks: user logged in?
  → No → Redirect to /login
  → User clicks "Sign in with Google"
  → Google OAuth flow
  → Cognito receives code, creates JWT token
  → Token stored in browser (via Amplify)
  → User object populated with userId from JWT
  → PrivateRoute re-checks: user logged in?
  → Yes → Render /portfolio
```

### API Integration:
```javascript
// When calling your backend API:
const token = await getToken();
const response = await fetch('YOUR_API_URL/portfolio', {
  headers: {
    'Authorization': `Bearer ${token}`
  }
});

// Lambda receives request:
// 1. API Gateway validates JWT (via Cognito Authorizer)
// 2. Extracts userId from token claims
// 3. Lambda handler receives: event.requestContext.authorizer.claims.sub
// 4. Query DynamoDB with user_id = userId
// 5. Return user-specific data
```

---

## 💰 Costs (All in AWS Free Tier!)

- **Cognito**: Free for first 50,000 MAUs
- **Lambda**: 1M free requests/month
- **API Gateway**: 1M free requests/month
- **DynamoDB**: 25GB free storage
- **S3**: 5GB free storage

**Expected monthly cost**: $0 for development/small scale

---

## 🛠️ Key Files Reference

### Frontend Authentication:
- `src/contexts/AuthContext.js` - Global auth state
- `src/components/PrivateRoute.js` - Protected route wrapper
- `src/components/LoginPage.js` - Login UI
- `src/components/AuthBanner.js` - Landing page banner
- `src/components/Navigation.js` - User info display
- `src/App.js` - Route configuration
- `src/aws-config.js` - AWS Cognito configuration

### Backend Infrastructure:
- `backend/template.yaml` - CloudFormation template (Cognito + Lambda + API Gateway + DynamoDB)
- `backend/deploy.sh` - Deployment script
- `backend/lambda/` - Python Lambda functions

### Documentation:
- `GOOGLE_OAUTH_SETUP.md` - Google OAuth setup guide
- `AUTHENTICATION_COMPLETE.txt` - Architecture overview
- `NEXT_STEPS.md` - This file!

---

## 🆘 Troubleshooting

### Issue: "Amplify is not configured"
**Solution**: Make sure you've installed Amplify and configured `aws-config.js` with correct values.

### Issue: "Invalid redirect URI"
**Solution**: Ensure all redirect URIs are added to both Google OAuth client AND Cognito User Pool Client.

### Issue: "User not authenticated" after sign-in
**Solution**: Check browser console for errors. Verify `aws-config.js` has correct Cognito domain.

### Issue: CORS errors when calling API
**Solution**: Verify Lambda functions have CORS headers in responses:
```python
'Access-Control-Allow-Origin': '*'
'Access-Control-Allow-Headers': 'Content-Type,Authorization'
```

---

## 📞 Next Questions?

Once you complete these steps, you'll have:
✅ Fully functional Google SSO
✅ Protected routes requiring authentication
✅ User-specific portfolio data
✅ JWT-based API security

Let me know when you're ready to:
1. Test the authentication flow
2. Update API endpoints to use the JWT token
3. Implement portfolio data fetching with userId
4. Add more authentication features (email/password, password reset, etc.)

Happy deploying! 🚀

// AWS Cognito Configuration for Amplify v6
// Updated with deployed backend values

const awsConfig = {
  Auth: {
    Cognito: {
      userPoolId: 'us-east-1_uVcpjMFqN',
      userPoolClientId: '7c2mne1mabiemqt6hgi893dtem',
      loginWith: {
        oauth: {
          domain: 'surge-trading-377235610121.auth.us-east-1.amazoncognito.com',
          scopes: ['email', 'openid', 'profile'],
          redirectSignIn: ['https://pluggedtogit.github.io/surge-trading-platform/', 'http://localhost:3000/surge-trading-platform/'],
          redirectSignOut: ['https://pluggedtogit.github.io/surge-trading-platform/', 'http://localhost:3000/surge-trading-platform/'],
          responseType: 'code',
        },
      },
    },
  },
  API: {
    REST: {
      SurgeAPI: {
        endpoint: 'https://xsu0i40cv8.execute-api.us-east-1.amazonaws.com/prod',
        region: 'us-east-1',
      },
    },
  },
};

export default awsConfig;

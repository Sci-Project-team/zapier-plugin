# SMS Gateway Zapier Integration

A Zapier integration for sending SMS messages through the ESPing Gateway service. This integration allows you to automate SMS sending as part of your Zapier workflows.

## Features

- **Send SMS Action**: Send SMS messages to any phone number through the ESPing Gateway
- **Secure Authentication**: Username/password authentication with OAuth-style token management
- **Easy Integration**: Works seamlessly with 5000+ apps in the Zapier ecosystem

## Prerequisites

- Node.js (v14 or higher)
- npm or yarn
- Zapier CLI (`npm install -g zapier-platform-cli`)
- Access to ESPing Gateway service
- Valid ESPing Gateway credentials

## Installation

1. Clone this repository:
```bash
git clone <repository-url>
cd sms-gateway-app
```

2. Install dependencies:
```bash
npm install
```

3. Set up Zapier CLI (if not already done):
```bash
zapier login
```

## Development Setup

### 1. Link to Zapier Platform

If this is a new integration:
```bash
zapier register "SMS Gateway Integration"
```

If linking to an existing integration:
```bash
zapier link
```

### 2. Configure Environment

The integration uses the following endpoint configuration:
- **Base URL**: `https://2758-197-204-4-6.ngrok-free.app`
- **Auth Endpoint**: `/auth/login`
- **SMS Endpoint**: `/sms`

> **Note**: Update the URLs in `authentication.js` and `actions/send_sms.js` to point to your production ESPing Gateway instance.

### 3. Testing

Run the test suite:
```bash
zapier test
```

Test authentication:
```bash
zapier test --grep="auth"
```

### 4. Deploy

Push your integration to Zapier:
```bash
zapier push
```

## Usage

### Authentication Setup

Users will need to provide:
- **Username**: Their ESPing Gateway username
- **Password**: Their ESPing Gateway password

The integration handles token management automatically, obtaining and refreshing access tokens as needed.

### Send SMS Action

The integration provides a "Send SMS" action with the following inputs:

- **Phone Number** (required): Recipient's phone number in international format (e.g., +213794478998)
- **Message** (required): SMS message content

### Example Response

```json
{
  "phone_number": "+213794478998",
  "message": "Hello from Zapier!",
  "id": "90302d06-8f73-4808-9069-58ccbb64558a",
  "status": "sent",
  "created_at": "2025-06-08T02:21:39.058200",
  "updated_at": "2025-06-08T02:21:39.058200",
  "error_message": null
}
```

## Project Structure

```
sms-gateway-app/
├── actions/
│   └── send_sms.js          # SMS sending action
├── test/
│   └── example.test.js      # Test files
├── authentication.js        # Authentication configuration
├── index.js                # Main app configuration
├── package.json            # Dependencies and metadata
├── .zapierapprc            # Zapier app configuration
└── README.md               # This file
```

## Configuration Files

### `authentication.js`
Handles username/password authentication and token management.

### `actions/send_sms.js`
Defines the SMS sending action, including input fields and API integration.

### `index.js`
Main app configuration that combines authentication and actions.

## Development Guidelines

### Adding New Actions

1. Create a new file in the `actions/` directory
2. Follow the existing pattern in `send_sms.js`
3. Add the action to `index.js` in the `creates` object

### Testing

Add tests to the `test/` directory following Jest conventions:
```bash
zapier test --grep="your-test-name"
```

### Error Handling

The integration includes proper error handling for:
- Authentication failures (401 errors)
- Invalid requests
- Network issues

## API Integration Details

### Authentication Flow
1. User provides username/password
2. Integration exchanges credentials for access token via `/auth/login`
3. Token is used for subsequent API calls
4. Token is automatically refreshed as needed

### SMS Sending
- **Method**: POST
- **Endpoint**: `/sms`
- **Headers**: 
  - `Authorization: Bearer {access_token}`
  - `Content-Type: application/json`
- **Body**: JSON with `phone_number` and `message`

## Troubleshooting

### Common Issues

1. **Authentication Errors**
   - Verify username/password credentials
   - Check that the auth endpoint is accessible
   - Ensure ESPing Gateway service is running

2. **SMS Sending Failures**
   - Verify phone number format (include country code)
   - Check message length limits
   - Ensure sufficient account balance/credits

3. **Connection Issues**
   - Update URLs from ngrok to production endpoints
   - Verify network connectivity
   - Check firewall settings

### Debug Mode

Enable debug logging:
```bash
zapier logs --type=console --detailed
```

## Production Deployment

Before deploying to production:

1. **Update URLs**: Replace ngrok URLs with production endpoints
2. **Environment Variables**: Use proper environment configuration
3. **Error Handling**: Ensure robust error handling for production scenarios
4. **Rate Limiting**: Implement appropriate rate limiting
5. **Monitoring**: Set up logging and monitoring

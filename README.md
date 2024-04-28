# Gateway

The Gateway serves as a REST endpoint, forwarding incoming events to a Lambda function. This Lambda function serializes and transforms the incoming event into the required shape/form before sending it to EventBridge. EventBridge then applies forwarding rules based on predefined configurations.

```bash
POST https://webform.${baseUrl}/${email}
```

![email](/docs/gateway-lambda-eventbridge.png)

# Forwarding

EventBridge rules will direct events to the appropriate topics, which currently correspond to client identifiers. Initially, these identifiers will be the target email addresses, but in the future, they may be normalized IDs from database records.

Each topic will be subscribed by an Amazon SQS queue. This queue acts as an ingress point for a Lambda function, which independently polls the queue according to defined batch size and time frames.

The Lambda function integrates with a mailer client (implemented as a class interface to SendGrid) to send emails containing information from web forms to the respective client's email address.

![forwarding](/docs/eb-sns-sqs-lambda-poll.png)

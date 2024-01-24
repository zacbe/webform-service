const eventbridge = Object.freeze({
  region: process.env.REGION,
  eventBusArn: process.env.EVENT_BUS_ARN,
});

export default eventbridge;

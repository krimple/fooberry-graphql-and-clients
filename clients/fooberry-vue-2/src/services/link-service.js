import {WebSocketLink} from "apollo-link-ws";
import {SubscriptionClient} from "subscriptions-transport-ws";

const GRAPHQL_ENDPOINT = 'ws://localhost:4000';

const client = new SubscriptionClient(GRAPHQL_ENDPOINT, {
  reconnect: true
});

const link = new WebSocketLink(client);

export default link;

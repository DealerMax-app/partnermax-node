# Auth

Types:

- <code><a href="./src/resources/auth.ts">AuthLoginResponse</a></code>

Methods:

- <code title="post /v1/auth/login">client.auth.<a href="./src/resources/auth.ts">login</a>({ ...params }) -> AuthLoginResponse</code>

# Keys

Types:

- <code><a href="./src/resources/keys.ts">KeyListResponse</a></code>
- <code><a href="./src/resources/keys.ts">KeyIssueResponse</a></code>

Methods:

- <code title="get /v1/keys">client.keys.<a href="./src/resources/keys.ts">list</a>() -> KeyListResponse</code>
- <code title="post /v1/keys/issue">client.keys.<a href="./src/resources/keys.ts">issue</a>({ ...params }) -> KeyIssueResponse</code>
- <code title="delete /v1/keys/{key_id}">client.keys.<a href="./src/resources/keys.ts">revoke</a>(keyID) -> void</code>

# Dealers

Types:

- <code><a href="./src/resources/dealers/dealers.ts">DealerDetail</a></code>
- <code><a href="./src/resources/dealers/dealers.ts">DealerSummary</a></code>
- <code><a href="./src/resources/dealers/dealers.ts">DealerListResponse</a></code>

Methods:

- <code title="post /v1/dealers">client.dealers.<a href="./src/resources/dealers/dealers.ts">create</a>({ ...params }) -> DealerDetail</code>
- <code title="get /v1/dealers/{dealer_id}">client.dealers.<a href="./src/resources/dealers/dealers.ts">retrieve</a>(dealerID) -> DealerDetail</code>
- <code title="patch /v1/dealers/{dealer_id}">client.dealers.<a href="./src/resources/dealers/dealers.ts">update</a>(dealerID, { ...params }) -> DealerDetail</code>
- <code title="get /v1/dealers">client.dealers.<a href="./src/resources/dealers/dealers.ts">list</a>({ ...params }) -> DealerListResponse</code>
- <code title="delete /v1/dealers/{dealer_id}">client.dealers.<a href="./src/resources/dealers/dealers.ts">delete</a>(dealerID) -> void</code>

## NltSettings

Types:

- <code><a href="./src/resources/dealers/nlt-settings.ts">DownPaymentTiers</a></code>
- <code><a href="./src/resources/dealers/nlt-settings.ts">NltSettings</a></code>

Methods:

- <code title="get /v1/dealers/{dealer_id}/nlt-settings">client.dealers.nltSettings.<a href="./src/resources/dealers/nlt-settings.ts">retrieve</a>(dealerID) -> NltSettings</code>
- <code title="patch /v1/dealers/{dealer_id}/nlt-settings">client.dealers.nltSettings.<a href="./src/resources/dealers/nlt-settings.ts">update</a>(dealerID, { ...params }) -> NltSettings</code>

## Nlt

### Offers

Types:

- <code><a href="./src/resources/dealers/nlt/offers.ts">NltOfferSummary</a></code>
- <code><a href="./src/resources/dealers/nlt/offers.ts">OfferRetrieveResponse</a></code>
- <code><a href="./src/resources/dealers/nlt/offers.ts">OfferListResponse</a></code>

Methods:

- <code title="get /v1/dealers/{dealer_id}/nlt/offers/{offer_id}">client.dealers.nlt.offers.<a href="./src/resources/dealers/nlt/offers.ts">retrieve</a>(offerID, { ...params }) -> OfferRetrieveResponse</code>
- <code title="get /v1/dealers/{dealer_id}/nlt/offers">client.dealers.nlt.offers.<a href="./src/resources/dealers/nlt/offers.ts">list</a>(dealerID, { ...params }) -> OfferListResponse</code>

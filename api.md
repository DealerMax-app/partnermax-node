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

Methods:

- <code title="get /v1/dealers/{dealer_id}">client.dealers.<a href="./src/resources/dealers/dealers.ts">retrieve</a>(dealerID) -> DealerDetail</code>
- <code title="patch /v1/dealers/{dealer_id}">client.dealers.<a href="./src/resources/dealers/dealers.ts">update</a>(dealerID, { ...params }) -> DealerDetail</code>
- <code title="get /v1/dealers">client.dealers.<a href="./src/resources/dealers/dealers.ts">list</a>({ ...params }) -> DealerSummariesCursorPage</code>
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

Methods:

- <code title="get /v1/dealers/{dealer_id}/nlt/offers/{offer_id}">client.dealers.nlt.offers.<a href="./src/resources/dealers/nlt/offers.ts">retrieve</a>(offerID, { ...params }) -> OfferRetrieveResponse</code>
- <code title="get /v1/dealers/{dealer_id}/nlt/offers">client.dealers.nlt.offers.<a href="./src/resources/dealers/nlt/offers.ts">list</a>(dealerID, { ...params }) -> NltOfferSummariesCursorPage</code>

## Vehicles

Types:

- <code><a href="./src/resources/dealers/vehicles/vehicles.ts">AIContent</a></code>
- <code><a href="./src/resources/dealers/vehicles/vehicles.ts">BulkCreateVehiclesResponse</a></code>
- <code><a href="./src/resources/dealers/vehicles/vehicles.ts">BulkRowOutcome</a></code>
- <code><a href="./src/resources/dealers/vehicles/vehicles.ts">VehicleDetail</a></code>
- <code><a href="./src/resources/dealers/vehicles/vehicles.ts">VehicleList</a></code>
- <code><a href="./src/resources/dealers/vehicles/vehicles.ts">VehicleSummary</a></code>

Methods:

- <code title="post /v1/dealers/{dealer_id}/vehicles">client.dealers.vehicles.<a href="./src/resources/dealers/vehicles/vehicles.ts">create</a>(dealerID, { ...params }) -> VehicleDetail</code>
- <code title="get /v1/dealers/{dealer_id}/vehicles/{vehicle_id}">client.dealers.vehicles.<a href="./src/resources/dealers/vehicles/vehicles.ts">retrieve</a>(vehicleID, { ...params }) -> VehicleDetail</code>
- <code title="patch /v1/dealers/{dealer_id}/vehicles/{vehicle_id}">client.dealers.vehicles.<a href="./src/resources/dealers/vehicles/vehicles.ts">update</a>(vehicleID, { ...params }) -> VehicleDetail</code>
- <code title="get /v1/dealers/{dealer_id}/vehicles">client.dealers.vehicles.<a href="./src/resources/dealers/vehicles/vehicles.ts">list</a>(dealerID, { ...params }) -> VehicleSummariesCursorPage</code>
- <code title="delete /v1/dealers/{dealer_id}/vehicles/{vehicle_id}">client.dealers.vehicles.<a href="./src/resources/dealers/vehicles/vehicles.ts">delete</a>(vehicleID, { ...params }) -> void</code>
- <code title="post /v1/dealers/{dealer_id}/vehicles/bulk">client.dealers.vehicles.<a href="./src/resources/dealers/vehicles/vehicles.ts">bulk</a>(dealerID, { ...params }) -> BulkCreateVehiclesResponse</code>

### Images

Types:

- <code><a href="./src/resources/dealers/vehicles/images.ts">VehicleImage</a></code>
- <code><a href="./src/resources/dealers/vehicles/images.ts">VehicleImageList</a></code>

Methods:

- <code title="post /v1/dealers/{dealer_id}/vehicles/{vehicle_id}/images">client.dealers.vehicles.images.<a href="./src/resources/dealers/vehicles/images.ts">create</a>(vehicleID, { ...params }) -> VehicleImage</code>
- <code title="get /v1/dealers/{dealer_id}/vehicles/{vehicle_id}/images">client.dealers.vehicles.images.<a href="./src/resources/dealers/vehicles/images.ts">list</a>(vehicleID, { ...params }) -> VehicleImageList</code>
- <code title="delete /v1/dealers/{dealer_id}/vehicles/{vehicle_id}/images/{image_id}">client.dealers.vehicles.images.<a href="./src/resources/dealers/vehicles/images.ts">delete</a>(imageID, { ...params }) -> void</code>

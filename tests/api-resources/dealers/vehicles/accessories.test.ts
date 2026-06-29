// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import Partnermax from 'partnermax';

const client = new Partnermax({
  apiKey: 'My API Key',
  baseURL: process.env['TEST_API_BASE_URL'] ?? 'http://127.0.0.1:4010',
});

describe('resource accessories', () => {
  // Mock server tests are disabled
  test.skip('update: only required params', async () => {
    const responsePromise = client.dealers.vehicles.accessories.update('vehicle_id', {
      dealer_id: 'dealer_id',
    });
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  // Mock server tests are disabled
  test.skip('update: required and optional params', async () => {
    const response = await client.dealers.vehicles.accessories.update('vehicle_id', {
      dealer_id: 'dealer_id',
      alloy_wheel_size: 13,
      equipment_ids: ['string'],
      optional_ids: ['string'],
      package_ids: ['string'],
    });
  });

  // Mock server tests are disabled
  test.skip('refreshCatalog: only required params', async () => {
    const responsePromise = client.dealers.vehicles.accessories.refreshCatalog('vehicle_id', {
      dealer_id: 'dealer_id',
    });
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  // Mock server tests are disabled
  test.skip('refreshCatalog: required and optional params', async () => {
    const response = await client.dealers.vehicles.accessories.refreshCatalog('vehicle_id', {
      dealer_id: 'dealer_id',
    });
  });

  // Mock server tests are disabled
  test.skip('retrieveCatalog: only required params', async () => {
    const responsePromise = client.dealers.vehicles.accessories.retrieveCatalog('vehicle_id', {
      dealer_id: 'dealer_id',
    });
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  // Mock server tests are disabled
  test.skip('retrieveCatalog: required and optional params', async () => {
    const response = await client.dealers.vehicles.accessories.retrieveCatalog('vehicle_id', {
      dealer_id: 'dealer_id',
    });
  });
});

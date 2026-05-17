// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import Partnermax from 'partnermax';

const client = new Partnermax({
  apiKey: 'My API Key',
  baseURL: process.env['TEST_API_BASE_URL'] ?? 'http://127.0.0.1:4010',
});

describe('resource offers', () => {
  // Mock server tests are disabled
  test.skip('retrieve: only required params', async () => {
    const responsePromise = client.dealers.nlt.offers.retrieve('offer_id', { dealer_id: 'dealer_id' });
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  // Mock server tests are disabled
  test.skip('retrieve: required and optional params', async () => {
    const response = await client.dealers.nlt.offers.retrieve('offer_id', { dealer_id: 'dealer_id' });
  });

  // Mock server tests are disabled
  test.skip('list', async () => {
    const responsePromise = client.dealers.nlt.offers.list('dealer_id');
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  // Mock server tests are disabled
  test.skip('list: request options and params are passed correctly', async () => {
    // ensure the request options are being passed correctly by passing an invalid HTTP method in order to cause an error
    await expect(
      client.dealers.nlt.offers.list(
        'dealer_id',
        {
          brand: 'brand',
          canone_max_eur: 50,
          cursor: 'cursor',
          duration_months: 24,
          fuel_type: 'fuel_type',
          km_per_year: 10000,
          limit: 1,
          segment: 'segment',
        },
        { path: '/_stainless_unknown_path' },
      ),
    ).rejects.toThrow(Partnermax.NotFoundError);
  });
});

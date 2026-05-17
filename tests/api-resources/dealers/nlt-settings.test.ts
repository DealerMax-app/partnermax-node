// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import Partnermax from 'partnermax';

const client = new Partnermax({
  apiKey: 'My API Key',
  baseURL: process.env['TEST_API_BASE_URL'] ?? 'http://127.0.0.1:4010',
});

describe('resource nltSettings', () => {
  // Mock server tests are disabled
  test.skip('retrieve', async () => {
    const responsePromise = client.dealers.nltSettings.retrieve('dealer_id');
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  // Mock server tests are disabled
  test.skip('update: only required params', async () => {
    const responsePromise = client.dealers.nltSettings.update('dealer_id', {
      agency_markup_percent: 3.5,
      down_payment_tiers: {
        high_eur: 6000,
        low_eur: 0,
        medium_eur: 3000,
      },
      vat_treatment: 'private',
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
    const response = await client.dealers.nltSettings.update('dealer_id', {
      agency_markup_percent: 3.5,
      down_payment_tiers: {
        high_eur: 6000,
        low_eur: 0,
        medium_eur: 3000,
      },
      vat_treatment: 'private',
      currency: 'EUR',
      'Idempotency-Key': '182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e',
    });
  });
});

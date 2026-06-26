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
      agency_markup_percent: 0,
      down_payment_tiers: {
        high: { fixed_eur: 0, percent_of_list: 0 },
        low: { fixed_eur: 0, percent_of_list: 0 },
        medium: { fixed_eur: 0, percent_of_list: 0 },
      },
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
      agency_markup_percent: 0,
      down_payment_tiers: {
        high: { fixed_eur: 0, percent_of_list: 0 },
        low: { fixed_eur: 0, percent_of_list: 0 },
        medium: { fixed_eur: 0, percent_of_list: 0 },
      },
      currency: 'EUR',
      image_mode: 'branded',
      image_scenario_locked: 'mediterraneo',
      'Idempotency-Key': 'Idempotency-Key',
    });
  });
});

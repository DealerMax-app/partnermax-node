// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import Partnermax from 'partnermax';

const client = new Partnermax({
  apiKey: 'My API Key',
  baseURL: process.env['TEST_API_BASE_URL'] ?? 'http://127.0.0.1:4010',
});

describe('resource vehicles', () => {
  // Mock server tests are disabled
  test.skip('create: only required params', async () => {
    const responsePromise = client.dealers.vehicles.create('dealer_id', {
      certified_km: 0,
      cost_price_eur: 100,
      motornet_code: 'xxxx',
      plate: '26F1KLZN',
      registration_year: 1960,
      sale_price_eur: 100,
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
  test.skip('create: required and optional params', async () => {
    const response = await client.dealers.vehicles.create('dealer_id', {
      certified_km: 0,
      cost_price_eur: 100,
      motornet_code: 'xxxx',
      plate: '26F1KLZN',
      registration_year: 1960,
      sale_price_eur: 100,
      alloy_wheel_size: 13,
      color: 'color',
      description: 'description',
      extended_warranty_enabled: true,
      extended_warranty_months: 1,
      inspection_expiry_date: '2019-12-27',
      is_for_sale: true,
      is_visible: true,
      last_service_date: '2019-12-27',
      last_service_km: 0,
      last_service_notes: 'last_service_notes',
      notes: 'notes',
      previous_owner_count: 0,
      previous_ownership_transfer_date: '2019-12-27',
      registration_month: 1,
      road_tax_expiry_date: '2019-12-27',
      vat_displayed: true,
      vehicle_damaged: true,
      vin: 'PTNLCJPPNYGP316PJ',
      'Idempotency-Key': 'Idempotency-Key',
    });
  });

  // Mock server tests are disabled
  test.skip('retrieve: only required params', async () => {
    const responsePromise = client.dealers.vehicles.retrieve('vehicle_id', { dealer_id: 'dealer_id' });
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
    const response = await client.dealers.vehicles.retrieve('vehicle_id', {
      dealer_id: 'dealer_id',
      include_deleted: true,
    });
  });

  // Mock server tests are disabled
  test.skip('update: only required params', async () => {
    const responsePromise = client.dealers.vehicles.update('vehicle_id', { dealer_id: 'dealer_id' });
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
    const response = await client.dealers.vehicles.update('vehicle_id', {
      dealer_id: 'dealer_id',
      alloy_wheel_size: 13,
      certified_km: 0,
      color: 'color',
      cost_price_eur: 100,
      description: 'description',
      extended_warranty_enabled: true,
      extended_warranty_months: 1,
      inspection_expiry_date: '2019-12-27',
      is_for_sale: true,
      is_visible: true,
      last_service_date: '2019-12-27',
      last_service_km: 0,
      last_service_notes: 'last_service_notes',
      notes: 'notes',
      previous_owner_count: 0,
      previous_ownership_transfer_date: '2019-12-27',
      registration_month: 1,
      road_tax_expiry_date: '2019-12-27',
      sale_price_eur: 100,
      vat_displayed: true,
      vehicle_damaged: true,
      'Idempotency-Key': 'Idempotency-Key',
    });
  });

  // Mock server tests are disabled
  test.skip('list', async () => {
    const responsePromise = client.dealers.vehicles.list('dealer_id');
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
      client.dealers.vehicles.list(
        'dealer_id',
        {
          cursor: 'cursor',
          include_deleted: true,
          is_for_sale: true,
          is_visible: true,
          limit: 1,
        },
        { path: '/_stainless_unknown_path' },
      ),
    ).rejects.toThrow(Partnermax.NotFoundError);
  });

  // Mock server tests are disabled
  test.skip('delete: only required params', async () => {
    const responsePromise = client.dealers.vehicles.delete('vehicle_id', { dealer_id: 'dealer_id' });
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  // Mock server tests are disabled
  test.skip('delete: required and optional params', async () => {
    const response = await client.dealers.vehicles.delete('vehicle_id', { dealer_id: 'dealer_id' });
  });

  // Mock server tests are disabled
  test.skip('bulk: only required params', async () => {
    const responsePromise = client.dealers.vehicles.bulk('dealer_id', {
      vehicles: [
        {
          certified_km: 0,
          cost_price_eur: 100,
          motornet_code: 'xxxx',
          plate: '26F1KLZN',
          registration_year: 1960,
          sale_price_eur: 100,
        },
      ],
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
  test.skip('bulk: required and optional params', async () => {
    const response = await client.dealers.vehicles.bulk('dealer_id', {
      vehicles: [
        {
          certified_km: 0,
          cost_price_eur: 100,
          motornet_code: 'xxxx',
          plate: '26F1KLZN',
          registration_year: 1960,
          sale_price_eur: 100,
          alloy_wheel_size: 13,
          color: 'color',
          description: 'description',
          extended_warranty_enabled: true,
          extended_warranty_months: 1,
          inspection_expiry_date: '2019-12-27',
          is_for_sale: true,
          is_visible: true,
          last_service_date: '2019-12-27',
          last_service_km: 0,
          last_service_notes: 'last_service_notes',
          notes: 'notes',
          previous_owner_count: 0,
          previous_ownership_transfer_date: '2019-12-27',
          registration_month: 1,
          road_tax_expiry_date: '2019-12-27',
          vat_displayed: true,
          vehicle_damaged: true,
          vin: 'PTNLCJPPNYGP316PJ',
        },
      ],
      'Idempotency-Key': 'Idempotency-Key',
    });
  });
});

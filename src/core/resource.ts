// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import type { Partnermax } from '../client';

export abstract class APIResource {
  protected _client: Partnermax;

  constructor(client: Partnermax) {
    this._client = client;
  }
}

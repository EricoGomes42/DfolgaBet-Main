import { NormalizedOddsEvent } from '../types';

export interface OddsProviderRequest {
  sport: string;
  regions: string;
  markets: string;
  apiKey: string;
}

export interface OddsProvider {
  readonly name: string;
  getOdds(request: OddsProviderRequest): Promise<NormalizedOddsEvent[]>;
}

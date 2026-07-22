import { OddsProviderRequest } from './providers/OddsProvider';
import { NormalizedOddsEvent } from './types';
import { OddsProviderFactory } from './providers/OddsProviderFactory';

export class OddsService {
  async getOdds(params: OddsProviderRequest): Promise<NormalizedOddsEvent[]> {
    const provider = OddsProviderFactory.getProvider();
    return provider.getOdds(params);
  }
}

export const oddsService = new OddsService();

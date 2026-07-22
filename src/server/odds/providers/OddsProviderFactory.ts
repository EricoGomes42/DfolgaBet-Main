import { OddsProvider } from './OddsProvider';
import { TheOddsApiProvider } from './TheOddsApiProvider';
import { OddsApiIoProvider } from './OddsApiIoProvider';

export class OddsProviderFactory {
  static getProvider(): OddsProvider {
    const providerName = process.env.ODDS_PROVIDER; console.log("ODDS_PROVIDER is:", providerName);
    
    if (providerName === 'odds-api-io') {
      return new OddsApiIoProvider();
    }
    
    if (providerName === 'the-odds-api') {
      return new TheOddsApiProvider();
    }
    
    // Fallback for missing, empty or unknown
    return new TheOddsApiProvider();
  }
}

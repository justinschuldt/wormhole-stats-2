import { ChainIDs, chainIDs } from '../utils/consts';

export interface VAA {
    Version: number | string,
    GuardianSetIndex: number,
    Signatures: { Index: number, Signature: string }[],
    Timestamp: string, // "0001-01-01T00:00:00Z",
    Nonce: number,
    Sequence: number,
    ConsistencyLevel: number,
    EmitterChain: number,
    EmitterAddress: string,
    Payload: string // base64 encoded byte array
}
export interface TokenTransferPayload {
    Amount: string
    OriginAddress: string
    OriginChain: string,
    TargetAddress: string,
    TargetChain: string,
}
export interface TransferDetails {
    Amount: string,             // "1530.000000",
    Decimals: string,           // "6",
    NotionalUSDStr: string,     // "1538.495460",
    TokenPriceUSDStr: string,   // "1.005553",
    TransferTimestamp: string,  // "2021-11-21 16:55:15 +0000 UTC",
    OriginSymbol: string,
    OriginName: string,
    OriginTokenAddress: string,
}
export interface BigTableMessage {
    InitiatingTxID?: string
    SignedVAABytes?: string  // base64 encoded byte array
    SignedVAA?: VAA
    QuorumTime?: string  // "2021-08-11 00:16:11.757 +0000 UTC"
    EmitterChain: keyof ChainIDs
    EmitterAddress: string
    Sequence: string
    TokenTransferPayload?: TokenTransferPayload
    TransferDetails?: TransferDetails
}

export interface Totals {
  LastDayCount: { [groupByKey: string]: number };
  TotalCount: { [groupByKey: string]: number };
  DailyTotals: {
    // "2021-08-22": { "*": 0 },
    [date: string]: { [groupByKey: string]: number };
  };
}
// type GroupByKey = "*" | "emitterChain" | "emitterChain:emitterAddress"
export interface Recent {
  [groupByKey: string]: Array<BigTableMessage>;
}
export interface BidirectionalTransferData {
  [leavingChainId: string]: {
    [destinationChainId: string]: {
      [tokenSymbol: string]: number;
    };
  };
}
export interface NotionalTransferred {
  Last24Hours: BidirectionalTransferData;
  WithinPeriod: BidirectionalTransferData;
  PeriodDurationDays: Number;
  Daily: {
    [date: string]: BidirectionalTransferData;
  };
}
export interface DirectionalTransferData {
  [chainId: string]: {
    [tokenSymbol: string]: number;
  };
}
export interface DirectionalAddressTransferAmounts {
  [chainId: string]: {
    [address: string]: number
  }
}
export interface DirectionalAddressTransferCounts {
  [chainId: string]: number

}
export interface NotionalTransferredTo {
  Last24Hours: DirectionalTransferData;
  WithinPeriod: DirectionalTransferData;
  PeriodDurationDays: Number;
  Daily: {
    [date: string]: DirectionalTransferData;
  };
}
export interface NotionalTransferredToCumulative {
  AllTime: DirectionalTransferData;
  AllTimeDurationDays: Number;
  Daily: {
    [date: string]: DirectionalTransferData;
  };
}
export interface LockedAsset {
  Symbol: string
  Name: string
  Address: string
  CoinGeckoId: string
  Amount: number
  Notional: number
  TokenPrice: number
}
export interface LockedAssets {
  [tokenAddress: string]: LockedAsset
}
export interface ChainsAssets {
  [chainId: string]: LockedAssets
}
export interface NotionalTvl {
  Last24HoursChange: ChainsAssets
  AllTime: ChainsAssets
}
export interface NotionalTvlCumulative {
  Last24HoursChange: ChainsAssets
  AllTime: ChainsAssets
  DailyLocked: {
    [date: string]: ChainsAssets
  }
}
export interface AddressesTransferredToCumulative {
  AllTimeAmounts: DirectionalAddressTransferAmounts
  AllTimeCounts: DirectionalAddressTransferCounts
  AllTimeDurationDays: Number
  DailyAmounts: {
    [date: string]: DirectionalAddressTransferAmounts
  }
  DailyCounts: {
    [date: string]: DirectionalAddressTransferCounts
  }
}

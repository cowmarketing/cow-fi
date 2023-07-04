import fs from 'fs'
import path from 'path'
import { PlatformData, Platforms, TokenDetails, TokenInfo } from 'types'
import { backOff } from 'exponential-backoff'

const NETWORKS = ['ethereum', 'xdai']
const COW_TOKEN_ID = 'cow-protocol'

// const TOKENS_PATH = path.join(process.cwd(), 'data', 'tokens.json')
const DESCRIPTIONS_DIR_PATH = path.join(process.cwd(), 'data', 'descriptions')

/**
 *
 * @returns All token ids
 */
export async function getTokensIds(): Promise<string[]> {
  const tokensRaw = await _getAllTokensData()
  return tokensRaw.map(({ id }) => id)
}

/**
 *
 * @returns All token info sorted by market cap, with COW at the top
 */
export async function getTokensInfo(): Promise<TokenInfo[]> {
  const tokensRaw = await _getAllTokensData()
  const tokens = tokensRaw.map(_toTokenInfo)

  let sortedTokens = tokens.sort(_sortTokensInfoByMarketCap)

  // Move COW at the top
  sortedTokens.unshift(
    tokens.splice(
      tokens.findIndex((item) => item.id === COW_TOKEN_ID),
      1
    )[0]
  )

  return sortedTokens
}

/**
 *
 * @param coingeckoId id of the token
 *
 * @returns token details for the given token id
 */
export async function getTokenDetails(coingeckoId: string): Promise<TokenDetails> {
  const id = coingeckoId.toLowerCase()
  const tokensRaw = await _getAllTokensData()
  return tokensRaw.find(({ id: _id }) => _id === id)
}

function _getDescriptionFilePaths(): string[] {
  return fs.readdirSync(DESCRIPTIONS_DIR_PATH, 'utf-8')
}

async function fetchWithBackoff(url) {
  return backOff(
    () => {
      console.log(`Fetching ${url}`)
      return fetch(url).then((res) => {
        if (!res.ok) {
          throw new Error(`Error fetching list ${url}: Error ${res.status}, ${res.statusText}`)
        }

        return res.json()
      })
    },
    {
      retry: (e, attemptNum) => {
        console.log(`Error fetching ${url}, attempt ${attemptNum}. Retrying soon...`, e)
        return true
      },
    }
  )
}

function _getTokensRawInfo(): Promise<any[]> {
  // const tokenJson = fs.readFileSync(TOKENS_PATH, 'utf-8')
  // const tokenData = JSON.parse(tokenJson)

  // return tokenData
  return fetchWithBackoff('https://raw.githubusercontent.com/cowprotocol/cow-fi/develop/data/tokens.json')
}

async function _getAllTokensData(): Promise<TokenDetails[]> {
  const tokenRawData = await _getTokensRawInfo()

  // Get manual descriptions
  const descriptionFilePaths = _getDescriptionFilePaths()
  const descriptionFiles = descriptionFilePaths.map((f) => f.replace('.md', ''))

  // Enhance description and transform to token details
  const tokens = tokenRawData
    .map((token) => {
      if (!descriptionFiles.includes(token.id)) {
        return undefined
      }

      const description = _getTokenDescription(token.id)

      return _toTokenDetails(token, description)
    })
    .filter(Boolean) // Not falsy

  return tokens
}

function _getTokenDescription(id: string): string {
  const filePath = path.join(DESCRIPTIONS_DIR_PATH, `${id}.md`)
  return fs.readFileSync(filePath, 'utf-8')
}

function _toTokenDetails(token: any, description: string): TokenDetails {
  // Add platform information
  const detailPlatforms = token.detail_platforms

  const platforms = NETWORKS.reduce<Platforms>((acc, network) => {
    const platformRaw = detailPlatforms[network]
    if (platformRaw) {
      acc[network] = _toPlatform(platformRaw)
    }

    return acc
  }, {})

  // Return the details
  const marketData = token.market_data
  return {
    id: token.id,
    name: token.name,
    symbol: token.symbol?.toUpperCase(),
    description,
    // description: description || token?.description?.en || token?.ico_data?.desc || '-', // Replicate old behavior (but not needed, since manual description is always required, leaving for now to double check with Nenad)
    marketCapRank: token.market_cap_rank,
    marketCap: marketData?.market_cap?.usd ?? null,
    allTimeHigh: marketData?.ath.usd ?? null,
    allTimeLow: marketData?.atl.usd ?? null,
    volume: marketData?.total_volume?.usd ?? null,
    priceUsd: marketData?.current_price?.usd ?? null,
    change24h: marketData?.price_change_percentage_24h ?? null,
    image: {
      large: token?.image?.large ?? null,
    },
    platforms,
  }
}

function _toTokenInfo(token: TokenDetails): TokenInfo {
  const { id, name, symbol, image, marketCapRank, priceUsd, change24h, volume, marketCap } = token

  return { id, name, symbol, image, marketCapRank, priceUsd, change24h, volume, marketCap }
}

function _toPlatform(platform: any): PlatformData {
  return {
    contractAddress: platform.contract_address || '',
    decimalPlace: platform.decimal_place || 18,
  }
}
function _sortTokensInfoByMarketCap(a: TokenInfo, b: TokenInfo): number {
  // Sort by market cap
  if (a.marketCapRank === null) {
    return 1 // always place nulls last
  }
  if (b.marketCapRank === null) {
    return -1 // always place nulls last
  }
  return a.marketCapRank - b.marketCapRank // usual comparison
}

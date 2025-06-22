import type { UTXOBlock } from 'types/api/qitmeer_block';
import type { UTXOTransaction } from 'types/api/qitmeer_tx';

// 生成50条区块假数据
export const MOCK_BLOCKS: Array<UTXOBlock> = Array.from({ length: 50 }, (_, index) => ({
  block_order: 4690107 - index,
  height: 8114015 - index,
  coinbase: Math.floor(Math.random() * 5) + 1,
  timestamp: new Date(Date.now() - index * 300000).toISOString(), // 每5分钟一个区块
  tx_count: Math.floor(Math.random() * 10) + 1,
  miner_hash: index % 2 === 0 ? 'meer_xkeccak_v1' : 'meer_blake2bd_v1',
  hash: `${ Math.random().toString(36).substring(2, 10) }...${ Math.random().toString(36).substring(2, 10) }`,
  pow_name: index % 2 === 0 ? 'meer_xkeccak_v1' : 'meer_blake2bd_v1',
  difficulty: (520198386 + Math.floor(Math.random() * 1000000)).toString(),
  parent_root: '4569f8cc58942ed2c9e3c279bb483241d2bf3031d3b9202f61d79bc142f7a4af',
  status: index < 45 ? '已确认' : '确认中',
  nonce: 123456 + index,
}));

// 生成50条交易假数据
export const MOCK_TRANSACTIONS: Array<UTXOTransaction> = Array.from({ length: 50 }, (_, index) => ({
  hash: `${ Math.random().toString(36).substring(2, 15) }...${ Math.random().toString(36).substring(2, 15) }`,
  block_order: 4690890 - index,
  height: 4690890 - index,
  tx_index: index % 10,
  index: index % 5,
  size: Math.floor(Math.random() * 500) + 200,
  to_address: index % 3 === 0 ?
    'coinbase:0373b87b088484771773b3f31a909277169746d6565722f' :
    `TK${ Math.random().toString(36).substring(2, 40) }`,
  amount: `${ (Math.random() * 10000 + 1).toFixed(8) }`,
  fee: (Math.random() * 0.01).toFixed(6),
  tx_time: new Date(Date.now() - index * 300000).toISOString(),
  vin: index % 3 === 0 ?
    'coinbase' :
    `${ Math.random().toString(36).substring(2, 15) }...${ Math.random().toString(36).substring(2, 15) }`,
  pk_script: '76a914...',
  status: index < 45 ? 1 : 0,
}));

// 区块详情假数据（基于图三）
export const MOCK_BLOCK_DETAIL = {
  block_order: 8444008,
  height: 8108147,
  hash: '9af237140188bd2bf38a9b4f8e31676b226564e2fc29cabdafa3434ef15ec525',
  parent_root: '4569f8cc58942ed2c9e3c279bb483241d2bf3031d3b9202f61d79bc142f7a4af',
  timestamp: '2025-03-16T02:32:53Z',
  pow_name: 'meer_xkeccak_v1',
  difficulty: '520198386',
  tx_count: 1,
  coinbase: 1,
  miner_hash: 'TK6uXJ3kjh3yA4q94KQF9DTLIkztbkfhMBziR35HYkkx',
  status: '已确认',
  nonce: 123456,
};

// 交易详情假数据（基于图四）
export const MOCK_TX_DETAIL = {
  hash: '9af237140188bd2bf38a9b4f8e31676b226564e2fc29cabdafa3434ef15ec525',
  block_hash: '9af237140188bd2bf38a9b4f8e31676b226564e2fc29cabdafa3434ef15ec525',
  block_order: 844008,
  height: 8108147,
  from: 'coinbase:0373b87b088484771773b3f31a909277169746d6565722f',
  to: 'TK6uXJ3kjh3yA4q94KQF9DTLIkztbkfhMBziR35HYkkx',
  amount: '0.00000012 MEER-T',
  vout_index: '0 MEER-T',
  tx_time: '2025-03-16T02:32:53Z',
  status: 1,
};

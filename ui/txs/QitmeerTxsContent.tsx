import { Hide, Show } from '@chakra-ui/react';
import React from 'react';

import type { AddressFromToFilter } from 'types/api/address';
import type { UTXOTransaction } from 'types/api/qitmeer_tx';
import type { TransactionsSortingField, TransactionsSortingValue } from 'types/api/transaction';

import useIsMobile from 'lib/hooks/useIsMobile';
import { MOCK_TRANSACTIONS } from 'stubs/qitmeer_mock_data';
import AddressCsvExportLink from 'ui/address/AddressCsvExportLink';
import { ACTION_BAR_HEIGHT_DESKTOP } from 'ui/shared/ActionBar';
import DataListDisplay from 'ui/shared/DataListDisplay';
import type { QueryWithPagesResult } from 'ui/shared/pagination/useQueryWithPages';
import getNextSortValue from 'ui/shared/sort/getNextSortValue';

import useDescribeQitmeerTxs from './noves/useDescribeQitmeerTxs';
import QitmeerTxsList from './QitmeerTxsList';
import QitmeerTxsTable from './QitmeerTxsTable';
import TxsHeaderMobile from './TxsHeaderMobile';

const SORT_SEQUENCE: Record<TransactionsSortingField, Array<TransactionsSortingValue | undefined>> = {
  value: [ 'value-desc', 'value-asc', undefined ],
  fee: [ 'fee-desc', 'fee-asc', undefined ],
  block_number: [ 'block_number-asc', undefined ],
};

type Props = {

  query: QueryWithPagesResult<'qitmeer_address_txs' | 'qitmeer_block_txs' | 'qitmeer_txs_validated'>;
  showBlockInfo?: boolean;
  showSocketInfo?: boolean;
  socketInfoAlert?: string;
  socketInfoNum?: number;
  currentAddress?: string;
  filter?: React.ReactNode;
  filterValue?: AddressFromToFilter;
  enableTimeIncrement?: boolean;
  top?: number;
  items?: Array<UTXOTransaction>;
  isPlaceholderData: boolean;
  isError: boolean;
  setSorting: (value: TransactionsSortingValue | undefined) => void;
  sort: TransactionsSortingValue | undefined;
};

const QitmeerTxsContent = ({
  query,
  filter,
  filterValue,
  showBlockInfo = true,
  showSocketInfo = true,
  socketInfoAlert,
  socketInfoNum,
  currentAddress,
  enableTimeIncrement,
  top,
  items,
  isPlaceholderData,
  isError,
  setSorting,
  sort,
}: Props) => {
  const isMobile = useIsMobile();

  // 添加虚拟数据逻辑
  const mockData = React.useMemo(() => MOCK_TRANSACTIONS, []);
  const dataToUse = items && items.length > 0 ? items : mockData;

  // 当有虚拟数据时，不显示错误
  const shouldShowError = isError && (!dataToUse || dataToUse.length === 0);

  const onSortToggle = React.useCallback((field: TransactionsSortingField) => () => {
    const value = getNextSortValue<TransactionsSortingField, TransactionsSortingValue>(SORT_SEQUENCE, field)(sort);
    setSorting(value);
  }, [ sort, setSorting ]);

  const itemsWithTranslation = useDescribeQitmeerTxs(dataToUse, currentAddress, query.isPlaceholderData);

  const content = itemsWithTranslation ? (
    <>
      <Show below="lg" ssr={ false }>
        <QitmeerTxsList
          showBlockInfo={ showBlockInfo }
          showSocketInfo={ showSocketInfo }
          socketInfoAlert={ socketInfoAlert }
          socketInfoNum={ socketInfoNum }
          isLoading={ isPlaceholderData }
          enableTimeIncrement={ enableTimeIncrement }
          currentAddress={ currentAddress }
          items={ itemsWithTranslation }
        />
      </Show>
      <Hide below="lg" ssr={ false }>
        <QitmeerTxsTable
          txs={ itemsWithTranslation }
          sort={ onSortToggle }
          sorting={ sort }
          showBlockInfo={ showBlockInfo }
          showSocketInfo={ showSocketInfo }
          socketInfoAlert={ socketInfoAlert }
          socketInfoNum={ socketInfoNum }
          top={ top || (query.pagination.isVisible ? ACTION_BAR_HEIGHT_DESKTOP : 0) }
          currentAddress={ currentAddress }
          enableTimeIncrement={ enableTimeIncrement }
          isLoading={ isPlaceholderData }
        />
      </Hide>
    </>
  ) : null;

  const actionBar = isMobile ? (
    <TxsHeaderMobile
      mt={ -6 }
      sorting={ sort }
      setSorting={ setSorting }
      paginationProps={ query.pagination }
      showPagination={ query.pagination.isVisible }
      filterComponent={ filter }
      linkSlot={ currentAddress ? (
        <AddressCsvExportLink
          address={ currentAddress }
          params={{ type: 'transactions', filterType: 'address', filterValue }}
          isLoading={ query.pagination.isLoading }
        />
      ) : null
      }
    />
  ) : null;

  return (
    <DataListDisplay
      isError={ shouldShowError }
      items={ itemsWithTranslation }
      emptyText="There are no transactions."
      content={ content }
      actionBar={ actionBar }
    />
  );
};

export default QitmeerTxsContent;

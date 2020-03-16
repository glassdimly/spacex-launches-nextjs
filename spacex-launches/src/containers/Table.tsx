// @ts-nocheck
// @TODO add TS for this.
import React from 'react';
import { useTable, useSortBy, usePagination } from 'react-table';
import Image from '../components/Image';
import theme from '../theme';
import ColorBlueSvgFilter from '../theme/ColorBlueSvgFilter';

const { colors, units, fonts, mq } = theme;
const defaultPageSize = 25;
const allowedPageSizes = [10, 25, 50, 100, 150];

function Table({ columns, data }) {
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    prepareRow,
    page,
    canPreviousPage,
    canNextPage,
    pageOptions,
    nextPage,
    previousPage,
    setPageSize,
    state: { pageIndex, pageSize },
  } = useTable(
    {
      columns,
      data,
      initialState: { pageSize: defaultPageSize },
    },
    useSortBy,
    usePagination,
  );

  if (!data.length) {
    return <div>No results found</div>;
  }
  const imgBreakPoint = mq.sm;
  return (
    <>
      <ColorBlueSvgFilter />
      <table className="launchList" {...getTableProps()}>
        <thead className="launchListHeader">
          {headerGroups.map(headerGroup => (
            <tr className="launchListHeaderRow" {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map(column => (
                <th
                  className={`launchListHeaderCell launchListHeader${column.id
                    .charAt(0)
                    .toUpperCase() + column.id.slice(1)}`}
                  {...column.getHeaderProps(column.getSortByToggleProps())}
                >
                  {column.render('Header')}
                  <span>{column.isSorted ? (column.isSortedDesc ? ' ▼' : ' ▲') : ''}</span>
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {page.map((row, i) => {
            prepareRow(row);
            return (
              <tr
                className="launchListRow"
                itemScope
                itemType="http://schema.org/Article"
                {...row.getRowProps()}
              >
                {row.cells.map(cell => {
                  const hasAndIsUrl = row.original.url && cell.column.id === 'url';
                  return (
                    <td
                      onClick={hasAndIsUrl ? () => window.open(row.original.url) : () => null}
                      className={`launchListCell launchListData${cell.column.id
                        .charAt(0)
                        .toUpperCase() + cell.column.id.slice(1)}${
                        hasAndIsUrl ? ' cellIsUrl' : ''
                      }`}
                      {...cell.getCellProps()}
                    >
                      {cell.render('Cell', row)}
                    </td>
                  );
                })}
              </tr>
            );
          })}
        </tbody>
      </table>
      <br />
      <div className="pagination">
        {/* @TODO make button component */}
        <button
          className="pagerButton pagerButtonBack"
          onClick={() => previousPage()}
          disabled={!canPreviousPage}
        >
          <Image src="images/arrow.svg" />
        </button>{' '}
        <button
          className="pagerButton pagerButtonForward"
          onClick={() => nextPage()}
          disabled={!canNextPage}
        >
          <Image src="images/arrow.svg" />
        </button>{' '}
        <span className="pageCount">
          Page{' '}
          <strong>
            {pageIndex + 1} of {pageOptions.length}
          </strong>{' '}
        </span>
        <select
          value={pageSize}
          onChange={e => {
            setPageSize(Number(e.target.value));
          }}
        >
          {/* @TODO implement 'show all' */}
          {allowedPageSizes.map(pageSize => (
            <option key={pageSize} value={pageSize}>
              Show {pageSize}
            </option>
          ))}
        </select>
      </div>
      <style jsx>{`
        .launchList {
          font-size: ${fonts.sm};
          border-collapse: separate;
          border-spacing: 0 ${units.sm};
          margin-top: -${units.sm};
          text-align: left;
          color: ${colors.primaryDimmed};
          width: 100%;
          font-size: 13px;
        }
        
          ${mq.xsm(`
            .launchList {
               font-size: 16px !important;
             }
        `)}
        
        .launchListHeaderId,
        .launchListDataId,
        .launchListHeaderImg,
        .launchListDataImg {
          display: none;
        }
        
        ${imgBreakPoint(`
          th.launchListHeaderImg,
          td.launchListDataImg {
            ${/* @TODO figure out why this needs !important */ ''}
            display: table-cell !important;
          }
          
          .launchListHeaderRocketName {
            padding-left: 0;
          }
      `)}
        
       .launchListHeaderRocketName {
          padding-left: ${units.sm};
        } 
             
        ${mq.sm(`
          .launchListDataId,
          .launchListHeaderId{
            ${/* @TODO figure out why this needs !important */ ''}
            display: table-cell !important;
          }
        `)}
        
        :global(.cellIsUrl:hover img) {
            filter: none;
        }
        
        .cellIsUrl:hover {
            cursor: pointer;
        }
        
        .launchListHeader {
          background-image: ${colors.primaryGradient};
          box-shadow: 0 2px 10px 0 rgba(8, 13, 35, 0.37);
          border-spacing: 0 !important;
        }

        .launchListHeaderRow {
          border-spacing: 0 0;
          color: #043d67;
          font-size: ${fonts.xsm};
        }
        
          ${mq.xsm(`
            .launchListHeaderRow {
               font-size: ${fonts.lg} !important;
               white-space: nowrap !important;
             }
        `)}
        
        
        
        .launchListHeaderRow th:first-child {
          padding-left: ${units.med};
        }
        
        .launchListHeaderCell {
           padding: ${units.med} ${units.med} ${units.med} 0;
        }
               
        .launchListRow {
          background: ${colors.primaryTrans};
        }

        .launchListCell {
          border: ${theme.border};
          ${/* gets rid of cell borders */ ''}
          border-style: solid none;
          padding: ${units.sm};
        }

        .launchListCell:first-child {
          ${/* gets rid of table border quirks */ ''}
          border-left-style: ${theme.border};
          border-top-left-radius: ${units.sm};
          border-bottom-left-radius: ${units.sm};
        }

        .launchListCell:last-child {
          ${/* gets rid of table border quirks */ ''}
          border-right-style: ${theme.border};
          border-bottom-right-radius: ${units.sm};
          border-top-right-radius: ${units.sm};
        }

        :global(.launchListLink) {
          color: ${colors.primaryDimmed};
        }

        :global(.rowData),
         :global(.rowData a) {
          white-space: nowrap;
        }

        :global(.launchListDataDetails) {
          width: 100%
        }
        
        .pagination {
          display: flex;
          align-items: center;
          justify-content: center;
        }
        
        .pagerButton {
          background-color: ${colors.secondaryTrans};
          border: ${theme.border};
          border-radius: 3px;
          font-size: 1.5rem;
          display: inline-flex;
          align-items: center;
          padding: ${units.sm};
        }
        
        .pagerButtonBack {
          margin-right: ${units.sm};
        }
        
        :global(.pagerButton img) {
          filter: invert(100%);
          width: ${units.med};
          vertical-align: center;
        }
        
        :global(.pagerButtonBack img) {
            transform: scaleX(-1);
        }
        
        .pagerButton:hover {
          background-color: ${colors.primaryTrans};
          transition: all 300ms ease-in-out;
        }
        
        .pageCount {
          margin: 0 ${units.med};
        }
        
        :global(.pagerButton:hover img) {
          filter: none;
        }
      `}</style>
    </>
  );
}

export default Table;

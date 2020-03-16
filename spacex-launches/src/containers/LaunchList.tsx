import { useMemo } from 'react';
import moment from 'moment';
import Image from '../components/Image';
import Table from './Table';
import React from 'react';
import WithLink from '../components/WithLink';
import { Launch } from '../actions/types';

interface CellProps {
  [key: string]: any;
}

function LaunchList({ data }: { data: Launch[] }) {
  const columns = useMemo(
    () => [
      {
        Header: 'Badge',
        accessor: 'img',
        Cell: ({ original }: CellProps) => (
          <>
            <Image
              itemProp="image"
              className={`${original.img ? 'badgeImg' : 'placeholderImg'} rowData`}
              src={original.img ? original.img : 'images/placeholder.png'}
              alt={`Cloth patch or badge for the rocket launch ${original.rocketName}`}
            />
            <style jsx>{`
              :global(.badgeImg) {
                filter: grayscale(1);
                opacity: 0.8;
              }
              :global(.badgeImg),
              :global(.placeholderImg) {
                width: 50px;
              }
            `}</style>
          </>
        ),
      },
      {
        Header: 'Rocket Name',
        accessor: 'rocketName',

        Cell: ({ original }: CellProps) => (
          <span itemProp="subjectOf" className="rocketName rowData">
            {original.rocketName}
          </span>
        ),
      },
      {
        Header: 'Rocket Type',
        accessor: 'rocketType',
        Cell: ({ original }) => <span className="rocketType rowData">{original.rocketType}</span>,
      },
      {
        Header: 'Launch Date',
        accessor: 'date',

        Cell: ({ original }: CellProps) => (
          <span itemProp="temporal" className="launchDate rowData">
            {moment.unix(original.date).format('MM/DD/YYYY')}
          </span>
        ),
      },
      {
        Header: 'Details',
        accessor: 'details',
        Cell: ({ original }: CellProps) => (
          <>
            <span className="detailsTruncateContainer">
              <span
                itemProp="abstract"
                className="details rowData detailsTruncateInner"
                title={original.details}
              >
                {original.details}
              </span>
            </span>
            <style jsx>{`
              .detailsTruncateContainer {
                ${/* from https://jsfiddle.net/9wycg99v/23/ */ ''}
                position: relative;
                max-width: 100%;
                padding: 0 !important;
                display: -webkit-flex;
                display: -moz-flex;
                display: flex;
                vertical-align: text-bottom !important;
              }

              .detailsTruncateInner {
                position: absolute;
                white-space: nowrap;
                overflow-y: visible;
                overflow-x: hidden;
                text-overflow: ellipsis;
                -ms-text-overflow: ellipsis;
                -o-text-overflow: ellipsis;
                max-width: 100%;
                min-width: 0;
                width: 100%;
                top: 0;
                left: 0;
              }

              .detailsTruncateContainer:after,
              .detailsTruncateInner:after {
                content: '-';
                display: inline;
                visibility: hidden;
                width: 0;
              }
            `}</style>
          </>
        ),
      },
      {
        Header: 'ID',
        accessor: 'id',
        Cell: ({ original }: CellProps) => (
          <span itemProp="identifier" className="id rowData">
            {original.id}
          </span>
        ),
      },
      {
        Header: 'Article',
        accessor: 'url',
        Cell: ({ original }) =>
          original.url ? (
            <>
              <span aria-hidden>
                <WithLink href={original.url} target="_blank">
                  <Image src="images/link.svg" className="linkImg rowData" />
                </WithLink>
                <style jsx>{`
                  :global(.linkImg) {
                    filter: invert(100%) url(#colorBlue);
                    width: 1.2rem;
                    height: 1.2rem;
                  }
                `}</style>
              </span>
            </>
          ) : (
            ''
          ),
      },
    ],
    [],
  );

  return <Table columns={columns} data={data} />;
}

export default LaunchList;

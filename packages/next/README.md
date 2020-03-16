### SpaceX Launches

From the project root:
`yarn install; cd spacex-launches; yarn install; yarn build; yarn start;`

See the SpaceX Launches at http://localhost:3000!

Note: This is based on NextJS, a server-side renderer for React.. NextJS is structured
with NextJS core in the root, and sites in subdirs of that root. The entrypoint
for the SpaceX site can be found at `spacex-launches/pages/index.tsx`, wherein
can be found some conventions unique to NextJS, namely getInitialProps instead
of useEffect.

To see changes against core NextJS with a fresh stock Spacex site, see
https://github.com/glassdimly/spacex-launches-nextjs/pull/1/files

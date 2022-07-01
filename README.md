# image-data-ng

## API
### Launch in a container (dev process)
```
docker run -ti --rm -v $(pwd):/opt -p 3030:3030 registry.suse.com/bci/nodejs:16 bash

Prepare the environment
$ npm install @feathersjs/cli -g
$ npm install --global yarn

And on the api directory install the modules
$ yarn

To run (dev mode), use the DB_CONNECTION environment variable to provide the connection string
$ DB_CONNECTION="postgres://..." yarn dev
```

## Dashboard

### Libraries
- https://blueprintjs.com/
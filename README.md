# warren demo

A quick demo for the [warren](https://www.npmjs.com/package/warren) module from [trainline](https://www.thetrainline.com/).

```sh
npm install
docker-compose up -d
npm start
# let's kill some rabbits
docker-compose stop rabbitmq1
# then restore them
docker-compose up -d
# keep stopping/killing and restarting
# and watch warren recovering
```

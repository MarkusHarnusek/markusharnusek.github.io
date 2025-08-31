# Endpoints

This file contains a documentation on all the endpoints used for communication with the server.

## API

The tutoring website server also features an API used to retrieve data about upcoming lessons and will be used for other usecases in the future.

### Parameters

 - Each api request needs to be followed by an API key which is appended as a parameter with the variable being `API-KEY`.

 - When getting lesson data a specific week needs to be specified using the `WEEK` variable indicating the calendar week requested.

## URLs

### General

 - `/contact` is used to send contact requests.

### API

 - `/api/lessons` is used to get lesson data

# Endpoints

This file contains a documentation on all the endpoints used for communication with the server.

## General

 - `/contact` is used to send contact requests.
 - `/lesson`is used to send contact requests.

## API

 - `/api/lessons` is used to get lesson data. It also needs the `WEEK` parameter to specify the week being requested.
 - `/api/statuses` is used to get statuses to sync with possible logic changes without needing to change the frontend.
 - `/api/subjects` is used to get the list of lessons being teached.
 - `/api/start_times` is used to obtain all the start times of possible lessons
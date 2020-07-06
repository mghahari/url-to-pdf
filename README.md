# URL To PDF
With this application you can download any url as pdf.

## Installation
For use in your own server you can config the `docker-compose.yml` file according to your needs and then run these commands:

```
docker-compose build
docker-compose up -d
```

## Configuration
You can config `MAX_LIFE` environment variable to configure how long a file should be maintained in server until user download this file.

## Usage
Assume that application is running on this url: `http://example.com:3000`

For downloading the pdf of url you should first `urlencode` your url.
This can be done with this function in javascript:

``` javascript
const urlencodedURL = encodeURIComponent(url);
```

Then you should open this url to download pdf file:
```
http://example.com:3000/download-pdf?url=<urlencodedurl>
```
That `<urlencodedurl>` is url encoded string of your url.

## Known Bugs
- A hacker can request your application frequently to download a specific url and it can cause that storage of your server being full.

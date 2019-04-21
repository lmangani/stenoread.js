# StenoRead.js
[Stenographer](https://github.com/google/stenographer) API packet reader in Node, piping out *steaming hot* PCAP data

-----

#### Requirements
* stenographer
  * configuration in `/etc/stenographer/config`
  * `pem` certificates in `certPath`

### Setup
```
npm install -g stenoread
```
#### CLI Usage
```
stenoread.js "port 5060 and after 1m ago" | tshark -r /dev/stdin
```

#### WEB Usage
A simple UI can be served to run insecure queries via web
```
npm start server
```

##### Credits
* HTML form and Ascii Art from https://github.com/vesche/stenoremote
* Stenographer, Stenoread & Co are derived from https://github.com/google/stenographer

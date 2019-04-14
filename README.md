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
### Usage
```
stenoread.js "port 5060 and after 1m ago" | tshark -r /dev/stdin
```

# stenoread.js
Stenographer API packet reader in Node, piping out steaming hot PCAP data

#### Requirements
* stenographer w/ certs on same system

### Setup
```
npm install -g stenoread
```
### Usage
```
stenoread.js "port 5060 and after 1m ago" | tshark -r /dev/stdin
```

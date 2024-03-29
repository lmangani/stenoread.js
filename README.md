<img src="https://user-images.githubusercontent.com/1423657/192254578-fb9f19c9-1ef2-4f3d-9c9a-e28d3830a09d.png" width=400>

### [Stenographer](https://github.com/google/stenographer) API packet reader in Node, piping out *steaming hot* PCAP data

<br>

### Requirements
* stenographer
  * configuration in `/etc/stenographer/config`
  * `pem` certificates in `certPath` _(optional)_
* nodejs 14-16.x

### Setup
```
npm install -g stenoread
```
#### CLI Usage
```
stenoread.js "port 5060 and after 1m ago" | tshark -r /dev/stdin
```

#### WEB/API Usage
A simple UI can be served to run http/s queries via web _(optional certPath)_
```
stenoserve.js --port 443 --token 1234pcap --certPath /etc/letsencrypt/live/my.domain
```

#### Service Usage
Serve and manage the API as a system service using `pm2`
```
npm install -g stenoread pm2
pm2 start stenoserve.js -- --port `9069 --token 1234pcap
pm2 save
pm2 startup
```

## Usage Examples
```
     _                     __                _    _     
 ___| |_ ___ _ __   ___   /__\ ___  __ _  __| |  (_)___ 
/ __| __/ _ \ '_ \ / _ \ / \/// _ \/ _` |/ _` |  | / __|
\__ \ ||  __/ | | | (_) / _  \  __/ (_| | (_| |_ | \__ \
|___/\__\___|_| |_|\___/\/ \_/\___|\__,_|\__,_(_)/ |___/
                                               |__/     
                                               
```
| Query        | Usecase           |
| ------------ |:-------------:|
| host 8.8.8.8    | Single IP address (hostnames not allowed)    |
| net 10.0.0.0/8  | Network with CIDR    |
| port 23         | Port number (UDP or TCP)     |
| icmp            | Specific protocol    |
| before 2019-04-01T11:05:00Z    | Packets before a specific time (UTC)    |
| after 2019-04-01T11:05:00-0700    | Packets after a specific time (with TZ)    |
| before 45m ago		| Packets before a relative time    |
| after 10m ago   | Packets after a relative time    |

#### API
PCAP data can be requested via insecure GET/POST requests
```
/{query}/pcap
```
Examples:
###### POST
```
curl 'http://localhost:1235/query' --data-raw 'query=port 22 and after 1m ago' | tshark -r /dev/stdin
```
###### GET
```
wget -qO- "http://localhost:1235/port 22 and after 1m ago/pcap | tshark -r /dev/stdin
```

##### Credits
* HTML form and Ascii Art from https://github.com/vesche/stenoremote
* Stenographer, Stenoread & Co are derived from https://github.com/google/stenographer

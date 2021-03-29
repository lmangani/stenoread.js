

# stenoRead.js
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
PCAP data can be requested via insecure GET requests
```
/{query}/pcap
```
Example:
```
wget "http://myserver:3000/port 22 and after 1m ago/pcap
```

##### Credits
* HTML form and Ascii Art from https://github.com/vesche/stenoremote
* Stenographer, Stenoread & Co are derived from https://github.com/google/stenographer

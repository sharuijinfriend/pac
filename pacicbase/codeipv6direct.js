function belongsToSubnet(host, list) {
  var ip = host.split(".");
  ip = 0x1000000 * Number(ip[0]) + 0x10000 * Number(ip[1]) +
    0x100 * Number(ip[2]) + Number(ip[3]);

  if (ip < list[0][0])
    return false;

  // Binary search
  var x = 0, y = list.length, middle;
  while (y - x > 1) {
    middle = Math.floor((x + y) / 2);
    if (list[middle][0] < ip)
      x = middle;
    else
      y = middle;
  }

  // Match
  var masked = ip & list[x][1];
  return (masked >>> 0) == (list[x][0] >>> 0);
}

function isChina(host) {
  return belongsToSubnet(host, CHINA);
}

function isLan(host) {
  return belongsToSubnet(host, LAN);
}

function check_ipv4(host) {
	var re_ipv4 = /^\d+\.\d+\.\d+\.\d+$/g;
	if (re_ipv4.test(host)) {
		return true;
	}
}


var proxy = "SOCKS5 127.0.0.1:1080;";
var direct = "DIRECT";


function FindProxyForURL(url, host) {
	if ( isPlainHostName(host) === true ) {
		return direct;
	}
	if (dnsDomainIs(host, ".ieee.org") ||
		dnsDomainIs(host, ".springer.com") ||
		dnsDomainIs(host, ".sciencedirect.com") ||
		dnsDomainIs(host, ".wiley.com") ||
		dnsDomainIs(host, ".acm.org") ||
		dnsDomainIs(host, ".sagepub.com") ||
		dnsDomainIs(host, ".engineeringvillage.com") ||
		dnsDomainIs(host, ".emeraldinsight.com") ||
		dnsDomainIs(host, ".jstor.org") ||
		dnsDomainIs(host, ".nature.com")){
		return direct;
	}
	var remote = dnsResolve(host);
	if ( check_ipv4(remote) === true ) {
		if (isChina(remote) || isLan(remote)) {
			return direct;
	}
	else{
		return proxy;
	}
	}
	else{
		return direct;
	}
}

// Format: [Hex IP, mask]
// e.g. 1.0.1.0/24 = [0x80008000, 0xFFFFFF00]
// Source: http://www.ipdeny.com/ipblocks/data/aggregated/cn-aggregated.zone


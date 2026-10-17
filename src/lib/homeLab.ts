/** Owner-supplied inventory. Missing fields must stay unknown until documented. */
export const labDevices = [
  {
    id: "platform",
    name: "VMware Workstation",
    role: "Virtualisation platform",
    details: [
      ["Platform", "VMware Workstation"],
      ["Version / host hardware", "Not supplied"],
      [
        "Virtual adapter mode",
        "Unverified — NAT, bridged or host-only mode not documented",
      ],
    ],
  },
  {
    id: "dc",
    name: "DC01",
    role: "Windows Server 2022 domain controller",
    details: [
      ["Operating system", "Windows Server 2022"],
      ["Role", "Domain controller"],
      ["Domain", "homelab.local"],
      ["IP address", "192.168.100.10"],
      [
        "DNS / DHCP settings",
        "Exact service configuration and test results not supplied",
      ],
    ],
  },
  {
    id: "client",
    name: "Windows 11 client",
    role: "Domain-joined client",
    details: [
      ["Operating system", "Windows 11"],
      ["Join status", "Domain-joined, as supplied by the owner"],
      ["Hostname / IP address", "Not supplied"],
      [
        "Join evidence / domain target",
        "Not supplied — no join screenshot or domain-target details provided",
      ],
    ],
  },
  {
    id: "ubuntu",
    name: "Ubuntu01",
    role: "Ubuntu Server",
    details: [
      ["Operating system", "Ubuntu Server"],
      ["IP address", "192.168.100.30"],
      ["Version / gateway / DNS", "Not supplied"],
      [
        "OpenSSH configuration",
        "Exact settings and connection results not supplied",
      ],
    ],
  },
  {
    id: "network",
    name: "Lab subnet",
    role: "Documented network range",
    details: [
      ["Network", "192.168.100.0/24"],
      ["Gateway / switch / interfaces", "Not supplied"],
      [
        "Device links and routing",
        "Unverified — no physical or virtual connection map supplied",
      ],
    ],
  },
] as const;
export const labWalkthroughs = [
  {
    title: "Active Directory users, groups and organisational units",
    explanation:
      "A domain controller manages directory identities. Organisational units organise objects and provide Group Policy scope; security groups collect users for permission assignment. User and group objects should be placed and delegated deliberately.",
    verify:
      "User, group and OU names, membership, delegation and directory screenshots have not been supplied.",
  },
  {
    title: "Group Policy restrictions",
    explanation:
      "Group Policy applies computer and user settings through domain and OU links. The affected accounts, policy scope and inheritance determine which restrictions take effect. Validate the effective policy on the intended client rather than assuming that a linked policy applied.",
    verify:
      "Specific restrictions, GPO names, links, scope and effective-policy results are unverified.",
  },
  {
    title: "DNS configuration and testing",
    explanation:
      "Active Directory depends on DNS to locate domain services. Check that clients use a resolver able to resolve the AD domain, then inspect the relevant host and service records. Name resolution and domain discovery are separate checks; successful results must be recorded.",
    verify:
      "Resolver assignments, zone records, forwarders and lookup results have not been supplied.",
  },
  {
    title: "DHCP installation and authorisation",
    explanation:
      "The DHCP Server role supplies leases from a configured scope. In an Active Directory environment, a Windows DHCP server normally requires directory authorisation. Scope activation, exclusions, lease options and client lease acquisition each need validation.",
    verify:
      "Installation and authorisation evidence, scope range, options and lease results have not been supplied. No DHCP role is assigned to a topology node here.",
  },
  {
    title: "File sharing, NTFS permissions and mapped drives",
    explanation:
      "Network file access is constrained by both share and NTFS permissions. Assign access through appropriate groups, test with an ordinary user and verify that mapped drives target the intended share. Avoid broad permissions as a substitute for diagnosing access issues.",
    verify:
      "Share paths, ACL entries, mapped-drive letters and access-test results have not been supplied.",
  },
  {
    title: "Ubuntu static networking and OpenSSH",
    explanation:
      "Static networking requires a correct address, prefix and environment-specific routing and DNS settings. OpenSSH provides remote administration; service state, authentication policy and network reachability must be checked separately. Ubuntu network configuration depends on the installed release and renderer.",
    verify:
      "Only Ubuntu01 and its supplied IP are documented. Renderer, gateway, resolver, SSH settings and session evidence are unverified.",
  },
] as const;
export const labEvidence = [
  "Network inventory & topology",
  "Active Directory & Group Policy",
  "DNS & DHCP validation",
  "Shares, permissions & mapped drives",
  "Ubuntu networking & OpenSSH",
  "GNS3 issue investigation",
] as const;

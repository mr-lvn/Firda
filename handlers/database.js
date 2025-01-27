const { QuickDB } = require("dreamvast.quick.db");
const { MongoDriver } = require("dreamvast.quick.db/MongoDriver");
const { PostgresDriver } = require("dreamvast.quick.db/PostgresDriver");

module.exports = async(client) => {
    console.log("🔜 | Load Database...");
    
    const start = Date.now();
    const mongoDriver = new MongoDriver(process.env.MONGO_URI);
    
    const postgresDriver = new PostgresDriver({
        host: process.env.POSTGRESQL_HOST,
        port: 18645,
        user: "mrlvn",
        password: process.env.POSTGRESQL_PASSWORD,
        database: "root",
        ssl: {
            rejectUnauthorized: true,
            ca: `-----BEGIN CERTIFICATE-----
MIIEQTCCAqmgAwIBAgIUV8S1EMkyFY+YhL8V7cahmscm/PUwDQYJKoZIhvcNAQEM
BQAwOjE4MDYGA1UEAwwvMzJlYTU4MzItODhiMS00ODgxLWI1MDMtNDhkZDZhYjFh
ZDlhIFByb2plY3QgQ0EwHhcNMjUwMTI1MTA1NDU5WhcNMzUwMTIzMTA1NDU5WjA6
MTgwNgYDVQQDDC8zMmVhNTgzMi04OGIxLTQ4ODEtYjUwMy00OGRkNmFiMWFkOWEg
UHJvamVjdCBDQTCCAaIwDQYJKoZIhvcNAQEBBQADggGPADCCAYoCggGBAKAoyXAb
wOqqHHbyxaFKVfRE9AQfhQfn/7qNuWmu9a5arhxGcmaGYWUojq+u2gM1UcsyN228
I3ND1+jFztDJKm6F2YF8MprMOkVNDIsG2WcCQEE8TkaFMaEV0DgRkxkKVXi/gmNd
VSvR1ZtGZrVeKLXfhz8NVlZvtzWPZwhBheKJA0C22U9guAL0RZyp5f0crzUCpWtc
05FRM/ziwJP/J8p7HpR3Xf+Bvt8GQ9ahi3DCmq8xdnTNPdBVlFqB1fqIsdP84HiK
T52jQs9ldGcozyYqlIqgBuGqxU9XTs9TUxwJVNpbsSp1GWGfvF+JAU1rYOERlE07
hF+cSA3tuCK4/iwbv999/xIiVfleB+6IvCufVrHtpTw9Mjcmsy5eVE1yD6gj5Wtj
haNAI/PrpcrETcWQkzYemuebwi792FnFP0mNDR/kPeW97TRc0M3+L4cO5Hr3b1wG
l5YLAh9SuF/56wL03JhYkiFXhvnExOSw1GiJXzu2z/iKeFHCVdnsmV4+KwIDAQAB
oz8wPTAdBgNVHQ4EFgQUP0lyPjPt0+F1cbkcXgsjdDoFHq4wDwYDVR0TBAgwBgEB
/wIBADALBgNVHQ8EBAMCAQYwDQYJKoZIhvcNAQEMBQADggGBAJYrqCLkBa6A8eXU
8kXZVa+h6elLXuZr6BMDrSVPlvDjDYQwxCfJX16mW+lrTLsKC01QvmlXa6EGQRrB
XzbClM6VGPBXv31qgbtNy4HKGYn6IX+3edBJ882SMxYhkZRlegvOUNw9PgPKoUj6
lG+dEzoGOpaWWPndNsofGdRPUfv2joEdL13+fq8Hdi+tpYaw36UP2iDgRNFJ/8Hg
wmS2qlEy6eXKQCQBB3FJWTZgZjaoL6zyNK8mTaEgs/36asSKPNSIKqJlw0JYRnMB
7zi6uqFRcvdGhcIEs5Z8ZKlwbPsiScN3vMlHlNLdBxI85eidwai0+znNxu6RcGut
9/osTLmupgInr5Te/JAlAtS8lqb4ajvnxMKD8MZ3qCbTUGyMti2As0TC5pe6n7kD
RxVRhhBQlBRjsHW1PBovVXJYh+x9R1y1dVp0SxweLsCeb59ziSCnYXw1nngfQDaf
QIcsW8gOKmo0/j5OT1mJ4bQs9km1wkFlbPVEy0lFjEbes52y2A==
-----END CERTIFICATE-----`
        }
    });
    
    await mongoDriver.connect();
    await postgresDriver.connect();
    
    const db = new QuickDB({ driver: postgresDriver, table: "root" });
    db.init();
    
    client.db = {
        root: db,
        user: await db.table("User"),
        guild: await db.table("Guild"),
        economy: await db.table("Economy"),
        leveling: await db.table("Leveling")
    }
    client.mongo = new QuickDB({ driver: mongoDriver, table: "root" });
    
    console.log(`✅ | Database connected [${Date.now() - start}ms]`);
}
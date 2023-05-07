#!/bin/bash

mongosh <<EOF
var config = {
    "_id": "rs0",
    "members": [
        { "_id": 0, "host": "db-app1:27017" },
        { "_id": 1, "host": "db-app2:27017" },
        { "_id": 2, "host": "db-app3:27017" },
    ]
};
rs.initiate(config, { force: true });
rs.status();
EOF
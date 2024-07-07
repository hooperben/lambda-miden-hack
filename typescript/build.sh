#!/bin/bash

IN_DIR="./proto"
OUT_DIR="./dist"

# Generate the types
yarn proto-loader-gen-types \
    --grpcLib=@grpc/grpc-js \
    --outDir=${OUT_DIR}/types/ \
    ${IN_DIR}/*.proto
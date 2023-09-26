FROM ubuntu:18.04

RUN rm /bin/sh && ln -s /bin/bash /bin/sh

RUN apt-get update --fix-missing
RUN apt-get install -y curl python3

ENV NVM_DIR /usr/local/nvm
ENV NODE_VERSION 8.16.0

RUN curl https://raw.githubusercontent.com/creationix/nvm/v0.30.1/install.sh | bash \
    && source $NVM_DIR/nvm.sh \
    && nvm install $NODE_VERSION \
    && nvm alias default $NODE_VERSION \
    && nvm use default

# ENV NODE_PATH $NVM_DIR/v$NODE_VERSION/lib/node_modules
# ENV PATH      $NVM_DIR/versions/node/v$NODE_VERSION/bin:$PATH

WORKDIR /multisig

COPY package.json .
COPY package-lock.json .
COPY dapp dapp

# RUN npm i


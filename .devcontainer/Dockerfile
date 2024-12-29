# Use the latest version of Ubuntu
FROM ubuntu:latest

# Install basic dependencies and Java 17
RUN apt-get update && apt-get install -y \
    curl \
    wget \
    gnupg2 \
    software-properties-common \
    unzip \
    git \
    && rm -rf /var/lib/apt/lists/*

# Install JDK 17
RUN apt-get update && apt-get install -y openjdk-17-jdk

# Install Maven (latest version)
RUN apt-get install -y maven

# Install Node.js 18 and npm
RUN curl -fsSL https://deb.nodesource.com/setup_18.x | bash - && \
    apt-get install -y nodejs

# Install Angular CLI (version 16)
RUN npm install -g @angular/cli@16

# Configure JAVA_HOME
ENV JAVA_HOME /usr/lib/jvm/java-17-openjdk-amd64
ENV PATH $JAVA_HOME/bin:$PATH

# Create a user to avoid running as root
RUN useradd -ms /bin/bash devuser
USER devuser
WORKDIR /home/devuser/app

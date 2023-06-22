# Define the base image
FROM --platform=linux/amd64 node:14

# Create app directory in Docker
WORKDIR /usr/src/app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install app dependencies
RUN npm install

# Bundle app source inside Docker image
COPY . .

# Your app listens on port 3000, expose that port
EXPOSE 3000

# Define the command to run your app
CMD [ "node", "app.js" ]

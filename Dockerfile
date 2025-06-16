FROM node:alpine

WORKDIR /app

COPY package.json .

RUN npm install

COPY . .

EXPOSE 3000

CMD ["npm", "start"]

# 2. Build the Docker image:
# docker build -t <your username>/react-project .
# 3. Run the Docker container:
# docker run -p 3000:3000 -d <your username>/react-project
# 4. Test the application:
# Open your browser and navigate to http://localhost:3000. You should see your React application running.
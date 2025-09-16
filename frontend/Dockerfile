# บรรทัดใหม่
FROM node:20-alpine

# Set working directory
WORKDIR /app

# Copy package files and install dependencies
COPY package*.json ./
RUN npm install

# Copy the rest of the application code
COPY . .

# Expose Vite's default port
EXPOSE 5173

# Command to start the development server
# The --host flag is crucial to expose the server outside the container
CMD ["npm", "run", "dev", "--", "--host"]
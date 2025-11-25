# Gunakan Node.js untuk build
FROM node:18-alpine AS builder

# Set workdir
WORKDIR /app

# Copy package.json dan lock file
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy seluruh source code
COPY . .

# Build project Vite (output default: dist/)
RUN npm run build

# ---- Production image ----
FROM nginx:alpine

# Copy build hasil Vite ke direktori default Nginx
COPY --from=builder /app/dist /usr/share/nginx/html

# Copy config nginx jika butuh (opsional)
# COPY nginx.conf /etc/nginx/conf.d/default.conf

# Expose port 80
EXPOSE 80

# Jalankan Nginx
CMD ["nginx", "-g", "daemon off;"]

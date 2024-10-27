# Use a lightweight base image
FROM alpine:latest

# Install Chromium and dependencies
RUN apk update && \
    apk add --no-cache \
    chromium \
    nss \
    freetype \
    harfbuzz \
    ttf-freefont \
    && rm -rf /var/cache/apk/*

# Set environment variable for Chromium
ENV CHROME_BIN=/usr/bin/chromium-browser

# Expose the debugging port
EXPOSE 9222

# Start Chromium with remote debugging
CMD ["chromium-browser", "--headless", "--no-sandbox", "--remote-debugging-address=0.0.0.0", "--remote-debugging-port=9222"]

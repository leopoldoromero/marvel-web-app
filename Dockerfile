FROM node:20.9.0-slim AS builder
WORKDIR /app

COPY . .

ENV NEXT_SHARP_PATH=/tmp/node_modules/sharp
RUN npm ci && npm run build

FROM node:20.9.0-slim AS runner

ENV PORT=3000
ENV NODE_ENV=production

WORKDIR /app

ARG NEXT_PUBLIC_MARVEL_API_URL
ARG NEXT_PUBLIC_MARVEL_PUBLIC_KEY
ARG NEXT_PUBLIC_MARVEL_PRIVATE_KEY

ENV NEXT_PUBLIC_MARVEL_API_URL=${NEXT_PUBLIC_MARVEL_API_URL}
ENV NEXT_PUBLIC_MARVEL_PUBLIC_KEY=${NEXT_PUBLIC_MARVEL_PUBLIC_KEY}
ENV NEXT_PUBLIC_MARVEL_PRIVATE_KEY=${NEXT_PUBLIC_MARVEL_PRIVATE_KEY}


COPY --from=builder /app/public ./public
COPY --from=builder /app/package.json ./package.json
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static

COPY --from=builder /app/run.sh ./run.sh

RUN ["chmod", "+x", "./run.sh"]

EXPOSE 3000

CMD ["./run.sh"]

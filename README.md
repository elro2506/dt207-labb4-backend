# Laboration 4 - DT207G
Applikation med REST API för registrering och inloggning, samt autentisering med JWT.
Jag har byggt denna applikation med Node.js, Express och MongoDB.

## Funktionalitet
- Man kan registrera användare (använt mig av Thunder client för att testa detta)
- Man kan logga in registrerad användare
- Autentisering med hjälp av JWT-token
- Skyddade routes och inloggning i dessa med hjälp av token
- Hashade lösenord med bcrypt

## Tekniker
- Node.js
- Express
- MongoDB
- Mongoose
- JWT
- Bcrypt

Använder mig av npm install för installation och npm run serve för start av server.

## Endpoints
- POST /api/register
- POST /api/login
- GET /api/protected

### Render-länk
Här finns min backend: https://dt207-labb4-backend.onrender.com/
### Backend for the Internship Drive 2022 at BITS Pilani, Hyderabad Campus

#### Local Development

1. Install MongoDB Community Server for your OS from the MongoDB website.
2. Create a .env file based on .env.sample
3. Start the MongoDB server or use your Atlas Database. Atlas URI take precedence over the local server's URI. Modify `config.js` to change this preference. If you change this preference, change it to default before committing your changes. If the Atlas URI isn't specified, the local URI is used by default.
4. Install dependencies with `yarn`
5. Start development server with `yarn dev`

# lua.io

## What is lua.io
lua.io is a plattform where you can share and discover unique tracks.

## How does lua.io work
Just log in, take the link of your favorite song from either spotify or deezer and share it with the world, in return you'll get an unique song yourself! That's it

## backend-routes
- **POST**: localhost:5000/user/reg
```JSON
 JSON-Body:
 {
     "username": "",
     "email": "",
     "password": "",
}
```

- **POST**: localhost:5000/user/reg
```JSON
JSON-Body:
{
    "email": "",
    "password": "",
}
```

*must be logged in first* for the /song-routes to work!

- **POST**: localhost:5000/song/input
```JSON
JSON-Body:
{
    "link": "deezer or spotify-link"
}
```

- **GET**: localhost:5000/song/output

## change log
## backend
working on email verification, but it's not currently working, so its disabled for the time being.
- needs a mechanism to avoid users getting the songs they suggested them self

## frontend
- Started creating a website using React + MUI after testing out a few options (tailwind, bulma, bootstrap, moon.io)

### done
- created an header with a provisory logo and a hidden navigation (all links besides the one on the logo don't work)
- finished a simple footer
- created a leading page with an animated background and a log in and sign up button, of which only the log in works
- created a log- in site (which doesn't work)
- can reg user
  
### todo
- fixing log in, sign up and authentification!

- link up the header
- link up the leading page
- link up the log in page with the backend
- create a sign up page
- create a dashboard for a singed user
- create an interface for the music-link-generator
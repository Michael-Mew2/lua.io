import * as React from 'react';
import { Card, CardContent, Typography, TextField, Button, Box, Link } from '@mui/material';

export default function NotificationsSignInPageError() {
  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh', // Vollbild-Höhe
        // bgcolor: '#f4f4f4', // Hintergrundfarbe der Seite
      }}
    >
      <Card
        sx={{
          width: 400,
          padding: 3,
          boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)',
        }}
      >
        <CardContent>
          <Typography
            variant="h5"
            component="div"
            sx={{ textAlign: 'center', marginBottom: 3 }}
          >
            Login
          </Typography>
          {/* Eingabefeld für E-Mail */}
          <TextField
            fullWidth
            label="Email"
            type="email"
            variant="outlined"
            sx={{ marginBottom: 2 }}
          />
          {/* Eingabefeld für Passwort */}
          <TextField
            fullWidth
            label="Password"
            type="password"
            variant="outlined"
            sx={{ marginBottom: 3 }}
          />
          {/* Login-Button */}
          <Button
            fullWidth
            variant="contained"
            color="secondary"
            sx={{ padding: 1 }}
          >
            Sign In
          </Button>
          <Link
              component="button"
              type="button"
              // onClick={handleClickOpen}
              variant="body2"
              sx={{ alignSelf: 'center', textAlign:"center"}}
            >
              Forgot your password?
            </Link>
          <Typography sx={{ textAlign: 'center' }}>
              Don&apos;t have an account?{' '}
              <Link
                href="/material-ui/getting-started/templates/sign-in/"
                variant="body2"
                sx={{ alignSelf: 'center' }}
              >
                Sign up
              </Link>
            </Typography>
        </CardContent>
      </Card>
    </Box>
  );
}


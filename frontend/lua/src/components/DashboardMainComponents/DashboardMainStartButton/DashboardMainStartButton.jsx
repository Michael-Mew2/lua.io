import * as  React from 'react'
import classes from "./DashboardMainStartButton.module.css"
import { Button, Container } from '@mantine/core'
import { IconMusic } from '@tabler/icons-react'
import { useNavigate, useParams } from 'react-router-dom'
import { useAuth } from '../../../contextx/useAuth'
import { useReceiveSong } from '../../../contextx/useReceiveSong'
import { ReceiveSongContext } from '../../../contextx/ReceiveSongContext'

export default function DashboardMainStartButton() {
  const navigate = useNavigate();
  const {user} = useAuth();
  const {isLoading, hasEnoughTokens, song} = React.useContext(ReceiveSongContext)

  const needsToRate = user.tokens > 0 || !!user.currentSong;
  console.log("User needs to Rate:", needsToRate);
  console.log("User in button:", user);
  
  console.log("Token im Button:", user.tokens);
  console.log("Song in Button:", !!user.currentSong);

  const handleStartGame = () => {
    navigate(`/members/${user.username}/share`)
    console.log("Das ist der User wenn der knopf gedrückt wird:", user);
  } 

  const handleRateSongFirst = () => {
    navigate(`/members/${user.username}/claim`)
  }

  return (
    <div className={classes.outerBox} sx={{flex: 1}}>
      <Container mt="md" mb="md" className={classes.innerBox} >
        {isLoading ? (
          <Button loading loaderProps={{ type: 'dots' }} />
        )
          : hasEnoughTokens ? 

        (
          <Button rightSection={<IconMusic size={14} />} bdrs="md" fullWidth onClick={handleRateSongFirst}>Rate the song!</Button> 
        ) :  (
          <Button rightSection={<IconMusic size={14} />} bdrs="md" fullWidth onClick={handleStartGame}>Suggest a song</Button>
        )}
      </Container>
    </div>
  )
}

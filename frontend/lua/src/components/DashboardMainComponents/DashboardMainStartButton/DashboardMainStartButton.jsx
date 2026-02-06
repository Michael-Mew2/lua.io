import * as  React from 'react'
import classes from "./DashboardMainStartButton.module.css"
import { Button, Container } from '@mantine/core'
import { IconMusic } from '@tabler/icons-react'

export default function DashboardMainStartButton() {
  return (
    <div className={classes.outerBox} sx={{flex: 1}}>
      <Container mt="md" mb="md" className={classes.innerBox} >
        <Button rightSection={<IconMusic size={14} />} bdrs="md" fullWidth>Suggest a song</Button>
      </Container>
    </div>
  )
}

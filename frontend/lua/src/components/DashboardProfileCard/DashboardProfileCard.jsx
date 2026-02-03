import * as React from 'react'
import { Container, Group, Title, Stack, Text, Badge } from '@mantine/core'
import classes from "./DashboardProfileCard.module.css"
import UserProfilePicture from '../UserProfilePicture/UserProfilePicture'

export default function DashboardProfileCard() {
  return (
    <Container className={classes.profileCardOuter}>
        <Group className={classes.profileCardContent} justify="space-between" size="md">
            <Group className={classes.userProfile}>
                <UserProfilePicture />
                <Stack>
                    <Text className={classes.username}>Username</Text>
                    <Group className={classes.badges}>
                        <Badge>Badge 1</Badge>
                        <Badge>Badge 2</Badge>
                        <Badge>Badge 3</Badge>
                    </Group>
                    <Text className={classes.birthdate}>Birthday: 01.01.</Text>
                </Stack>
            </Group>
            <Title order={1}>Hi there!</Title>
        </Group>
    </Container>
  )
}

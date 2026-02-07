import * as React from 'react'
import LoadingScreen from '../../components/LoadingScreen/LoadingScreen'

export default function MusicReceive() {
    const [isLoading, setIsLoading] = React.useState(true)
  return (
    <>
    {isLoading ? (<LoadingScreen />) : <div>Not loading</div> }
    </>
  )
}

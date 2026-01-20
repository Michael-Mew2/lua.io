import React from 'react'

const links = [
    "https://www.youtube.com/watch?v=zD7ZsVMCeyY",
    "https://www.youtube.com/watch?v=0-B4ZbVUtcE"
]

export default function Footer() {
    const [isHovered, setIsHovered] = React.useState(false)
    const openRandomLink = () => {
        const randomLink = links[Math.floor(Math.random() * links.length)]
        window.open(randomLink, "_blank")
    }
  return (
    <>hi</>
  )
}

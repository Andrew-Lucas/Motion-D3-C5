import { AnimatePresence, motion } from 'framer-motion'
import { useState } from 'react'
import styled from 'styled-components'

const Wrapper = styled.main`
  background-color: rgb(232, 0, 185);
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`

const Grid = styled.section`
  height: 550px;
  width: 750px;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-template-rows: repeat(2, 1fr);
  gap: 10px;
`

const Box = styled(motion.div)`
  height: 100%;
  width: 100%;
  background-color: #ffd5f8;
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  &:nth-child(1) {
    transform-origin: bottom right !important;
  }
  &:nth-child(2) {
    transform-origin: bottom left !important;
  }
  &:nth-child(3) {
    transform-origin: top right !important;
  }
  &:nth-child(4) {
    transform-origin: top left !important;
  }
`

const Circle = styled(motion.div)`
  height: 85px;
  width: 85px;
  border-radius: 50%;
  background-color: white;
  box-shadow: 3px 3px 3px gray;
`

const OverLay = styled(motion.main)`
  position: fixed;
  height: 100%;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: rgba(0, 0, 0, 0.5);
`
const Popup = styled(motion.div)`
  background-color: whitesmoke;
  height: 300px;
  width: 450px;
  border-radius: 15px;
  margin-bottom: 100px;
`

const Button = styled(motion.button)`
  margin: 45px;
  padding: 7px 10px;
  border-radius: 5px;
  border: none;
  font-weight: 600;
  color: ${({ isTop }) => (isTop ? 'blue' : 'brown')};
  scale: ${({ isTop }) => !isTop && 1.3};
`

export default function App() {
  const [isTop, setIsTop] = useState(true)
  const toogleIsTop = () => setIsTop((prev) => !prev)

  const [isPopup, setIsPopup] = useState(false)
  const [index, setIndex] = useState(null)
  const tooglePoPup = (index) => {
    setIndex(index)
    setIsPopup((prev) => !prev)
  }

  return (
    <Wrapper>
      <Grid>
        <Box
          layoutId={1}
          onClick={() => tooglePoPup(1)}
          whileHover={{ scale: 1.1 }}
        />
        <Box
          layoutId={2}
          onClick={() => tooglePoPup(2)}
          whileHover={{ scale: 1.1 }}>
          {isTop && <Circle layoutId="circle" />}
        </Box>
        <Box
          layoutId={3}
          onClick={() => tooglePoPup(3)}
          whileHover={{ scale: 1.1 }}>
          {!isTop && <Circle layoutId="circle" />}
        </Box>
        <Box
          layoutId={4}
          onClick={() => tooglePoPup(4)}
          whileHover={{ scale: 1.1 }}
        />
      </Grid>

      <AnimatePresence>
        {isPopup && (
          <OverLay onClick={() => setIsPopup(false)}>
            <Popup layoutId={index} />
          </OverLay>
        )}
      </AnimatePresence>

      <Button isTop={isTop} onClick={toogleIsTop}>
        Switch
      </Button>
    </Wrapper>
  )
}

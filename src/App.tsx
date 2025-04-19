import { useState, useRef, useEffect, memo, RefObject } from 'react'
import styled from 'styled-components'
import Controls from './components/Controls'
import EditorPanel from './components/EditorPanel'
import placeholder from './assets/image-placeholder.svg'

const Container = styled.div`
  width: 850px;
  padding: 30px 35px 35px;
  background: #fff;
  border-radius: 10px;
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1);
  h2 {
    margin-top: -8px;
    font-size: 22px;
    font-weight: 500;
  }
  @media screen and (max-width: 760px) {
    padding: 25px;
  }
`
const Wrapper = styled.div`
  display: flex;
  margin: 20px 0;
  min-height: 335px;
  @media screen and (max-width: 760px) {
    flex-wrap: wrap-reverse;
  }
`
const PreviewImg = styled.div<{
  $filters: {
    name: string
    value: string
    max: string
  }[]
  $rotate: number
  $flipHorizontal: number
  $flipVertical: number
}>`
  flex-grow: 1;
  display: flex;
  overflow: hidden;
  margin-right: 20px;
  border-radius: 5px;
  align-items: center;
  justify-content: center;
  img {
    max-width: 490px;
    max-height: 335px;
    width: 100%;
    height: 100%;
    object-fit: contain;
    transform: ${(props) =>
      `rotate(${props.$rotate}deg) scale(${props.$flipHorizontal}, ${props.$flipVertical})`};
    filter: ${({ $filters }) =>
      `brightness(${$filters[0].value}%) saturate(${$filters[1].value}%) invert(${$filters[2].value}%) grayscale(${$filters[3].value}%)`};
  }
`

const initialState = [
  { name: 'السطوع', value: '100', max: '200' },
  { name: 'التشبع', value: '100', max: '200' },
  { name: 'الإنعكاس', value: '0', max: '100' },
  { name: 'تدرج الرمادي', value: '0', max: '100' }
]

function App() {
  const [filters, setFilters] = useState(initialState)
  const [rotate, setRotate] = useState(0)
  const [flipHorizontal, setFlipHorizontal] = useState(1)
  const [flipVertical, setFlipVertical] = useState(1)
  const [disable, setDisable] = useState(true)
  const [selectedFile, setSelectedFile] = useState(null)
  const [activeFilter, setActiveFilter] = useState(0)

  const inputElement = useRef<HTMLInputElement>(null)
  const imgElement = useRef<HTMLImageElement>(null)

  const handleFiltersChange = (activeFilter: number, value: string) => {
    setFilters((prevState) => {
      const newState = prevState.map((item, index) => {
        if (index === activeFilter) {
          item.value = value
          return item
        }
        return item
      })
      return newState
    })
  }

  const saveImage = () => {
    const canvas = document.createElement('canvas')
    const ctx = canvas.getContext('2d')

    const rotateAngle = rotate / 90

    canvas.width =
      (rotate !== 0 && rotateAngle % 2 !== 0
        ? imgElement.current?.naturalHeight
        : imgElement.current?.naturalWidth) || 100
    canvas.height =
      (rotate !== 0 && rotateAngle % 2 !== 0
        ? imgElement.current?.naturalWidth
        : imgElement.current?.naturalHeight) || 100

    if (ctx !== null && imgElement.current) {
      ctx.filter = `brightness(${filters[0].value}%) saturate(${filters[1].value}%) invert(${filters[2].value}%) grayscale(${filters[3].value}%)`
      ctx.translate(canvas.width / 2, canvas.height / 2)
      ctx.scale(flipHorizontal, flipVertical)

      if (rotate !== 0) {
        ctx.rotate((rotate * Math.PI) / 180)
        if (rotateAngle % 2 !== 0) {
          ctx.drawImage(
            imgElement.current,
            -canvas.height / 2, // -100
            -canvas.width / 2, // -50
            canvas.height, // 200
            canvas.width // 100
          )
        } else {
          ctx.drawImage(
            imgElement.current,
            -canvas.width / 2, // -100
            -canvas.height / 2, // -50
            canvas.width, // 200
            canvas.height // 100
          )
        }
      } else {
        ctx.drawImage(
          imgElement.current,
          -canvas.width / 2, // -100
          -canvas.height / 2, // -50
          canvas.width, // 200
          canvas.height // 100
        )
      }

      const link = document.createElement('a')
      link.download = 'image.jpg'
      link.href = canvas.toDataURL()
      link.click()
    }
  }

  const ResetFilters = () => {
    setFilters([
      { name: 'السطوع', value: '100', max: '200' },
      { name: 'التشبع', value: '100', max: '200' },
      { name: 'الإنعكاس', value: '0', max: '100' },
      { name: 'تدرج الرمادي', value: '0', max: '100' }
    ])
    setActiveFilter(0)
  }

  useEffect(() => {
    console.log(filters)
  }, [filters])

  return (
    <Container>
      <h2>تعديل الصور</h2>
      <Wrapper>
        <EditorPanel
          filters={filters}
          disable={disable}
          activeFilter={activeFilter}
          setActiveFilter={(index: number) => setActiveFilter(index)}
          setFilters={handleFiltersChange}
          setRotate={(value: number) =>
            setRotate((prevState) => {
              const newState = prevState + value
              return newState
            })
          }
          setFlipHorizontal={() =>
            setFlipHorizontal((prevState) => {
              const newState = prevState === 1 ? -1 : 1
              return newState
            })
          }
          setFlipVertical={() =>
            setFlipVertical((prevState) => {
              const newState = prevState === 1 ? -1 : 1
              return newState
            })
          }
        />
        <PreviewImg
          $filters={filters}
          $rotate={rotate}
          $flipHorizontal={flipHorizontal}
          $flipVertical={flipVertical}
        >
          <Img
            selectedFile={selectedFile}
            inputElement={inputElement}
            imgElement={imgElement}
            setDisable={setDisable}
            setFilters={setFilters}
            setActiveFilter={setActiveFilter}
          />
        </PreviewImg>
      </Wrapper>
      <Controls
        inputElement={inputElement}
        disable={disable}
        setSelectedFile={setSelectedFile}
        setFilters={ResetFilters}
        saveImage={saveImage}
      />
    </Container>
  )
}

const Img = memo(function Img({
  selectedFile,
  inputElement,
  imgElement,
  setDisable,
  setFilters,
  setActiveFilter
}: {
  selectedFile: Blob | MediaSource | null
  inputElement: RefObject<HTMLInputElement>
  imgElement: RefObject<HTMLImageElement>
  setDisable: Function
  setFilters: Function
  setActiveFilter: Function
}) {
  return (
    <img
      src={selectedFile ? URL.createObjectURL(selectedFile) : placeholder}
      alt='placeholder'
      onLoad={() => {
        if (!inputElement.current?.value) {
          return
        }
        setFilters([
          { name: 'السطوع', value: '100', max: '200' },
          { name: 'التشبع', value: '100', max: '200' },
          { name: 'الإنعكاس', value: '0', max: '100' },
          { name: 'تدرج الرمادي', value: '0', max: '100' }
        ])
        setActiveFilter(0)

        setDisable(false)
      }}
      ref={imgElement}
    />
  )
})

export default App

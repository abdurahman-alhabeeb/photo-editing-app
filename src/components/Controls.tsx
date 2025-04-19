import { RefObject } from 'react'
import styled from 'styled-components'

const Wrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;

  button {
    padding: 11px 20px;
    font-size: 14px;
    border-radius: 3px;
    outline: none;
    color: #fff;
    cursor: pointer;
    background: none;
    transition: all 0.3s ease;
    text-transform: uppercase;
  }
  @media screen and (max-width: 500px) {
    button {
      width: 100%;
      margin-bottom: 10px;
    }
  }
`
const ResetFilter = styled.button<{ $disable: boolean }>`
  color: #6c757d !important;
  border: 1px solid #6c757d !important;
  &:hover {
    color: #fff !important;
    background: #6c757d !important;
  }
  opacity: ${(props) => props.$disable && '0.5'};
  pointer-events: ${(props) => props.$disable && 'none'};
`
const Row = styled.div`
  @media screen and (max-width: 500px) {
    width: 100%;
  }
`
const ChooseImage = styled.button`
  background: #6c757d !important;
  border: 1px solid #6c757d !important;
  &:hover {
    background: #5f666d !important;
  }
`
const SaveImage = styled.button<{ $disable: boolean }>`
  margin-right: 5px;
  background: #5372f0 !important;
  border: 1px solid #5372f0 !important;
  &:hover {
    background: #2c52ed !important;
  }
  @media screen and (max-width: 500px) {
    margin-right: 0px;
  }
  opacity: ${(props) => props.$disable && '0.5'};
  pointer-events: ${(props) => props.$disable && 'none'};
`
interface ControlsTypes {
  inputElement: RefObject<HTMLInputElement>
  disable: boolean
  setFilters: Function
  setSelectedFile: Function
  saveImage: Function
}

function Controls({
  inputElement,
  disable,
  setFilters,
  setSelectedFile,
  saveImage
}: ControlsTypes) {
  const loadImage = () => {
    inputElement.current?.click()
  }
  return (
    <Wrapper>
      <ResetFilter onClick={() => setFilters()} $disable={disable}>
        إعادة ضبط الفلاتر
      </ResetFilter>
      <Row>
        <input
          type='file'
          onChange={(e) =>
            setSelectedFile(e.target.files ? e.target.files[0] : null)
          }
          ref={inputElement}
          accept='image/*'
          hidden
        />
        <ChooseImage onClick={loadImage}>إختر صورة</ChooseImage>
        <SaveImage onClick={() => saveImage()} $disable={disable}>
          حفظ الصورة
        </SaveImage>
      </Row>
    </Wrapper>
  )
}
export default Controls

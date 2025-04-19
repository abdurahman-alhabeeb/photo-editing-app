import styled from 'styled-components'
import { FaRotateLeft, FaRotateRight } from 'react-icons/fa6'
import { BiReflectVertical, BiReflectHorizontal } from 'react-icons/bi'

const Wrapper = styled.div<{ $disable?: boolean }>`
  padding: 15px 20px;
  width: 280px;
  border-radius: 5px;
  border: 1px solid #ccc;
  button {
    outline: none;
    height: 40px;
    font-size: 14px;
    color: #6c757d;
    background: #fff;
    border-radius: 3px;
    margin-bottom: 8px;
    border: 1px solid #aaa;
    &:hover {
      background: #f5f5f5;
    }
  }
  @media screen and (max-width: 760px) {
    width: 100%;
  }
  opacity: ${(props) => props.$disable && '0.5'};
  pointer-events: ${(props) => props.$disable && 'none'};
`
const Filter = styled.div<{ $active?: boolean }>`
  button {
    width: calc(100% / 2 - 4px);
  }
`
const Title = styled.label`
  display: block;
  font-size: 16px;
  margin-bottom: 12px;
`
const FilterOptions = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
`
const FilterButton = styled.button<{ $active?: boolean }>`
  color: ${(props) => props.$active && '#fff'} !important;
  border-color: ${(props) => props.$active && '#5372F0'} !important;
  background: ${(props) => props.$active && '#5372F0'} !important;
`

const Slider = styled.div`
  margin-top: 12px;
  input {
    width: 100%;
    height: 5px;
    accent-color: #5372f0;
  }
`
const FilterInfo = styled.div`
  display: flex;
  color: #464646;
  font-size: 14px;
  justify-content: space-between;
`
const Rotate = styled.div`
  margin-top: 17px;

  button {
    display: flex;
    align-items: center;
    justify-content: center;
    width: calc(100% / 4 - 3px);

    &:active {
      color: #fff;
      background: #5372f0;
      border-color: #5372f0;
    }
    &:nth-child(3),
    &:nth-child(4) {
      font-size: 18px;
    }
  }
`
const RotateOptions = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
`

interface EditorPanelTypes {
  filters: {
    name: string
    value: string
    max: string
  }[]
  setFilters: Function
  setRotate: Function
  setFlipHorizontal: Function
  setFlipVertical: Function
  disable: boolean
  activeFilter: number
  setActiveFilter: Function
}

function EditorPanel({
  filters,
  setFilters,
  setRotate,
  setFlipHorizontal,
  setFlipVertical,
  disable,
  activeFilter,
  setActiveFilter
}: EditorPanelTypes) {
  return (
    <Wrapper $disable={disable}>
      <Filter>
        <Title>الفلاتر</Title>
        <FilterOptions>
          {filters.map((filter, index) => (
            <FilterButton
              $active={index === activeFilter ? true : false}
              onClick={() => setActiveFilter(index)}
            >
              {filter.name}
            </FilterButton>
          ))}
        </FilterOptions>
        <Slider>
          <FilterInfo>
            <p>{filters[activeFilter].name}</p>
            <p>{filters[activeFilter].value}%</p>
          </FilterInfo>
          <input
            type='range'
            value={filters[activeFilter].value}
            min='0'
            max={filters[activeFilter].max}
            onChange={(e) => setFilters(activeFilter, e.target.value)}
          />
        </Slider>
      </Filter>
      <Rotate>
        <Title>قلب و تدوير</Title>
        <RotateOptions>
          <button onClick={() => setRotate(-90)}>
            <FaRotateLeft />
          </button>
          <button onClick={() => setRotate(90)}>
            <FaRotateRight />
          </button>
          <button onClick={() => setFlipHorizontal()}>
            <BiReflectVertical />
          </button>
          <button onClick={() => setFlipVertical()}>
            <BiReflectHorizontal />
          </button>
        </RotateOptions>
      </Rotate>
    </Wrapper>
  )
}
export default EditorPanel

import { useEffect, useState } from 'react';
import styled from 'styled-components'
import MainBody from './components/MainBody';

export const BASE_URL = 'http://localhost:9000'

const App = () => {
  const [data, setData] = useState(null)
  const [filteredData, setFilteredData] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [selectedButton, setSelectedButton] = useState("all")


  useEffect(() => {
    const fetchFoodData = async () => {
      setLoading(true)
      try {
        const response = await fetch(BASE_URL)
        const json = await response.json()
        setLoading(false)
        setData(json)
        setFilteredData(json)
      } catch (error) {
        setError("Unable to fetch data")
      }
    }
    fetchFoodData()
  }, [])

  const searchFood = (e) => {
    const searchValue = e.target.value
    if (searchFood == "") {
      setFilteredData(null)
    }
    const filter = data?.filter((food) => food.name.toLowerCase().includes(searchValue.toLowerCase()))
    setFilteredData(filter)
  }

  const filterFood = (type) => {
    if (type == 'all') {
      setFilteredData(data)
      setSelectedButton('all')
      return
    }

    const filter = data?.filter((food) => food.type.toLowerCase().includes(type.toLowerCase()))
    setFilteredData(filter)
    setSelectedButton(type)
  }

  const filterBtns = [
    {
      name: 'All',
      type: 'all'
    },
    {
      name: 'Breakfast',
      type: 'breakfast'
    },
    {
      name: 'Lunch',
      type: 'lunch'
    },
    {
      name: 'Dinner',
      type: 'dinner'
    }
  ]

  if (error) return <div>{error}</div>
  if (loading) return <div>Loading...</div>


  return (
    <>
      <TopContainer>
        <div className="logo">
          <img src="/logo1.png" alt='logo' />
        </div>
        <div className='srch_n_fltr_btns'>
          <div className='search'>
            <input onChange={searchFood} placeholder='Search Food.....' />
          </div>
          <div className="fltr_btns">{filterBtns.map((value) => (
          <Button isSelected={selectedButton == value.type} key={value.name} onClick={() => filterFood(value.type)}>{value.name}</Button>
          ))}
          </div>
        </div >
      </TopContainer>
      <MainBody data={filteredData} />
    </>
  )
};

export default App;


const TopContainer = styled.section`
  display: flex;
  justify-content: space-between;
  padding: 5px 40px;
  align-items: center;
  box-shadow: 0px 2px 15px 2px black;

  img{
    width: 200px;
    margin-bottom: -4px;
  }

  .search{
    input{
      background-color: transparent;
      color: white;
      border: 1px solid red;
      border-radius: 5px;
      height: 40px;
      font-size: 16px;
      padding: 0 10px;
      &::placeholder{
        color: white;
      }
    }
  }

  .srch_n_fltr_btns{
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: end;
    gap: 15px;
  }

  .fltr_btns{
    display: flex;
    justify-content: center;
    gap: 12px;
  }

  @media (0 < width < 600px){
    padding: 0;
    height: 180px;
    .srch_n_fltr_btns{
      align-items: flex-start;
    }
    .fltr_btns{
      flex-wrap: wrap;
    }
    input{
      width: 155px;
    }
  }
`
export const Button = styled.button`
  background: ${({ isSelected }) => (isSelected ? '#f22f2f' : '#ff4343')};
  outline: 1px solid ${({ isSelected }) => (isSelected ? 'white' : '#ff4343')};
  border-radius: 5px;
  padding: 6px 12px;
  border: none;
  color: white;
  cursor: pointer;
  &:hover{
    background-color: #f22f2f;
  }
`

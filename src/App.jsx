import { useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import { fetchDataFromApi } from './utils/api';
import { useSelector, useDispatch } from 'react-redux';
import { getApiConfiguration,getGenres } from './store/homeSlice';
import Home from './pages/home/Home';
import Header from './component/header/Header';
import Footer from './component/footer/Footer';
import Details from './pages/details/Details';
import Explore from './pages/explore/Explore';
import PageNotFound from './pages/404/PageNotFound';
import SearchResult from './pages/searchResult/SearchResult';

function App() {
  const dispathch = useDispatch();
  const url = useSelector((state) => state.url)

  useEffect(() => {
    fetchApiConfig();
    generesCall()
  }, [])

  const fetchApiConfig = () => {
    fetchDataFromApi('/configuration')
      .then((res) => {
        console.log(res);
        const url = {
          backdrop: res.images.secure_base_url + 'original',
          poster: res.images.secure_base_url + 'original',
          profile: res.images.secure_base_url + 'original',
        }
        dispathch(getApiConfiguration(url))
      })
  }

  const generesCall=async ()=>{
    let promises=[];
    let endpoint=['tv','movie'];
    let allGeneres={};
    endpoint.forEach((url)=>{
         promises.push(fetchDataFromApi(`/genre/${url}/list`))
    })
    const data= await Promise.all(promises);
    data.map(({genres}) => {
      return genres.map((item)=>(allGeneres[item.id] = item))
    })

    dispathch(getGenres(allGeneres));
  }

  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/:mediaType/:id" element={<Details />} />
        <Route path="/search/:query" element={<SearchResult />} />
        <Route path="/explore/:mediaType" element={<Explore />} />
        <Route path="*" element={<PageNotFound />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  )
}

export default App

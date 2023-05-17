import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import useFetch from '../../../hooks/useFetch';
import { useSelector } from 'react-redux';
import Img from '../../../component/lazyloding/img';
import ContentWrapper from '../../../component/contentWrapper/ContentWrapper';
import "./style.scss";

const HeroBanner = () => {
  const [background, setBackground] = useState('');
  const [query, setQuery] = useState('');
  const navigate = useNavigate();
  const { data, loading } = useFetch('/movie/upcoming');
  const { url } = useSelector((state) => state.home)

  useEffect(() => {
    const bg = url.backdrop + data?.results[Math.floor(Math.random() * 20)]?.backdrop_path
    setBackground(bg);
  }, [data])
  const searchQuerryHandler = (event) => {
    if (event.key === 'Enter' && query.length > 0) {
      navigate(`/search/${query}`)
    }
  }

  return (
    <div className='heroBanner'>
      {!loading && 
        <div className="backdrop-img">
          <Img src={background}/>
        </div>}
      <div className="opacity-layer">
      </div>
      <ContentWrapper>
        <div className="heroBannerContent">
          <span className="title">Welcome</span>
          <span className="subTitle">Milions of movies, TV shows and people to discover.<br /> Explore Now.</span>
          <div className="searchInput">
            <input
              type='text'
              placeholder='Search for movie or tv show'
              onChange={(e) => setQuery(e.target.value)}
              onKeyUp={searchQuerryHandler}
            />
            <button>Search</button>
          </div>
        </div>
      </ContentWrapper>
    </div>
  )
}

export default HeroBanner

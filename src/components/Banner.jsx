import React, { useState, useEffect } from "react";
import axios from "../api/axios";
import requests from "../api/request";
import "./css/Banner.css";
import styled from "styled-components";

function Banner() {
  const [movie, setMovie] = useState([]);
  const [isClicked, setIsClicked] = useState(false);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    // 현재 상영중인 영화 정보
    const response = await axios.get(requests.fetchNowPlaying);
    // 여러 영화 중 영화 하나의 ID 가져오기
    // console.log(Math.floor(Math.random() * response.data.results.length));
    const movieId =
      response.data.results[
        Math.floor(Math.random() * response.data.results.length)
      ].id;
    // console.log(movieId);

    // 특정 영화의 더 상세한 정보를 가져오기
    const { data: movieDetail } = await axios.get(`movie/${movieId}`, {
      params: { append_to_response: "videos" },
    });
    // console.log(movieDetail);
    setMovie(movieDetail);
  };

  const truncate = (str, n) => {
    return str?.length > n ? str.substring(0, n) + `...` : str;
  };

  // 플레이 버튼을 눌렀을 시
  if (isClicked) {
    return (
      <>
        <Container>
          <HomeContainer>
            <Iframe
              src={`https://www.youtube.com/embed/${movie.videos.results[0].key}?controls=0&autoplay=1&loop=1&playlist=${movie.videos.results[0].key}`}
              width={640}
              height={360}
              frameborder="0"
              allow="autoplay; fullscreen"
            ></Iframe>
          </HomeContainer>
        </Container>
        <button onClick={() => setIsClicked(!isClicked)}>X</button>
      </>
    );

    // 플레이 버튼을 누르지 않거나 다시 돌아왔을 때
  } else {
    return (
      // banner 부분
      <header
        className="banner"
        style={{
          backgroundImage: `url(https://image.tmdb.org/t/p/original/${movie.backdrop_path})`,
          backgroundPosition: "top center",
          backgroundSize: "cover",
        }}
      >
        {/* banner contents */}
        <div className="banner__contents">
          {/* 제목 있으면 다 보여주고 정보가 부족하면 없는거 빼고 다 보여줌 */}
          <h1 className="banner__title">
            {movie.title || movie.name || movie.original_name}
          </h1>
          {/* 비디오 정보가 있으면 play 버튼을 보여주고 아니면 보여주지 않는다 */}
          <div className="banner__buttons">
            {movie?.videos?.results[0]?.key && (
              <button
                className="banner__button play"
                onClick={() => setIsClicked(!isClicked)}
              >
                Play
              </button>
            )}
          </div>
          {/* 영화 설명 부분 */}
          <h1 className="banner__description">
            {truncate(movie.overview, 100)}
          </h1>
        </div>
        {/* banner 하단 스타일 */}
        <div className="banner--fadeBottom" />
      </header>
    );
  }
}

export default Banner;

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  width: 100%;
  height: 100vh;
`;

const HomeContainer = styled.div`
  width: 100%;
  height: 100%;
`;

const Iframe = styled.iframe`
  width: 100%;
  height: 100%;
  z-index: -1;
  opacity: 0.65;
  border: none;

  &::afeter {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
  }
`;

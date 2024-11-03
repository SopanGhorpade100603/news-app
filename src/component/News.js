import React, { useEffect , useState } from "react";
import NewsItem from "./NewsItem";
import Spinner from "./Spinner";
import PropTypes from "prop-types";
import InfiniteScroll from "react-infinite-scroll-component";

const News = (props) => {
  
  const [articles, setArticles] = useState([])
  const [loading, setLoading] = useState(true)
  const [page, setPage] = useState(1)
  const [totalResults, setTotalResults] = useState(0)
  
  const updateNews = async()=> {
    props.setProgress(10);  //top loading bar
    const url = `https://newsapi.org/v2/top-headlines?country=us&category=${props.category}&apiKey=bfcea04998154c4abf46c3045520866a&pageSize=${props.pageSize}`;
    setLoading(true)
    let data = await fetch(url);
    props.setProgress(30);
    let parseData = await data.json();
    props.setProgress(70); 
    setArticles(parseData.articles)
    setTotalResults(parseData.totalResults)
    setLoading(false)
    props.setProgress(100);
  }

  useEffect(()=>{  //hooks
    updateNews();   
  },[])

  const fetchMoreData = async () => {
    const url = `https://newsapi.org/v2/top-headlines?country=us&category=${props.category}&apiKey=bfcea04998154c4abf46c3045520866a&pageSize=${props.pageSize}`;
    setPage(page +1)
    setLoading(true)
    let data = await fetch(url);
    let parseData = await data.json();
    console.log(parseData);    
    setArticles(articles.concat(parseData.articles))
  };

    return (
     <>
        <h2 className="text-center " style={{ margin: "35px,0px",marginTop:"90px" }}>
          Top headlines on - {props.category} in USA
        </h2>
        {loading && <Spinner />}

        <InfiniteScroll // start infinite loading
          dataLength={articles.length}
          next={fetchMoreData}
          hasMore={articles.length !== totalResults}
          loader={<Spinner />} >

            <div className="container">
          <div className="row">
            {articles.map((element, index) => {
              let formattedDate = element.publishedAt ? new Date(element.publishedAt).toLocaleString("en-GB") : " ";  // Handle missing date
               return (
                <div className="col-md-4" key={element.url + index}> {" "}
                  <NewsItem  // Append the index to make the key unique
                    title={element.title ? element.title : ""}
                    description={element.description ? element.description : ""}
                    imageUrl={element.urlToImage}
                    className="card-img-top"
                    alt="news-image"
                    newsUrl={element.url ? element.url : ""}
                    publish={formattedDate}                                    // Use the formatted date
                    author={element.author ? element.author : "Unknown Author"}  // Handle missing author
                  />
                </div>
              );
            })}
          </div>
          </div>
        </InfiniteScroll>
     </>
    );
  }


News.defaultProps = {
  category: "general",
};

News.propTypes = {
  category: PropTypes.string,
};

export default News
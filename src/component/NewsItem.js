import React from 'react'

const NewsItem = (props)=> {
    let {title, description, imageUrl,newsUrl,author,publish} = props ;
    const defaultImageUrl = "https://images.firstpost.com/uploads/2023/05/063_1418277613.jpg?im=Resize,width=720,aspect=fit,type=normal"
    return (
      <div className='my-3'>
       <div className='card'>
  <img src={imageUrl || defaultImageUrl} alt='images'/>
  <div className='card-body'>
    <h5 className='card-title'>{title}</h5>
    <p className='card-text'>{description}</p>
    <a href={newsUrl}   rel='noreferrer'target='_blank' className='btn btn-sm btn-dark'>read more</a>
   <p className='card-text'><small className='text-muted'>author : {author} </small> </p>
   <p className='card-text'><small className='text-muted'>{publish}</small> </p>
  </div>
</div>
      </div>
    )
  }

export default NewsItem ;
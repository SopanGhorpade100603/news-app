import loading from "../lodingbar/loading.gif";

const Spinner =() => {
    return (
        <div className="text-center">
        <img className='my-3' src={loading} alt="loading"></img>
      </div>
    )
}
 export default Spinner;
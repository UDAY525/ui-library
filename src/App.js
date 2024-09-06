import './App.css';
import Accordion from './components/accordian';
import RandomColor from './components/randomColor';
import StarRatings from './components/starRatings';
import ImageSlider from './components/image-slider';
function App() {
  return (
    <div className="App">
      {/* Accordian */}
      {/* <Accordion/> */}

      {/* Random color generator */}
      {/* <RandomColor/> */}

      {/* Star ratings */}
      {/* <StarRatings noOfStars={10}/> */}

      {/* Image Slider */}
      <ImageSlider
      url={"https://picsum.photos/v2/list"}
      page={"1"}
      limit={"10"}
      />
    </div>
  );
}

export default App;

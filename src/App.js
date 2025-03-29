import './App.css';
import Accordion from './components/accordian';
import RandomColor from './components/randomColor';
import StarRatings from './components/starRatings';
import ImageSlider from './components/image-slider';
import LoadMoreData from './components/load-more-data';
import TreeView from './components/tree-ui';
import menus from './components/tree-ui/data';
import OtpHolder from './components/otp-entry/OtpHolder';
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
      {/* <ImageSlider
      url={"https://picsum.photos/v2/list"}
      page={"1"}
      limit={"10"}
      /> */}

      {/* Load more */}
      {/* <LoadMoreData/> */}

      {/* Tree View */}
      {/* <TreeView menus={menus}/> */}

      {/* OTP Entry */}
      <OtpHolder/>
    </div>
  );
}

export default App;

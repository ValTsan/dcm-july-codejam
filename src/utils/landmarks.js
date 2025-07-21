import GrandCanyon from "../../public/Grand Canyon.png";
import Yosemite from "../../public/Yosemite.png";
import Yellowstone from "../../public/Yellowstone.png";
import Zion from "../../public/Zion.png";
import MountRushmore from "../../public/Mount Rushmore.png";
import GreatSmokeyMountains from "../../public/Great Smokey Mountains.png";
import StatueOfLiberty from "../../public/Statue of Liberty.png";
import Arches from "../../public/Arches.png";
import NiagaraFalls from "../../public/Niagara Falls.png";
import GoldenGateBridge from "../../public/Golden Bridge.png";

const landmarks = [
  {
    name: "Grand Canyon National Park",
    coords: [-112.0866, 36.0575],
    type: "National Park",
    state: "California",
    popularity: 92,
    time: "5h",
    image: GrandCanyon,
  },
  {
    name: "Yosemite National Park",
    coords: [-119.5383, 37.8651],
    type: "National Park",
    state: "Arizona",
    popularity: 90,
    time: "4h",
    image: Yosemite,
  },

  {
    name: "Yellowstone National Park",
    coords: [-110.5885, 44.428],
    type: "National Park",
    state: "Wyoming",
    popularity: 88,
    time: "6h",
    image: Yellowstone,
  },
  {
    name: "Zion National Park",
    coords: [-113.0263, 37.2982],
    type: "National Park",
    state: "Utah",
    popularity: 85,
    time: "3.5h",
    image: Zion,
  },
  {
    name: "Mount Rushmore",
    coords: [-103.4538, 43.8803],
    type: "Monument",
    state: "South Dakota",
    popularity: 87,
    time: "4h",
    image: MountRushmore,
  },
  {
    name: "Great Smoky Mountains",
    coords: [-83.4987, 35.6118],
    type: "Natural Wonder",
    state: "Tennessee",
    popularity: 89,
    time: "4.5h",
    image: GreatSmokeyMountains,
  },
  {
    name: "Statue of Liberty",
    coords: [-74.0445, 40.6892],
    type: "Historic Landmark",
    state: "New York",
    popularity: 83,
    time: "3h",
    image: StatueOfLiberty,
  },
  {
    name: "Arches National Park",
    coords: [-109.5746, 38.7328],
    type: "National Park",
    state: "Utah",
    popularity: 84,
    time: "4h",
    image: Arches,
  },
  {
    name: "Niagara Falls",
    coords: [-79.0377, 43.0962],
    type: "Natural Wonder",
    state: "New York",
    popularity: 86,
    time: "5h",
    image: NiagaraFalls,
  },
  {
    name: "Golden Gate Bridge",
    coords: [-80.8874, 25.2866],
    type: "Landmark",
    state: "California",
    popularity: 82,
    time: "3.5h",
    image: GoldenGateBridge,
  },
];

export default landmarks;

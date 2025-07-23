import GrandCanyon from "/Grand Canyon.png";
import Yosemite from "/Yosemite.png";
import Yellowstone from "/Yellowstone.png";
import Zion from "/Zion.png";
import MountRushmore from "/Mount Rushmore.png";
import GreatSmokeyMountains from "/Great Smokey Mountains.png";
import StatueOfLiberty from "/Statue of Liberty.png";
import Arches from "/Arches.png";
import NiagaraFalls from "/Niagara Falls.png";
import GoldenGateBridge from "/Golden Bridge.png";

const landmarks = [
  {
    name: "Grand Canyon National Park",
    coords: [-112.0866, 36.0575],
    type: "National Park",
    state: "Arizona",
    popularity: 92,
    time: "5h",
    image: GrandCanyon,
    description:
      "A breathtaking canyon carved by the Colorado River, offering stunning vistas and layered red rock formations.",
  },
  {
    name: "Yosemite National Park",
    coords: [-119.5383, 37.8651],
    type: "National Park",
    state: "California",
    popularity: 90,
    time: "4h",
    image: Yosemite,
    description:
      "Known for towering granite cliffs, waterfalls, and ancient sequoias—an iconic gem of the Sierra Nevada.",
  },

  {
    name: "Yellowstone National Park",
    coords: [-110.5885, 44.428],
    type: "National Park",
    state: "Wyoming",
    popularity: 88,
    time: "6h",
    image: Yellowstone,
    description:
      "The first U.S. national park, famous for its geysers, hot springs, and diverse wildlife like bison and bears.",
  },
  {
    name: "Zion National Park",
    coords: [-113.0263, 37.2982],
    type: "National Park",
    state: "Utah",
    popularity: 85,
    time: "3.5h",
    image: Zion,
    description:
      "Home to massive sandstone cliffs and the Virgin River, Zion is a hiker's paradise filled with dramatic scenery.",
  },
  {
    name: "Mount Rushmore",
    coords: [-103.4538, 43.8803],
    type: "Monument",
    state: "South Dakota",
    popularity: 87,
    time: "4h",
    image: MountRushmore,
    description:
      "An iconic sculpture carved into granite featuring the faces of four U.S. presidents—Washington, Jefferson, Roosevelt, and Lincoln.",
  },
  {
    name: "Great Smoky Mountains",
    coords: [-83.4987, 35.6118],
    type: "Natural Wonder",
    state: "Tennessee",
    popularity: 89,
    time: "4.5h",
    image: GreatSmokeyMountains,
    description:
      "Known for its mist-covered peaks, lush forests, and rich biodiversity—perfect for scenic drives and wildlife spotting.",
  },
  {
    name: "Statue of Liberty",
    coords: [-74.0445, 40.6892],
    type: "Historic Landmark",
    state: "New York",
    popularity: 83,
    time: "3h",
    image: StatueOfLiberty,
    description:
      "A colossal neoclassical sculpture on Liberty Island, a symbol of freedom and democracy.",
  },
  {
    name: "Arches National Park",
    coords: [-109.5746, 38.7328],
    type: "National Park",
    state: "Utah",
    popularity: 84,
    time: "4h",
    image: Arches,
    description:
      "Famous for over 2,000 natural stone arch formations, this park offers otherworldly landscapes and scenic hikes.",
  },
  {
    name: "Niagara Falls",
    coords: [-79.0377, 43.0962],
    type: "Natural Wonder",
    state: "New York",
    popularity: 86,
    time: "5h",
    image: NiagaraFalls,
    description:
      "A trio of powerful waterfalls on the U.S.-Canada border, renowned for their thundering roar and dramatic views.",
  },
  {
    name: "Golden Gate Bridge",
    coords: [-122.4783, 37.8199],
    type: "Landmark",
    state: "California",
    popularity: 82,
    time: "3.5h",
    image: GoldenGateBridge,
    description:
      "An iconic red suspension bridge stretching over the San Francisco Bay, offering panoramic city and ocean views.",
  },
];

export default landmarks;

import React from 'react';
import { Text, RichText, Image, Link } from '@sitecore-jss/sitecore-jss-react';
import Slider from '../../Feature/Slider/Slider';
import CurrentLocation from '../../Foundation/Geolocation/CurrentLocation';
import Testride from '../Testride/Testride';
import TvsHeader from '../TvsHeader/TvsHeader';

/**
 * A simple Content Block component, with a heading and rich text block.
 * This is the most basic building block of a content site, and the most basic
 * JSS component that's useful.
 */
const Card = ({ fields }) => (
  <div>
    <TvsHeader />
    <div className="max-w-sm rounded overflow-hidden shadow-lg">
      <CurrentLocation />
      <Testride />
      <Image
        field={fields.Image}
        srcSet={[{ mw: 300 }, { mw: 100 }]}
        sizes="(min-width: 960px) 300px, 100px"
        className="img-fluid"
      />
      <div className="px-6 py-4">
        <Text tag="h2" className="font-bold text-xl mb-2" field={fields.Headline} />
        <RichText className="text-gray-700 text-base" field={fields.Text} />
      </div>
      <div className="px-6 pt-4 pb-2">
        <Link
          field={fields.Link}
          className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2"
        >
          #click me!
        </Link>
        <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
          #travel
        </span>
        <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
          #winter
        </span>
      </div>
    </div>
  </div>
);

export default Card;

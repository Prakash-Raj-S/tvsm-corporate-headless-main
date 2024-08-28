import React from 'react';
import { Text, RichText, Image, Link } from '@sitecore-jss/sitecore-jss-react';
import Slider from '../../Feature/Slider/Slider';
import CurrentLocation from '../../Foundation/Geolocation/CurrentLocation';
import TestrideMultiStep from './TestrideMultiStep';

/**
 * A simple Content Block component, with a heading and rich text block.
 * This is the most basic building block of a content site, and the most basic
 * JSS component that's useful.
 */

function HeadlessTestride({ fields }) {
  return (
    <div className="abc">
      <Slider />
      <Text tag="h2" className="font-bold text-xl mb-2" field={fields.Heading} />
      <RichText className="text-gray-700 text-base" field={fields.Description} />
      <TestrideMultiStep fields={fields} />
    </div>
  );
}

export default HeadlessTestride;

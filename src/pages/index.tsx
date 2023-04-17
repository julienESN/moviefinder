import Image from 'next/image';
import { Inter } from 'next/font/google';
import Header from './header/Header';
import Body from './Body/Body';
export default function Home() {
  return (
    <div className="bg-gray-900">
      <div className="flex justify-center"></div>
      <Body />
    </div>
  );
}

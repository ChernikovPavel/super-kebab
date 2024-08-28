import React, { useEffect, useState } from 'react';
import './MapComponent.css';
import { useParams } from 'react-router-dom';

function Map({ remuveMap, orderInDelivery }) {
  const [isMap, setIsMap] = useState(false);
  const { id } = useParams();
  // const [coordinates, setCoordinates] = useState();
  // const coordinatesToNumber = (coordinates) =>
  //   coordinates?.map((el) => Number(el));
  // console.log(orderInDelivery.coordinates);

  useEffect(() => {
    // setCoordinates(coordinatesToNumber());
    const findClass = document.querySelector('.ymaps-2-1-79-map');

    if (!remuveMap) {
      if (findClass) document.querySelector('#map').removeChild(findClass);
    }

    const oldMap = document.querySelector('.ymaps-2-1-79-map');
    if (!oldMap) {
      const script = document.createElement('script');
      script.setAttribute('type', 'text/javascript');
      script.src =
        'https://api-maps.yandex.ru/2.1.78/?apikey=24c18903-4f64-4649-87e4-d2621aa227b9&lang=ru_RU';
      script.async = true;

      document.body.appendChild(script);
      script.onload = () => {
        ymaps.ready(init);
        function init() {
          var myMap = new ymaps.Map(
            'map',
            {
              center: [55.76, 37.64],
              zoom: 10,
            },
            {
              searchControlProvider: 'yandex#search',
            }
          );
          // Создаем геообъект с типом геометрии "Точка".
          var myPlacemark = new ymaps.Placemark(
            [55.8265, 37.487208],
            {},
            {
              iconLayout: 'default#image',
              iconImageHref:
                'https://allopizza.su/storage/products/August2024/z1PG2Y1VLTqnytzKT27A.webp',
              iconImageSize: [40, 42],
              iconImageOffset: [-3, -42],
            }
          );
          myMap.geoObjects.add(myPlacemark).add(
            new ymaps.Placemark(
              [55.826479, 37.487208],
              {
                balloonContent: 'цвет <strong>фэйсбука</strong>',
              },
              {
                preset: 'islands#governmentCircleIcon',
                iconColor: 'red',
              }
            )
          );
        }
      };
      // Удаляем скрипт при размонтировании компонента
      return () => {
        document.body.removeChild(script);
      };
    }
  }, [id]);

  return (
    <div
      id='map'
      className='map1'
      // style={{ height: '400px' }}
    ></div>
  );
}

export default Map;
